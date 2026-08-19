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

  PRICING / SIZES:
  Every item has a "variants" list — one or more sizes with their
  own price. A simple item (only one size) just has one entry:
      variants: [ { unit: "6 pieces", price: 300 } ]
  An item with multiple sizes (like a cake sold by weight) lists
  more than one — customers get buttons to pick the size, and the
  price updates automatically:
      variants: [
        { unit: "1/2 kg", price: 400 },
        { unit: "1 kg", price: 750 },
      ]

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
    variants: [
      { unit: "1/2 kg", price: 400 },
      { unit: "1 kg", price: 650 },
    ],
    description: "Rich chocolate sponge layered with dark chocolate ganache.",
    veg: true,
    available: true,
    bestseller: true,
  },
  {
    id: "item-2",
    name: "Fresh Fruit Cream Cake",
    category: "Cakes",
    variants: [
      { unit: "1/2 kg", price: 420 },
      { unit: "1 kg", price: 700 },
    ],
    description: "Soft vanilla sponge with fresh cream and seasonal fruit.",
    veg: true,
    available: true,
    bestseller: false,
  },
  {
    id: "item-3",
    name: "Red Velvet Cake",
    category: "Cakes",
    variants: [
      { unit: "1/2 kg", price: 450 },
      { unit: "1 kg", price: 750 },
    ],
    description: "Classic red velvet with cream cheese frosting.",
    veg: true,
    available: true,
    bestseller: false,
  },
  {
    id: "item-4",
    name: "Butter Cookies",
    category: "Cookies",
    variants: [{ unit: "250 g box", price: 250 }],
    description: "Melt-in-the-mouth eggless butter cookies.",
    veg: true,
    available: true,
    bestseller: true,
  },
  {
    id: "item-5",
    name: "Chocolate Chip Cookies",
    category: "Cookies",
    variants: [{ unit: "250 g box", price: 280 }],
    description: "Chewy centre, crisp edges, loaded with chocolate chips.",
    veg: true,
    available: true,
    bestseller: false,
  },
  {
    id: "item-6",
    name: "Fudgy Brownies",
    category: "Brownies & Bars",
    variants: [{ unit: "6 pieces", price: 300 }],
    description: "Dense, fudgy brownies with walnuts (can be made without nuts).",
    veg: true,
    available: true,
    bestseller: true,
  },
  {
    id: "item-7",
    name: "Banana Walnut Loaf",
    category: "Breads",
    variants: [{ unit: "1 loaf", price: 220 }],
    description: "Soft banana bread with roasted walnuts.",
    veg: true,
    available: true,
    bestseller: false,
  },
];

