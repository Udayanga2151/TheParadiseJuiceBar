# The Paradise Juice Bar website

A one-page, mobile-first menu site. Customers scan a QR code, browse drinks, and send their order on WhatsApp.

## Files

| File | What it is |
| --- | --- |
| `menu.js` | **All menu data.** Shop name, WhatsApp number, hours, categories, drinks, prices, ingredients, benefits. Edit this to change anything on the menu. |
| `index.html` | The page structure. |
| `styles.css` | Colours, fonts and layout. Colours are at the top (`:root`). |
| `app.js` | Menu, cart and WhatsApp logic. No need to edit. |

`menu.js` holds the real Paradise menu (41 drinks). If a Google Sheet is linked, the sheet wins and `menu.js` is the backup.

## Edit the menu from Google Sheets (recommended)

Prices, drinks, specials, sold-out items and open/close times can be changed from a Google Sheet, with no code.
Steps (Sinhala): `guides/google-sheet-setup.md`. Going live (local server, hosting, domain, testing, handover): `guides/go-live-guide.md`. Template: `sheet-template/paradise-menu-sheet.xlsx`.

## Common changes (all in `menu.js`)

- **WhatsApp number:** `whatsapp: "94740419546"` → country code + number, no `+`, no leading `0`.
- **Price:** change the numbers in `prices: { Regular: 450, Large: 650 }`. A drink with one size: `prices: { Regular: 250 }`.
- **Sold out today:** add `soldOut: true` to a drink.
- **Today's special:** add `special: true` to a drink.
- **Real photo:** put the photo in an `images/` folder and set `image: "images/mango.webp"`.
- **New drink:** copy one `{ ... }` block, give it a new `id`, and set `cat` to a category id.

## Speed

The whole site is about 22 KB gzipped. Fonts load without blocking the first paint, and the last Google Sheet copy is cached on the phone so the menu shows instantly before the fresh sheet arrives.

## QR codes

Make one QR per table that points to your site with the table number:

- Table 5 → `https://yourdomain.com/?table=5`
- Takeaway counter → `https://yourdomain.com/?table=takeaway`

The table number is added to the WhatsApp message automatically.

## Hosting (free)

Upload this folder to Cloudflare Pages, Netlify (drag and drop) or GitHub Pages. No server or database is needed.

To preview on your computer, open `index.html` in a browser.
