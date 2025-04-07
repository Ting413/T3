function generateOrders(type = "pending") {
  const products = ["牛軋餅原味", "蔓越莓牛軋餅", "抹茶方塊酥", "港式芝麻糊Q糖"];
  const methods = ["信用卡", "LinePay", "貨到付款"];
  const names = ["王小明", "陳美麗", "張大偉", "林小花"];
  const statuses = ["待確認", "製作中", "可取貨", "已取貨"];
  const orders = [];

  const today = new Date();
  for (let i = 0; i < 12; i++) {
    const orderDate = new Date(today.getTime() - Math.floor(Math.random() * 15 * 86400000));
    const pickupDate = new Date(orderDate.getTime() + (7 + Math.floor(Math.random() * 8)) * 86400000);
    const dateStr = orderDate.toISOString().split("T")[0].replace(/-/g, "");
    const id = `${dateStr}${(i + 1).toString().padStart(4, "0")}`;
    const items = Array.from({ length: 1 + Math.floor(Math.random() * 3) }).map(() => {
      const name = products[Math.floor(Math.random() * products.length)];
      return { name, qty: 1 + Math.floor(Math.random() * 3) };
    });
    const total = items.reduce((sum, item) => sum + item.qty * (60 + Math.floor(Math.random() * 100)), 0);

    orders.push({
      id,
      orderTime: orderDate.toLocaleString(),
      pickupTime: pickupDate.toLocaleDateString(),
      status: type === "history" ? "已取貨" : statuses[Math.floor(Math.random() * 3)],
      method: methods[Math.floor(Math.random() * methods.length)],
      name: names[Math.floor(Math.random() * names.length)],
      email: `test${i}@mail.com`,
      phone: `09${Math.floor(Math.random() * 100000000).toString().padStart(8, "0")}`,
      items,
      total
    });
  }

  return orders;
}

window.generateOrders = generateOrders;
