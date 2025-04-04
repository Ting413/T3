import Page from "../../components/Page.js";  // 如果是 /sales/ 資料夾

// 📊 銷售趨勢頁（掛載子路由）
function SalesOverviewPage() {
    return React.createElement(Page, { title: "營收總匯" }, [
        React.createElement("p", {}, "此處顯示營收總匯內容...")
    ]);
}

export default SalesOverviewPage;