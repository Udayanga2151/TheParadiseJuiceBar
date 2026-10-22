/*
  The Paradise Juice Bar — MENU DATA
  ------------------------------------------------------------
  This is the only file you need to edit to change the menu.
  Categories, drink names and prices come from the shop's menu cards (Oct 2026).
  Descriptions, ingredients and health benefits were written to match each drink:
  please check them. Hours: 8 AM to 9 PM. Location: Google Maps link below.

  - whatsapp: country code + number, no "+" and no leading 0
              (e.g. 0740419546  ->  94740419546)
  - prices:   one entry per size, e.g. { "Regular": 450, "Large": 650 }
              (one size = no size choice is shown)
  - color:    two colours used to draw the drink (top, bottom)
  - image:    optional photo path, e.g. "images/mango.webp"
  - special:  true = shown as "Today's special" at the top
  - soldOut:  true = greyed out and cannot be ordered
*/
window.JUICE_BAR = {
  shop: {
    name: "The Paradise Juice Bar",
    tagline: "Fresh juices, shakes, lassi and bubble tea",
    whatsapp: "94740419546",
    currency: "Rs.",
    hours: { open: "08:00", close: "21:00" },   // 8 AM to 9 PM
    address: "",                                 // e.g. "No. 12, Main Street, Kandy"
    mapUrl: "https://maps.app.goo.gl/zxAxbZAFGAKytTmB6",
    instagram: "",
    facebook: "",

    // Credit line at the very bottom of the page.
    // url: your portfolio link. Leave "" to show the name without a link.
    // Set name: "" to hide the credit line completely.
    credit: {
      label: "Designed & built by",
      name: "Lakshan U. Deshapriya",
      url: "https://udayanga2151.github.io/"
    },
    // Live menu from Google Sheets (see guides/google-sheet-setup.md).
    // Paste the two "Publish to web" CSV links here. Leave "" to use the menu below.
    sheet: {
      menuCsv: "",
      settingsCsv: ""
    },
    options: {
      sugar: ["Normal sugar", "Less sugar", "No sugar"],
      ice: ["With ice", "No ice"]
    }
  },

  goals: ["Immunity", "Energy", "Detox", "Digestion", "Skin", "Hydration"],

  categories: [
    { id: "juice", name: "Fruit Juice", si: "පලතුරු යුෂ" },
    { id: "shakes", name: "Milk Shakes", si: "මිල්ක් ෂේක්" },
    { id: "lassi", name: "Lassi", si: "ලැසී" },
    { id: "bubble", name: "Bubble Tea", si: "බබල් ටී" },
    { id: "icecream", name: "Ice Cream", si: "අයිස්ක්‍රීම්" }
  ],

  products: [
    {"id": "dragon-fruit", "cat": "juice", "name": "Dragon Fruit", "si": "ඩ්‍රැගන් ෆෘට්", "desc": "Bright pink dragon fruit blended fresh.", "prices": {"Regular": 350}, "ingredients": ["Dragon fruit", "Lime", "Sugar syrup"], "benefits": ["Rich in antioxidants", "Source of fibre", "Supports immunity"], "goals": ["Immunity", "Skin"], "color": ["#ff5fa2", "#d6246e"], "icon": "🐉", "special": true},
    {"id": "watermelon", "cat": "juice", "name": "Watermelon", "si": "කොමඩු", "desc": "Fresh watermelon juice, light and cooling.", "prices": {"Regular": 150}, "ingredients": ["Watermelon", "Lime"], "benefits": ["Keeps you hydrated", "Low in calories"], "goals": ["Hydration", "Skin"], "color": ["#ff8a8a", "#e8384f"], "icon": "🍉"},
    {"id": "passion-fruit", "cat": "juice", "name": "Passion Fruit", "si": "පැෂන්", "desc": "Sweet and tangy local passion fruit.", "prices": {"Regular": 150}, "ingredients": ["Passion fruit", "Sugar syrup", "Water"], "benefits": ["Vitamin A and C", "Rich in antioxidants"], "goals": ["Immunity"], "color": ["#ffd25e", "#e89a0c"], "icon": ""},
    {"id": "orange-original", "cat": "juice", "name": "Orange (Original)", "si": "පැණි දොඩම", "desc": "Made with sweet pani dodam oranges.", "prices": {"Regular": 150}, "ingredients": ["Sweet orange"], "benefits": ["High in vitamin C", "Supports immunity"], "goals": ["Immunity", "Energy"], "color": ["#ffb547", "#ff8a00"], "icon": "🍊"},
    {"id": "orange-normal", "cat": "juice", "name": "Orange (Normal)", "si": "දොඩම (සාමාන්‍ය)", "desc": "Classic orange juice.", "prices": {"Regular": 120}, "ingredients": ["Orange", "Sugar syrup"], "benefits": ["Vitamin C boost", "Refreshing"], "goals": ["Immunity"], "color": ["#ffc266", "#f59a1b"], "icon": "🍊"},
    {"id": "lime", "cat": "juice", "name": "Lime Juice", "si": "දෙහි", "desc": "Fresh lime, a simple thirst quencher.", "prices": {"Regular": 100}, "ingredients": ["Lime", "Water", "Sugar"], "benefits": ["Vitamin C", "Aids digestion", "Refreshing on hot days"], "goals": ["Hydration", "Digestion"], "color": ["#e6f59a", "#a8cf45"], "icon": "🍋"},
    {"id": "lemon", "cat": "juice", "name": "Lemon Juice", "si": "ලෙමන්", "desc": "Fresh lemon juice, bright and zesty.", "prices": {"Regular": 100}, "ingredients": ["Lemon", "Water", "Sugar"], "benefits": ["Vitamin C", "Refreshing"], "goals": ["Hydration", "Immunity"], "color": ["#fff59a", "#f2d22e"], "icon": "🍋"},
    {"id": "avocado-juice", "cat": "juice", "name": "Avocado", "si": "අලිපේර", "desc": "Creamy avocado juice, very filling.", "prices": {"Regular": 250}, "ingredients": ["Avocado", "Milk", "Sugar"], "benefits": ["Healthy fats", "Keeps you full longer"], "goals": ["Energy", "Skin"], "color": ["#c8e59a", "#7fb04a"], "icon": "🥑"},
    {"id": "mango-juice", "cat": "juice", "name": "Mango", "si": "අඹ", "desc": "Ripe mango blended smooth.", "prices": {"Regular": 200}, "ingredients": ["Mango", "Water", "Sugar syrup"], "benefits": ["Vitamin A and C", "Natural energy"], "goals": ["Energy", "Immunity"], "color": ["#ffc93c", "#ff9a1f"], "icon": "🥭"},
    {"id": "pineapple", "cat": "juice", "name": "Pineapple", "si": "අන්නාසි", "desc": "Tangy fresh pineapple juice.", "prices": {"Regular": 150}, "ingredients": ["Pineapple", "Sugar syrup"], "benefits": ["Supports digestion", "Vitamin C"], "goals": ["Digestion", "Immunity"], "color": ["#ffe36e", "#f5b700"], "icon": "🍍"},
    {"id": "butterfly-pea", "cat": "juice", "name": "Butterfly Pea", "si": "නිල් කටරොළු", "desc": "Blue butterfly pea flower drink with lime.", "prices": {"Regular": 130}, "ingredients": ["Butterfly pea flower", "Lime", "Sugar"], "benefits": ["Rich in antioxidants", "Caffeine free"], "goals": ["Detox", "Skin"], "color": ["#7a8cff", "#3846c9"], "icon": "🌸"},
    {"id": "hibiscus", "cat": "juice", "name": "Hibiscus", "si": "පොකුරු වදමල්", "desc": "Ruby red hibiscus flower drink.", "prices": {"Regular": 130}, "ingredients": ["Hibiscus flower", "Lime", "Sugar"], "benefits": ["Rich in antioxidants", "Cooling"], "goals": ["Detox", "Hydration"], "color": ["#ff6b8a", "#b3123b"], "icon": "🌺"},
    {"id": "nelli", "cat": "juice", "name": "Nelli", "si": "නෙල්ලි", "desc": "Sri Lankan gooseberry, sharp and healthy.", "prices": {"Regular": 150}, "ingredients": ["Nelli", "Water", "Sugar"], "benefits": ["Very high in vitamin C", "Supports immunity"], "goals": ["Immunity", "Detox"], "color": ["#e2f0a8", "#a9c94f"], "icon": ""},
    {"id": "carrot", "cat": "juice", "name": "Carrot", "si": "කැරට්", "desc": "Fresh carrot juice.", "prices": {"Regular": 150}, "ingredients": ["Carrot", "Lime", "Sugar"], "benefits": ["Rich in beta-carotene", "Good for eyes and skin"], "goals": ["Skin", "Immunity"], "color": ["#ffa45c", "#f2701c"], "icon": "🥕"},
    {"id": "aloe-vera", "cat": "juice", "name": "Aloe Vera", "si": "කෝමාරිකා", "desc": "Cooling aloe vera drink.", "prices": {"Regular": 150}, "ingredients": ["Aloe vera", "Lime", "Sugar"], "benefits": ["Soothing and cooling", "Supports digestion"], "goals": ["Detox", "Digestion"], "color": ["#dff5c9", "#8fcf6a"], "icon": "🌿"},
    {"id": "papaya", "cat": "juice", "name": "Papaya", "si": "ගස්ලබු", "desc": "Sweet papaya, gentle on the stomach.", "prices": {"Regular": 150}, "ingredients": ["Papaya", "Lime"], "benefits": ["Aids digestion", "Vitamin C"], "goals": ["Digestion", "Skin"], "color": ["#ffb27a", "#f2702c"], "icon": ""},
    {"id": "mix-fruit", "cat": "juice", "name": "Mix Fruit", "si": "මිශ්‍ර පලතුරු", "desc": "A blend of seasonal fruits.", "prices": {"Regular": 150}, "ingredients": ["Seasonal fruits", "Sugar syrup"], "benefits": ["Mix of vitamins", "Natural energy"], "goals": ["Energy", "Immunity"], "color": ["#ffb0c0", "#f2643c"], "icon": "🍹"},
    {"id": "wood-apple", "cat": "juice", "name": "Wood Apple", "si": "දිවුල්", "desc": "Classic Sri Lankan divul juice.", "prices": {"Regular": 150}, "ingredients": ["Wood apple", "Jaggery", "Water"], "benefits": ["Good for digestion", "Cooling on hot days"], "goals": ["Digestion", "Hydration"], "color": ["#c9955a", "#8a5a2b"], "icon": ""},
    {"id": "soursop", "cat": "juice", "name": "Soursop", "si": "කටු අනෝදා", "desc": "Creamy, sweet-sour soursop juice.", "prices": {"Regular": 150}, "ingredients": ["Soursop", "Sugar", "Water"], "benefits": ["Vitamin C", "Source of fibre"], "goals": ["Immunity", "Digestion"], "color": ["#f4f6ea", "#d6dcc0"], "icon": ""},
    {"id": "kirala", "cat": "juice", "name": "Kirala", "si": "කිරල", "desc": "Tangy kirala fruit juice, a local favourite.", "prices": {"Regular": 150}, "ingredients": ["Kirala", "Sugar", "Water"], "benefits": ["Refreshing and tangy", "Source of vitamin C"], "goals": ["Hydration", "Immunity"], "color": ["#e7f1b0", "#b5c95a"], "icon": ""},
    {"id": "ms-chocolate", "cat": "shakes", "name": "Milk Shake (Chocolate)", "si": "මිල්ක් ෂේක් (චොකලට්)", "desc": "Thick chocolate milk shake.", "prices": {"Regular": 250}, "ingredients": ["Milk", "Chocolate", "Ice cream"], "benefits": ["Quick energy", "Calcium from milk"], "goals": ["Energy"], "color": ["#a9744f", "#5c3620"], "icon": "🍫"},
    {"id": "ms-faluda", "cat": "shakes", "name": "Milk Shake (Faluda)", "si": "මිල්ක් ෂේක් (ෆලූඩා)", "desc": "Rose faluda flavoured milk shake.", "prices": {"Regular": 250}, "ingredients": ["Milk", "Rose syrup", "Ice cream"], "benefits": ["Calcium from milk", "Cooling"], "goals": ["Energy"], "color": ["#ffc2d6", "#ff6f9f"], "icon": "🌹"},
    {"id": "ms-vanilla", "cat": "shakes", "name": "Milk Shake (Vanilla)", "si": "මිල්ක් ෂේක් (වැනිලා)", "desc": "Classic vanilla milk shake.", "prices": {"Regular": 250}, "ingredients": ["Milk", "Vanilla ice cream"], "benefits": ["Calcium from milk"], "goals": ["Energy"], "color": ["#fff3d6", "#f0d9a0"], "icon": "🍦"},
    {"id": "ms-mango", "cat": "shakes", "name": "Milk Shake (Mango)", "si": "මිල්ක් ෂේක් (අඹ)", "desc": "Ripe mango blended with milk and ice cream.", "prices": {"Regular": 300}, "ingredients": ["Mango", "Milk", "Ice cream"], "benefits": ["Vitamin A", "Calcium from milk"], "goals": ["Energy"], "color": ["#ffd36b", "#ffa62b"], "icon": "🥭"},
    {"id": "ms-avocado", "cat": "shakes", "name": "Milk Shake (Avocado)", "si": "මිල්ක් ෂේක් (අලිපේර)", "desc": "Creamy avocado milk shake.", "prices": {"Regular": 350}, "ingredients": ["Avocado", "Milk", "Ice cream"], "benefits": ["Healthy fats", "Very filling"], "goals": ["Energy", "Skin"], "color": ["#d4ecaa", "#8dbb55"], "icon": "🥑"},
    {"id": "ms-banana", "cat": "shakes", "name": "Milk Shake (Banana)", "si": "මිල්ක් ෂේක් (කෙසෙල්)", "desc": "Banana milk shake.", "prices": {"Regular": 250}, "ingredients": ["Banana", "Milk", "Ice cream"], "benefits": ["Potassium", "Quick energy"], "goals": ["Energy"], "color": ["#fff0b0", "#f2cf5b"], "icon": "🍌"},
    {"id": "ms-milo", "cat": "shakes", "name": "Milk Shake (Milo)", "si": "මිල්ක් ෂේක් (මයිලෝ)", "desc": "Milo malt chocolate milk shake.", "prices": {"Regular": 250}, "ingredients": ["Milo", "Milk", "Ice cream"], "benefits": ["Quick energy", "Calcium from milk"], "goals": ["Energy"], "color": ["#b88a64", "#6e4428"], "icon": "🥤"},
    {"id": "lassi-mango", "cat": "lassi", "name": "Mango Lassi", "si": "අඹ ලැසී", "desc": "Yoghurt blended with ripe mango.", "prices": {"Regular": 400}, "ingredients": ["Yoghurt", "Mango", "Sugar"], "benefits": ["Probiotic yoghurt", "Vitamin A"], "goals": ["Digestion", "Energy"], "color": ["#ffd77a", "#ffad33"], "icon": "🥭", "special": true},
    {"id": "lassi-avocado", "cat": "lassi", "name": "Avocado Lassi", "si": "අලිපේර ලැසී", "desc": "Yoghurt blended with creamy avocado.", "prices": {"Regular": 450}, "ingredients": ["Yoghurt", "Avocado", "Sugar"], "benefits": ["Probiotic yoghurt", "Healthy fats"], "goals": ["Digestion", "Skin"], "color": ["#d9efb4", "#93c062"], "icon": "🥑"},
    {"id": "lassi-vanilla", "cat": "lassi", "name": "Vanilla Lassi", "si": "වැනිලා ලැසී", "desc": "Smooth sweet vanilla lassi.", "prices": {"Regular": 350}, "ingredients": ["Yoghurt", "Vanilla", "Sugar"], "benefits": ["Probiotic yoghurt"], "goals": ["Digestion"], "color": ["#fff6e0", "#efdcae"], "icon": ""},
    {"id": "lassi-chocolate", "cat": "lassi", "name": "Chocolate Lassi", "si": "චොකලට් ලැසී", "desc": "Yoghurt with chocolate.", "prices": {"Regular": 400}, "ingredients": ["Yoghurt", "Chocolate", "Sugar"], "benefits": ["Probiotic yoghurt", "Quick energy"], "goals": ["Digestion", "Energy"], "color": ["#b88a64", "#6e4428"], "icon": "🍫"},
    {"id": "lassi-strawberry", "cat": "lassi", "name": "Strawberry Lassi", "si": "ස්ට්‍රෝබෙරි ලැසී", "desc": "Yoghurt blended with strawberry.", "prices": {"Regular": 350}, "ingredients": ["Yoghurt", "Strawberry", "Sugar"], "benefits": ["Probiotic yoghurt", "Antioxidants"], "goals": ["Digestion", "Skin"], "color": ["#ffb3c6", "#f06292"], "icon": "🍓"},
    {"id": "lassi-banana", "cat": "lassi", "name": "Banana Lassi", "si": "කෙසෙල් ලැසී", "desc": "Yoghurt blended with banana.", "prices": {"Regular": 350}, "ingredients": ["Yoghurt", "Banana", "Sugar"], "benefits": ["Probiotic yoghurt", "Potassium"], "goals": ["Digestion", "Energy"], "color": ["#fff0b0", "#f2cf5b"], "icon": "🍌"},
    {"id": "lassi-passion", "cat": "lassi", "name": "Passion Lassi", "si": "පැෂන් ලැසී", "desc": "Yoghurt with tangy passion fruit.", "prices": {"Regular": 350}, "ingredients": ["Yoghurt", "Passion fruit", "Sugar"], "benefits": ["Probiotic yoghurt", "Vitamin C"], "goals": ["Digestion", "Immunity"], "color": ["#ffe08a", "#f0b323"], "icon": ""},
    {"id": "bt-vanilla", "cat": "bubble", "name": "Vanilla Bubble Tea", "si": "වැනිලා", "desc": "Vanilla milk tea with chewy tapioca pearls.", "prices": {"Regular": 350}, "ingredients": ["Tea", "Milk", "Vanilla", "Tapioca pearls"], "benefits": ["A sweet treat"], "goals": ["Energy"], "color": ["#f6ead2", "#d9bf8c"], "icon": "🧋"},
    {"id": "bt-chocolate", "cat": "bubble", "name": "Chocolate Bubble Tea", "si": "චොකලට්", "desc": "Chocolate milk tea with tapioca pearls.", "prices": {"Regular": 450}, "ingredients": ["Tea", "Milk", "Chocolate", "Tapioca pearls"], "benefits": ["Quick energy"], "goals": ["Energy"], "color": ["#b88a64", "#6e4428"], "icon": "🧋"},
    {"id": "bt-faluda", "cat": "bubble", "name": "Faluda Bubble Tea", "si": "ෆලූඩා", "desc": "Rose faluda milk tea with tapioca pearls.", "prices": {"Regular": 450}, "ingredients": ["Tea", "Milk", "Rose syrup", "Tapioca pearls"], "benefits": ["A sweet treat"], "goals": ["Energy"], "color": ["#ffc2d6", "#ff6f9f"], "icon": "🧋", "special": true},
    {"id": "bt-coffee", "cat": "bubble", "name": "Coffee Bubble Tea", "si": "කෝපි", "desc": "Coffee milk drink with tapioca pearls.", "prices": {"Regular": 450}, "ingredients": ["Coffee", "Milk", "Tapioca pearls"], "benefits": ["Caffeine boost"], "goals": ["Energy"], "color": ["#c9a27e", "#7a4f2e"], "icon": "🧋"},
    {"id": "ic-banana", "cat": "icecream", "name": "Imorich Ice Cream with Banana", "si": "අයිස්ක්‍රීම් කෙසෙල් එක්ක", "desc": "Imorich ice cream served with fresh banana.", "prices": {"Regular": 250}, "ingredients": ["Imorich ice cream", "Banana"], "benefits": ["A cool treat", "Potassium from banana"], "goals": ["Energy"], "color": ["#fff3c4", "#f2cf5b"], "icon": "🍨"},
    {"id": "ic-mango", "cat": "icecream", "name": "Imorich Ice Cream with Mango", "si": "අයිස්ක්‍රීම් අඹ එක්ක", "desc": "Imorich ice cream served with ripe mango.", "prices": {"Regular": 300}, "ingredients": ["Imorich ice cream", "Mango"], "benefits": ["A cool treat", "Vitamin A from mango"], "goals": ["Energy"], "color": ["#ffd36b", "#ffa62b"], "icon": "🍨"},
    {"id": "ic-mixfruit", "cat": "icecream", "name": "Imorich Ice Cream with Mix Fruit", "si": "අයිස්ක්‍රීම් මිශ්‍ර පලතුරු එක්ක", "desc": "Imorich ice cream served with mixed fruit.", "prices": {"Regular": 250}, "ingredients": ["Imorich ice cream", "Mixed fruit"], "benefits": ["A cool treat", "Vitamins from fruit"], "goals": ["Energy"], "color": ["#ffc2d6", "#f2643c"], "icon": "🍨"}
  ]
};
