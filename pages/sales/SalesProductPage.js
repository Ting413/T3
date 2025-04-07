
function SalesProductPage() {
    const [dateRange, setDateRange] = React.useState("today");
    const [category, setCategory] = React.useState("all");
    const [results, setResults] = React.useState([]);
    const [startDate, setStartDate] = React.useState("");
    const [endDate, setEndDate] = React.useState("");
    const [displayRange, setDisplayRange] = React.useState("");
    const [chartType, setChartType] = React.useState("bar");

    const products = [
        { id: 1, name: "牛軋餅原味", category: "牛軋餅", price: 120 },
        { id: 2, name: "牛軋餅蔓越莓口味", category: "牛軋餅", price: 130 },
        { id: 3, name: "牛軋餅抹茶味", category: "牛軋餅", price: 130 },
        { id: 4, name: "牛軋餅咖啡味", category: "牛軋餅", price: 130 },
        { id: 5, name: "方塊酥抹茶味", category: "方塊酥", price: 110 },
        { id: 6, name: "方塊酥咖啡味", category: "方塊酥", price: 110 },
        { id: 7, name: "夏威夷莓果Q糖", category: "牛軋糖", price: 150 },
        { id: 8, name: "可可夏威夷Q糖", category: "牛軋糖", price: 150 },
        { id: 9, name: "港式芝麻糊Q糖", category: "牛軋糖", price: 140 },
        { id: 10, name: "草莓牛軋糖", category: "牛軋糖", price: 140 },
        { id: 11, name: "棗泥蛋黃酥", category: "中式酥點", price: 180 },
        { id: 12, name: "月娘酥", category: "中式酥點", price: 160 },
        { id: 13, name: "台式馬卡龍", category: "西式烘焙", price: 100 },
        { id: 14, name: "吐司", category: "吐司", price: 60 },
        { id: 15, name: "葡萄吐司", category: "吐司", price: 70 },
        { id: 16, name: "肉桂捲", category: "西式烘焙", price: 90 },
        { id: 17, name: "瑪德蓮", category: "西式烘焙", price: 85 }
    ];

    const formatDate = d => new Date(d).toLocaleDateString();

    const handleSearch = () => {
        let from = "", to = "";
        const today = new Date();
        switch (dateRange) {
            case "today":
                from = to = formatDate(today); break;
            case "yesterday":
                const y = new Date(today); y.setDate(today.getDate() - 1);
                from = to = formatDate(y); break;
            case "last7":
                const l7 = new Date(today); l7.setDate(today.getDate() - 6);
                from = formatDate(l7); to = formatDate(today); break;
            case "thisMonth":
                from = formatDate(new Date(today.getFullYear(), today.getMonth(), 1));
                to = formatDate(today); break;
            case "lastMonth":
                const f = new Date(today.getFullYear(), today.getMonth() - 1, 1);
                const l = new Date(today.getFullYear(), today.getMonth(), 0);
                from = formatDate(f); to = formatDate(l); break;
            case "custom":
                if (!startDate || !endDate) return alert("請選擇起訖日");
                if (new Date(endDate) < new Date(startDate)) return alert("結束時間不可早於起始");
                from = formatDate(startDate); to = formatDate(endDate); break;
        }
        setDisplayRange(`${from} ~ ${to}`);

        const filtered = products.filter(p => category === "all" || p.category === category);
        const result = filtered.map(p => {
            const qty = Math.floor(Math.random() * 20 + 5);
            return { ...p, quantity: qty, revenue: qty * p.price };
        }).sort((a, b) => b.revenue - a.revenue); // 自動排序
        setResults(result);
        setTimeout(() => drawChart(result), 100);
    };

    const drawChart = (data) => {
        const prettyColors = [
            "#a9805b",
            "#9f5933",
            "#774b30",
            "#debd94",
            "#f58322",
            "#f9c066",
            "#c96f3f",
            "#e8a86e",
            "#c4a07a",
            "#8c6648",
            "#b57246",
            "#f4a45c",
            "#d1a378",
            "#f6d7ac",
            "#e19c68",
            "#d38755",
            "#b58868"
        ];
        const canvas = document.getElementById("salesChart");
        if (!canvas) return;
        if (window.chartInstance) window.chartInstance.destroy();

        const ctx = canvas.getContext("2d");
        const labels = data.map(p => p.name);
        const values = data.map(p => p.revenue);

        const colors = prettyColors.slice(0, data.length);
        const bgColor = "#f58322";

        const config = {
            type: chartType === "line" ? "line"
                : chartType === "pie" ? "pie"
                    : "bar",
            data: {
                labels,
                datasets: [{
                    label: "銷售金額",
                    data: values,
                    backgroundColor: chartType === "pie" ? colors : bgColor,
                    borderColor: "#a9805b",
                    fill: false,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: chartType === "pie" },
                    tooltip: {
                        callbacks: {
                            label: ctx => `$${ctx.raw.toLocaleString()}`
                        }
                    }
                },
                scales: chartType === "pie" ? {} : {
                    x: { ticks: { font: { size: 14 } } },
                    y: { ticks: { font: { size: 14 } } }
                }
            }
        };

        window.chartInstance = new Chart(ctx, config);
    };

    React.useEffect(() => {
        if (results.length > 0) {
            drawChart(results);
        }
    }, [results, chartType]);


    const getTopProductName = () =>
        results.length ? results.reduce((a, b) => (a.revenue > b.revenue ? a : b)).name : "";

    const getCategorySubtotals = () => {
        const subtotals = {};
        results.forEach(p => {
            if (!subtotals[p.category]) subtotals[p.category] = { quantity: 0, revenue: 0 };
            subtotals[p.category].quantity += p.quantity;
            subtotals[p.category].revenue += p.revenue;
        });
        return subtotals;
    };

    return React.createElement(Page, { title: "銷售統計" }, [
        // 查詢區
        React.createElement("div", {
            style: { background: "#fff9eb", padding: "20px", borderRadius: "10px", marginBottom: "20px" }
          }, [
            React.createElement("label", { style: { marginRight: "10px", fontSize: "22px" } }, "時間區間："),
            React.createElement("select", {
              value: dateRange,
              onChange: e => setDateRange(e.target.value),
              style: { fontSize: "18px", padding: "6px", marginRight: "40px", borderRadius: "6px" }
            }, [
              React.createElement("option", { value: "today" }, "今日"),
              React.createElement("option", { value: "yesterday" }, "昨日"),
              React.createElement("option", { value: "last7" }, "近7日"),
              React.createElement("option", { value: "thisMonth" }, "當月"),
              React.createElement("option", { value: "lastMonth" }, "上個月"),
              React.createElement("option", { value: "custom" }, "自選")
            ]),
          
            ...(dateRange === "custom" ? [
              React.createElement("div", { style: { marginTop: "10px", marginBottom: "10px" } }, [
                React.createElement("input", {
                  type: "date",
                  value: startDate,
                  onChange: e => setStartDate(e.target.value),
                  style: {
                    marginRight: "10px",
                    fontSize: "18px",
                    padding: "6px",
                    borderRadius: "5px"
                  }
                }),
                React.createElement("input", {
                  type: "date",
                  value: endDate,
                  min: startDate || undefined,
                  onChange: e => setEndDate(e.target.value),
                  style: {
                    fontSize: "18px",
                    padding: "6px",
                    borderRadius: "5px"
                  }
                })
              ])
            ] : []),
          
            React.createElement("label", { style: { marginRight: "10px", fontSize: "22px" } }, "種類："),
            React.createElement("select", {
              value: category,
              onChange: e => setCategory(e.target.value),
              style: {
                fontSize: "18px",
                padding: "6px",
                marginRight: "40px",
                borderRadius: "6px"
              }
            }, [
              React.createElement("option", { value: "all" }, "全部"),
              React.createElement("option", { value: "牛軋餅" }, "牛軋餅"),
              React.createElement("option", { value: "方塊酥" }, "方塊酥"),
              React.createElement("option", { value: "牛軋糖" }, "牛軋糖"),
              React.createElement("option", { value: "中式酥點" }, "中式酥點"),
              React.createElement("option", { value: "西式烘焙" }, "西式烘焙"),
              React.createElement("option", { value: "吐司" }, "吐司")
            ]),
          
            React.createElement("button", {
              onClick: handleSearch,
              style: {
                fontSize: "18px",
                padding: "6px 14px",
                backgroundColor: "#f58322",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }
            }, "查詢"),
          
            displayRange && React.createElement("p", {
              style: { marginTop: "16px", fontSize: "22px", color: "#555" }
            }, `📅 統計區間：${displayRange}`)
          ])
          ,

        // 圖表類型切換與圖表區塊
        results.length > 0 && React.createElement("div", {
            style: { marginBottom: "20px", background: "#fdf3e7", padding: "20px", borderRadius: "10px" }
        }, [
            React.createElement("div", { style: { marginBottom: "10px" } }, [
                React.createElement("strong", {}, "圖表類型："),
                ["bar", "line", "pie"].map(type =>
                    React.createElement("button", {
                        onClick: () => setChartType(type),
                        style: {
                            marginRight: "10px",
                            padding: "6px 10px",
                            backgroundColor: chartType === type ? "#f58322" : "#ccc",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px"
                        }
                    }, {
                        bar: "柱狀圖", line: "折線圖", pie: "圓餅圖"
                    }[type])
                )
            ]),
            React.createElement("div", {
                style: { width: "100%", height: "300px" }
            }, [
                React.createElement("canvas", { id: "salesChart" })
            ])
        ]),

        // 銷售表格
        results.length > 0 && React.createElement("div", {
            style: { background: "#fff", padding: "20px", borderRadius: "10px" }
        }, [
            React.createElement("h2", {}, `🔥 銷售冠軍：${getTopProductName()}`),
            React.createElement("table", { style: { width: "100%", borderCollapse: "collapse" } }, [
                React.createElement("thead", {}, React.createElement("tr", {}, [
                    "編號", "品名", "分類", "銷售數量", "銷售金額"
                ].map(t => React.createElement("th", { style: { padding: "8px", textAlign: "left" } }, t)))),
                React.createElement("tbody", {}, results.map((p, i) =>
                    React.createElement("tr", { key: i }, [
                        React.createElement("td", { style: { padding: "8px" } }, p.id),
                        React.createElement("td", { style: { padding: "8px" } }, p.name),
                        React.createElement("td", { style: { padding: "8px" } }, p.category),
                        React.createElement("td", { style: { padding: "8px" } }, p.quantity),
                        React.createElement("td", { style: { padding: "8px" } }, `$${p.revenue.toLocaleString()}`)
                    ])
                ))
            ]),

            // 類別小計
            React.createElement("div", {
                style: { marginTop: "20px", fontSize: "20px" }
            }, [
                React.createElement("h4", {}, "📦 類別小計"),
                ...Object.entries(getCategorySubtotals()).map(([cat, val]) =>
                    React.createElement("p", {}, `${cat}：共 ${val.quantity} 件，金額 $${val.revenue.toLocaleString()}`)
                )
            ])
        ])
    ]);
}

window.SalesProductPage = SalesProductPage;
