import Page from "../../components/Page.js";

function ProductsPage() {
    const [products, setProducts] = React.useState([
        {
            id: 1,
            name: "牛軋餅原味",
            description: "經典原味牛軋餅，嚴選香濃牛軋糖與酥脆蘇打餅結合，甜鹹交融、口感層次豐富。每一口都能感受奶香與餅香交織，是不可錯過的美味點心。",
            category: "牛軋餅",
            price: 120,
            stock: 50,
            image: "images/nougat-original.jpg"
        },
        {
            id: 2,
            name: "牛軋餅蔓越莓口味",
            description: "在奶香牛軋糖中加入酸甜蔓越莓果乾，搭配鹹香餅乾，吃得到清新果香與綿密口感。酸甜適中，不膩口，是送禮與自食的雙重首選。",
            category: "牛軋餅",
            price: 130,
            stock: 40,
            image: "images/nougat-cranberry.jpg"
        },
        {
            id: 3,
            name: "牛軋餅抹茶味",
            description: "融合日本抹茶與牛軋糖，帶出淡雅茶香與濃郁奶香的絕妙平衡。夾在香酥餅乾中，呈現甜鹹層次，是抹茶控不能錯過的風味。",
            category: "牛軋餅",
            price: 130,
            stock: 35,
            image: "images/nougat-matcha.jpg"
        },
        {
            id: 4,
            name: "牛軋餅咖啡味",
            description: "濃郁咖啡風味牛軋糖，搭配微鹹蘇打餅，香氣四溢、甜中帶點成熟的苦韻。適合喜愛咖啡風味的大人系甜點，下午茶良伴首選。",
            category: "牛軋餅",
            price: 130,
            stock: 30,
            image: "images/nougat-coffee.jpg"
        },
        {
            id: 5,
            name: "方塊酥抹茶味",
            description: "酥鬆的方塊酥餅體中夾入香濃抹茶牛軋糖，融合茶香與奶香，吃起來細膩不膩。淡雅茶香與酥脆餅皮在口中完美交融，讓人一口接一口。",
            category: "方塊酥",
            price: 110,
            stock: 40,
            image: "images/square-matcha.jpg"
        },
        {
            id: 6,
            name: "方塊酥咖啡味",
            description: "咖啡風味牛軋糖夾於香酥方塊酥餅中，外酥內Q、口感豐富。香氣濃郁的咖啡與奶香交織，搭配茶飲更添風味，是精緻又耐吃的點心。",
            category: "方塊酥",
            price: 110,
            stock: 35,
            image: "images/square-coffee.jpg"
        },
        {
            id: 7,
            name: "夏威夷莓果Q糖",
            description: "結合Q彈牛軋糖與酸甜莓果，內含夏威夷豆，果香與堅果香完美融合。每一口都能感受自然果乾的清香與堅果的爽脆，健康又美味。",
            category: "牛軋糖",
            price: 150,
            stock: 25,
            image: "images/nougat-berry.jpg"
        },
        {
            id: 8,
            name: "可可夏威夷Q糖",
            description: "濃郁可可風味牛軋糖，搭配夏威夷果仁，甜而不膩，Q彈滑順中帶有香脆堅果口感。巧克力控與堅果控都會愛上的經典美味。",
            category: "牛軋糖",
            price: 150,
            stock: 20,
            image: "images/nougat-cocoa.jpg"
        },
        {
            id: 9,
            name: "港式芝麻糊Q糖",
            description: "延續傳統港式芝麻糊風味，將黑芝麻香濃融合在Q彈糖體中。口感綿密滑順，帶有迷人的芝麻香，是復古與創新兼具的特色甜點。",
            category: "牛軋糖",
            price: 140,
            stock: 20,
            image: "images/nougat-sesame.jpg"
        },
        {
            id: 10,
            name: "草莓牛軋糖",
            description: "選用天然草莓果乾與奶香牛軋糖製成，口感Q彈、果香撲鼻。酸甜交織不黏牙，是最受歡迎的夢幻口味之一，深受女孩們喜愛。",
            category: "牛軋糖",
            price: 140,
            stock: 22,
            image: "images/nougat-strawberry.jpg"
        },
        {
            id: 11,
            name: "棗泥蛋黃酥",
            description: "酥香外皮中包裹綿密香甜的棗泥與鹹蛋黃，鹹甜融合、層次細膩。棗泥香氣濃郁、口感滑順，與酥皮完美結合，是中式點心的經典之作。",
            category: "中式酥點",
            price: 180,
            stock: 18,
            image: "images/yolk-pastry.jpg"
        },
        {
            id: 12,
            name: "月娘酥",
            description: "外層金黃酥皮包裹細緻綠豆沙餡，甜而不膩、入口即化。綠豆沙香氣溫潤滑順，搭配酥鬆餅皮，呈現出樸實又迷人的傳統滋味。",
            category: "中式酥點",
            price: 160,
            stock: 20,
            image: "images/moon-pastry.jpg"
        },
        {
            id: 13,
            name: "台式馬卡龍",
            description: "外酥內Q的傳統口味，散發濃郁蛋香與糖香，口感樸實甜美。與法式馬卡龍相比，更有台灣在地風味，是許多人記憶中的童年零嘴。",
            category: "西式烘焙",
            price: 100,
            stock: 30,
            image: "images/taiwan-macaron.jpg"
        },
        {
            id: 14,
            name: "吐司",
            description: "使用高級小麥粉與天然酵母，製成柔軟蓬鬆的吐司，每一口都充滿自然奶香。適合搭配果醬、奶油或製作三明治，是日常不可或缺的基本款。",
            category: "吐司",
            price: 60,
            stock: 40,
            image: "images/bread.jpg"
        },
        {
            id: 15,
            name: "葡萄吐司",
            description: "在柔軟吐司中加入飽滿香甜葡萄乾，果香自然、口感豐富。輕咬即能感受果乾甜味與麵包柔軟的完美融合，是早餐與下午茶的好選擇。",
            category: "吐司",
            price: 70,
            stock: 35,
            image: "images/raisin-bread.jpg"
        },
        {
            id: 16,
            name: "肉桂捲",
            description: "金黃酥香的麵包體捲入香濃肉桂醬，撒上堅果或糖霜，濃郁香氣令人著迷。甜中帶辣、層層分明，是寒冷天氣裡最療癒的甜點之一。",
            category: "西式烘焙",
            price: 90,
            stock: 28,
            image: "images/cinnamon-roll.jpg"
        },
        {
            id: 17,
            name: "瑪德蓮",
            description: "經典法式甜點，以奶油與蛋香為基底，外殼微酥、內裡濕潤。淡淡檸檬香氣清爽提味，貝殼形狀精緻討喜，是下午茶桌上的亮點之一。",
            category: "西式烘焙",
            price: 85,
            stock: 26,
            image: "images/madeleine.jpg"
        }
    ]);


    const [categoryFilter, setCategoryFilter] = React.useState("全部");
    const [showForm, setShowForm] = React.useState(false);
    const [editing, setEditing] = React.useState(null);
    const [form, setForm] = React.useState({
        name: "",
        price: "",
        category: "",
        stock: "",
        image: "",
        description: ""
    });

    const categories = ["全部", ...new Set(products.map(p => p.category))];
    const filteredProducts = categoryFilter === "全部" ? products : products.filter(p => p.category === categoryFilter);

    function openForm(product) {
        if (product) {
            setEditing(product.id);
            setForm({ ...product });
        } else {
            setEditing(null);
            setForm({ name: "", price: "", category: categories[1] || "", stock: "", image: "", description: "" });
        }
        setShowForm(true);
    }

    function closeForm() {
        setShowForm(false);
    }

    function saveProduct() {
        if (!form.name || isNaN(form.price) || isNaN(form.stock)) {
            alert("請填寫正確的欄位！");
            return;
        }
        const product = {
            ...form,
            price: parseInt(form.price, 10),
            stock: parseInt(form.stock, 10),
            image: form.image || "https://via.placeholder.com/60"
        };
        if (editing) {
            setProducts(products.map(p => (p.id === editing ? { ...product, id: editing } : p)));
        } else {
            setProducts([...products, { ...product, id: Date.now() }]);
        }
        setShowForm(false);
    }

    function deleteProduct(id) {
        setProducts(products.filter(p => p.id !== id));
    }

    return React.createElement(Page, { title: "商品管理" }, [
        React.createElement("div", { style: { marginBottom: "16px" } }, [
            React.createElement("label", { style: { marginRight: "8px", fontWeight: "bold" } }, "篩選分類："),
            React.createElement("select", {
                value: categoryFilter,
                onChange: e => setCategoryFilter(e.target.value),
                style: { padding: "6px 12px", fontSize: "16px" }
            }, categories.map((cat, idx) =>
                React.createElement("option", { key: idx, value: cat }, cat)
            ))
        ]),

        React.createElement("button", { className: "btn", onClick: () => openForm(null), style: { marginBottom: "16px" } }, "新增商品"),

        showForm && React.createElement("div", {
            style: { backgroundColor: "#fff3e0", padding: "20px", margin: "20px 0", borderRadius: "8px" }
        }, [
            React.createElement("h2", {}, editing ? "編輯商品" : "新增商品"),
            React.createElement("div", {}, [
                React.createElement("label", {}, "名稱："),
                React.createElement("input", {
                    value: form.name,
                    onChange: e => setForm({ ...form, name: e.target.value })
                })
            ]),
            React.createElement("div", {}, [
                React.createElement("label", {}, "價格："),
                React.createElement("input", {
                    type: "number",
                    value: form.price,
                    onChange: e => setForm({ ...form, price: e.target.value })
                })
            ]),
            React.createElement("div", {}, [
                React.createElement("label", {}, "分類："),
                React.createElement("select", {
                    value: form.category,
                    onChange: e => setForm({ ...form, category: e.target.value })
                }, categories.filter(c => c !== "全部").map(c => React.createElement("option", { key: c, value: c }, c)))
            ]),
            React.createElement("div", {}, [
                React.createElement("label", {}, "庫存："),
                React.createElement("input", {
                    type: "number",
                    value: form.stock,
                    onChange: e => setForm({ ...form, stock: e.target.value })
                })
            ]),
            React.createElement("div", {}, [
                React.createElement("label", {}, "圖片網址："),
                React.createElement("input", {
                    value: form.image,
                    onChange: e => setForm({ ...form, image: e.target.value })
                })
            ]),
            React.createElement("div", {}, [
                React.createElement("label", {}, "介紹："),
                React.createElement("textarea", {
                    value: form.description,
                    rows: 3,
                    style: { width: "100%" },
                    onChange: e => setForm({ ...form, description: e.target.value })
                })
            ]),
            React.createElement("div", { style: { marginTop: "10px" } }, [
                React.createElement("button", { className: "btn", onClick: saveProduct }, "儲存"),
                React.createElement("button", { className: "btn", onClick: closeForm }, "取消")
            ])
        ]),

        React.createElement("table", {}, [
            React.createElement("thead", {}, React.createElement("tr", {}, [
                React.createElement("th", {}, "編號"),
                React.createElement("th", {}, "圖片"),
                React.createElement("th", {}, "名稱"),
                React.createElement("th", {}, "介紹"),
                React.createElement("th", {}, "分類"),
                React.createElement("th", {}, "價格"),
                React.createElement("th", {}, "庫存"),
                React.createElement("th", {}, "操作")
            ])),
            React.createElement("tbody", {}, filteredProducts.map((p, index) =>
                React.createElement("tr", { key: p.id }, [
                    React.createElement("td", {}, index + 1),
                    React.createElement("td", {}, React.createElement("img", {
                        src: p.image,
                        alt: p.name,
                        width: 60,
                        height: 60,
                        style: { objectFit: "cover", borderRadius: "6px" }
                    })),
                    React.createElement("td", {}, p.name),
                    React.createElement("td", {
                        style: {
                            width: "350px"
                        },
                        title: p.description
                    }, p.description),
                    React.createElement("td", {}, p.category),
                    React.createElement("td", {}, "$" + p.price),
                    React.createElement("td", {}, p.stock),
                    React.createElement("td", {}, [
                        React.createElement("button", {
                            className: "btn", onClick: () => openForm(p)
                        }, "編輯"),
                        React.createElement("button", {
                            className: "btn", onClick: () => deleteProduct(p.id)
                        }, "刪除")
                    ])
                ])
            ))
        ])
    ]);
}

export default ProductsPage;