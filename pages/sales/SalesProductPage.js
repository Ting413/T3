import Page from "../../components/Page.js";  // 如果是 /sales/ 資料夾

function SalesProductPage() {
    return React.createElement(Page, { title: "銷售統計" }, [
        React.createElement("p", {}, "此處顯示銷售統計內容...")
    ]);
}

export default SalesProductPage;