# Bottom-right buttons: design එක වැඩ කරන හැටි

Phone එකක් එක අතකින් අල්ලගෙන ඉන්නකොට thumb එක ලේසියෙන්ම යන්නේ screen එකේ **පහළ දකුණු කොනට**. ඒ නිසා වැඩියෙන්ම ඔබන buttons දෙක (Menu සහ Cart) එතනම තියනවා. මේ idea එක ඕනම site එකකට copy කරන්න පුළුවන්.

අලුත් project එකකට copy කරන්න ලේසිම file එක: [thumb-fab-demo.html](thumb-fab-demo.html). ඒකේ CSS, HTML, JS ඔක්කොම එකම file එකක තියෙනවා. Comments 1 සිට 6 දක්වා පහළ කොටස් එක්ක ගැලපෙනවා.

## කොටස් 4

| කොටස | කරන දේ |
| --- | --- |
| **Menu button** (රවුම්, 64px) | හැමවෙලේම පේනවා. Tap කළාම categories list එක උඩට ඇරෙනවා, button එක "Close" වෙනවා. |
| **Cart pill** | Menu එකට වම් පැත්තේ. Cart එක හිස් නම් හැංගිලා. Item එකක් දැම්මාම items ගණන සහ total එක එක්ක පේනවා, පොඩි "bump" animation එකක් එක්ක. |
| **Speed dial** | Menu button එකට උඩින්, දකුණට align කරපු pills list එකක්. Items එකින් එක උඩට එනවා. |
| **Scrim** | Dial එක open වෙද්දී page එක පොඩ්ඩක් අඳුරු කරන layer එකක්. ඒක tap කළාම dial එක වැහෙනවා. |

## Design එකේ වැදගත් කරුණු

1. **`position: fixed` + `right` / `bottom`**: buttons screen එකේ පහළ දකුණු කොනට අලවලා තියනවා. Scroll කළත් එතනමයි.
2. **`env(safe-area-inset-bottom)`**: iPhone වල පහළ home bar එකට buttons යට වෙන්නේ නැහැ.
3. **`pointer-events: none` wrapper එකට, `auto` buttons වලට**: Corner එකේ හිස් ඉඩ නිසා page එකේ links tap කරන්න බාධා වෙන්නේ නැහැ.
4. **`flex-direction: column` + `align-items: flex-end`**: Dial එක button එකට උඩින්, දකුණට align වෙලා stack වෙනවා.
5. **List එක පිටුපසට (bottom-up) ලියනවා**: පළවෙනි category එක thumb එකට ළඟින්ම තියෙන්න.
6. **Tap size 56–64px**: Fingers වලට ලොකු targets.
7. **`animation-delay` එකින් එකට 30ms**: Items එකින් එක ලස්සනට එනවා. `prefers-reduced-motion` තියෙන අයට animation off වෙනවා.

## JavaScript එක (කෙටියෙන්)

- `toggleDial()` එක dial එකයි scrim එකයි `hidden` කරනවා හෝ පෙන්නනවා, `aria-expanded` update කරනවා (screen readers වලට).
- Dial item එකක් tap කළාම dial එක වහලා `scrollIntoView()` එකෙන් ඒ section එකට scroll වෙනවා.
- Scrim එක tap කළාම හරි `Esc` එබුවාම හරි dial එක වැහෙනවා.
- Cart එකට item එකක් දැම්මාම pill එක පෙන්නලා `bump` class එක ආයෙත් දානවා. `void btn.offsetWidth` කියන line එකෙන් animation එක හැම පාරම restart වෙනවා.

## Juice bar site එකේ මේ code එක තියෙන තැන්

- HTML: `index.html` එකේ `<div class="fabs">` කොටස
- CSS: `styles.css` එකේ `/* Floating actions, bottom-right */` කොටස
- JS: `app.js` එකේ `toggleDial()` සහ `renderCartButton()` functions

## වෙනත් sites වලට idea

- Restaurant: Menu + Call / Book table
- Shop: Categories + Cart
- Blog: Contents + Share / Back to top
- Portfolio: Sections + Contact me
