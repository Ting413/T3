function Sidebar() {
  const { Link } = window.ReactRouterDOM; // ← 加上這行
  const [showSalesMenu, setShowSalesMenu] = React.useState(false);
  const [showOrdersMenu, setShowOrdersMenu] = React.useState(false);

  const toggleSalesMenu = (e) => {
    e.stopPropagation();
    setShowSalesMenu(prev => !prev);
  };
  const toggleOrdersMenu = (e) => {
    e.stopPropagation();
    setShowOrdersMenu(prev => !prev);
  };

  return React.createElement("div", {
    className: "sidebar",
    style: {
      overflowY: "auto",
      maxHeight: "100vh",
      paddingRight: "8px",
      scrollbarWidth: "thin",
      scrollbarColor: "#ccc transparent"
    }
  }, [
    React.createElement("style", {}, `
        .sidebar::-webkit-scrollbar {
          width: 6px;
        }
        .sidebar::-webkit-scrollbar-thumb {
          background-color: #ccc;
          border-radius: 3px;
        }
        .sidebar::-webkit-scrollbar-track {
          background-color: transparent;
        }
      `),

    React.createElement("h2", {}, "商家管理"),
    React.createElement("nav", {}, [
      React.createElement(Link, { to: "/revenue" }, "營收統計"),

      // 銷售趨勢
      React.createElement("div", {}, [
        React.createElement("div", {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingRight: "6px"
          }
        }, [
          React.createElement(Link, {
            to: "/sales",
            style: { flexGrow: 1, color: "white", textDecoration: "none" }
          }, "銷售趨勢"),
          React.createElement("span", {
            onClick: toggleSalesMenu,
            style: {
              cursor: "pointer",
              transition: "transform 0.2s",
              transform: showSalesMenu ? "rotate(180deg)" : "rotate(0deg)"
            }
          }, "▼")
        ]),
        showSalesMenu && React.createElement("div", {
          style: { paddingLeft: "12px", marginTop: "6px" }
        }, [
          React.createElement(Link, {
            to: "/sales/overview",
            style: { display: "block", margin: "4px 0", color: "white" }
          }, "📊 營收總匯"),
          React.createElement(Link, {
            to: "/sales/revenue",
            style: { display: "block", margin: "4px 0", color: "white" }
          }, "📈 營收統計"),
          React.createElement(Link, {
            to: "/sales/product",
            style: { display: "block", margin: "4px 0", color: "white" }
          }, "📦 銷售統計")
        ])
      ]),

      // 訂單管理
      React.createElement("div", {}, [
        React.createElement("div", {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingRight: "6px"
          }
        }, [
          React.createElement(Link, {
            to: "/orders",
            style: { flexGrow: 1, color: "white", textDecoration: "none" }
          }, "訂單管理"),
          React.createElement("span", {
            onClick: toggleOrdersMenu,
            style: {
              cursor: "pointer",
              transition: "transform 0.2s",
              transform: showOrdersMenu ? "rotate(180deg)" : "rotate(0deg)"
            }
          }, "▼")
        ]),
        showOrdersMenu && React.createElement("div", {
          style: { paddingLeft: "12px", marginTop: "6px" }
        }, [
          React.createElement(Link, {
            to: "/orders/pending",
            style: { display: "block", margin: "4px 0", color: "white" }
          }, "📤 待出貨"),
          React.createElement(Link, {
            to: "/orders/history",
            style: { display: "block", margin: "4px 0", color: "white" }
          }, "🧾 歷史訂單")
        ])
      ]),

      React.createElement(Link, { to: "/members" }, "會員管理"),
      React.createElement(Link, { to: "/products" }, "商品管理"),
      React.createElement(Link, { to: "/promotions" }, "促銷活動"),
      React.createElement(Link, { to: "/export" }, "報表匯出"),
      React.createElement(Link, { to: "/calendar" }, "行事曆")
    ])
  ]);
}

export default Sidebar;