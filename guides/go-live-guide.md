# Go-live guide: local → hosting → domain → testing → handover

මේ පියවර පිළිවෙළට කරන්න. මුළු වැඩේටම **hosting free**. වියදම domain එකට විතරයි.

---

## 1. Local server එකේ run කරන හැටි

`juice-bar-site.zip` එක unzip කරලා folder එක ඇතුළේ මේ විදිහට run කරන්න.

**Option A: VS Code (ලේසිම ක්‍රමය)**
1. VS Code එකෙන් folder එක open කරන්න (**File → Open Folder**).
2. Extensions එකෙන් **Live Server** install කරන්න.
3. `index.html` right-click → **Open with Live Server**. Browser එකේ site එක open වෙනවා. File එකක් save කළාම page එක ඉබේම reload වෙනවා.

**Option B: Python**
```bash
cd juice-bar-site
python -m http.server 8000
```
Browser එකේ `http://localhost:8000/?table=1` open කරන්න.

**Phone එකෙන් බලන්න (එකම Wi-Fi එකේ):**
1. Computer එකේ IP එක හොයාගන්න. Windows: `ipconfig` (IPv4 Address, උදා: `192.168.1.5`). Mac: `ipconfig getifaddr en0`.
2. Python ක්‍රමයේදී `python -m http.server 8000 --bind 0.0.0.0` විදිහට run කරන්න.
3. Phone එකේ `http://192.168.1.5:8000/?table=3` open කරන්න.
4. Windows Firewall එක ඇහුවොත් **Allow** කරන්න.

> `index.html` double-click කරලා open කළත් menu එක පේනවා. ඒත් real hosting එකට සමානම test එකට local server එකක් පාවිච්චි කරන්න.

---

## 2. Hosting (free): Cloudflare Pages

Recommend කරන්නේ **Cloudflare Pages**. Free, ලංකාවට ළඟ CDN servers තියෙනවා, HTTPS ඉබේම ලැබෙනවා, bandwidth limit එකක් නැහැ.

