
function SalesOverviewPage() {
  const [dateRange, setDateRange] = React.useState("today");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [summary, setSummary] = React.useState(null);
  const [rangeDisplay, setRangeDisplay] = React.useState("");

  const formatDisplayDate = (dateStr) => {
    const date = new Date(dateStr);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}/${mm}/${dd}`;
  };

  const getDateRangeDisplay = () => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    switch (dateRange) {
      case "today":
        return formatDisplayDate(today.toISOString());
      case "yesterday":
        return formatDisplayDate(yesterday.toISOString());
      case "last7":
        const d7 = new Date();
        d7.setDate(today.getDate() - 6);
        return `${formatDisplayDate(d7.toISOString())} ~ ${formatDisplayDate(today.toISOString())}`;
      case "thisMonth":
        const start = new Date(today.getFullYear(), today.getMonth(), 1);
        return `${formatDisplayDate(start.toISOString())} ~ ${formatDisplayDate(today.toISOString())}`;
      case "lastMonth":
        const startLM = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const endLM = new Date(today.getFullYear(), today.getMonth(), 0);
        return `${formatDisplayDate(startLM.toISOString())} ~ ${formatDisplayDate(endLM.toISOString())}`;
      case "custom":
        if (!startDate || !endDate) return "";
        return `${formatDisplayDate(startDate)} ~ ${formatDisplayDate(endDate)}`;
      default:
        return "";
    }
  };

  const getDateCount = () => {
    const today = new Date();
    let start, end;

    switch (dateRange) {
      case "today":
      case "yesterday":
        return 1;
      case "last7":
        return 7;
      case "thisMonth":
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        end = today;
        break;
      case "lastMonth":
        start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        end = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      case "custom":
        if (!startDate || !endDate) return 0;
        start = new Date(startDate);
        end = new Date(endDate);
        break;
    }

    if (start && end) {
      const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
      return Math.max(diff, 1);
    }
    return 1;
  };

  const generateFakeData = () => {
    const days = getDateCount();
    const orders = days * 10;
    const itemsSold = orders * (Math.floor(Math.random() * 2) + 1);
    const sales = Math.floor(Math.random() * 10000 + 5000) * days;
    const discount = Math.floor(sales * 0.15);
    const received = sales - discount;

    const paymentMethods = {
      "信用卡": Math.floor(received * 0.4),
      "Line Pay": Math.floor(received * 0.3),
      "貨到付款": Math.floor(received * 0.25),
      "禮券折讓": received - Math.floor(received * 0.4) - Math.floor(received * 0.3) - Math.floor(received * 0.25)
    };

    setSummary({
      sales,
      discount,
      received,
      orders,
      itemsSold,
      avgPerOrder: Math.round(received / orders),
      avgItemsPerOrder: Math.round(itemsSold / orders * 10) / 10,
      paymentMethods
    });

    setRangeDisplay(getDateRangeDisplay());
  };

  const handleQuery = () => {
    if (dateRange === "custom") {
      if (!startDate || !endDate) {
        alert("請選擇起始與結束日期");
        return;
      }
      if (new Date(endDate) < new Date(startDate)) {
        alert("結束日期不能早於起始日期");
        return;
      }
    }
    generateFakeData();
  };

  return React.createElement(Page, { title: "營收總匯" }, [
    React.createElement("div", {
      style: { background: "#fff9eb", padding: "20px", borderRadius: "10px", marginBottom: "20px" }
    }, [
      React.createElement("label", { style: { fontSize: "20px", marginRight: "10px" } }, "選擇區間："),
      React.createElement("select", {
        value: dateRange,
        onChange: e => setDateRange(e.target.value),
        style: { fontSize: "20px", padding: "6px", marginRight: "10px", borderRadius: "5px" }
      }, [
        React.createElement("option", { value: "today" }, "今日"),
        React.createElement("option", { value: "yesterday" }, "昨日"),
        React.createElement("option", { value: "last7" }, "近7日"),
        React.createElement("option", { value: "thisMonth" }, "當月"),
        React.createElement("option", { value: "lastMonth" }, "上個月"),
        React.createElement("option", { value: "custom" }, "自選")
      ]),
      dateRange === "custom" && React.createElement("div", {
        style: { marginTop: "10px", marginBottom: "10px" }
      }, [
        React.createElement("input", {
          type: "date",
          value: startDate,
          onChange: e => setStartDate(e.target.value),
          style: { marginRight: "10px", padding: "6px", fontSize: "20px" }
        }),
        React.createElement("input", {
          type: "date",
          value: endDate,
          onChange: e => setEndDate(e.target.value),
          style: { padding: "6px", fontSize: "20px" },
          min: startDate || undefined
        })
      ]),
      React.createElement("button", {
        className: "btn",
        onClick: handleQuery,
        style: {
          fontSize: "20px",
          padding: "6px 14px",
          backgroundColor: "#f58322",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }
      }, "查詢")
    ]),

    summary && React.createElement("div", {
      style: { background: "#fdf3e7", padding: "20px", borderRadius: "10px", fontSize: "24px" }
    }, [
      React.createElement("h3", { style: { marginBottom: "10px" } }, "📅 統計區間"),
      React.createElement("p", {}, rangeDisplay),

      React.createElement("h3", { style: { marginTop: "60px" } }, "💰 營收資訊"),
      React.createElement("p", {}, `銷售金額：$${summary.sales}`),
      React.createElement("p", {}, `折讓金額：$${summary.discount}`),
      React.createElement("p", {}, `實收金額：$${summary.received}`),

      React.createElement("h3", { style: { marginTop: "50px" } }, "📊 統計資訊"),
      React.createElement("p", {}, `訂單數：${summary.orders} 筆`),
      React.createElement("p", {}, `銷售商品數：${summary.itemsSold} 件`),
      React.createElement("p", {}, `平均每單金額：$${summary.avgPerOrder}`),
      React.createElement("p", {}, `平均每單商品數：${summary.avgItemsPerOrder} 件`),

      React.createElement("h3", { style: { marginTop: "50px" } }, "💳 付款方式統計"),
      ...Object.entries(summary.paymentMethods).map(([method, amount], i) =>
        React.createElement("p", { key: i }, `${method}：$${amount}`)
      )
    ])
  ]);
}

window.SalesOverviewPage = SalesOverviewPage;
