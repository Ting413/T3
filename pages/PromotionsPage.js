
function PromotionsPage() {
  const categories = ["牛軋餅", "方塊酥", "牛軋糖", "中式酥點", "西式烘焙", "吐司"];

  const [promoList, setPromoList] = React.useState(generateSamplePromos());
  const [form, setForm] = React.useState({
    code: "", discount: "", type: "percent", description: "", start: "", end: "",
    minSpend: "", products: [], repeatable: false, target: "ALL"
  });

  function generateSamplePromos() {
    return Array.from({ length: 5 }).map((_, i) => ({
      code: `CODE${i + 1}`,
      discount: Math.floor(Math.random() * 30) + 10,
      type: "percent",
      description: `範例優惠 ${i + 1}`,
      start: "2025-04-01",
      end: "2025-04-30",
      minSpend: 100 + i * 50,
      products: [categories[i % categories.length]],
      repeatable: false,
      target: i % 3 === 0 ? "VIP" : i % 3 === 1 ? "BIRTHDAY" : "ALL",
      owners: Math.floor(Math.random() * 100),
      used: Math.floor(Math.random() * 50)
    }));
  }

  function getStatus(promo) {
    const today = new Date();
    const start = new Date(promo.start);
    const end = new Date(promo.end);
    if (today < start) return "尚未開始";
    if (today > end) return "已過期";
    const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
    return `進行中（剩 ${diff} 天）`;
  }

  function getUsagePercent(promo) {
    if (!promo.owners) return "0%";
    return Math.round((promo.used / promo.owners) * 100) + "%";
  }

  function handleCategoryChange(cat) {
    const exists = form.products.includes(cat);
    const updated = exists
      ? form.products.filter(c => c !== cat)
      : [...form.products, cat];
    setForm({ ...form, products: updated });
  }

  function addPromo() {
    if (!form.code || !form.discount || !form.start || !form.end) {
      alert("請填寫完整資訊！");
      return;
    }
    const newPromo = { ...form, owners: 0, used: 0 };
    setPromoList([...promoList, newPromo]);
    setForm({ code: "", discount: "", type: "percent", description: "", start: "", end: "", minSpend: "", products: [], repeatable: false, target: "ALL" });
    alert("成功新增優惠活動！");
  }

  function deletePromo(code) {
    if (confirm("確定要刪除此優惠活動嗎？")) {
      setPromoList(promoList.filter(p => p.code !== code));
    }
  }

  return React.createElement(Page, { title: "促銷活動管理" }, [
    React.createElement("style", {
      dangerouslySetInnerHTML: {
        __html: `
        .promo-table th {
          background-color: #debd94;
        }
        .form-section h3 {
          color: #a9805b;
        }
        .category-checkbox {
          display: flex;
          align-items: center;
          margin-bottom: 6px;
          color: #774b30;
        }
        .category-checkbox input {
          margin-right: 6px;
        }
        .category-list {
          max-height: 150px;
          overflow-y: auto;
          border: 1px solid #ccc;
          border-radius: 6px;
          padding: 10px;
          background: #fff;
        }
      `
      }
    }),

    React.createElement("div", { style: { padding: "20px" } }, [

      React.createElement("table", { className: "promo-table", style: { width: "100%", marginBottom: "32px", borderCollapse: "collapse" } }, [
        React.createElement("thead", {}, React.createElement("tr", {}, [
          "代碼", "折扣", "說明", "條件", "對象", "期限", "狀態", "擁有人數", "使用次數", "使用 %", "操作"
        ].map((text, i) => React.createElement("th", { key: i, style: { padding: "10px", border: "1px solid #ccc" } }, text)))),

        React.createElement("tbody", {}, promoList.map((promo, i) =>
          React.createElement("tr", { key: i }, [
            React.createElement("td", {}, promo.code),
            React.createElement("td", {}, promo.type === "percent" ? `${promo.discount}%` : `$${promo.discount}`),
            React.createElement("td", {}, promo.description),
            React.createElement("td", {}, [
              React.createElement("div", {}, `最低 $${promo.minSpend}`),
              React.createElement("div", {}, "限定商品：" + (promo.products.join(", ") || "無")),
              React.createElement("div", {}, promo.repeatable ? "可重複使用" : "僅限一次")
            ]),
            React.createElement("td", {}, promo.target === "VIP" ? "VIP" : promo.target === "BIRTHDAY" ? "生日當月" : "所有人"),
            React.createElement("td", {}, `${promo.start} ~ ${promo.end}`),
            React.createElement("td", {}, getStatus(promo)),
            React.createElement("td", {}, promo.owners),
            React.createElement("td", {}, promo.used),
            React.createElement("td", {}, getUsagePercent(promo)),
            React.createElement("td", {}, React.createElement("button", {
              className: "btn", onClick: () => deletePromo(promo.code)
            }, "刪除"))
          ])
        ))
      ]),

      React.createElement("div", { className: "form-section" }, [
        React.createElement("h3", {}, "新增優惠活動"),
        React.createElement("div", { className: "form-grid", style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" } }, [

          React.createElement("div", {}, [
            React.createElement("label", {}, "優惠代碼"),
            React.createElement("input", {
              value: form.code,
              onChange: e => setForm({ ...form, code: e.target.value })
            })
          ]),

          React.createElement("div", {}, [
            React.createElement("label", {}, "折扣類型"),
            React.createElement("select", {
              value: form.type,
              onChange: e => setForm({ ...form, type: e.target.value })
            }, [
              React.createElement("option", { value: "percent" }, "折扣 (%)"),
              React.createElement("option", { value: "fixed" }, "折抵金額 (元)")
            ])
          ]),

          React.createElement("div", {}, [
            React.createElement("label", {}, "折扣數值"),
            React.createElement("input", {
              type: "number",
              value: form.discount,
              onChange: e => setForm({ ...form, discount: e.target.value })
            })
          ]),

          React.createElement("div", {}, [
            React.createElement("label", {}, "活動說明"),
            React.createElement("input", {
              value: form.description,
              onChange: e => setForm({ ...form, description: e.target.value })
            })
          ]),

          React.createElement("div", {}, [
            React.createElement("label", {}, "開始日期"),
            React.createElement("input", {
              type: "date",
              value: form.start,
              onChange: e => setForm({ ...form, start: e.target.value })
            })
          ]),

          React.createElement("div", {}, [
            React.createElement("label", {}, "結束日期"),
            React.createElement("input", {
              type: "date",
              min: form.start || undefined,
              value: form.end,
              onChange: e => setForm({ ...form, end: e.target.value })
            })
          ]),

          React.createElement("div", {}, [
            React.createElement("label", {}, "最低消費金額"),
            React.createElement("input", {
              type: "number",
              value: form.minSpend,
              onChange: e => setForm({ ...form, minSpend: e.target.value })
            })
          ]),

          React.createElement("div", {}, [
            React.createElement("label", {}, "發送對象"),
            React.createElement("select", {
              value: form.target,
              onChange: e => setForm({ ...form, target: e.target.value })
            }, [
              React.createElement("option", { value: "ALL" }, "所有人"),
              React.createElement("option", { value: "VIP" }, "VIP 專屬"),
              React.createElement("option", { value: "BIRTHDAY" }, "生日當月")
            ])
          ]),

          // 限定分類（多選 checkbox）
          React.createElement("div", { style: { gridColumn: "1 / span 2" } }, [
            React.createElement("label", {}, "限定分類（點選可複選）"),
            React.createElement("div", { className: "category-list" }, categories.map(cat =>
              React.createElement("label", { className: "category-checkbox", key: cat }, [
                React.createElement("input", {
                  type: "checkbox",
                  checked: form.products.includes(cat),
                  onChange: () => handleCategoryChange(cat)
                }),
                cat
              ])
            ))
          ])
        ]),
        React.createElement("button", { className: "btn", onClick: addPromo }, "新增活動")
      ])
    ])
  ]);
}

window.PromotionsPage = PromotionsPage;
