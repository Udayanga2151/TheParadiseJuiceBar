# Google Sheet එකෙන් menu එක update කරන හැටි

Google Sheet එකේ price එකක්, drink එකක්, special එකක්, open/close time එක වෙනස් කළාම website එක ඉබේම update වෙනවා. Code එක අතගාන්න ඕන නැහැ.

Google එකෙන් වෙනස්කම publish කරන්න **විනාඩි 5ක් විතර** යනවා. ඊට පස්සේ customer page එක open කරද්දී හරි reload කරද්දී හරි අලුත් menu එක පේනවා.

## එක පාරක් කරන්න ඕන setup එක

1. `sheet-template/paradise-menu-sheet.xlsx` file එක download කරගන්න. ඒකේ දැනට තියෙන drinks 41 ම තියෙනවා.
2. [drive.google.com](https://drive.google.com) එකට ගිහින් **New → File upload** කරලා ඒ file එක upload කරන්න.
3. Upload වුණු file එක double-click කරලා **Open with → Google Sheets** කරන්න. ඊට පස්සේ **File → Save as Google Sheets** කරන්න.
4. **File → Share → Publish to web** යන්න.
   - පළවෙනි dropdown එකෙන් **Menu** tab එක තෝරන්න.
   - දෙවෙනි dropdown එකෙන් **Comma-separated values (.csv)** තෝරන්න.
   - **Publish** ඔබලා link එක copy කරගන්න.
5. ඒ විදිහටම **Settings** tab එකටත් කරලා දෙවෙනි link එක copy කරගන්න.
6. Links දෙකම මට එවන්න. නැත්නම් ඔයාම `menu.js` එකේ මෙතනට දාන්න:

   ```js
   sheet: {
     menuCsv: "මෙතනට Menu link එක",
     settingsCsv: "මෙතනට Settings link එක"
   },
   ```

7. Website files ආයෙත් hosting එකට upload කරන්න. ඒක කරන්න ඕන එක පාරයි.

## Daily පාවිච්චි කරන හැටි (Menu tab එක)

| Column | කරන දේ |
| --- | --- |
| **Category** | Drink එක තියෙන category එක. අලුත් නමක් ලිව්වොත් අලුත් category එකක් හැදෙනවා. |
| **Category Sinhala** | Category එකේ සිංහල නම (category එකේ පළවෙනි row එකේ විතරක් ලිව්වාම ඇති). |
| **Name** / **Sinhala Name** | Drink එකේ නම. |
| **Price** | Rs. ගණන, numbers විතරයි (උදා: `250`). |
| **Large Price** | Large size එකක් තියෙනවා නම් ඒකේ price එක. හිස් නම් size තෝරන්න දෙන්නේ නැහැ. |
| **Special** | `yes` දැම්මාම "Today's special" එකක් විදිහට උඩින්ම පේනවා. |
| **Sold Out** | `yes` දැම්මාම "Sold out today" කියලා පේනවා, order කරන්න බැහැ. |
| **Show** | `no` දැම්මාම website එකෙන් හැංගෙනවා (row එක delete නොකර). |
| Description, Ingredients, Benefits, Goals | Drink එක tap කළාම පේන විස්තර. Ingredients, Benefits, Goals comma `,` වලින් වෙන් කරන්න. |
| Icon, Photo, Color Top, Color Bottom | Optional. Photo එකට image link එකක් දාන්න පුළුවන්. |

**අලුත් drink එකක්:** අලුත් row එකක් add කරලා අඩුම තරමින් Category, Name, Price පුරවන්න.

## Settings tab එක

| Setting | උදාහරණ |
| --- | --- |
| Open Time / Close Time | `08:00`, `21:00` (නැත්නම් `7:30 AM`) |
| Closed Today | `yes` දැම්මාම "Closed today" කියලා පේනවා |
| Notice | උඩින් පේන message එකක්, උදා: `Mango season special!`. පේන්න ඕන නැත්නම් හිස්ව තියන්න |
| WhatsApp Number | `0740419546` |
| Shop Name, Tagline, Address, Google Maps Link, Instagram, Facebook | ඕන විදිහට |

## මතක තියාගන්න

- පළවෙනි row එකේ තියෙන column නම් සහ tab නම් (**Menu**, **Settings**) වෙනස් කරන්න එපා.
- Sheet එක load වෙන්නේ නැති වුණොත් (internet අවුලක් වගේ), website එකේ `menu.js` එකේ තියෙන menu එක පේනවා. ඒ නිසා site එක කවදාවත් හිස් වෙන්නේ නැහැ.
- Publish කරපු link එක තියෙන ඕනම කෙනෙකුට menu එක බලන්න පුළුවන්. Sheet එක edit කරන්න පුළුවන් ඔයාට විතරයි.
- Claude preview link එකේ sheet එක load වෙන්නේ නැහැ (ඒකේ security නිසා). Real hosting එකේ (Cloudflare Pages, Netlify) වැඩ කරනවා.
