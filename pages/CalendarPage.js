
function CalendarPage() {
  const [activities, setActivities] = React.useState([]);
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [showModal, setShowModal] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [newActivity, setNewActivity] = React.useState({ title: "", start: "", end: "" });

  function getMonthDates(year, month) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const dates = [];
    const startDayOfWeek = firstDay.getDay();
    const totalCells = Math.ceil((startDayOfWeek + lastDay.getDate()) / 7) * 7;
    for (let i = 0; i < totalCells; i++) {
      const date = new Date(year, month, i - startDayOfWeek + 1);
      dates.push(date);
    }
    return dates;
  }

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`; // ✅ 正確避免時區偏移
  }
  

  function openModal(date) {
    const todayStr = formatDate(date);
    setNewActivity({ title: "", start: todayStr, end: todayStr });
    setEditingId(null);
    setShowModal(true);
  }

  function closeModal() {
    setNewActivity({ title: "", start: "", end: "" });
    setEditingId(null);
    setShowModal(false);
  }

  function handleSave() {
    if (!newActivity.title || !newActivity.start || !newActivity.end) {
      alert("請填寫完整活動資訊");
      return;
    }

    const start = new Date(newActivity.start);
    const end = new Date(newActivity.end);
    if (start > end) {
      alert("結束日期不得早於開始日期");
      return;
    }

    if (editingId !== null) {
      setActivities(activities.map(a => a.id === editingId ? { ...newActivity, id: editingId } : a));
    } else {
      setActivities([...activities, { ...newActivity, id: Date.now() }]);
    }
    closeModal();
  }

  function getActivitiesByDate(date) {
    const d = formatDate(date);
    return activities.filter(a => d >= a.start && d <= a.end);
  }

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = getMonthDates(year, month);

  return React.createElement(Page, { title: "📅 行事曆管理" }, [
    React.createElement("style", {
      dangerouslySetInnerHTML: {
        __html: `
        .calendar {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 6px;
          margin-top: 20px;
        }
        .calendar-day {
          border: 1px solid #ccc;
          min-height: 80px;
          padding: 6px;
          background: #fff;
          border-radius: 6px;
          font-size: 14px;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .calendar-day.other-month {
          background: #f1f1f1;
          color: #aaa;
        }
        .day-number {
          font-weight: bold;
          margin-bottom: 4px;
        }
        .activity-tag {
          font-size: 12px;
          color: #fff;
          background: #f9c066;
          padding: 2px 4px;
          border-radius: 4px;
          margin-bottom: 2px;
          display: inline-block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .calendar-header {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          background-color: #a9805b;
          color: white;
          text-align: center;
          font-weight: bold;
          padding: 10px 0;
          border-radius: 8px;
        }
        .calendar-nav {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 10px;
        }
        .calendar-nav button {
          padding: 6px 10px;
          background: #9f5933;
          color: white;
          border: none;
          border-radius: 5px;
        }
      ` }
    }),

    React.createElement("div", { className: "calendar-nav" }, [
        React.createElement("button", {
          onClick: () => setCurrentDate(new Date(year, month - 1, 1))
        }, "◀ 上一月"),
      
        // 年份下拉選單
        React.createElement("select", {
          value: year,
          onChange: (e) => setCurrentDate(new Date(Number(e.target.value), month, 1)),
          style: { padding: "4px 8px", margin: "0 6px" }
        }, Array.from({ length: 11 }, (_, i) => {
          const y = 2020 + i;
          return React.createElement("option", { value: y, key: y }, `${y} 年`);
        })),
      
        // 月份下拉選單
        React.createElement("select", {
          value: month,
          onChange: (e) => setCurrentDate(new Date(year, Number(e.target.value), 1)),
          style: { padding: "4px 8px", margin: "0 6px" }
        }, Array.from({ length: 12 }, (_, i) =>
          React.createElement("option", { value: i, key: i }, `${i + 1} 月`)
        )),
      
        React.createElement("button", {
          onClick: () => setCurrentDate(new Date(year, month + 1, 1))
        }, "下一月 ▶")
      ]),

    React.createElement("div", { className: "calendar-header" },
      ["日", "一", "二", "三", "四", "五", "六"].map((d, i) =>
        React.createElement("div", { key: i }, d)
      )
    ),

    React.createElement("div", { className: "calendar" },
      days.map((date, idx) => {
        const isCurrentMonth = date.getMonth() === month;
        const list = getActivitiesByDate(date);
        return React.createElement("div", {
          className: "calendar-day" + (isCurrentMonth ? "" : " other-month"),
          key: idx,
          onClick: () => openModal(date)
        }, [
          React.createElement("div", { className: "day-number" }, date.getDate()),
          ...list.map((a, i) =>
            React.createElement("div", { key: a.id + '-' + i, className: "activity-tag" }, a.title)
          )
        ]);
      })
    ),

    showModal && React.createElement("div", {
      style: {
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.4)", display: "flex",
        alignItems: "center", justifyContent: "center", zIndex: 1000
      }
    }, React.createElement("div", {
      style: {
        background: "#fff", padding: "20px", borderRadius: "10px",
        width: "360px", maxWidth: "90%"
      }
    }, [
      React.createElement("h3", {}, editingId ? "編輯活動" : "新增活動"),
      React.createElement("label", {}, "活動名稱："),
      React.createElement("input", {
        type: "text",
        value: newActivity.title,
        onChange: e => setNewActivity({ ...newActivity, title: e.target.value }),
        style: { width: "100%", marginBottom: "10px" }
      }),
      React.createElement("label", {}, "開始日期："),
      React.createElement("input", {
        type: "date",
        value: newActivity.start,
        onChange: e => {
          const startVal = e.target.value;
          setNewActivity({
            ...newActivity,
            start: startVal,
            end: newActivity.end < startVal ? startVal : newActivity.end
          });
        },
        style: { width: "100%", marginBottom: "10px" }
      }),
      React.createElement("label", {}, "結束日期："),
      React.createElement("input", {
        type: "date",
        min: newActivity.start,
        value: newActivity.end,
        onChange: e => setNewActivity({ ...newActivity, end: e.target.value }),
        style: { width: "100%", marginBottom: "10px" }
      }),
      React.createElement("div", { style: { textAlign: "right" } }, [
        React.createElement("button", {
          onClick: handleSave,
          style: { marginRight: "10px", background: "#f58322", color: "#fff", padding: "6px 12px", border: "none", borderRadius: "5px" }
        }, editingId ? "儲存" : "新增"),
        React.createElement("button", {
          onClick: closeModal,
          style: { background: "#aaa", color: "#fff", padding: "6px 12px", border: "none", borderRadius: "5px" }
        }, "取消")
      ])
    ])),

    React.createElement("div", { style: { marginTop: "40px" } }, [
      React.createElement("h2", {}, "📝 活動清單"),
      activities.sort((a, b) => new Date(a.start) - new Date(b.start)).map((a, idx) =>
        React.createElement("div", { key: a.id }, [
          `• ${a.title}（${a.start} ~ ${a.end}）`,
          React.createElement("button", {
            style: { marginLeft: "8px", background: "#774b30", color: "#fff", border: "none", padding: "4px 8px", borderRadius: "4px" },
            onClick: () => {
              setNewActivity({ title: a.title, start: a.start, end: a.end });
              setEditingId(a.id);
              setShowModal(true);
            }
          }, "編輯"),
          React.createElement("button", {
            style: { marginLeft: "5px", background: "#aaa", color: "#fff", border: "none", padding: "4px 8px", borderRadius: "4px" },
            onClick: () => setActivities(activities.filter(e => e.id !== a.id))
          }, "刪除")
        ])
      )
    ])
  ]);
}

window.CalendarPage = CalendarPage;
