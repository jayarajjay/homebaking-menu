/*
  Data layer: everything reads/writes here.
  - On first visit, the menu shown is whatever is in menu-data.js.
  - As soon as someone edits anything on the Manage Menu (admin.html)
    page, the changes are saved to this browser's localStorage and
    take over from menu-data.js from then on, on this device.
  - "Reset to file defaults" clears localStorage and goes back to
    whatever is written in menu-data.js.
*/

const STORAGE_KEYS = {
  items: "bakery_menu_items_v1",
  shopInfo: "bakery_shop_info_v1",
  categories: "bakery_categories_v1",
};

function getItems() {
  const raw = localStorage.getItem(STORAGE_KEYS.items);
  let items;
  if (raw) {
    try { items = JSON.parse(raw); } catch (e) { items = MENU_ITEMS; }
  } else {
    items = MENU_ITEMS;
  }
  return items.map(normalizeItem);
}

// Guarantees every item has a `variants` array of { unit, price }.
// Older items only had a single top-level price/unit — this wraps
// those into a one-size variants array so the rest of the app only
// ever has to deal with one shape.
function normalizeItem(item) {
  if (Array.isArray(item.variants) && item.variants.length > 0) {
    return item;
  }
  return {
    ...item,
    variants: [{ unit: item.unit || "", price: item.price }],
  };
}

function saveItems(items) {
  localStorage.setItem(STORAGE_KEYS.items, JSON.stringify(items));
}

function getShopInfo() {
  const raw = localStorage.getItem(STORAGE_KEYS.shopInfo);
  if (raw) {
    try { return { ...SHOP_INFO, ...JSON.parse(raw) }; } catch (e) { /* fall through */ }
  }
  return SHOP_INFO;
}

function saveShopInfo(info) {
  localStorage.setItem(STORAGE_KEYS.shopInfo, JSON.stringify(info));
}

function getCategories() {
  const raw = localStorage.getItem(STORAGE_KEYS.categories);
  if (raw) {
    try { return JSON.parse(raw); } catch (e) { /* fall through */ }
  }
  return CATEGORIES;
}

function saveCategories(categories) {
  localStorage.setItem(STORAGE_KEYS.categories, JSON.stringify(categories));
}

function resetToDefaults() {
  localStorage.removeItem(STORAGE_KEYS.items);
  localStorage.removeItem(STORAGE_KEYS.shopInfo);
  localStorage.removeItem(STORAGE_KEYS.categories);
}

function exportBackup() {
  const data = {
    shopInfo: getShopInfo(),
    categories: getCategories(),
    items: getItems(),
    exportedAt: new Date().toISOString(),
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "bakery-menu-backup.json";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function importBackup(file, onDone) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if (data.shopInfo) saveShopInfo(data.shopInfo);
      if (data.categories) saveCategories(data.categories);
      if (data.items) saveItems(data.items);
      onDone(true);
    } catch (e) {
      onDone(false);
    }
  };
  reader.readAsText(file);
}

function uid() {
  return "item-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
}
