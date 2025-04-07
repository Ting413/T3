

function OrderHistory() {
  const [orders] = React.useState(generateOrders("history"));
  const [sortOption, setSortOption] = React.useState("orderDesc");

  const sorted = [...orders].sort((a, b) => {
    if (sortOption === "orderAsc") return a.id.localeCompare(b.id);
    if (sortOption === "orderDesc") return b.id.localeCompare(a.id);
    if (sortOption === "pickupAsc") return new Date(a.pickupTime) - new Date(b.pickupTime);
    if (sortOption === "pickupDesc") return new Date(b.pickupTime) - new Date(a.pickupTime);
    return 0;
  });

  return React.createElement(Page, { title: "📜 歷史訂單" }, [
    React.createElement("div", { style: { marginBottom: "20px" } }, [
      React.createElement("label", {}, "排序："),
      React.createElement("select", {
        value: sortOption,
        onChange: e => setSortOption(e.target.value),
        style: { margin: "0 10px" }
      }, [
        { value: "orderDesc", label: "下單最新→最舊" },
        { value: "orderAsc", label: "下單最舊→最新" },
        { value: "pickupAsc", label: "取貨近期→遠期" },
        { value: "pickupDesc", label: "取貨遠期→近期" }
      ].map(opt =>
        React.createElement("option", { key: opt.value, value: opt.value }, opt.label)
      ))
    ]),
    ...sorted.map((o, i) =>
      React.createElement("div", {
        key: o.id,
        style: {
          backgroundColor: "#fdf3e7",
          marginBottom: "16px",
          padding: "16px",
          borderRadius: "10px",
          border: "1px solid #ddd"
        }
      }, [
        React.createElement("h3", {}, `訂單編號：${o.id}`),
        React.createElement("p", {}, `下單時間：${o.orderTime}`),
        React.createElement("p", {}, `取貨時間：${o.pickupTime}`),
        React.createElement("p", {}, `姓名：${o.name}`),
        React.createElement("p", {}, `信箱：${o.email}`),
        React.createElement("p", {}, `電話：${o.phone}`),
        React.createElement("p", {}, `付款方式：${o.method}`),
        React.createElement("ul", {}, o.items.map((item, idx) =>
          React.createElement("li", { key: idx }, `${item.name} x ${item.qty}`)
        )),
        React.createElement("strong", {}, `總金額：$${o.total}`)
      ])
    )
  ]);
}

window.OrderHistory = OrderHistory;
