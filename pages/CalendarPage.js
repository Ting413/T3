import Page from "../../components/Page.js";

// 📅 行事曆頁面
function CalendarPage() {
    const [events, setEvents] = React.useState([
        { date: "2025-04-15", note: "交貨：牛軋餅原味 20 盒" },
        { date: "2025-04-18", note: "交貨：月娘酥 50 顆" }
    ]);
    const [selectedDate, setSelectedDate] = React.useState("");
    const [noteInput, setNoteInput] = React.useState("");
    const [monthOffset, setMonthOffset] = React.useState(0);

    const today = new Date();
    const displayDate = new Date(today.getFullYear(), today.getMonth() + monthOffset);
    const displayMonth = displayDate.toISOString().slice(0, 7);

    const reminders = events.filter(e => {
        const diff = (new Date(e.date) - today) / (1000 * 60 * 60 * 24);
        return diff >= 0 && diff <= 3;
    });

    function addNote() {
        if (!selectedDate || !noteInput) return;
        setEvents([...events, { date: selectedDate, note: noteInput }]);
        setNoteInput("");
    }

    const grouped = events.reduce((acc, e) => {
        if (!acc[e.date]) acc[e.date] = [];
        acc[e.date].push(e.note);
        return acc;
    }, {});

    function renderCalendarGrid() {
        const start = new Date(displayMonth + "-01");
        const daysInMonth = new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate();
        const startDay = start.getDay();

        const cells = [];
        for (let i = 0; i < startDay; i++) cells.push(null);
        for (let d = 1; d <= daysInMonth; d++) {
            const dayStr = `${displayMonth}-${d.toString().padStart(2, "0")}`;
            cells.push({
                day: d,
                date: dayStr,
                notes: grouped[dayStr] || []
            });
        }

        return React.createElement("div", {
            style: {
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: "6px",
                marginTop: "10px"
            }
        }, cells.map((cell, i) => {
            if (!cell) return React.createElement("div", { key: i });
            return React.createElement("div", {
                key: i,
                style: {
                    border: "1px solid #ccc",
                    padding: "6px",
                    backgroundColor: cell.date === today.toISOString().split("T")[0] ? "#f9c066" : "#fffbe6",
                    borderRadius: "6px",
                    fontSize: "14px",
                    cursor: "pointer"
                },
                onClick: () => setSelectedDate(cell.date)
            }, [
                React.createElement("strong", {}, cell.day),
                ...cell.notes.map((n, j) => React.createElement("div", {
                    key: j,
                    style: { marginTop: "4px", fontSize: "12px" }
                }, n))
            ]);
        }));
    }

    return React.createElement(Page, { title: "行事曆" }, [
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" } }, [
            React.createElement("h3", {}, `➕ 新增交貨備註 (${selectedDate || "請點選日期"})`),
            React.createElement("div", {}, [
                React.createElement("button", { className: "btn", onClick: () => setMonthOffset(monthOffset - 1) }, "← 上個月"),
                React.createElement("button", { className: "btn", onClick: () => setMonthOffset(0), style: { margin: "0 8px" } }, "本月"),
                React.createElement("button", { className: "btn", onClick: () => setMonthOffset(monthOffset + 1) }, "下個月 →")
            ])
        ]),

        React.createElement("div", {}, [
            React.createElement("input", {
                type: "text",
                placeholder: "輸入備註...",
                value: noteInput,
                onChange: e => setNoteInput(e.target.value),
                style: { width: "300px" }
            }),
            React.createElement("button", {
                className: "btn",
                onClick: addNote,
                style: { marginLeft: "10px" },
                disabled: !selectedDate
            }, "新增")
        ]),

        React.createElement("div", { style: { marginTop: "20px" } }, [
            React.createElement("h3", {}, "⏰ 三日內交貨提醒"),
            reminders.length === 0
                ? React.createElement("p", {}, "目前無需提醒的交貨紀錄。")
                : reminders.map((r, i) => React.createElement("p", { key: i }, `${r.date}：${r.note}`))
        ]),

        React.createElement("div", { style: { marginTop: "30px" } }, [
            React.createElement("h3", {}, `${displayMonth} 視覺排程圖`),
            renderCalendarGrid()
        ])
    ]);
}
export default CalendarPage;