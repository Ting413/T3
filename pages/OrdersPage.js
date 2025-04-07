
function OrdersPage() {
    const [search, setSearch] = React.useState("");
    const [dateFrom, setDateFrom] = React.useState("");
    const [dateTo, setDateTo] = React.useState("");

    const [orders, setOrders] = React.useState([
        {
            id: 101,
            customer: "王小明",
            items: [
                { name: "奶油可頌", qty: 2, price: 40 },
                { name: "蜂蜜吐司", qty: 1, price: 35 }
            ],
            payment: "貨到付款",
            status: "待確認",
            orderDate: "2025-04-01",
            pickupDate: "2025-04-08"
        },
        {
            id: 102,
            customer: "李小花",
            items: [
                { name: "鹽可頌", qty: 3, price: 38 }
            ],
            payment: "Line Pay",
            status: "製作中",
            orderDate: "2025-04-02",
            pickupDate: "2025-04-09"
        }
    ]);

    const statusList = ["待確認", "製作中", "可取貨", "已取貨"];

    function updateStatus(id, newStatus) {
        setOrders(orders.map(o =>
            o.id === id ? { ...o, status: newStatus } : o
        ));
    }

    function getTotal(order) {
        return order.items.reduce((sum, item) => sum + item.qty * item.price, 0);
    }

    function exportCSV(customer) {
        const filtered = orders.filter(o => o.customer === customer);
        if (filtered.length === 0) return alert("找不到此顧客訂單！");
        let csv = "訂單編號,下單時間,取貨時間,商品明細,付款方式,狀態,總金額\\n";
        filtered.forEach(o => {
            const items = o.items.map(i => `${i.name}x${i.qty}`).join(" ");
            const total = getTotal(o);
            csv += `${o.id},${o.orderDate},${o.pickupDate},${items},${o.payment},${o.status},${total}\\n`;
        });
        const blob = new Blob([csv], { type: "text/csv" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = customer + "_訂單報表.csv";
        a.click();
    }

    const filteredOrders = orders.filter(o => {
        const matchSearch = o.customer.includes(search) || o.id.toString().includes(search);
        const matchDate =
            (!dateFrom || o.orderDate >= dateFrom) &&
            (!dateTo || o.orderDate <= dateTo);
        return matchSearch && matchDate;
    });

    return React.createElement(Page, { title: "訂單管理" }, [
        React.createElement("div", { className: "search-box" }, [
            React.createElement("input", {
                type: "text",
                placeholder: "搜尋顧客 / 訂單編號",
                value: search,
                onChange: e => setSearch(e.target.value)
            }),
            React.createElement("input", {
                type: "date",
                value: dateFrom,
                onChange: e => setDateFrom(e.target.value),
                style: { marginLeft: "10px" }
            }),
            React.createElement("input", {
                type: "date",
                value: dateTo,
                onChange: e => setDateTo(e.target.value),
                style: { marginLeft: "10px" }
            }),
            React.createElement("button", {
                className: "btn",
                style: { marginLeft: "10px" },
                onClick: () => exportCSV(search.trim())
            }, "匯出顧客訂單")
        ]),
        React.createElement("table", {}, [
            React.createElement("thead", {}, React.createElement("tr", {}, [
                React.createElement("th", {}, "訂單編號"),
                React.createElement("th", {}, "顧客"),
                React.createElement("th", {}, "下單時間"),
                React.createElement("th", {}, "取貨時間"),
                React.createElement("th", {}, "商品明細"),
                React.createElement("th", {}, "付款方式"),
                React.createElement("th", {}, "狀態"),
                React.createElement("th", {}, "總金額"),
                React.createElement("th", {}, "操作")
            ])),
            React.createElement("tbody", {}, filteredOrders.map(order =>
                React.createElement("tr", { key: order.id }, [
                    React.createElement("td", {}, order.id),
                    React.createElement("td", {}, order.customer),
                    React.createElement("td", {}, order.orderDate),
                    React.createElement("td", {}, order.pickupDate),
                    React.createElement("td", {}, order.items.map(i => `${i.name} x${i.qty}`).join(", ")),
                    React.createElement("td", {}, order.payment),
                    React.createElement("td", {}, order.status),
                    React.createElement("td", {}, "$" + getTotal(order)),
                    React.createElement("td", {}, [
                        React.createElement("select", {
                            value: order.status,
                            onChange: e => updateStatus(order.id, e.target.value)
                        }, statusList.map(s => React.createElement("option", { key: s, value: s }, s)))
                    ])
                ])
            ))
        ])
    ]);
}
window.OrdersPage = OrdersPage;