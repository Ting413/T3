import Page from "../../components/Page.js";

function ExportPage() {
    return React.createElement(Page, { title: "報表匯出" }, [
        React.createElement("p", {}, "模擬產生報表資料（CSV / Excel 格式）"),
        React.createElement("button", { className: "btn" }, "下載報表")
    ]);
}

export default ExportPage;