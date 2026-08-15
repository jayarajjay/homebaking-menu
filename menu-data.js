/*
  ============================================================
  EDIT THIS FILE TO CHANGE YOUR SHOP INFO AND MENU ITEMS
  ============================================================
  You don't need to know how to code. Just:
    1. Find the text between quotes " " and change it.
    2. Keep the commas ( , ) and curly braces ( { } ) exactly
       where they are.
    3. To add a new item, copy one whole { ... } block
       (including the comma after it) and paste it, then
       edit the copy.
    4. Save the file and refresh the website to see changes.

  Tip: You can also do all of this from the "Manage Menu" page
  (admin.html) without touching this file at all — that page
  saves changes on this device automatically.
  ============================================================
*/

const SHOP_INFO = {
  name: "Sweet Home Bakes",
  tagline: "Homemade cakes & bakes, made fresh to order",
  // Shown at the bottom and used for the "Order on WhatsApp" button.
  // Use the full number with country code, no spaces, no +, no leading 0.
  // Example for India: "919876543210"
  whatsappNumber: "919876543210",
  phoneDisplay: "+91 98765 43210",
  instagramHandle: "", // e.g. "sweethomebakes" — leave blank to hide
  address: "Dharapuram, Tamil Nadu",
  // Which days you take orders — shown as a small note near the top.
  note: "Orders close 1 day in advance. Custom designs available on request.",
};

// Categories control the filter chips at the top, in this order.
const CATEGORIES = ["Cakes", "Cookies", "Brownies & Bars", "Breads"];

const MENU_ITEMS = [
  {
    id: "item-1",
    name: "Classic Chocolate Truffle Cake",
    category: "Cakes",
    price: 650,
    unit: "1 kg",
    description: "Rich chocolate sponge layered with dark chocolate ganache.",
    veg: true,
    available: true,
    bestseller: true,
  },
  {
    id: "item-2",
    name: "Fresh Fruit Cream Cake",
    category: "Cakes",
    price: 700,
    unit: "1 kg",
    description: "Soft vanilla sponge with fresh cream and seasonal fruit.",
    veg: true,
    available: true,
    bestseller: false,
  },
  {
    id: "item-3",
    name: "Red Velvet Cake",
    category: "Cakes",
    price: 750,
    unit: "1 kg",
    description: "Classic red velvet with cream cheese frosting.",
    veg: true,
    available: true,
    bestseller: false,
  },
  {
    id: "item-4",
    name: "Butter Cookies",
    category: "Cookies",
    price: 250,
    unit: "250 g box",
    description: "Melt-in-the-mouth eggless butter cookies.",
    veg: true,
    available: true,
    bestseller: true,
  },
  {
    id: "item-5",
    name: "Chocolate Chip Cookies",
    category: "Cookies",
    price: 280,
    unit: "250 g box",
    description: "Chewy centre, crisp edges, loaded with chocolate chips.",
    veg: true,
    available: true,
    bestseller: false,
  },
  {
    id: "item-6",
    name: "Fudgy Brownies",
    category: "Brownies & Bars",
    price: 300,
    unit: "6 pieces",
    description: "Dense, fudgy brownies with walnuts (can be made without nuts).",
    veg: true,
    available: true,
    bestseller: true,
  },
  {
    id: "item-7",
    name: "Banana Walnut Loaf",
    category: "Breads",
    price: 220,
    unit: "1 loaf",
    description: "Soft banana bread with roasted walnuts.",
    veg: true,
    available: true,
    bestseller: false,
  },
];
