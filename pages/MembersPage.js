
function MembersPage() {
  const [members, setMembers] = React.useState(generateMembers());
  const [search, setSearch] = React.useState("");
  const [filterTag, setFilterTag] = React.useState("全部");
  const [selectedMember, setSelectedMember] = React.useState(null);
  const [sortOrder, setSortOrder] = React.useState("default");
  const [newTag, setNewTag] = React.useState("");

  const allTags = ["全部", "VIP", "新客", "高回購", "生日月", "黃金", "一般"];

  function generateMembers() {
    const baseTags = ["VIP", "新客", "高回購", "生日月"];
    const names = ["王小明", "陳美麗", "張大偉", "林小花", "黃志強", "周玉婷"];
    return Array.from({ length: 10 }).map((_, i) => {
      const name = names[i % names.length];
      const phone = "09" + Math.floor(Math.random() * 100000000).toString().padStart(8, "0");
      const email = `user${i}@mail.com`;
      const totalSpent = Math.floor(Math.random() * 10000);
      const level = totalSpent > 8000 ? "VIP" : totalSpent > 4000 ? "黃金" : "一般";
      const recent = new Date(Date.now() - Math.floor(Math.random() * 90) * 86400000).toLocaleDateString();
      const orderCount = Math.floor(Math.random() * 10) + 1;
      const birthday = new Date(1980 + Math.floor(Math.random() * 30), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
      const birthdayStr = birthday.toISOString().split("T")[0].replace(/-/g, "/");
      const memberTags = Array.from(new Set([level, baseTags[Math.floor(Math.random() * baseTags.length)]]));
      const orders = Array.from({ length: orderCount }).map((_, j) => ({
        id: `ORD${i + 1}${j + 1}`,
        date: new Date(Date.now() - Math.floor(Math.random() * 90) * 86400000).toLocaleDateString(),
        amount: Math.floor(Math.random() * 1000) + 200
      }));
      return { id: i + 1, name, phone, email, birthday: birthdayStr, totalSpent, level, recent, orderCount, tags: memberTags, orders };
    });
  }

  const filteredMembers = members
    .filter(m => {
      const matchSearch =
        m.name.includes(search) ||
        m.phone.includes(search) ||
        m.tags.some(tag => tag.includes(search));
      const matchTag = filterTag === "全部" || m.tags.includes(filterTag);
      return matchSearch && matchTag;
    })
    .sort((a, b) => {
      if (sortOrder === "totalSpent") return b.totalSpent - a.totalSpent;
      if (sortOrder === "orderCount") return b.orderCount - a.orderCount;
      if (sortOrder === "recent") return new Date(b.recent) - new Date(a.recent);
      if (sortOrder === "birthday") return a.birthday.localeCompare(b.birthday);
      return 0;
    });

  const updateMember = (id, updatedData) => {
    setMembers(members.map(m => m.id === id ? { ...m, ...updatedData } : m));
    setSelectedMember(null);
  };

  const removeTag = (tag) => {
    if (!selectedMember) return;
    const updatedTags = selectedMember.tags.filter(t => t !== tag);
    updateMember(selectedMember.id, { tags: updatedTags });
  };

  const addTag = () => {
    if (!selectedMember || !newTag.trim()) return;
    const updatedTags = Array.from(new Set([...selectedMember.tags, newTag.trim()]));
    updateMember(selectedMember.id, { tags: updatedTags });
    setNewTag("");
  };

  return React.createElement(Page, { title: "👥 會員管理" }, [
    React.createElement("div", {
      style: {
        background: "#fff9eb",
        padding: "16px",
        borderRadius: "10px",
        marginBottom: "16px"
      }
    }, [
      React.createElement("input", {
        type: "text",
        placeholder: "搜尋姓名 / 電話 / 標籤",
        value: search,
        onChange: e => setSearch(e.target.value),
        style: { fontSize: "16px", padding: "6px", width: "40%", marginRight: "16px" }
      }),
      React.createElement("select", {
        value: filterTag,
        onChange: e => setFilterTag(e.target.value),
        style: { fontSize: "16px", padding: "6px", marginRight: "16px" }
      }, allTags.map((tag, i) =>
        React.createElement("option", { value: tag, key: `tag-${i}` }, tag)
      )),
      React.createElement("select", {
        value: sortOrder,
        onChange: e => setSortOrder(e.target.value),
        style: { fontSize: "16px", padding: "6px" }
      }, [
        { value: "default", label: "排序方式" },
        { value: "totalSpent", label: "依總消費金額" },
        { value: "orderCount", label: "依回購次數" },
        { value: "recent", label: "依最近消費" },
        { value: "birthday", label: "依生日" }
      ].map((opt, i) =>
        React.createElement("option", { value: opt.value, key: `sort-${i}` }, opt.label)
      ))
    ]),

    React.createElement("table", {
      style: {
        width: "100%",
        background: "#fdf3e7",
        borderCollapse: "collapse",
        borderRadius: "10px",
        overflow: "hidden"
      }
    }, [
      React.createElement("thead", {}, React.createElement("tr", {}, [
        "編號", "姓名", "電話", "Email", "生日", "標籤", "等級", "總消費", "回購次數", "最近消費", "操作"
      ].map((title, idx) =>
        React.createElement("th", {
          key: `head-${idx}`,
          style: { padding: "10px", backgroundColor: "#a9805b", color: "#fff" }
        }, title)
      ))),
      React.createElement("tbody", {}, filteredMembers.map(member =>
        React.createElement("tr", { key: member.id }, [
          React.createElement("td", { style: { padding: "10px" } }, member.id),
          React.createElement("td", { style: { padding: "10px" } }, member.name),
          React.createElement("td", { style: { padding: "10px" } }, member.phone),
          React.createElement("td", { style: { padding: "10px" } }, member.email),
          React.createElement("td", { style: { padding: "10px" } }, member.birthday),
          React.createElement("td", { style: { padding: "10px" } },
            member.tags.map((tag, i) =>
              React.createElement("span", {
                key: `tag-${i}`,
                style: {
                  backgroundColor: "#f9c066",
                  color: "#774b30",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  marginRight: "4px"
                }
              }, tag)
            )
          ),
          React.createElement("td", { style: { padding: "10px" } }, member.level),
          React.createElement("td", { style: { padding: "10px" } }, "$" + member.totalSpent),
          React.createElement("td", { style: { padding: "10px" } }, member.orderCount),
          React.createElement("td", { style: { padding: "10px" } }, member.recent),
          React.createElement("td", { style: { padding: "10px" } },
            React.createElement("button", {
              style: {
                background: "#f58322",
                color: "white",
                padding: "6px 10px",
                border: "none",
                borderRadius: "4px"
              },
              onClick: () => setSelectedMember(member)
            }, "查看 / 編輯")
          )
        ])
      ))
    ]),

    selectedMember && React.createElement("div", {
      style: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
        zIndex: 999,
        width: "400px"
      }
    }, [
      React.createElement("h3", {}, `會員資料 - ${selectedMember.name}`),
      React.createElement("label", {}, "電話："),
      React.createElement("input", {
        type: "text",
        value: selectedMember.phone,
        onChange: e => updateMember(selectedMember.id, { phone: e.target.value }),
        style: { width: "100%", marginBottom: "8px" }
      }),
      React.createElement("label", {}, "Email："),
      React.createElement("input", {
        type: "text",
        value: selectedMember.email,
        onChange: e => updateMember(selectedMember.id, { email: e.target.value }),
        style: { width: "100%", marginBottom: "8px" }
      }),
      React.createElement("label", {}, "生日："),
      React.createElement("input", {
        type: "text",
        value: selectedMember.birthday,
        onChange: e => updateMember(selectedMember.id, { birthday: e.target.value }),
        style: { width: "100%", marginBottom: "8px" }
      }),
      React.createElement("div", { style: { marginBottom: "8px" } }, [
        React.createElement("strong", {}, "標籤："),
        selectedMember.tags.map((tag, i) =>
          React.createElement("span", {
            key: `tag-edit-${i}`,
            style: {
              backgroundColor: "#f9c066",
              color: "#774b30",
              padding: "2px 6px",
              borderRadius: "4px",
              margin: "4px",
              display: "inline-block",
              cursor: "pointer"
            },
            onClick: () => removeTag(tag)
          }, tag + " ❌")
        )
      ]),
      React.createElement("input", {
        type: "text",
        placeholder: "輸入標籤後按下新增",
        value: newTag,
        onChange: e => setNewTag(e.target.value),
        style: { width: "100%", marginBottom: "8px" }
      }),
      React.createElement("button", {
        onClick: addTag,
        style: {
          marginBottom: "10px",
          padding: "6px 12px",
          backgroundColor: "#9f5933",
          color: "#fff",
          border: "none",
          borderRadius: "5px"
        }
      }, "新增標籤"),
      React.createElement("button", {
        onClick: () => setSelectedMember(null),
        style: {
          marginTop: "10px",
          padding: "6px 12px",
          backgroundColor: "#774b30",
          color: "#fff",
          border: "none",
          borderRadius: "5px"
        }
      }, "關閉")
    ])
  ]);
}

window.MembersPage = MembersPage;
