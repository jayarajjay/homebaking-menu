(function () {
  const shop = getShopInfo();
  const categories = getCategories();
  let items = getItems();
  let activeCategory = "All";

  // ---- Header ----
  document.getElementById("brand-name").textContent = shop.name;
  document.getElementById("brand-tagline").textContent = shop.tagline;
  const noteEl = document.getElementById("header-note");
  if (shop.note) {
    noteEl.textContent = shop.note;
  } else {
    noteEl.style.display = "none";
  }

  // ---- Footer ----
  document.getElementById("footer-shop-name").textContent = shop.name;
  document.getElementById("footer-phone").textContent = shop.phoneDisplay || "";
  document.getElementById("footer-address").textContent = shop.address || "";
  const igLink = document.getElementById("footer-instagram");
  if (shop.instagramHandle) {
    igLink.href = "https://instagram.com/" + shop.instagramHandle.replace("@", "");
    igLink.textContent = "@" + shop.instagramHandle.replace("@", "");
  } else {
    igLink.style.display = "none";
  }

  // ---- WhatsApp helpers ----
  function waLink(message) {
    const num = (shop.whatsappNumber || "").replace(/[^0-9]/g, "");
    return "https://wa.me/" + num + "?text=" + encodeURIComponent(message);
  }

  const floatBtn = document.getElementById("float-order-btn");
  if (shop.whatsappNumber) {
    floatBtn.href = waLink(
      "Hi " + shop.name + "! I'd like to place an order."
    );
  } else {
    floatBtn.style.display = "none";
  }

  // ---- Category chips ----
  const chipBar = document.getElementById("category-bar");
  function renderChips() {
    const allChip = ["All", ...categories];
    chipBar.innerHTML = "";
    allChip.forEach((cat) => {
      const btn = document.createElement("button");
      btn.className = "chip" + (cat === activeCategory ? " active" : "");
      btn.textContent = cat;
      btn.addEventListener("click", () => {
        activeCategory = cat;
        renderChips();
        renderMenu();
      });
      chipBar.appendChild(btn);
    });
  }

  // ---- Menu grid ----
  const menuRoot = document.getElementById("menu-root");

  function itemCard(item) {
    const card = document.createElement("div");
    card.className = "item-card" + (item.available === false ? " unavailable" : "");

    const top = document.createElement("div");
    top.className = "top-row";
    const nameEl = document.createElement("h3");
    nameEl.className = "item-name";
    nameEl.textContent = item.name;
    top.appendChild(nameEl);
    if (item.veg) {
      const dot = document.createElement("span");
      dot.className = "veg-dot";
      dot.title = "Vegetarian";
      top.appendChild(dot);
    }
    card.appendChild(top);

    if (item.bestseller && item.available !== false) {
      const badge = document.createElement("span");
      badge.className = "badge";
      badge.textContent = "Bestseller";
      card.appendChild(badge);
    }

    if (item.description) {
      const desc = document.createElement("p");
      desc.className = "item-desc";
      desc.textContent = item.description;
      card.appendChild(desc);
    }

    const bottom = document.createElement("div");
    bottom.className = "item-bottom";

    const priceWrap = document.createElement("div");
    const price = document.createElement("div");
    price.className = "item-price";
    price.textContent = "₹" + item.price;
    priceWrap.appendChild(price);
    if (item.unit) {
      const unit = document.createElement("div");
      unit.className = "item-unit";
      unit.textContent = item.unit;
      priceWrap.appendChild(unit);
    }
    bottom.appendChild(priceWrap);

    if (item.available === false) {
      const tag = document.createElement("span");
      tag.className = "sold-out-tag";
      tag.textContent = "Unavailable";
      bottom.appendChild(tag);
    } else if (shop.whatsappNumber) {
      const btn = document.createElement("a");
      btn.className = "order-btn";
      btn.textContent = "Order";
      btn.href = waLink(
        "Hi " + shop.name + "! I'd like to order: " + item.name +
        (item.unit ? " (" + item.unit + ")" : "") + "."
      );
      btn.target = "_blank";
      btn.rel = "noopener";
      bottom.appendChild(btn);
    }

    card.appendChild(bottom);
    return card;
  }

  function renderMenu() {
    menuRoot.innerHTML = "";
    const grouped = activeCategory === "All" ? categories : [activeCategory];
    let hasAny = false;

    grouped.forEach((cat) => {
      const catItems = items.filter((i) => i.category === cat);
      if (catItems.length === 0) return;
      hasAny = true;

      const heading = document.createElement("h2");
      heading.className = "category-heading";
      heading.textContent = cat;
      menuRoot.appendChild(heading);

      const grid = document.createElement("div");
      grid.className = "card-grid";
      catItems.forEach((item) => grid.appendChild(itemCard(item)));
      menuRoot.appendChild(grid);
    });

    if (!hasAny) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.textContent = "No items here yet — check back soon!";
      menuRoot.appendChild(empty);
    }
  }

  renderChips();
  renderMenu();

  // Register service worker for offline / installable support
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    });
  }
})();
