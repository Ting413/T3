
function App() {
  return React.createElement(window.ReactRouterDOM.HashRouter, null,
    React.createElement("div", { className: "container" }, [
      React.createElement(window.Sidebar),
      React.createElement(window.ReactRouterDOM.Switch, null, [
        React.createElement(window.ReactRouterDOM.Route, { path: "/products", component: window.ProductsPage }),
        React.createElement(window.ReactRouterDOM.Route, { path: "/members", component: window.MembersPage }),
        React.createElement(window.ReactRouterDOM.Route, { path: "/promotions", component: window.PromotionsPage }),
        React.createElement(window.ReactRouterDOM.Route, { path: "/export", component: window.ExportPage }),
        React.createElement(window.ReactRouterDOM.Route, { path: "/revenue", component: window.RevenuePage }),
        React.createElement(window.ReactRouterDOM.Route, { path: "/calendar", component: window.CalendarPage }),

        React.createElement(window.ReactRouterDOM.Route, { path: "/sales/overview", component: window.SalesOverviewPage }),
        React.createElement(window.ReactRouterDOM.Route, { path: "/sales/revenue", component: window.SalesRevenuePage }),
        React.createElement(window.ReactRouterDOM.Route, { path: "/sales/product", component: window.SalesProductPage }),

        React.createElement(window.ReactRouterDOM.Route, { path: "/orders/pending", component: window.PendingOrders }),
        React.createElement(window.ReactRouterDOM.Route, { path: "/orders/history", component: window.OrderHistory }),

        React.createElement(window.ReactRouterDOM.Route, {
          path: "/", exact: true,
          component: () => React.createElement(window.Page, { title: "歡迎使用商家管理系統" },
            React.createElement("p", null, "請使用左側選單切換功能"))
        })
      ])
    ])
  );
}

const root = document.getElementById("root");
window.ReactDOM.render(window.React.createElement(App), root);
