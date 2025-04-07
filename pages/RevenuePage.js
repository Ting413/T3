
function RevenuePage() {
  const products = [
    { name: "牛軋餅原味", price: 120 },
    { name: "牛軋餅蔓越莓口味", price: 130 },
    { name: "牛軋餅抹茶味", price: 130 },
    { name: "牛軋餅咖啡味", price: 130 },
    { name: "方塊酥抹茶味", price: 110 },
    { name: "方塊酥咖啡味", price: 110 },
    { name: "夏威夷莓果Q糖", price: 150 },
    { name: "可可夏威夷Q糖", price: 150 },
    { name: "港式芝麻糊Q糖", price: 140 },
    { name: "草莓牛軋糖", price: 140 },
    { name: "棗泥蛋黃酥", price: 180 },
    { name: "月娘酥", price: 160 },
    { name: "台式馬卡龍", price: 100 },
    { name: "吐司", price: 60 },
    { name: "葡萄吐司", price: 70 },
    { name: "肉桂捲", price: 90 },
    { name: "瑪德蓮", price: 85 }
  ];

  const paymentMethods = ["信用卡", "LinePay", "貨到付款"];
  const todayStr = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = React.useState(todayStr);
  const [showDetails, setShowDetails] = React.useState(false);

  const generateOrdersForDate = (dateStr) => {
    const orders = [];
    for (let j = 0; j < 15; j++) {
      const items = [];
      const itemCount = Math.floor(Math.random() * 3) + 1;
      for (let k = 0; k < itemCount; k++) {
        const p = products[Math.floor(Math.random() * products.length)];
        items.push({ name: p.name, qty: Math.floor(Math.random() * 3) + 1, price: p.price });
      }
      orders.push({
        id: `${dateStr}-${j + 1}`,
        date: dateStr,
        method: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
        items
      });
    }
    return orders;
  };

  const [orders, setOrders] = React.useState(() => generateOrdersForDate(todayStr));

  React.useEffect(() => {
    setOrders(generateOrdersForDate(selectedDate));
  }, [selectedDate]);

  const filteredOrders = orders;
  const total = filteredOrders.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.qty * i.price, 0), 0);
  const avgOrder = filteredOrders.length ? Math.round(total / filteredOrders.length) : 0;

  const paymentDist = {};
  paymentMethods.forEach(method => (paymentDist[method] = 0));
  filteredOrders.forEach(o => (paymentDist[o.method] += o.items.reduce((s, i) => s + i.qty * i.price, 0)));

  React.useEffect(() => {
    const ctx = document.getElementById("paymentChart");
    if (!ctx) return;

    if (window.paymentChartInstance) {
      window.paymentChartInstance.destroy();
    }

    const chart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: paymentMethods,
        datasets: [{
          data: paymentMethods.map(m => paymentDist[m]),
          backgroundColor: ["#f9c066", "#f58322", "#debd94"]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: { font: { size: 14 } }
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const label = context.label;
                const value = context.raw;
                const percentage = total ? ((value / total) * 100).toFixed(1) : 0;
                return `${label}：$${value}（${percentage}%）`;
              }
            }
          },
          datalabels: {
            color: "#333",
            font: { size: 16, weight: "bold" },
            formatter: (value) => {
              const percent = total ? ((value / total) * 100).toFixed(1) : 0;
              return percent + "%";
            }
          }
        }
      },
      plugins: [ChartDataLabels]
    });

    window.paymentChartInstance = chart;

    return () => chart.destroy();
  }, [orders]);

  return React.createElement(Page, { title: "業績總攬" }, [
    React.createElement("div", {
      style: { background: "#fffbe6", padding: "20px", borderRadius: "10px", marginBottom: "20px" }
    }, [
      React.createElement("h2", { style: { fontSize: "28px", marginBottom: "10px" } }, "📅 選擇日期"),
      React.createElement("input", {
        type: "date",
        value: selectedDate,
        onChange: e => setSelectedDate(e.target.value),
        style: { fontSize: "20px", padding: "6px", borderRadius: "5px", border: "1px solid #ccc" }
      })
    ]),

    React.createElement("div", {
      style: { display: "flex", gap: "20px", marginBottom: "20px" }
    }, [
      React.createElement("div", {
        style: {
          backgroundColor: "#fdf3e7",
          padding: "16px",
          borderRadius: "10px",
          flex: "0 0 30%"
        }
      }, [
        React.createElement("h3", { style: { fontSize: "28px" } }, `總營收：$${total}`),
        React.createElement("p", { style: { fontSize: "24px" } }, `訂單數：${filteredOrders.length} 筆`),
        React.createElement("p", { style: { fontSize: "24px" } }, `平均每筆：$${avgOrder}`)
      ]),

      React.createElement("div", {
        style: {
          backgroundColor: "#fdf3e7",
          padding: "16px",
          borderRadius: "10px",
          flex: "0 0 65%",
          position: "relative",
          minHeight: "340px"
        }
      }, [
        React.createElement("h3", {
          style: {
            fontSize: "28px",
            marginBottom: "16px",
            textAlign: "start"
          }
        }, "付款方式分布"),

        React.createElement("div", {
          style: {
            position: "absolute",
            top: "60px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1,
            width: "80%",
            height: "80%"
          }
        }, [
          React.createElement("canvas", {
            id: "paymentChart",
            style: {
              width: "100%",
              height: "100%",
              objectFit: "contain"
            }
          })
        ]),

        React.createElement("ul", {
          style: {
            position: "absolute",
            bottom: "16px",
            left: "30px",
            zIndex: 0,
            borderRadius: "8px",
            padding: "8px 12px"
          }
        }, paymentMethods.map((m, i) =>
          React.createElement("li", {
            key: i,
            style: {
              fontSize: "20px",
              marginBottom: "6px",
              whiteSpace: "nowrap"
            }
          }, `${m}：$${paymentDist[m]}`)
        ))
      ])
    ]),

    React.createElement("button", {
      className: "btn",
      onClick: () => setShowDetails(!showDetails),
      style: { marginBottom: "16px", fontSize: "20px" }
    }, showDetails ? "隱藏訂單明細" : "顯示訂單明細"),

    showDetails && React.createElement("div", {
      style: { background: "#fff", borderRadius: "10px", padding: "16px", border: "1px solid #ccc" }
    }, filteredOrders.map((order, idx) =>
      React.createElement("div", { key: idx, style: { marginBottom: "12px", borderBottom: "1px solid #eee", paddingBottom: "10px" } }, [
        React.createElement("strong", {}, `訂單 ${order.id}`),
        React.createElement("p", {}, `付款方式：${order.method}`),
        React.createElement("ul", {}, order.items.map((item, i) =>
          React.createElement("li", { key: i }, `${item.name} x ${item.qty} ($${item.price})`)
        ))
      ])
    ))
  ]);
}

window.RevenuePage = RevenuePage;
