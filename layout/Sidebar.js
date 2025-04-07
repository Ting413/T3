function Sidebar() {
  const { Link } = window.ReactRouterDOM;
  const [showSalesMenu, setShowSalesMenu] = React.useState(false);
  const [showOrdersMenu, setShowOrdersMenu] = React.useState(false);
  const [showMembersMenu, setShowMembersMenu] = React.useState(false);

  const toggleSalesMenu = () => setShowSalesMenu(prev => !prev);
  const toggleOrdersMenu = () => setShowOrdersMenu(prev => !prev);
  const toggleMembersMenu = () => setShowMembersMenu(prev => !prev);

  const menuItemStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    padding: "10px 0",
    color: "white",
    fontSize: "20px",
    transition: "background 0.3s",
  };

  const linkStyle = {
    display: "block",
    padding: "10px 0",
    color: "white",
    textDecoration: "none",
    fontSize: "18px"
  };

  return React.createElement("div", {
    className: "sidebar",
    style: {
      overflowY: "auto",
      maxHeight: "100vh",
      paddingRight: "8px",
      scrollbarWidth: "thin",
      scrollbarColor: "#ccc transparent",
      fontSize: "20px"
    }
  }, [
    React.createElement("style", {}, `
      .sidebar::-webkit-scrollbar { width: 6px; }
      .sidebar::-webkit-scrollbar-thumb { background-color: #ccc; border-radius: 3px; }
      .sidebar::-webkit-scrollbar-track { background-color: transparent; }
    `),

    React.createElement("h2", { style: { fontSize: "28px", marginBottom: "20px", color: "#debd94" } }, "商家管理"),

    React.createElement("nav", {}, [
      React.createElement(Link, { to: "/calendar", style: linkStyle }, "🗓️ 行事曆"),
      React.createElement(Link, { to: "/revenue", style: linkStyle }, "💻 業績總攬"),

      React.createElement("div", {}, [
        React.createElement("div", { onClick: toggleSalesMenu, style: menuItemStyle }, [
          React.createElement("span", {}, "📈 銷售趨勢"),
          React.createElement("span", {
            style: {
              transition: "transform 0.2s",
              transform: showSalesMenu ? "rotate(180deg)" : "rotate(0deg)"
            }
          }, "▼")
        ]),
        showSalesMenu && React.createElement("div", {
          style: {
            paddingLeft: "20px",
            transition: "all 0.3s ease"
          }
        }, [
          React.createElement(Link, { to: "/sales/overview", style: linkStyle }, "📊 營收總匯"),
          React.createElement(Link, { to: "/sales/revenue", style: linkStyle }, "📑 營收統計"),
          React.createElement(Link, { to: "/sales/product", style: linkStyle }, "🏷️ 銷售統計")
        ])
      ]),

      React.createElement("div", {}, [
        React.createElement("div", { onClick: toggleOrdersMenu, style: menuItemStyle }, [
          React.createElement("span", {}, "🧾 訂單管理"),
          React.createElement("span", {
            style: {
              transition: "transform 0.2s",
              transform: showOrdersMenu ? "rotate(180deg)" : "rotate(0deg)"
            }
          }, "▼")
        ]),
        showOrdersMenu && React.createElement("div", {
          style: {
            paddingLeft: "20px",
            transition: "all 0.3s ease"
          }
        }, [
          React.createElement(Link, { to: "/orders/pending", style: linkStyle }, "📦 待出貨"),
          React.createElement(Link, { to: "/orders/history", style: linkStyle }, "📜 歷史訂單"),

        ])
      ]),

      React.createElement("div", {}, [
        React.createElement("div", { onClick: toggleMembersMenu, style: menuItemStyle }, [
          React.createElement("span", {}, "👥 會員管理"),
          React.createElement("span", {
            style: {
              transition: "transform 0.2s",
              transform: showMembersMenu ? "rotate(180deg)" : "rotate(0deg)"
            }
          }, "▼")
        ]),
        showMembersMenu && React.createElement("div", {
          style: {
            paddingLeft: "20px",
            transition: "all 0.3s ease"
          }
        }, [
          React.createElement(Link, { to: "/members", style: linkStyle }, "👤 會員列表")
        ])
      ]),

      React.createElement(Link, { to: "/products", style: linkStyle }, "🛒 商品管理"),
      React.createElement(Link, { to: "/promotions", style: linkStyle }, "🎁 促銷活動")
      //React.createElement(Link, { to: "/export", style: linkStyle }, "📤 報表匯出"),
    ])
  ]);
}

window.Sidebar = Sidebar;
