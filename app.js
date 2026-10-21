(function () {
  "use strict";

  var DATA = window.JUICE_BAR;
  var SHOP = DATA.shop;
  var CART_KEY = "jb-cart-v1";

  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var money = function (n) { return SHOP.currency + " " + Number(n).toLocaleString("en-US"); };
  var byId = {};
  DATA.products.forEach(function (p) { byId[p.id] = p; });

  var ICON = {
    plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    minus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></svg>',
    wa: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm5.8 14.03c-.25.69-1.44 1.32-1.98 1.37-.51.05-.99.24-3.33-.69-2.81-1.11-4.6-3.99-4.74-4.17-.14-.18-1.13-1.5-1.13-2.87 0-1.36.71-2.03.97-2.31.25-.28.55-.35.73-.35l.53.01c.17.01.4-.06.62.48.23.55.78 1.91.85 2.05.07.14.11.3.02.48-.09.18-.14.3-.28.46-.14.16-.29.36-.41.48-.14.14-.28.29-.12.57.16.28.72 1.19 1.55 1.92 1.06.95 1.96 1.24 2.24 1.38.28.14.44.12.6-.07.16-.18.69-.81.88-1.09.18-.28.37-.23.62-.14.25.09 1.6.76 1.88.9.28.14.46.21.53.32.07.12.07.67-.18 1.36Z"/></svg>'
  };

  /* ---------- Table number from the QR link: ?table=5 or #table-5 ---------- */
  function readTable() {
    var t = null;
    try { t = new URLSearchParams(location.search).get("table"); } catch (e) {}
    if (!t) {
      var m = /^#table-([\w.~-]+)$/i.exec(location.hash || "");
      if (m) t = m[1];
    }
    return t ? String(t).slice(0, 12) : null;
  }
  var TABLE = readTable();

  /* ---------- State ---------- */
  var cart = load();
  var filter = { q: "", goal: null };
  var form = { name: "", note: "", type: TABLE && !/^take/i.test(TABLE) ? "dine" : (TABLE ? "take" : "dine"), table: TABLE && !/^take/i.test(TABLE) ? TABLE : "" };

  function load() {
    try {
      var raw = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
      return Array.isArray(raw) ? raw.filter(function (l) { return byId[l.id] && !byId[l.id].soldOut && l.qty > 0; }) : [];
    } catch (e) { return []; }
  }
  function save() { try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {} }

  /* ---------- Drink art ---------- */
  function art(p, cls) {
    var style = 'style="--c1:' + esc(p.color[0]) + ";--c2:" + esc(p.color[1]) + '"';
    if (p.image) return '<span class="art ' + (cls || "") + '" ' + style + '><img src="' + esc(p.image) + '" alt="" loading="lazy"></span>';
    return '<span class="art ' + (cls || "") + '" ' + style + ' aria-hidden="true"><span class="straw"></span><span class="glass"></span>' +
      (p.icon ? '<span class="fruit">' + esc(p.icon) + "</span>" : "") + "</span>";
  }
  function sizes(p) { return Object.keys(p.prices); }
  function minPrice(p) { return Math.min.apply(null, sizes(p).map(function (s) { return p.prices[s]; })); }

  /* ---------- Header ---------- */
  function renderHeader() {
    document.title = SHOP.name;
    $("shopName").textContent = SHOP.name;
    $("shopTagline").textContent = SHOP.tagline;
    var words = SHOP.name.split(/\s+/).filter(function (w) { return w && !/^the$/i.test(w); });
    var initials = /^[A-Z0-9]{2,3}$/.test(words[0] || "") ? words[0] : words.slice(0, 2).map(function (w) { return w[0]; }).join("").toUpperCase();
    $("logoText").textContent = initials || "JB";

    var st = $("openStatus");
    var o = SHOP.hours.open.split(":").map(Number), c = SHOP.hours.close.split(":").map(Number);
    var now = new Date(), mins = now.getHours() * 60 + now.getMinutes();
    var openM = o[0] * 60 + o[1], closeM = c[0] * 60 + c[1];
    var isOpen = !SHOP.closedToday && mins >= openM && mins < closeM;
    st.textContent = SHOP.closedToday ? "Closed today" : isOpen ? "Open now · closes " + clock(c) : "Closed · opens " + clock(o);
    st.classList.toggle("open", isOpen);
    var note = $("notice");
    if (note) { note.textContent = SHOP.notice || ""; note.hidden = !SHOP.notice; }

    if (TABLE) {
      var chip = $("tableChip");
      chip.textContent = /^take/i.test(TABLE) ? "Takeaway" : "Table " + TABLE;
      chip.hidden = false;
    }
  }
  function clock(hm) {
    var h = hm[0], m = hm[1], ap = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return h + ":" + (m < 10 ? "0" : "") + m + " " + ap;
  }

  /* ---------- Specials ---------- */
  function renderSpecials() {
    var list = DATA.products.filter(function (p) { return p.special && !p.soldOut; });
    $("specials").innerHTML = list.map(function (p) {
      return '<button type="button" class="special" data-open="' + esc(p.id) + '" style="--c1:' + esc(p.color[0]) + ";--c2:" + esc(p.color[1]) + '">' +
        "<span><span class=\"eyebrow\">Today's special</span><span class=\"sp-name\">" + esc(p.name) + "</span><span class=\"sp-desc\">" + esc(p.desc) + '</span>' +
        '<span class="pill">' + money(minPrice(p)) + " · Order</span></span>" + art(p) + "</button>";
    }).join("");
  }

  /* ---------- Goals ---------- */
  function renderGoals() {
    var goals = ["All"].concat(DATA.goals || []);
    $("goals").innerHTML = goals.map(function (g) {
      var on = (g === "All" && !filter.goal) || g === filter.goal;
      return '<button type="button" class="goal" data-goal="' + esc(g) + '" aria-pressed="' + on + '">' + esc(g) + "</button>";
    }).join("");
  }

  /* ---------- Menu ---------- */
  // A search always looks through every drink in every category and ignores the goal filter,
  // so a drink is found even if the customer had picked the wrong filter before searching.
  var catName = {};
  DATA.categories.forEach(function (c) { catName[c.id] = [c.name, c.si].join(" "); });
  function matches(p) {
    if (filter.q) {
      var hay = [p.name, p.si, p.desc, catName[p.cat]].concat(p.ingredients || [], p.goals || []).join(" ").toLowerCase();
      return filter.q.split(/\s+/).every(function (w) { return hay.indexOf(w) >= 0; });
    }
    return !filter.goal || (p.goals || []).indexOf(filter.goal) >= 0;
  }

  function card(p) {
    var multi = sizes(p).length > 1;
    return '<article class="card' + (p.soldOut ? " sold" : "") + '">' +
      '<button type="button" class="card-open" data-open="' + esc(p.id) + '" aria-label="' + esc(p.name) + ', details"></button>' +
      art(p) +
      '<div class="card-body"><h3>' + esc(p.name) + '</h3>' + (p.si ? '<span class="si">' + esc(p.si) + "</span>" : "") +
      '<div class="price">' + (multi ? "<small>from</small>" : "") + money(minPrice(p)) + "</div>" +
      '<div class="tags">' + (p.goals || []).slice(0, 2).map(function (g) { return '<span class="tag">' + esc(g) + "</span>"; }).join("") + "</div></div>" +
      (p.soldOut ? '<span class="sold-badge">Sold out today</span>'
        : '<button type="button" class="add" data-quick="' + esc(p.id) + '" aria-label="Add ' + esc(p.name) + '">' + ICON.plus + "</button>") +
      "</article>";
  }

  var visibleCats = [];
  function renderMenu() {
    visibleCats = [];
    var html = DATA.categories.map(function (c) {
      var items = DATA.products.filter(function (p) { return p.cat === c.id && matches(p); });
      if (!items.length) return "";
      visibleCats.push({ cat: c, n: items.length });
      return '<section class="section" id="cat-' + esc(c.id) + '" aria-labelledby="h-' + esc(c.id) + '">' +
        '<div class="section-head"><h2 id="h-' + esc(c.id) + '">' + esc(c.name) + "</h2>" + (c.si ? '<span class="si">' + esc(c.si) + "</span>" : "") + "</div>" +
        '<div class="list">' + items.map(card).join("") + "</div></section>";
    }).join("");
    if (filter.q) {
      var found = visibleCats.reduce(function (a, v) { return a + v.n; }, 0);
      html = (found ? '<p class="result-note">' + found + (found === 1 ? " drink" : " drinks") + ' found for “' + esc(filter.q) + '” <span>· searching all categories</span></p>' : "") + html;
    }
    $("menu").innerHTML = html;
    $("empty").hidden = visibleCats.length > 0;
    $("cats").innerHTML = visibleCats.map(function (v, i) {
      return '<button type="button" class="cat' + (i === 0 ? " active" : "") + '" data-jump="' + esc(v.cat.id) + '">' + esc(v.cat.name) + "</button>";
    }).join("");
    $("cats").hidden = visibleCats.length === 0;
    renderDial();
    watchSections();
  }

  /* ---------- Scroll spy for the category rail ---------- */
  var observer = null, activeCat = null;
  function watchSections() {
    if (observer) observer.disconnect();
    activeCat = visibleCats.length ? visibleCats[0].cat.id : null;
    if (!("IntersectionObserver" in window)) return;
    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) setActive(e.target.id.replace("cat-", ""));
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    document.querySelectorAll(".section").forEach(function (s) { observer.observe(s); });
  }
  function setActive(id) {
    if (id === activeCat) return;
    activeCat = id;
    var rail = $("cats");
    rail.querySelectorAll(".cat").forEach(function (b) {
      var on = b.getAttribute("data-jump") === id;
      b.classList.toggle("active", on);
      if (on) rail.scrollTo({ left: b.offsetLeft - 16, behavior: "smooth" });
    });
  }
  function jump(id) {
    var el = $("cat-" + id);
    if (!el) return;
    setActive(id);
    el.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  }

  /* ---------- Bottom-right menu dial ---------- */
  function renderDial() {
    $("dial").innerHTML = visibleCats.slice().reverse().map(function (v, i) {
      return '<button type="button" data-jump="' + esc(v.cat.id) + '" style="animation-delay:' + (i * 30) + 'ms">' + esc(v.cat.name) + " <span>" + v.n + "</span></button>";
    }).join("");
  }
  function toggleDial(open) {
    var btn = $("menuBtn"), dial = $("dial");
    open = open == null ? dial.hidden : open;
    if (open) {
      dial.querySelectorAll("button").forEach(function (b) { b.classList.toggle("active", b.getAttribute("data-jump") === activeCat); });
    }
    dial.hidden = !open;
    btn.setAttribute("aria-expanded", String(open));
    var scrim = $("scrim");
    if (open) { scrim.hidden = false; scrim.classList.add("light"); scrim.dataset.for = "dial"; }
    else if (scrim.dataset.for === "dial") { scrim.hidden = true; scrim.classList.remove("light"); scrim.dataset.for = ""; }
  }

  /* ---------- Sheets ---------- */
  var openSheet = null, lastFocus = null;
  function showSheet(el) {
    if (openSheet) hideSheet(true);
    toggleDial(false);
    lastFocus = document.activeElement;
    var scrim = $("scrim");
    scrim.hidden = false; scrim.classList.remove("light"); scrim.dataset.for = "sheet";
    el.hidden = false; el.classList.remove("closing");
    openSheet = el;
    document.body.classList.add("locked");
    var f = el.querySelector(".sheet-close");
    if (f) f.focus({ preventScroll: true });
  }
  function hideSheet(instant) {
    if (!openSheet) return;
    var el = openSheet;
    openSheet = null;
    var scrim = $("scrim");
    scrim.hidden = true; scrim.dataset.for = "";
    document.body.classList.remove("locked");
    var done = function () { el.hidden = true; el.classList.remove("closing"); };
    if (instant || matchMedia("(prefers-reduced-motion: reduce)").matches) done();
    else { el.classList.add("closing"); setTimeout(done, 180); }
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }

  /* ---------- Product sheet ---------- */
  var draft = null;
  function openProduct(id) {
    var p = byId[id];
    if (!p) return;
    var sz = sizes(p);
    var opts = SHOP.options || {};
    draft = { id: p.id, size: sz[0], sugar: (opts.sugar || [])[0] || "", ice: (opts.ice || [])[0] || "", qty: 1 };

    function seg(name, values, pricing) {
      return '<div class="seg" role="radiogroup">' + values.map(function (v, i) {
        return '<label><input type="radio" name="' + name + '" value="' + esc(v) + '"' + (i === 0 ? " checked" : "") + ">" +
          "<span>" + esc(v) + (pricing ? " <small>" + money(p.prices[v]) + "</small>" : "") + "</span></label>";
      }).join("") + "</div>";
    }

    var el = $("productSheet");
    el.innerHTML =
      '<div class="grab" aria-hidden="true"></div>' +
      '<button type="button" class="sheet-close" data-close aria-label="Close">' + ICON.close + "</button>" +
      '<div class="sheet-scroll">' +
        '<div class="ps-hero">' + art(p, "art-lg") + '<div><h2 id="psName">' + esc(p.name) + "</h2>" + (p.si ? '<div class="si">' + esc(p.si) + "</div>" : "") +
        '<div class="tags">' + (p.goals || []).map(function (g) { return '<span class="tag">' + esc(g) + "</span>"; }).join("") + "</div></div></div>" +
        '<p class="ps-desc">' + esc(p.desc) + "</p>" +
        '<div class="block"><h3>Health benefits</h3><ul class="benefits">' + (p.benefits || []).map(function (b) { return "<li>" + ICON.check + "<span>" + esc(b) + "</span></li>"; }).join("") + "</ul></div>" +
        '<div class="block"><h3>Ingredients</h3><div class="chips">' + (p.ingredients || []).map(function (x) { return '<span class="chip">' + esc(x) + "</span>"; }).join("") + "</div></div>" +
        (p.soldOut ? '<div class="note-sold">Sold out today. Please check again tomorrow.</div>' :
          (sz.length > 1 ? '<div class="block"><h3>Size</h3>' + seg("size", sz, true) + "</div>" : "") +
          (opts.sugar && opts.sugar.length ? '<div class="block"><h3>Sugar</h3>' + seg("sugar", opts.sugar) + "</div>" : "") +
          (opts.ice && opts.ice.length ? '<div class="block"><h3>Ice</h3>' + seg("ice", opts.ice) + "</div>" : "")) +
      "</div>" +
      (p.soldOut ? "" :
        '<div class="sheet-foot">' +
          '<div class="stepper"><button type="button" data-step="-1" aria-label="One less">' + ICON.minus + '</button><output id="psQty">1</output><button type="button" data-step="1" aria-label="One more">' + ICON.plus + "</button></div>" +
          '<button type="button" class="btn-primary" id="psAdd"></button>' +
        "</div>");
    updateDraft();
    showSheet(el);
  }
  function updateDraft() {
    if (!draft) return;
    var p = byId[draft.id];
    var q = $("psQty"), add = $("psAdd");
    if (q) q.textContent = draft.qty;
    if (add) add.textContent = "Add to order · " + money(p.prices[draft.size] * draft.qty);
  }

  /* ---------- Cart ---------- */
  function keyOf(l) { return [l.id, l.size, l.sugar, l.ice].join("|"); }
  function addLine(line) {
    var k = keyOf(line);
    var hit = cart.filter(function (l) { return keyOf(l) === k; })[0];
    if (hit) hit.qty += line.qty; else cart.push(line);
    save(); renderCartButton(true);
    toast(line.qty + " × " + byId[line.id].name + " added");
  }
  function quickAdd(id) {
    var p = byId[id], opts = SHOP.options || {};
    addLine({ id: id, size: sizes(p)[0], sugar: (opts.sugar || [])[0] || "", ice: (opts.ice || [])[0] || "", qty: 1 });
  }
  function totals() {
    return cart.reduce(function (a, l) { a.n += l.qty; a.sum += byId[l.id].prices[l.size] * l.qty; return a; }, { n: 0, sum: 0 });
  }
  function renderCartButton(bump) {
    var t = totals(), btn = $("cartBtn");
    btn.hidden = t.n === 0;
    $("cartCount").textContent = t.n;
    $("cartTotal").textContent = money(t.sum);
    btn.setAttribute("aria-label", "View your order, " + t.n + " items, " + money(t.sum));
    if (bump) { btn.classList.remove("bump"); void btn.offsetWidth; btn.classList.add("bump"); }
  }
  function optsText(l) {
    var p = byId[l.id], bits = [];
    if (sizes(p).length > 1) bits.push(l.size);
    var o = SHOP.options || {};
    if (l.sugar && o.sugar && l.sugar !== o.sugar[0]) bits.push(l.sugar.toLowerCase());
    if (l.ice && o.ice && l.ice !== o.ice[0]) bits.push(l.ice.toLowerCase());
    return bits.join(", ");
  }

  function renderCart() {
    var el = $("cartSheet"), t = totals();
    var body;
    if (!cart.length) {
      body = '<div class="cart-empty"><p class="empty-title">Your order is empty</p><p>Tap + on any drink to add it.</p></div>';
    } else {
      body = '<ul class="lines">' + cart.map(function (l, i) {
        var p = byId[l.id], o = optsText(l);
        return '<li class="line">' + art(p) +
          '<div><div class="line-name">' + esc(p.name) + "</div>" + (o ? '<div class="line-opts">' + esc(o) + "</div>" : "") +
          '<div class="line-price">' + money(p.prices[l.size] * l.qty) + "</div></div>" +
          '<div class="stepper"><button type="button" data-line="' + i + '" data-d="-1" aria-label="One less ' + esc(p.name) + '">' + ICON.minus + "</button><output>" + l.qty +
          '</output><button type="button" data-line="' + i + '" data-d="1" aria-label="One more ' + esc(p.name) + '">' + ICON.plus + "</button></div></li>";
      }).join("") + "</ul>" +
      '<div class="form">' +
        '<div class="field"><span>Order type</span><div class="seg" role="radiogroup">' +
          '<label><input type="radio" name="otype" value="dine"' + (form.type === "dine" ? " checked" : "") + "><span>Dine in</span></label>" +
          '<label><input type="radio" name="otype" value="take"' + (form.type === "take" ? " checked" : "") + "><span>Takeaway</span></label>" +
        "</div></div>" +
        '<div class="row-2">' +
          '<label class="field" id="tableField"' + (form.type === "dine" ? "" : " hidden") + '><span>Table number</span><input id="fTable" inputmode="numeric" autocomplete="off" placeholder="e.g. 5" value="' + esc(form.table) + '"></label>' +
          '<label class="field"><span>Your name (optional)</span><input id="fName" autocomplete="given-name" placeholder="e.g. Kasun" value="' + esc(form.name) + '"></label>' +
        "</div>" +
        '<label class="field"><span>Note for the kitchen (optional)</span><textarea id="fNote" rows="2" placeholder="e.g. one without ice">' + esc(form.note) + "</textarea></label>" +
      "</div>" +
      '<p class="how">WhatsApp opens with your order already typed. Tap Send to place it. Pay at the counter.</p>' +
      '<button type="button" class="clear" id="clearCart">Remove all items</button>';
    }
    el.innerHTML =
      '<div class="grab" aria-hidden="true"></div>' +
      '<button type="button" class="sheet-close" data-close aria-label="Close">' + ICON.close + "</button>" +
      '<div class="sheet-scroll"><div class="cart-head"><h2 id="cartTitle">Your order</h2>' + (t.n ? '<span class="muted">' + t.n + (t.n === 1 ? " item" : " items") + "</span>" : "") + "</div>" + body + "</div>" +
      (cart.length ?
        '<div class="sheet-foot cart-foot"><div class="total-row"><span>Total</span><strong id="cartSum">' + money(t.sum) + "</strong></div>" +
        '<a class="btn-primary btn-wa" id="waBtn" target="_blank" rel="noopener" href="' + esc(waLink()) + '">' + ICON.wa + "Order on WhatsApp</a></div>"
        : "");
  }
  function refreshWa() {
    var a = $("waBtn");
    if (a) a.href = waLink();
  }

  /* ---------- WhatsApp message ---------- */
  function buildMessage() {
    var t = totals(), lines = [];
    lines.push("*New order · " + SHOP.name + "*");
    lines.push(form.type === "dine" ? (form.table ? "Dine in · Table " + form.table : "Dine in") : "Takeaway");
    lines.push("");
    cart.forEach(function (l) {
      var p = byId[l.id], o = optsText(l);
      lines.push(l.qty + " × " + p.name + (o ? " (" + o + ")" : "") + " – " + money(p.prices[l.size] * l.qty));
    });
    lines.push("");
    lines.push("*Total: " + money(t.sum) + "*");
    if (form.name) lines.push("Name: " + form.name);
    if (form.note) lines.push("Note: " + form.note);
    return lines.join("\n");
  }
  function waLink() {
    return "https://wa.me/" + String(SHOP.whatsapp).replace(/\D/g, "") + "?text=" + encodeURIComponent(buildMessage());
  }

  /* ---------- Footer ---------- */
  function renderFooter() {
    var links = [];
    if (SHOP.mapUrl) links.push('<a href="' + esc(SHOP.mapUrl) + '" target="_blank" rel="noopener">Directions</a>');
    if (SHOP.instagram) links.push('<a href="' + esc(SHOP.instagram) + '" target="_blank" rel="noopener">Instagram</a>');
    if (SHOP.facebook) links.push('<a href="' + esc(SHOP.facebook) + '" target="_blank" rel="noopener">Facebook</a>');
    $("foot").innerHTML = "<h2>" + esc(SHOP.name) + "</h2>" +
      "<p>" + (SHOP.address ? esc(SHOP.address) + "<br>" : "") + "Open daily " + clock(SHOP.hours.open.split(":").map(Number)) + " to " + clock(SHOP.hours.close.split(":").map(Number)) + "</p>" +
      '<div class="foot-links">' + links.join("") + "</div>" +
      '<p class="fine">Prices in Sri Lankan rupees. Health benefits are general information, not medical advice.</p>';

    var cr = SHOP.credit;
    if (cr && cr.name) {
      var who = cr.url
        ? '<a class="credit-btn" href="' + esc(cr.url) + '" target="_blank" rel="noopener">' + esc(cr.name) + ' <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg></a>'
        : '<span class="credit-btn">' + esc(cr.name) + "</span>";
      $("credit").innerHTML = '<span class="credit-label">' + esc(cr.label || "Designed by") + "</span> " + who;
      $("credit").hidden = false;
    }
  }

  /* ---------- Toast ---------- */
  var toastTimer;
  function toast(msg) {
    var t = $("toast");
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("show"); }, 1800);
  }

  /* ---------- Events ---------- */
  document.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target.closest("button, a") : null;
    if (!t) return;
    if (t.hasAttribute("data-open")) return openProduct(t.getAttribute("data-open"));
    if (t.hasAttribute("data-quick")) return quickAdd(t.getAttribute("data-quick"));
    if (t.hasAttribute("data-jump")) { toggleDial(false); return jump(t.getAttribute("data-jump")); }
    if (t.hasAttribute("data-goal")) {
      var g = t.getAttribute("data-goal");
      filter.goal = g === "All" ? null : g;
      renderGoals(); renderMenu(); return;
    }
    if (t.hasAttribute("data-close")) return hideSheet();
    if (t.hasAttribute("data-step") && draft) {
      draft.qty = Math.max(1, Math.min(20, draft.qty + Number(t.getAttribute("data-step"))));
      return updateDraft();
    }
    if (t.id === "psAdd" && draft) {
      addLine({ id: draft.id, size: draft.size, sugar: draft.sugar, ice: draft.ice, qty: draft.qty });
      return hideSheet();
    }
    if (t.hasAttribute("data-line")) {
      var i = Number(t.getAttribute("data-line"));
      cart[i].qty += Number(t.getAttribute("data-d"));
      if (cart[i].qty <= 0) cart.splice(i, 1);
      save(); renderCartButton(); renderCart();
      if (!cart.length) setTimeout(hideSheet, 600);
      return;
    }
    if (t.id === "clearCart") { cart = []; save(); renderCartButton(); renderCart(); return; }
    if (t.id === "cartBtn") { renderCart(); return showSheet($("cartSheet")); }
    if (t.id === "menuBtn") return toggleDial();
    if (t.id === "clearFilters") { filter = { q: "", goal: null }; $("search").value = ""; $("specials").hidden = false; $("goals").hidden = false; renderGoals(); renderMenu(); return; }
    if (t.id === "waBtn") {
      toast("Order sent to WhatsApp. Tap Send there ✓");
      // The WhatsApp link already carries the order, so empty the cart for the next customer.
      setTimeout(function () { cart = []; save(); renderCartButton(); hideSheet(); }, 800);
    }
  });

  $("scrim").addEventListener("click", function () {
    if (this.dataset.for === "dial") toggleDial(false); else hideSheet();s
  });

  document.addEventListener("change", function (e) {
    var el = e.target;
    if (!draft || !el.name) return;
    if (el.name === "size" || el.name === "sugar" || el.name === "ice") { draft[el.name] = el.value; updateDraft(); }
  });
  document.addEventListener("change", function (e) {
    if (e.target.name !== "otype") return;
    form.type = e.target.value;
    var tf = $("tableField"); if (tf) tf.hidden = form.type !== "dine";
    refreshWa();
  });
  document.addEventListener("input", function (e) {
    var id = e.target.id;
    if (id === "fName") form.name = e.target.value.trim();
    else if (id === "fNote") form.note = e.target.value.trim();
    else if (id === "fTable") form.table = e.target.value.trim();
    else if (id === "search") {
      filter.q = e.target.value.trim().toLowerCase();
      var searching = !!filter.q;
      if (searching && filter.goal) { filter.goal = null; renderGoals(); }
      $("specials").hidden = searching;
      $("goals").hidden = searching;
      renderMenu();
      if (searching) {
        var box = document.querySelector(".search").getBoundingClientRect();
        if (box.top < 0) window.scrollTo({ top: window.scrollY + box.top - 12 });
      }
      return;
    } else return;
    refreshWa();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (openSheet) hideSheet(); else if (!$("dial").hidden) toggleDial(false);
  });

  // Swipe a sheet down to close it
  (function () {
    var y0 = null, sheet = null;
    document.addEventListener("touchstart", function (e) {
      var s = e.target.closest && e.target.closest(".sheet");
      if (!s) return;
      var sc = s.querySelector(".sheet-scroll");
      if (sc && sc.contains(e.target) && sc.scrollTop > 0) return;
      y0 = e.touches[0].clientY; sheet = s;
    }, { passive: true });
    document.addEventListener("touchmove", function (e) {
      if (y0 == null) return;
      var dy = e.touches[0].clientY - y0;
      if (dy > 0) sheet.style.transform = "translateY(" + dy + "px)";
    }, { passive: true });
    document.addEventListener("touchend", function (e) {
      if (y0 == null) return;
      var dy = e.changedTouches[0].clientY - y0;
      sheet.style.transform = "";
      if (dy > 90) hideSheet();
      y0 = null; sheet = null;
    });
  })();

  // Hairline under the category rail once it sticks
  window.addEventListener("scroll", function () {
    var c = $("cats");
    c.classList.toggle("stuck", c.getBoundingClientRect().top <= 1);
  }, { passive: true });

  /* ---------- Live menu from a Google Sheet (optional) ----------
     When shop.sheet.menuCsv / settingsCsv hold "Publish to web" CSV links,
     the page loads menu.js first, then replaces it with the sheet's data.
     If the sheet cannot be reached, the menu.js data stays. */
  var SHEET = SHOP.sheet || {};
  var lastSheetLoad = 0;

  function parseCsv(text) {
    var rows = [], row = [], cell = "", q = false;
    for (var i = 0; i < text.length; i++) {
      var ch = text[i];
      if (q) {
        if (ch === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else q = false; }
        else cell += ch;
      } else if (ch === '"') q = true;
      else if (ch === ",") { row.push(cell); cell = ""; }
      else if (ch === "\n" || ch === "\r") {
        if (ch === "\r" && text[i + 1] === "\n") i++;
        row.push(cell); rows.push(row); row = []; cell = "";
      } else cell += ch;
    }
    if (cell !== "" || row.length) { row.push(cell); rows.push(row); }
    return rows.filter(function (r) { return r.some(function (c) { return c.trim() !== ""; }); });
  }
  function toObjects(rows) {
    if (!rows.length) return [];
    var head = rows[0].map(function (h) { return h.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, ""); });
    return rows.slice(1).map(function (r) {
      var o = {};
      head.forEach(function (h, i) { o[h] = (r[i] || "").trim(); });
      return o;
    });
  }
  var yes = function (v) { return /^(yes|y|true|1|ok|✓|✔|ඔව්)$/i.test(String(v || "").trim()); };
  var list = function (v) { return String(v || "").split(",").map(function (x) { return x.trim(); }).filter(Boolean); };
  var slug = function (s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "item"; };
  function time24(v) {
    var m = /^(\d{1,2})[:.](\d{2})(?::\d{2})?\s*([ap]\.?m\.?)?$/i.exec(String(v || "").trim());
    if (!m) return null;
    var h = Number(m[1]) % 24, ap = (m[3] || "").toLowerCase();
    if (ap.charAt(0) === "p" && h < 12) h += 12;
    if (ap.charAt(0) === "a" && h === 12) h = 0;
    return (h < 10 ? "0" : "") + h + ":" + m[2];
  }
  function phone(v) {
    var d = String(v || "").replace(/\D/g, "");
    if (/^0\d{9}$/.test(d)) d = "94" + d.slice(1);
    else if (/^7\d{8}$/.test(d)) d = "94" + d;
    return d;
  }

  // Colours and icons for drinks the sheet does not set: reuse menu.js by name, else guess by fruit.
  var KNOWN = {};
  DATA.products.forEach(function (p) { KNOWN[p.name.toLowerCase()] = p; });
  var GUESS = [
    [/mango|අඹ/i, ["#ffc93c", "#ff9a1f"], "🥭"], [/avocado|අලිපේර/i, ["#c8e59a", "#7fb04a"], "🥑"],
    [/banana|කෙසෙල්/i, ["#fff0b0", "#f2cf5b"], "🍌"], [/choc|milo/i, ["#a9744f", "#5c3620"], "🍫"],
    [/strawberry|dragon|faluda|rose/i, ["#ffb3c6", "#e0457a"], "🍓"], [/watermelon|කොමඩු/i, ["#ff8a8a", "#e8384f"], "🍉"],
    [/orange|දොඩම/i, ["#ffb547", "#ff8a00"], "🍊"], [/lime|lemon|දෙහි/i, ["#e6f59a", "#a8cf45"], "🍋"],
    [/pineapple|අන්නාසි/i, ["#ffe36e", "#f5b700"], "🍍"], [/carrot|කැරට්/i, ["#ffa45c", "#f2701c"], "🥕"],
    [/coffee|කෝපි/i, ["#c9a27e", "#7a4f2e"], "☕"], [/ice cream|අයිස්/i, ["#ffe3ec", "#ff8fb3"], "🍨"],
    [/vanilla/i, ["#fff3d6", "#f0d9a0"], ""], [/passion|පැෂන්/i, ["#ffd25e", "#e89a0c"], ""],
    [/green|aloe|gotukola|nelli/i, ["#d4f0a0", "#6cbf4a"], "🌿"]
  ];
  var PALETTE = [["#ffb3c6", "#e0457a"], ["#ffd25e", "#e89a0c"], ["#c8e59a", "#7fb04a"], ["#ffa45c", "#f2701c"], ["#b9c3ff", "#5a6ad6"]];
  function looks(name, i) {
    var k = KNOWN[name.toLowerCase()];
    if (k) return { color: k.color, icon: k.icon, base: k };
    for (var g = 0; g < GUESS.length; g++) if (GUESS[g][0].test(name)) return { color: GUESS[g][1], icon: GUESS[g][2], base: null };
    return { color: PALETTE[i % PALETTE.length], icon: "", base: null };
  }

  function applyMenu(rows) {
    var cats = [], catIndex = {}, products = [], used = {};
    rows.forEach(function (r, i) {
      var name = r.name || r.product || r.drink;
      var cat = r.category;
      if (!name || !cat) return;
      if (/^(no|hide|hidden|නැත)$/i.test(r.show || "")) return;
      var cid = slug(cat);
      if (!catIndex[cid]) { catIndex[cid] = { id: cid, name: cat, si: r.category_sinhala || "" }; cats.push(catIndex[cid]); }
      else if (!catIndex[cid].si && r.category_sinhala) catIndex[cid].si = r.category_sinhala;
      var prices = {};
      var base = Number(String(r.price || "").replace(/[^0-9.]/g, ""));
      var large = Number(String(r.large_price || "").replace(/[^0-9.]/g, ""));
      if (!base) return;
      if (large) { prices.Regular = base; prices.Large = large; } else prices.Regular = base;
      var look = looks(name, i), b = look.base || {};
      var id = b.id || slug(name);
      while (used[id]) id += "-2";
      used[id] = true;
      var color = [r.color_top || look.color[0], r.color_bottom || look.color[1]];
      products.push({
        id: id, cat: cid, name: name, si: r.sinhala_name || b.si || "",
        desc: r.description || b.desc || "",
        prices: prices,
        ingredients: r.ingredients ? list(r.ingredients) : (b.ingredients || []),
        benefits: r.benefits ? list(r.benefits) : (b.benefits || []),
        goals: r.goals ? list(r.goals) : (b.goals || []),
        color: color, icon: r.icon || look.icon, image: r.photo || r.image || "",
        special: yes(r.special), soldOut: yes(r.sold_out)
      });
    });
    if (!products.length) return false;
    DATA.categories = cats;
    DATA.products = products;
    byId = {};
    products.forEach(function (p) { byId[p.id] = p; });
    cart = cart.filter(function (l) { return byId[l.id] && !byId[l.id].soldOut && byId[l.id].prices[l.size]; });
    save();
    return true;
  }

  function applySettings(rows) {
    var s = {};
    rows.forEach(function (r) { if (r.setting) s[r.setting.toLowerCase().replace(/[^a-z0-9]+/g, "_")] = r.value || ""; });
    if (s.shop_name) SHOP.name = s.shop_name;
    if (s.tagline) SHOP.tagline = s.tagline;
    if (phone(s.whatsapp_number)) SHOP.whatsapp = phone(s.whatsapp_number);
    var o = time24(s.open_time), c = time24(s.close_time);
    if (o && c) SHOP.hours = { open: o, close: c };
    if ("address" in s) SHOP.address = s.address;
    if ("google_maps_link" in s) SHOP.mapUrl = s.google_maps_link;
    if ("instagram" in s) SHOP.instagram = s.instagram;
    if ("facebook" in s) SHOP.facebook = s.facebook;
    SHOP.closedToday = yes(s.closed_today);
    SHOP.notice = s.notice || "";
  }

  function fetchText(url) {
    var sep = url.indexOf("?") >= 0 ? "&" : "?";
    return fetch(url + sep + "t=" + Date.now(), { cache: "no-store" }).then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.text();
    });
  }

  // The last sheet copy is kept on the phone, so a returning customer sees the
  // latest menu at once and the fresh copy only redraws the page if it changed.
  var SHEET_KEY = "jb-sheet-v1";
  var sheetCache = {};
  try { sheetCache = JSON.parse(localStorage.getItem(SHEET_KEY) || "{}") || {}; } catch (e) {}
  if (sheetCache.src !== SHEET.menuCsv + "|" + SHEET.settingsCsv) sheetCache = {};

  function applySheet(menuText, settingsText) {
    var changed = false;
    if (settingsText) { applySettings(toObjects(parseCsv(settingsText))); changed = true; }
    if (menuText && applyMenu(toObjects(parseCsv(menuText)))) changed = true;
    return changed;
  }

  function loadSheet() {
    if (!SHEET.menuCsv && !SHEET.settingsCsv) return;
    lastSheetLoad = Date.now();
    Promise.all([
      SHEET.menuCsv ? fetchText(SHEET.menuCsv).catch(function () { return null; }) : null,
      SHEET.settingsCsv ? fetchText(SHEET.settingsCsv).catch(function () { return null; }) : null
    ]).then(function (res) {
      var menuText = res[0] && res[0] !== sheetCache.menu ? res[0] : null;
      var settingsText = res[1] && res[1] !== sheetCache.settings ? res[1] : null;
      if (!menuText && !settingsText) return;
      if (applySheet(menuText, settingsText)) renderAll();
      if (menuText) sheetCache.menu = menuText;
      if (settingsText) sheetCache.settings = settingsText;
      sheetCache.src = SHEET.menuCsv + "|" + SHEET.settingsCsv;
      try { localStorage.setItem(SHEET_KEY, JSON.stringify(sheetCache)); } catch (e) {}
    });
  }
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible" && Date.now() - lastSheetLoad > 60000) loadSheet();
  });

  function renderAll() {
    renderHeader();
    renderSpecials();
    renderGoals();
    renderMenu();
    renderFooter();
    renderCartButton();
  }

  /* ---------- Boot ---------- */
  try { applySheet(sheetCache.menu, sheetCache.settings); } catch (e) { sheetCache = {}; }
  renderAll();
  loadSheet();
})();
