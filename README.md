# Sweet Home Bakes — Menu Website

A simple, fast menu website for a home bakery. Customers browse the
menu by category and tap "Order" to message you on WhatsApp directly.
It works on phones, tablets, laptops and desktops — and can be
"installed" like an app on a phone's home screen.

No sign-ups, no backend server, no monthly fees required.

---

## What's in this folder

| File | What it's for |
|---|---|
| `index.html` | The page customers see (the menu). |
| `admin.html` | A private page for you to add/edit/remove menu items — "Manage menu". |
| `menu-data.js` | The starting menu, in plain text. Safe to edit by hand. |
| `styles.css` | All the colors, fonts and layout. |
| `site.js` / `admin.js` / `storage.js` | The logic that makes it work. |
| `manifest.json` / `sw.js` / `icons/` | Makes the site installable as an "app". |

---

## 1. Try it on your own computer first

You don't need to install anything special. Just double-click
`index.html` and it will open in your browser. Click around, then
open `admin.html` the same way to try adding an item.

(A few features, like "install as app", only work once it's hosted
online with a real address — that's normal, do this step just to
check everything looks right.)

## 2. Put in your real shop details

Easiest way: open the site, go to **Manage menu** (link at the very
bottom of the page), and fill in:
- Shop name, tagline, WhatsApp number, phone number, address
- Your menu items — name, category, price, description

Everything you type there is saved automatically on that device.

Alternative: open `menu-data.js` in Notepad (Windows) or TextEdit
(Mac, turn off rich text) and edit the text between quotes directly.
The file has comments explaining each part.

**Important about your WhatsApp number:** use the full number with
the country code and no spaces, +, or leading 0.
Example: an Indian number `98765 43210` becomes `919876543210`.

## 3. Put your site online (so anyone can visit it)

This is a set of plain files, so any free static hosting works. The
simplest option:

**Netlify (drag-and-drop, no account needed to try):**
1. Go to https://app.netlify.com/drop
2. Drag this whole folder onto the page.
3. You'll instantly get a live web address you can share, like
   `https://your-bakery-123.netlify.app`.
4. Create a free Netlify account to keep the site permanently and
   later set a nicer address (e.g. `sweethomebakes.netlify.app`) or
   connect your own domain name.

Other equally good free options if you prefer: **GitHub Pages** or
**Vercel** — search "[option name] deploy static site" for a guide,
the steps are similarly drag-and-drop or a few clicks.

## 4. "Install" it as an app

Once it's online, open the live link on a phone:
- **Android (Chrome):** tap the menu (⋮) → "Add to Home screen" /
  "Install app".
- **iPhone (Safari):** tap the Share icon → "Add to Home Screen".
- **Desktop (Chrome/Edge):** click the install icon (⊕) in the
  address bar.

This adds a real app icon that opens full-screen, without needing
an app store. This is the recommended path for an MVP — a native
App Store / Play Store app is a much bigger, slower, and often paid
undertaking, and isn't needed to get customers browsing and ordering.

## 5. How the "Manage menu" page works

- Go to `admin.html` (linked at the bottom of the menu page).
- Add, edit, delete items and categories, mark things "sold out",
  and update your shop details — all with simple forms, no code.
- Changes save automatically to that device's browser storage.

**Good to know about local storage (as requested for this MVP):**
- Changes made in "Manage menu" on your phone stay on your phone,
  and are separate from changes made on your laptop. They are not
  automatically synced between devices.
- Clearing your browser's site data/history can erase them.
- Use the **Export backup** button after making changes — it
  downloads a small file you can keep safe or **Import** on another
  device to copy your menu over.
- If you'd rather have one shared menu that updates everywhere
  instantly (recommended once you're past the MVP stage), the next
  step is adding a small free database — happy to help with that
  when you're ready.

## 6. Customizing the look

All colors and fonts are defined at the top of `styles.css` under
`:root`. Changing a color there (e.g. `--plum`, `--honey`) updates
it everywhere on the site automatically.

## Vegetarian marker

Menu items can be marked "Vegetarian" (small green square) in
Manage Menu. If you'd like a non-vegetarian marker too, or other
dietary tags (eggless, gluten-free, etc.), just ask and it's a
small addition.

---

Questions or want changes (new sections, photos for each item,
Instagram feed, online payment, multi-device syncing, etc.) — just
ask.
