const React = window.React;
const ReactDOM = window.ReactDOM;
const {
  HashRouter,
  Route,
  Switch
} = window.ReactRouterDOM;

// 匯入元件（全部都使用相對路徑）
import Sidebar from "./layout/Sidebar.js";
import Page from "./components/Page.js";

import ProductsPage from "./pages/ProductsPage.js";
import OrdersPage from "./pages/OrdersPage.js";
import MembersPage from "./pages/MembersPage.js";
import PromotionsPage from "./pages/PromotionsPage.js";
import ExportPage from "./pages/ExportPage.js";
import RevenuePage from "./pages/RevenuePage.js";
import CalendarPage from "./pages/CalendarPage.js";

// 銷售子頁面
import SalesPage from "./pages/sales/SalesPage.js";
import SalesOverviewPage from "./pages/sales/SalesOverviewPage.js";
import SalesRevenuePage from "./pages/sales/SalesRevenuePage.js";
import SalesProductPage from "./pages/sales/SalesProductPage.js";

// App 主結構
function App() {
  return React.createElement(HashRouter, null,
    React.createElement("div", { className: "container" }, [
      React.createElement(Sidebar, null),
      React.createElement(Switch, null, [
        React.createElement(Route, { path: "/products", component: ProductsPage }),
        React.createElement(Route, { path: "/orders", component: OrdersPage }),
        React.createElement(Route, { path: "/members", component: MembersPage }),
        React.createElement(Route, { path: "/promotions", component: PromotionsPage }),
        React.createElement(Route, { path: "/export", component: ExportPage }),
        React.createElement(Route, { path: "/revenue", component: RevenuePage }),
        React.createElement(Route, { path: "/calendar", component: CalendarPage }),

        // 加入 Sales 各子功能頁
        React.createElement(Route, { path: "/sales", exact: true, component: SalesPage }),
        React.createElement(Route, { path: "/sales/overview", component: SalesOverviewPage }),
        React.createElement(Route, { path: "/sales/revenue", component: SalesRevenuePage }),
        React.createElement(Route, { path: "/sales/product", component: SalesProductPage }),

        React.createElement(Route, {
          path: "/", exact: true,
          render: () => React.createElement(Page, { title: "歡迎使用商家管理系統" },
            React.createElement("p", {}, "請使用左側選單切換功能"))
        })
      ])
    ])
  );
}

// 掛載到 DOM
const root = document.getElementById("root");
ReactDOM.render(React.createElement(App), root);
