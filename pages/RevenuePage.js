import Page from "../../components/Page.js";

function RevenuePage() {
    const orders = [
        { id: 1, date: "2025-04-01", total: 120, method: "現金" },
        { id: 2, date: "2025-04-01", total: 240, method: "LinePay" },
        { id: 3, date: "2025-04-02", total: 100, method: "貨到付款" },
        { id: 4, date: "2025-04-02", total: 300, method: "現金" },
        { id: 5, date: "2025-04-03", total: 160, method: "LinePay" },
        { id: 6, date: "2025-04-04", total: 400, method: "現金" },
        { id: 7, date: "2025-04-04", total: 250, method: "LinePay" },
        { id: 8, date: "2025-04-05", total: 180, method: "現金" }
    ];

    const [selectedDate, setSelectedDate] = React.useState(new Date().toISOString().split("T")[0]);
    const [filteredOrders, setFilteredOrders] = React.useState([]);

    function handleSearch() {
        const filtered = orders.filter(o => o.date === selectedDate);
        setFilteredOrders(filtered);
    }

    const total = filteredOrders.reduce((sum, o) => sum + o.total, 0);
    const count = filteredOrders.length;

    return React.createElement(Page, { title: "營收統計" }, [
        React.createElement("div", {
            style: {
                marginBottom: "20px",
                background: "#fdf3e7",
                padding: "20px",
                borderRadius: "8px"
            }
        }, [
            React.createElement("h2", {
                style: { marginBottom: "10px", fontSize: "20px", color: "#774b30" }
            }, "📊 業績總攬"),

            React.createElement("label", {
                style: { fontSize: "16px", marginRight: "10px" }
            }, "選擇查詢日期："),

            React.createElement("input", {
                type: "date",
                value: selectedDate,
                onChange: e => setSelectedDate(e.target.value),
                style: {
                    padding: "6px 12px",
                    fontSize: "16px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    marginRight: "10px"
                }
            }),

            React.createElement("button", {
                className: "btn",
                onClick: handleSearch,
                style: {
                    fontSize: "16px",
                    padding: "6px 16px",
                    backgroundColor: "#f58322",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                }
            }, "查詢")
        ]),

        selectedDate && React.createElement("div", {
            style: {
                background: "#fff4e4",
                padding: "20px",
                borderRadius: "8px",
                marginTop: "10px",
                marginBottom: "20px",
                fontSize: "18px"
            }
        }, [
            React.createElement("h3", {
                style: { marginBottom: "10px", color: "#9f5933" }
            }, "查詢日期：" + selectedDate),
            React.createElement("p", {}, "總營收：$" + total),
            React.createElement("p", {}, "訂單數：" + count + " 筆")
        ])
    ]);
}

export default RevenuePage;