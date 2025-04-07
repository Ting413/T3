

function PendingOrders() {
  const [orders, setOrders] = React.useState(generateOrders("pending"));
  const [sortOption, setSortOption] = React.useState("orderDesc");
  const [statusFilter, setStatusFilter] = React.useState("全部");
  const [selectedOrders, setSelectedOrders] = React.useState([]);

  const statusList = ["全部", "待確認", "製作中", "可取貨"];

  const updateStatus = (id, newStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const handleBatchUpdate = (newStatus) => {
    setOrders(prev =>
      prev.map(o =>
        selectedOrders.includes(o.id) ? { ...o, status: newStatus } : o
      )
    );
    setSelectedOrders([]);
  };

  const filtered = orders.filter(o =>
    statusFilter === "全部" || o.status === statusFilter
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortOption === "orderAsc") return a.id.localeCompare(b.id);
    if (sortOption === "orderDesc") return b.id.localeCompare(a.id);
    if (sortOption === "pickupAsc") return new Date(a.pickupTime) - new Date(b.pickupTime);
    if (sortOption === "pickupDesc") return new Date(b.pickupTime) - new Date(a.pickupTime);
    return 0;
  });

  return React.createElement(Page, { title: "📦 待出貨訂單" }, [
    React.createElement("div", { style: { marginBottom: "20px" } }, [
      React.createElement("label", {}, "狀態篩選："),
      React.createElement("select", {
        value: statusFilter,
        onChange: e => setStatusFilter(e.target.value),
        style: { margin: "0 10px" }
      }, statusList.map(s => React.createElement("option", { key: s }, s))),
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
      )),
      selectedOrders.length > 0 && React.createElement("div", {
        style: { display: "inline-block", marginLeft: "20px" }
      }, [
        React.createElement("span", {}, "批次狀態變更："),
        ["待確認", "製作中", "可取貨", "已取貨"].map(s =>
          React.createElement("button", {
            key: s,
            onClick: () => handleBatchUpdate(s),
            style: {
              marginLeft: "5px",
              padding: "4px 8px",
              backgroundColor: "#fdf3e7",
              color: "#fff",
              border: "none",
              borderRadius: "4px"
            }
          }, s)
        )
      ])
    ]),

    ...sorted.map(o =>
      React.createElement("div", {
        key: o.id,
        style: {
          background: "#fdf3e7",
          padding: "16px",
          marginBottom: "16px",
          border: "1px solid #ccc",
          borderRadius: "10px"
        }
      }, [
        React.createElement("input", {
          type: "checkbox",
          checked: selectedOrders.includes(o.id),
          onChange: e => {
            const checked = e.target.checked;
            setSelectedOrders(prev =>
              checked ? [...prev, o.id] : prev.filter(id => id !== o.id)
            );
          },
          style: { marginRight: "10px" }
        }),
        React.createElement("h3", {}, `訂單編號：${o.id}`),
        React.createElement("p", {}, `下單時間：${o.orderTime}`),
        React.createElement("p", {}, `取貨時間：${o.pickupTime}`),
        React.createElement("p", {}, `姓名：${o.name}`),
        React.createElement("p", {}, `信箱：${o.email}`),
        React.createElement("p", {}, `電話：${o.phone}`),
        React.createElement("p", {}, `付款方式：${o.method}`),
        React.createElement("p", {}, "狀態："),
        React.createElement("select", {
          value: o.status,
          onChange: e => updateStatus(o.id, e.target.value)
        }, ["待確認", "製作中", "可取貨", "已取貨"].map(s =>
          React.createElement("option", { key: s, value: s }, s)
        )),
        React.createElement("ul", {}, o.items.map((item, idx) =>
          React.createElement("li", { key: idx }, `${item.name} x ${item.qty}`)
        )),
        React.createElement("strong", {}, `總金額：$${o.total}`)
      ])
    )
  ]);
}

window.PendingOrders = PendingOrders;
