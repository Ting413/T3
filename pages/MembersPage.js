import Page from "../../components/Page.js";

function getBirthdayMonthPromotions(memberBirthday, promotions) {
    if (!memberBirthday) return [];
    const bMonth = new Date(memberBirthday).getMonth();
    const currentMonth = new Date().getMonth();
    return promotions.filter(promo => promo.target === "BIRTHDAY" && bMonth === currentMonth);
}

function simulateSendNotification(member, promoList) {
    const message = `\n📩 發送給 ${member.name} (${member.email})\n優惠內容：\n` +
        promoList.map(p => `🎁 ${p.code} - ${p.description} (${p.discount}${p.type === "percent" ? "%" : "元"})`).join("\n");

    console.log("[模擬通知]", message);
    alert("已模擬發送給會員：" + member.name + "\n\n請查看 Console 查看詳細訊息。");
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

function MembersPage() {
    const [search, setSearch] = React.useState("");
    const [selected, setSelected] = React.useState(null);
    const [editing, setEditing] = React.useState(null);
    const [members, setMembers] = React.useState([
        {
            name: "王小明",
            email: "ming@mail.com",
            orders: 5,
            lastOrder: "2025-03-28",
            totalSpent: 12000,
            note: "喜歡可頌",
            birthday: "1990-04-15"
        },
        {
            name: "李小花",
            email: "hua@mail.com",
            orders: 2,
            lastOrder: "2025-03-10",
            totalSpent: 3000,
            note: "偏好吐司",
            birthday: "1995-05-12"
        }
    ]);

    const allPromotions = [
        {
            code: "HBDTOYOU",
            discount: 40,
            type: "percent",
            description: "生日優惠 6 折",
            start: "2025-04-01",
            end: "2025-04-30",
            minSpend: 100,
            products: "",
            repeatable: false,
            target: "BIRTHDAY"
        }
    ];

    const [editForm, setEditForm] = React.useState({
        name: "", email: "", orders: "", totalSpent: "", lastOrder: "", note: "", birthday: ""
    });

    function getLevel(total) {
        if (total >= 10000) return "VIP";
        if (total >= 5000) return "黃金";
        return "普通";
    }

    function getTags(member) {
        const tags = [];
        const level = getLevel(member.totalSpent);
        if (level === "VIP") tags.push("高消費");
        if (member.orders >= 5) tags.push("高回購");

        if (
            member.birthday &&
            new Date(member.birthday).getMonth() === new Date().getMonth()
        ) {
            tags.push("生日月");
        }

        return tags;
    }

    const filtered = members.filter(m =>
        m.name.includes(search) || m.email.includes(search)
    );

    function startEdit(m) {
        setEditing(m);
        setEditForm({ ...m });
    }

    function saveEdit() {
        setMembers(members.map(m =>
            m.email === editing.email
                ? { ...editForm, orders: parseInt(editForm.orders), totalSpent: parseInt(editForm.totalSpent) }
                : m
        ));
        setEditing(null);
    }

    return React.createElement(Page, { title: "會員管理" }, [
        React.createElement("div", { className: "search-box" }, [
            React.createElement("input", {
                type: "text",
                placeholder: "搜尋姓名 / Email",
                value: search,
                onChange: e => setSearch(e.target.value)
            })
        ]),

        editing && React.createElement("div", {
            style: {
                backgroundColor: "#fff4e4",
                padding: "20px",
                marginBottom: "20px",
                borderRadius: "8px"
            }
        }, [
            React.createElement("h2", {}, "編輯會員資料"),
            React.createElement("p", {}, "Email (不可改): " + editForm.email),
            React.createElement("label", {}, "姓名："),
            React.createElement("input", {
                value: editForm.name,
                onChange: e => setEditForm({ ...editForm, name: e.target.value })
            }),
            React.createElement("label", {}, "回購次數："),
            React.createElement("input", {
                type: "number",
                value: editForm.orders,
                onChange: e => setEditForm({ ...editForm, orders: e.target.value })
            }),
            React.createElement("label", {}, "總消費金額："),
            React.createElement("input", {
                type: "number",
                value: editForm.totalSpent,
                onChange: e => setEditForm({ ...editForm, totalSpent: e.target.value })
            }),
            React.createElement("label", {}, "最近下單："),
            React.createElement("input", {
                type: "date",
                value: editForm.lastOrder,
                onChange: e => setEditForm({ ...editForm, lastOrder: e.target.value })
            }),
            React.createElement("label", {}, "生日："),
            React.createElement("input", {
                type: "date",
                value: editForm.birthday,
                onChange: e => setEditForm({ ...editForm, birthday: e.target.value })
            }),
            React.createElement("label", {}, "備註："),
            React.createElement("textarea", {
                value: editForm.note,
                rows: 2,
                style: { width: "100%" },
                onChange: e => setEditForm({ ...editForm, note: e.target.value })
            }),
            React.createElement("div", { style: { marginTop: "10px" } }, [
                React.createElement("button", { className: "btn", onClick: saveEdit }, "儲存"),
                React.createElement("button", { className: "btn", onClick: () => setEditing(null) }, "取消")
            ])
        ]),

        selected && React.createElement("div", {
            style: {
                backgroundColor: "#fffbe6",
                padding: "20px",
                marginBottom: "20px",
                borderRadius: "8px"
            }
        }, [
            React.createElement("h2", {}, selected.name + " - 詳細資料"),
            React.createElement("p", {}, "Email: " + selected.email),
            React.createElement("p", {}, "會員等級: " + getLevel(selected.totalSpent)),
            React.createElement("p", {}, "累積消費: $" + selected.totalSpent),
            React.createElement("p", {}, "回購次數: " + selected.orders + " 次"),
            React.createElement("p", {}, "最近下單: " + selected.lastOrder),
            React.createElement("p", {}, "生日: " + selected.birthday),
            React.createElement("p", {}, "備註: " + selected.note),
            React.createElement("p", {}, "標籤: " + getTags(selected).join(", ")),
            React.createElement("button", {
                className: "btn",
                onClick: () => setSelected(null)
            }, "關閉"),
            React.createElement("button", {
                className: "btn",
                onClick: () => {
                    const birthdayPromos = getBirthdayMonthPromotions(selected.birthday, allPromotions);
                    simulateSendNotification(selected, birthdayPromos);
                },
                style: { marginLeft: "10px" }
            }, "🎁 模擬發送生日優惠")
        ]),

        React.createElement("table", {}, [
            React.createElement("thead", {}, React.createElement("tr", {}, [
                React.createElement("th", {}, "姓名"),
                React.createElement("th", {}, "Email"),
                React.createElement("th", {}, "等級"),
                React.createElement("th", {}, "回購次數"),
                React.createElement("th", {}, "最近下單"),
                React.createElement("th", {}, "標籤"),
                React.createElement("th", {}, "備註"),
                React.createElement("th", {}, "操作")
            ])),
            React.createElement("tbody", {}, filtered.map((m, i) =>
                React.createElement("tr", { key: i }, [
                    React.createElement("td", {}, m.name),
                    React.createElement("td", {}, m.email),
                    React.createElement("td", {}, getLevel(m.totalSpent)),
                    React.createElement("td", {}, m.orders),
                    React.createElement("td", {}, m.lastOrder),
                    React.createElement("td", {}, getTags(m).map(t =>
                        React.createElement("span", {
                            style: {
                                padding: "2px 6px",
                                marginRight: "4px",
                                backgroundColor: "#f9c066",
                                borderRadius: "6px",
                                fontSize: "12px"
                            }
                        }, t)
                    )),
                    React.createElement("td", {}, m.note),
                    React.createElement("td", {}, [
                        React.createElement("button", {
                            className: "btn", onClick: () => setSelected(m)
                        }, "查看"),
                        React.createElement("button", {
                            className: "btn", onClick: () => startEdit(m)
                        }, "編輯")
                    ])
                ])
            ))
        ])
    ]);
}

export default MembersPage;