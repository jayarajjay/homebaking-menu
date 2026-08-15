(function () {
  const shop = getShopInfo();
  const categories = getCategories();
  let items = getItems();
  let activeCategory = "All";
  let searchTerm = "";

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

  // ---- Search ----
  const searchInput = document.getElementById("search-input");
  const clearBtn = document.getElementById("search-clear");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      searchTerm = searchInput.value.trim().toLowerCase();
      clearBtn.style.display = searchTerm ? "flex" : "none";
      renderMenu();
    });
  }
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      searchTerm = "";
      searchInput.value = "";
      clearBtn.style.display = "none";
      searchInput.focus();
      renderMenu();
    });
  }

  function matchesSearch(item) {
    if (!searchTerm) return true;
    const haystack = (item.name + " " + (item.description || "") + " " + item.category).toLowerCase();
    return haystack.includes(searchTerm);
  }

  // Small inline icons shown next to each category heading
  const CATEGORY_ICONS = {
    cake: '<path d="M4 20h16v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2z" fill="currentColor"/><path d="M4 14c0-1.7 1.3-3 3-3h10c1.7 0 3 1.3 3 3v6H4v-6z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 11V8M12 11V8M16 11V8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="12" cy="5" r="1.4" fill="currentColor"/>',
    cookie: '<circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="9" cy="10" r="1.1" fill="currentColor"/><circle cx="14" cy="9" r="1.1" fill="currentColor"/><circle cx="15" cy="14" r="1.1" fill="currentColor"/><circle cx="10" cy="15" r="1.1" fill="currentColor"/>',
    brownie: '<rect x="4" y="7" width="16" height="10" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 7v10M4 12h16" stroke="currentColor" stroke-width="1.2"/>',
    bar: '<rect x="4" y="7" width="16" height="10" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 7v10M4 12h16" stroke="currentColor" stroke-width="1.2"/>',
    bread: '<path d="M4 12c0-3.5 2.7-6.5 8-6.5s8 3 8 6.5-2.7 6.5-8 6.5-8-3-8-6.5z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 8.5c1 1.4 1 3.6 0 5M12 7.5c1 2 1 5 0 7M16 8.5c1 1.4 1 3.6 0 5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>',
    default: '<path d="M12 3c-1 0-2 1-2 2.3 0 .5.2 1 .5 1.4-2.1.5-3.7 1.9-4.1 3.8h11.2c-.4-1.9-2-3.3-4.1-3.8.3-.4.5-.9.5-1.4C14 4 13 3 12 3z" fill="currentColor"/><rect x="5" y="11" width="14" height="7.5" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/>',
  };

  function iconForCategory(cat) {
    const key = cat.toLowerCase();
    if (key.includes("cake")) return CATEGORY_ICONS.cake;
    if (key.includes("cookie")) return CATEGORY_ICONS.cookie;
    if (key.includes("brownie") || key.includes("bar")) return CATEGORY_ICONS.brownie;
    if (key.includes("bread") || key.includes("loaf")) return CATEGORY_ICONS.bread;
    return CATEGORY_ICONS.default;
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
      const catItems = items.filter((i) => i.category === cat && matchesSearch(i));
      if (catItems.length === 0) return;
      hasAny = true;

      const heading = document.createElement("h2");
      heading.className = "category-heading";
      heading.innerHTML =
        `<svg class="cat-icon" viewBox="0 0 24 24" aria-hidden="true">${iconForCategory(cat)}</svg>` +
        `<span>${cat}</span>`;
      menuRoot.appendChild(heading);

      const grid = document.createElement("div");
      grid.className = "card-grid";
      catItems.forEach((item) => grid.appendChild(itemCard(item)));
      menuRoot.appendChild(grid);
    });

    if (!hasAny) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.textContent = searchTerm
        ? `No items match "${searchTerm}". Try a different word.`
        : "No items here yet — check back soon!";
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
