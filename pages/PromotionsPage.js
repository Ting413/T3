import Page from "../../components/Page.js";

function PromotionsPage() {
    
    const [promoList, setPromoList] = React.useState([
        {
            code: "SPRING20",
            discount: 20,
            type: "percent",
            description: "春季折扣 8 折",
            start: "2025-04-01",
            end: "2025-04-30",
            minSpend: 500,
            products: "可頌,吐司",
            repeatable: false,
            target: "ALL"
        },
        {
            code: "HBDTOYOU",
            discount: 40,
            type: "percent",
            description: "生日當月限定優惠 6 折（滿 100 元）",
            start: "2025-04-01",
            end: "2025-04-30",
            minSpend: 100,
            products: "",
            repeatable: false,
            target: "BIRTHDAY"
        }
    ]);

    const [form, setForm] = React.useState({
        code: "", discount: "", type: "percent", description: "", start: "", end: "",
        minSpend: "", products: "", repeatable: false, target: "ALL"
    });

    function addPromo() {
        if (!form.code || !form.discount || !form.start || !form.end) {
            alert("請填寫完整資訊！");
            return;
        }
        setPromoList([...promoList, form]);
        setForm({ code: "", discount: "", type: "percent", description: "", start: "", end: "", minSpend: "", products: "", repeatable: false, target: "ALL" });
    }

    function deletePromo(code) {
        setPromoList(promoList.filter(p => p.code !== code));
    }

    function getStatus(promo) {
        const today = new Date();
        const start = new Date(promo.start);
        const end = new Date(promo.end);
        if (today < start) return "尚未開始";
        if (today > end) return "已過期";
        const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
        return "進行中（剩 " + diff + " 天）";
    }

    function exportPromotionsAsCSV(promoList) {
        const header = ["代碼", "折扣", "類型", "描述", "開始日", "結束日", "最低消費", "限定商品", "對象"];
        const rows = promoList.map(p => [
            p.code, p.discount, p.type, p.description, p.start, p.end, p.minSpend, p.products, p.target
        ]);
        let csvContent = "\uFEFF" + header.join(",") + "\n" + rows.map(row => row.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "促銷活動報表.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return React.createElement(Page, { title: "促銷活動管理" }, [
        React.createElement("div", { style: { marginBottom: "20px" } }, [
            React.createElement("h3", {}, "新增促銷活動"),
            React.createElement("input", {
                placeholder: "優惠代碼",
                value: form.code,
                onChange: e => setForm({ ...form, code: e.target.value })
            }),
            React.createElement("select", {
                value: form.type,
                onChange: e => setForm({ ...form, type: e.target.value })
            }, [
                React.createElement("option", { value: "percent" }, "折扣 (%)"),
                React.createElement("option", { value: "fixed" }, "折抵金額 (元)")
            ]),
            React.createElement("input", {
                type: "number",
                placeholder: "折扣數值",
                value: form.discount,
                onChange: e => setForm({ ...form, discount: e.target.value })
            }),
            React.createElement("input", {
                placeholder: "活動說明",
                value: form.description,
                onChange: e => setForm({ ...form, description: e.target.value })
            }),
            React.createElement("input", {
                type: "date",
                value: form.start,
                onChange: e => setForm({ ...form, start: e.target.value })
            }),
            React.createElement("input", {
                type: "date",
                value: form.end,
                onChange: e => setForm({ ...form, end: e.target.value })
            }),
            React.createElement("input", {
                type: "number",
                placeholder: "最低消費金額",
                value: form.minSpend,
                onChange: e => setForm({ ...form, minSpend: e.target.value })
            }),
            React.createElement("div", {}, [
                React.createElement("label", {}, "限定商品："),
                React.createElement("input", {
                    placeholder: "用 , 分隔多個商品",
                    value: form.products,
                    onChange: e => setForm({ ...form, products: e.target.value })
                })
            ]),
            React.createElement("div", {}, [
                React.createElement("label", {}, [
                    React.createElement("input", {
                        type: "checkbox",
                        checked: form.repeatable,
                        onChange: e => setForm({ ...form, repeatable: e.target.checked })
                    }),
                    " 可重複使用"
                ])
            ]),
            React.createElement("label", {}, "發送對象："),
            React.createElement("select", {
                value: form.target,
                onChange: e => setForm({ ...form, target: e.target.value })
            }, [
                React.createElement("option", { value: "ALL" }, "所有人"),
                React.createElement("option", { value: "VIP" }, "VIP 專屬"),
                React.createElement("option", { value: "BIRTHDAY" }, "生日當月")
            ]),
            React.createElement("button", {
                className: "btn",
                onClick: addPromo,
                style: { marginTop: "10px" }
            }, "新增活動"),
            React.createElement("button", {
                className: "btn",
                onClick: () => exportPromotionsAsCSV(promoList),
                style: { marginLeft: "10px", backgroundColor: "#f58322" }
            }, "📤 匯出優惠報表")
        ]),

        React.createElement("table", {}, [
            React.createElement("thead", {}, React.createElement("tr", {}, [
                React.createElement("th", {}, "代碼"),
                React.createElement("th", {}, "折扣"),
                React.createElement("th", {}, "說明"),
                React.createElement("th", {}, "條件"),
                React.createElement("th", {}, "對象"),
                React.createElement("th", {}, "期限"),
                React.createElement("th", {}, "狀態"),
                React.createElement("th", {}, "操作")
            ])),
            React.createElement("tbody", {}, promoList.map((promo, i) =>
                React.createElement("tr", { key: i }, [
                    React.createElement("td", {}, promo.code),
                    React.createElement("td", {}, promo.type === "percent" ? promo.discount + "%" : "$" + promo.discount),
                    React.createElement("td", {}, promo.description),
                    React.createElement("td", {}, [
                        React.createElement("div", {}, "最低 $" + promo.minSpend),
                        React.createElement("div", {}, "限定商品：" + promo.products),
                        React.createElement("div", {}, promo.repeatable ? "可重複使用" : "僅限一次")
                    ]),
                    React.createElement("td", {}, promo.target === "VIP" ? "VIP" : promo.target === "BIRTHDAY" ? "生日當月" : "所有人"),
                    React.createElement("td", {}, promo.start + " ~ " + promo.end),
                    React.createElement("td", {}, getStatus(promo)),
                    React.createElement("td", {}, [
                        React.createElement("button", {
                            className: "btn",
                            onClick: () => deletePromo(promo.code)
                        }, "刪除")
                    ])
                ])
            ))
        ])
    ]);
}

export default PromotionsPage;