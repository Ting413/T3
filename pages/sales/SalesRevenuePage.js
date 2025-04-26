
function SalesRevenuePage() {
  const [mode, setMode] = React.useState("month");
  const [chartData, setChartData] = React.useState({ total: 0, data: [] });
  const [selectedMonth, setSelectedMonth] = React.useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
  });
  const [chartType, setChartType] = React.useState("line");

  React.useEffect(() => {
    generateChartData();
  }, [mode, selectedMonth]);

  React.useEffect(() => {
    if (chartData && chartData.data.length > 0) drawChart(chartData);
  }, [chartData, chartType]);

  const generateChartData = () => {
    const data = [];
    let total = 0;

    if (mode === "month") {
      const [year, month] = selectedMonth.split("-").map(Number);
      const daysInMonth = new Date(year, month, 0).getDate();
      for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month - 1, i);
        const weekday = date.toLocaleDateString("zh-TW", { weekday: "short" });
        const amount = Math.floor(Math.random() * 5000 + 3000);
        total += amount;
        data.push({ day: String(i).padStart(2, "0"), weekday, amount });
      }
    } else if (mode === "quarter") {
      const quarters = ["01~03", "04~06", "07~09", "10~12"];
      for (let i = 0; i < 4; i++) {
        const current = Math.floor(Math.random() * 100000 + 80000);
        const previous = Math.random() > 0.2 ? Math.floor(current * (Math.random() * 0.4 + 0.7)) : null;
        total += current;
        data.push({ label: quarters[i], current, previous });
      }
    } else if (mode === "year") {
      for (let i = 0; i < 12; i++) {
        const current = Math.floor(Math.random() * 80000 + 60000);
        const previous = Math.random() > 0.2 ? Math.floor(current * (Math.random() * 0.4 + 0.7)) : null;
        total += current;
        data.push({ label: `${i + 1}月`, current, previous });
      }
    }

    setChartData({ total, data });
  };

  const drawChart = ({ data }) => {
    const canvas = document.getElementById("chartCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (window.chartInstance) window.chartInstance.destroy();

    const labels = mode === "month" ? data.map(d => d.day) : data.map(d => d.label);
    const currentData = mode === "month" ? data.map(d => d.amount) : data.map(d => d.current);
    const previousData = mode !== "month" ? data.map(d => d.previous ?? null) : null;

    window.chartInstance = new Chart(ctx, {
      type: chartType,
      data: {
        labels,
        datasets: [
          {
            label: "本期營收",
            data: currentData,
            backgroundColor: "#f58322",
            borderColor: "#f58322",
            fill: false,
            tension: 0.4
          },
          ...(previousData ? [{
            label: "同期營收",
            data: previousData,
            backgroundColor: "#a9805b",
            borderColor: "#a9805b",
            fill: false,
            tension: 0.4
          }] : [])
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { font: { size: 14 } }
          }
        }
      }
    });
  };

  const renderDetailTable = () => {
    if (mode === "month") return renderMonthTable();
    return renderComparisonTable();
  };

  const renderMonthTable = () => (
    React.createElement("div", {
      style: {
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        fontSize: "18px",
        marginBottom: "20px"
      }
    }, [
      React.createElement("h3", { style: { marginBottom: "10px" } }, "📅 營收明細"),
      React.createElement("table", { style: { width: "100%", borderCollapse: "collapse" } }, [
        React.createElement("thead", {}, React.createElement("tr", {}, [
          React.createElement("th", { style: { textAlign: "left", padding: "8px" } }, "日期"),
          React.createElement("th", { style: { textAlign: "left", padding: "8px" } }, "星期"),
          React.createElement("th", { style: { textAlign: "left", padding: "8px" } }, "金額")
        ])),
        React.createElement("tbody", {}, chartData.data.map((row, i) =>
          React.createElement("tr", { key: i }, [
            React.createElement("td", { style: { padding: "8px" } }, row.day),
            React.createElement("td", { style: { padding: "8px" } }, row.weekday),
            React.createElement("td", { style: { padding: "8px" } }, `$${row.amount.toLocaleString()}`)
          ])
        ))
      ])
    ])
  );

  const renderComparisonTable = () => (
    React.createElement("div", {
      style: {
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        fontSize: "18px",
        marginBottom: "20px"
      }
    }, [
      React.createElement("h3", { style: { marginBottom: "10px" } }, "📅 營收明細"),
      React.createElement("table", { style: { width: "100%", borderCollapse: "collapse" } }, [
        React.createElement("thead", {}, React.createElement("tr", {}, [
          React.createElement("th", { style: { textAlign: "left", padding: "8px" } }, "月份"),
          React.createElement("th", { style: { textAlign: "left", padding: "8px" } }, "金額"),
          React.createElement("th", { style: { textAlign: "left", padding: "8px" } }, "前一年同期")
        ])),
        React.createElement("tbody", {}, chartData.data.map((item, idx) => {
          const increase = item.previous != null && item.current > item.previous;
          const decrease = item.previous != null && item.current < item.previous;
          const color = item.previous == null ? "black" : increase ? "green" : decrease ? "red" : "black";
          const arrow = increase ? " ▲" : decrease ? " ▼" : "";
          return React.createElement("tr", { key: idx }, [
            React.createElement("td", { style: { padding: "8px" } }, item.label),
            React.createElement("td", { style: { padding: "8px", color } }, item.previous == null ? "-" : `$${item.current.toLocaleString()}${arrow}`),
            React.createElement("td", { style: { padding: "8px", color: "black" } }, item.previous == null ? "-" : `$${item.previous.toLocaleString()}`)
          ]);
        }))
      ])
    ])
  );

  return React.createElement(Page, { title: "營收統計" }, [
    React.createElement("div", {
      style: {
        background: "#fff9eb",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px"
      }
    }, [
      React.createElement("label", {
        style: { fontSize: "20px", marginRight: "10px" }
      }, "選擇統計方式："),

      React.createElement("select", {
        value: mode,
        onChange: e => setMode(e.target.value),
        style: {
          fontSize: "18px",
          padding: "6px",
          borderRadius: "6px",
          marginRight: "10px"
        }
      }, [
        React.createElement("option", { value: "month" }, "月營收"),
        React.createElement("option", { value: "quarter" }, "季營收"),
        React.createElement("option", { value: "year" }, "年營收")
      ]),

      mode === "month" && React.createElement("input", {
        type: "month",
        value: selectedMonth,
        onChange: e => setSelectedMonth(e.target.value),
        style: { fontSize: "18px", padding: "6px", borderRadius: "6px" }
      })
    ]),

    React.createElement("div", {
      style: {
        background: "#fdf3e7",
        padding: "20px",
        borderRadius: "10px",
        fontSize: "24px",
        marginBottom: "20px"
      }
    }, [
      React.createElement("h3", { style: { marginBottom: "10px" } }, "💰 總營收"),
      React.createElement("p", {}, `$${chartData.total.toLocaleString()}`),

      React.createElement("div", {
        style: { marginTop: "20px", display: "flex", alignItems: "center", gap: "10px" }
      }, [
        React.createElement("strong", {}, "圖表類型："),
        React.createElement("button", {
          onClick: () => setChartType("line"),
          style: {
            fontSize: "16px",
            padding: "6px 10px",
            backgroundColor: chartType === "line" ? "#f58322" : "#ccc",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }
        }, "折線圖"),
        React.createElement("button", {
          onClick: () => setChartType("bar"),
          style: {
            fontSize: "16px",
            padding: "6px 10px",
            backgroundColor: chartType === "bar" ? "#f58322" : "#ccc",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }
        }, "柱狀圖")
      ]),

      React.createElement("div", {
        style: {
          marginTop: "20px",
          height: "300px",
          position: "relative"
        }
      }, [
        React.createElement("div", {
  style: {
    maxWidth: "100%",
    overflowX: "auto",
    textAlign: "center"
  }
}, [
  React.createElement("canvas", {
    id: "chartCanvas",
    style: {
      maxWidth: "100%",
      height: "auto"
    }
  })
])

      ])
    ]),

    renderDetailTable()
  ]);
}

window.SalesRevenuePage = SalesRevenuePage;
