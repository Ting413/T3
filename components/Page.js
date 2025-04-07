function Page({ title, children }) {
    return React.createElement("div", { className: "main" }, [
      React.createElement("h1", {}, title),
      ...(Array.isArray(children) ? children : [children])
    ]);
  }
  
  window.Page = Page;
  