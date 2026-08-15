(function () {
  let shop = getShopInfo();
  let categories = getCategories();
  let items = getItems();
  let editingId = null;

  const toast = document.getElementById("toast");
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 1800);
  }

  // ---------- Shop info form ----------
  const shopForm = document.getElementById("shop-form");
  document.getElementById("shop-name").value = shop.name || "";
  document.getElementById("shop-tagline").value = shop.tagline || "";
  document.getElementById("shop-whatsapp").value = shop.whatsappNumber || "";
  document.getElementById("shop-phone-display").value = shop.phoneDisplay || "";
  document.getElementById("shop-address").value = shop.address || "";
  document.getElementById("shop-instagram").value = shop.instagramHandle || "";
  document.getElementById("shop-note").value = shop.note || "";

  shopForm.addEventListener("submit", (e) => {
    e.preventDefault();
    shop = {
      ...shop,
      name: document.getElementById("shop-name").value.trim() || shop.name,
      tagline: document.getElementById("shop-tagline").value.trim(),
      whatsappNumber: document.getElementById("shop-whatsapp").value.trim(),
      phoneDisplay: document.getElementById("shop-phone-display").value.trim(),
      address: document.getElementById("shop-address").value.trim(),
      instagramHandle: document.getElementById("shop-instagram").value.trim(),
      note: document.getElementById("shop-note").value.trim(),
    };
    saveShopInfo(shop);
    showToast("Shop details saved");
  });

  // ---------- Categories ----------
  const catList = document.getElementById("category-list");
  const catSelect = document.getElementById("item-category");

  function renderCategoryList() {
    catList.innerHTML = "";
    categories.forEach((cat, idx) => {
      const row = document.createElement("div");
      row.className = "admin-item-row";
      const info = document.createElement("div");
      info.className = "admin-item-info";
      info.innerHTML = `<strong>${escapeHtml(cat)}</strong>`;
      row.appendChild(info);

      const actions = document.createElement("div");
      actions.className = "admin-item-actions";
      const delBtn = document.createElement("button");
      delBtn.className = "icon-btn danger";
      delBtn.title = "Delete category";
      delBtn.textContent = "✕";
      delBtn.addEventListener("click", () => {
        const inUse = items.some((i) => i.category === cat);
        if (inUse) {
          alert('Some items still use "' + cat + '". Move or delete those items first.');
          return;
        }
        categories = categories.filter((c) => c !== cat);
        saveCategories(categories);
        renderCategoryList();
        fillCategorySelect();
      });
      actions.appendChild(delBtn);
      row.appendChild(actions);
      catList.appendChild(row);
    });
  }

  function fillCategorySelect() {
    catSelect.innerHTML = "";
    categories.forEach((cat) => {
      const opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = cat;
      catSelect.appendChild(opt);
    });
  }

  document.getElementById("add-category-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("new-category-name");
    const name = input.value.trim();
    if (!name) return;
    if (categories.includes(name)) {
      showToast("That category already exists");
      return;
    }
    categories.push(name);
    saveCategories(categories);
    input.value = "";
    renderCategoryList();
    fillCategorySelect();
    showToast("Category added");
  });

  // ---------- Items ----------
  const itemForm = document.getElementById("item-form");
  const itemListEl = document.getElementById("item-list");
  const formTitle = document.getElementById("item-form-title");
  const cancelEditBtn = document.getElementById("cancel-edit-btn");

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function renderItemList() {
    itemListEl.innerHTML = "";
    if (items.length === 0) {
      const empty = document.createElement("p");
      empty.className = "admin-sub";
      empty.textContent = "No items yet. Add your first one below.";
      itemListEl.appendChild(empty);
      return;
    }
    items.forEach((item) => {
      const row = document.createElement("div");
      row.className = "admin-item-row";

      const info = document.createElement("div");
      info.className = "admin-item-info";
      info.innerHTML =
        `<strong>${escapeHtml(item.name)}</strong>` +
        `<span>${escapeHtml(item.category)} · ₹${item.price}${item.unit ? " / " + escapeHtml(item.unit) : ""}${item.available === false ? " · Unavailable" : ""}</span>`;
      row.appendChild(info);

      const actions = document.createElement("div");
      actions.className = "admin-item-actions";

      const toggleBtn = document.createElement("button");
      toggleBtn.className = "icon-btn";
      toggleBtn.title = item.available === false ? "Mark available" : "Mark unavailable";
      toggleBtn.textContent = item.available === false ? "👁" : "🚫";
      toggleBtn.addEventListener("click", () => {
        item.available = item.available === false ? true : false;
        saveItems(items);
        renderItemList();
      });

      const editBtn = document.createElement("button");
      editBtn.className = "icon-btn";
      editBtn.title = "Edit";
      editBtn.textContent = "✎";
      editBtn.addEventListener("click", () => startEdit(item));

      const delBtn = document.createElement("button");
      delBtn.className = "icon-btn danger";
      delBtn.title = "Delete";
      delBtn.textContent = "✕";
      delBtn.addEventListener("click", () => {
        if (!confirm('Delete "' + item.name + '"?')) return;
        items = items.filter((i) => i.id !== item.id);
        saveItems(items);
        renderItemList();
      });

      actions.appendChild(toggleBtn);
      actions.appendChild(editBtn);
      actions.appendChild(delBtn);
      row.appendChild(actions);
      itemListEl.appendChild(row);
    });
  }

  function startEdit(item) {
    editingId = item.id;
    formTitle.textContent = "Edit item";
    cancelEditBtn.style.display = "inline-block";
    document.getElementById("item-name").value = item.name;
    document.getElementById("item-category").value = item.category;
    document.getElementById("item-price").value = item.price;
    document.getElementById("item-unit").value = item.unit || "";
    document.getElementById("item-description").value = item.description || "";
    document.getElementById("item-veg").checked = !!item.veg;
    document.getElementById("item-bestseller").checked = !!item.bestseller;
    document.getElementById("item-available").checked = item.available !== false;
    itemForm.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function resetForm() {
    editingId = null;
    formTitle.textContent = "Add a new item";
    cancelEditBtn.style.display = "none";
    itemForm.reset();
    document.getElementById("item-available").checked = true;
  }

  cancelEditBtn.addEventListener("click", resetForm);

  itemForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("item-name").value.trim();
    const price = parseFloat(document.getElementById("item-price").value);
    if (!name || isNaN(price)) {
      showToast("Please add a name and price");
      return;
    }
    const data = {
      name,
      category: document.getElementById("item-category").value,
      price,
      unit: document.getElementById("item-unit").value.trim(),
      description: document.getElementById("item-description").value.trim(),
      veg: document.getElementById("item-veg").checked,
      bestseller: document.getElementById("item-bestseller").checked,
      available: document.getElementById("item-available").checked,
    };

    if (editingId) {
      items = items.map((i) => (i.id === editingId ? { ...i, ...data } : i));
      showToast("Item updated");
    } else {
      items.push({ id: uid(), ...data });
      showToast("Item added");
    }
    saveItems(items);
    renderItemList();
    resetForm();
  });

  // ---------- Backup / restore / reset ----------
  document.getElementById("export-btn").addEventListener("click", exportBackup);

  document.getElementById("import-input").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    importBackup(file, (ok) => {
      if (ok) {
        shop = getShopInfo();
        categories = getCategories();
        items = getItems();
        document.getElementById("shop-name").value = shop.name || "";
        document.getElementById("shop-tagline").value = shop.tagline || "";
        document.getElementById("shop-whatsapp").value = shop.whatsappNumber || "";
        document.getElementById("shop-phone-display").value = shop.phoneDisplay || "";
        document.getElementById("shop-address").value = shop.address || "";
        document.getElementById("shop-instagram").value = shop.instagramHandle || "";
        document.getElementById("shop-note").value = shop.note || "";
        renderCategoryList();
        fillCategorySelect();
        renderItemList();
        showToast("Backup restored");
      } else {
        showToast("Couldn't read that file");
      }
    });
    e.target.value = "";
  });

  document.getElementById("reset-btn").addEventListener("click", () => {
    if (!confirm("This clears all your changes on this device and goes back to the sample menu in menu-data.js. Continue?")) return;
    resetToDefaults();
    shop = getShopInfo();
    categories = getCategories();
    items = getItems();
    location.reload();
  });

  // ---------- Init ----------
  renderCategoryList();
  fillCategorySelect();
  renderItemList();
})();