1. [dash.cloudflare.com](https://dash.cloudflare.com) එකේ account එකක් හදන්න.
2. **Workers & Pages → Create → Pages → Upload assets** යන්න.
3. Project name එකට `paradise-juice-bar` වගේ නමක් දෙන්න.
4. `juice-bar-site` folder එක drag & drop කරලා **Deploy** ඔබන්න.
5. තත්පර කීපයකින් `https://paradise-juice-bar.pages.dev` වගේ link එකක් ලැබෙනවා. Site එක live.

**Update කරන්න:** project එකේ **Create new deployment** කරලා folder එක ආයෙත් upload කරන්න. Link එක වෙනස් වෙන්නේ නැහැ.

**Recommended: GitHub → Cloudflare Pages**
1. GitHub එකේ repo එකක් හදලා site files ඒකට push කරන්න.
2. Cloudflare Pages එකේ **Create → Pages → Connect to Git** කරලා ඒ repo එක තෝරන්න. Build command එක හිස්ව තියන්න, output directory `/`.
3. ඊට පස්සේ GitHub එකට push කරන හැම වෙලාවකම site එක ඉබේම update වෙනවා. වැරදුණොත් පරණ version එකට එක click එකෙන් ආපහු යන්න පුළුවන්.

**විකල්පය: Netlify.** [app.netlify.com/drop](https://app.netlify.com/drop) එකට folder එක drag & drop කළාම ඇති. ඒත් free plan එකේ monthly bandwidth limit එකක් තියෙනවා.

> Google Sheet එක connect කරලා නම් prices/specials වෙනස් කරන්න ආයෙ upload කරන්න ඕන නැහැ. Upload කරන්න ඕන design/code වෙනස් කරද්දී විතරයි.

---

## 3. Domain එක

| Domain | කොහෙන් | සටහන |
| --- | --- | --- |
| `.com` (උදා: `paradisejuicebar.com`) | **Cloudflare Registrar** (dashboard → Domain Registration) | Cost price එකටම දෙනවා, renew price එක වැඩි වෙන්නේ නැහැ. Connect කරන එකත් ලේසිම. |
| `.lk` (උදා: `paradisejuice.lk`) | [domains.lk](https://www.domains.lk) හරි ලංකාවේ hosting company එකක් | ලංකාවේ shop එකකට විශ්වාසය වැඩියි. මිල domains.lk එකේ check කරන්න. |

**Cloudflare Pages එකට connect කරන හැටි:**
1. Pages project එක → **Custom domains → Set up a custom domain**.
2. Domain එක type කරන්න (උදා: `paradisejuicebar.com`), ඊට පස්සේ `www` එකත් add කරන්න.
3. Domain එක Cloudflare එකෙන්ම ගත්තා නම් DNS ඉබේම හැදෙනවා.
4. වෙන තැනකින් (උදා: `.lk`) ගත්තා නම්: Cloudflare එකේ **Add a site** කරලා ඒක දෙන **nameservers දෙක** domain එක ගත්ත තැනේ control panel එකට දාන්න. වැඩ කරන්න පැය කීපයක් (සමහර විට 24h දක්වා) යන්න පුළුවන්.
5. HTTPS (🔒) certificate එක ඉබේම හැදෙනවා.

---

## 4. Google Sheet එක connect කිරීම

`guides/google-sheet-setup.md` එකේ පියවර කරන්න. වැදගත්:
- Sheet එක ඔයාගේ Google account එකේ හදලා යාළුවාට **Editor** access දෙන්න. එතකොට prices ඔවුන්ම වෙනස් කරනවා.
- CSV links දෙක `menu.js` එකේ `sheet` එකට දාලා site එක ආයෙත් upload කරන්න.

---

## 5. QR codes

හැම table එකකටම වෙනම QR එකක්:

- Table 1 → `https://paradisejuicebar.com/?table=1`
- Table 2 → `https://paradisejuicebar.com/?table=2`
- Takeaway counter → `https://paradisejuicebar.com/?table=takeaway`

හදන්න: [qr.io](https://qr.io) / [goqr.me](https://goqr.me) වගේ free generator එකක් හරි Canva (QR code app එක) හරි.
- **Static QR** එකක් හදන්න. සමහර sites "dynamic QR" දීලා පස්සේ සල්ලි ඉල්ලනවා, ඒවා එපා.
- Print size එක අඩුම **3 cm × 3 cm**. QR එක යට "Scan for menu & order" කියලා ලියන්න.
- Laminate කරන්න හරි acrylic stand එකක දාන්න.
- Bulk print කරන්න කලින් එකක් print කරලා phone දෙක තුනකින් scan කරලා බලන්න.

---

## 6. Real testing checklist

Client ට දෙන්න කලින් මේ හැම එකක්ම ✓ කරන්න.

**Devices**
- [ ] Android phone එකක Chrome
- [ ] iPhone එකක Safari
- [ ] පරණ / cheap phone එකක් (slow එකක්)
- [ ] Dark mode on කරපු phone එකක්
- [ ] Mobile data (4G) එකෙන්, Wi-Fi නැතුව

**Order flow**
- [ ] Printed QR එක scan කළාම හරි table number එක cart එකේ පේනවා
- [ ] Drinks කීපයක් cart එකට දාලා **Order on WhatsApp** ඔබන්න. Message එක **shop එකේ number එකට** (0740419546) යනවා, items, qty, total, table number හරි
- [ ] Shop phone එකේ ඒ message එක ලැබෙනවා
- [ ] Search එකෙන් drink එකක් හොයන්න පුළුවන්

**Google Sheet**
- [ ] Sheet එකේ price එකක් වෙනස් කරලා විනාඩි 5කින් site එක reload කළාම අලුත් price එක පේනවා
- [ ] Special `yes` → උඩින් පේනවා. Sold Out `yes` → order කරන්න බැහැ
- [ ] Closed Today `yes` → "Closed today" පේනවා. Notice එකක් දැම්මාම උඩින් පේනවා
- [ ] Open/close time හරි (site එකේ "Open now" / "Closed" හරි වෙලාවට වෙනස් වෙනවා)

**Speed සහ quality**
- [ ] [pagespeed.web.dev](https://pagespeed.web.dev) එකේ site link එක දාලා Mobile score එක බලන්න (90+ ඕන)
- [ ] Footer එකේ address, Maps link, Instagram/Facebook links වැඩ
- [ ] "Designed & built by" button එක ඔයාගේ portfolio එකට යනවා

**Shop එකේ ඇත්තටම test කරන්න:** Table එකක ඉඳගෙන ඇත්ත customer කෙනෙක් වගේ order 2-3ක් දාලා staff එකට ඒවා ලැබිලා handle කරන්න පුළුවන්ද බලන්න.

---

## 7. යාළුවාට handover කිරීම

මේ site එක ඔයා free හදලා දෙන එකක්. Domain එකයි hosting එකයි **ඔයාගේ account වල**. වියදම යාළුවා දෙනවා.

**Accounts**
- [ ] Domain සහ Cloudflare account එක ඔයාගේ email එකෙන්. **2-step verification** on කරන්න.
- [ ] Domain එකේ **Auto-renew on** කරලා card එකක් දාන්න. Renew වෙන date එක calendar එකේ reminder එකක් දාන්න. Expire වුණොත් site එක නවතිනවා.
- [ ] Google Sheet එක ඔයාගේ Google account එකේ හදලා යාළුවාට **Editor** access දෙන්න (Share → email එක → Editor). එතකොට prices ඔවුන්ම වෙනස් කරනවා, ඔයාට අතගාන්න ඕන නැහැ.
- [ ] Domain receipt එක screenshot කරලා යාළුවාට යවන්න. වියදම පැහැදිලිව තියෙනවා.

**යාළුවාට දෙන දේවල්**
- [ ] Live site link එක
- [ ] Printed QR codes (table ගණනට + takeaway)
- [ ] Google Sheet link එක සහ `google-sheet-setup.md` එකේ "Daily පාවිච්චි කරන හැටි" කොටස (print කරලා දෙන්නත් පුළුවන්)

**විනාඩි 10ක training එකක්** (shop owner සහ staff):
1. Sheet එකෙන් price එකක් වෙනස් කරන හැටි
2. Sold out / special දාන හැටි
3. Closed today / notice දාන හැටි
4. WhatsApp order එකක් ආවාම කරන්න ඕන දේ

**ඔයාට (ඉගෙනීමට සහ portfolio එකට)**
- [ ] Code එක GitHub එකේ තියන්න. ඒක ඔයාගේ backup එකයි, history එකයි, portfolio එකයි.
- [ ] Site එකේ screenshots සහ link එක portfolio එකට දාන්න. "Real client project, live in a shop" කියන එක ලොකු දෙයක්.
- [ ] යාළුවාගෙන් කෙටි testimonial එකක් ඉල්ලගන්න.

---

## Go-live කරන්න කලින් තාම ඕන විස්තර

- Real open / close වෙලාවන්
- Shop address සහ Google Maps link
- Instagram / Facebook links (තියෙනවා නම්)
- ඔයාගේ portfolio URL එක (credit button එකට)
- Google Sheet CSV links දෙක
