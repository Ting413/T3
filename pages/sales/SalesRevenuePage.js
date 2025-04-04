import Page from "../../components/Page.js";  // 如果是 /sales/ 資料夾

function SalesRevenuePage() {
    return React.createElement(Page, { title: "營收統計" }, [
        React.createElement("p", {}, "此處顯示營收統計內容...")
    ]);
}

export default SalesRevenuePage;