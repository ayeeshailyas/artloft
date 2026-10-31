(function () {
  "use strict";
  var CFG = window.ARTLOFT_CONFIG, PRODUCTS = window.ARTLOFT_PRODUCTS, KEY = "artloft_cart_v1", MAX = 20;
  var byId = {}; PRODUCTS.forEach(function (p) { byId[p.id] = p; });
  var listeners = [];

  function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text !== undefined) n.textContent = text; return n; }
  function money(n) { return CFG.currency + " " + n.toLocaleString("en-US"); }
  function clean(v, max) { return String(v || "").replace(/[\u0000-\u001F\u007F<>]/g, " ").replace(/\s+/g, " ").trim().slice(0, max); }

  var cart = (function () {
    try {
      var raw = JSON.parse(localStorage.getItem(KEY) || "[]");
      return Array.isArray(raw) ? raw.filter(function (i) { return i && byId[i.id] && Number.isInteger(i.qty) && i.qty > 0 && i.qty <= MAX; })
        .map(function (i) { return { id: i.id, qty: i.qty }; }) : [];
    } catch (e) { return []; }
  })();
  function commit() { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) {} listeners.forEach(function (f) { f(); }); }

  window.Artloft = {
    CFG: CFG, PRODUCTS: PRODUCTS, byId: byId, el: el, money: money, clean: clean,
    items: function () { return cart; },
    count: function () { return cart.reduce(function (s, i) { return s + i.qty; }, 0); },
    total: function () { return cart.reduce(function (s, i) { return s + byId[i.id].price * i.qty; }, 0); },
    add: function (id) {
      if (!byId[id]) return;
      var l = cart.find(function (i) { return i.id === id; });
      if (l) l.qty = Math.min(MAX, l.qty + 1); else cart.push({ id: id, qty: 1 });
      commit();
    },
    change: function (id, d) {
      var l = cart.find(function (i) { return i.id === id; }); if (!l) return;
      l.qty = Math.min(MAX, l.qty + d);
      if (l.qty <= 0) cart = cart.filter(function (i) { return i.id !== id; });
      commit();
    },
    clear: function () { cart = []; commit(); },
    onChange: function (f) { listeners.push(f); },
    whatsapp: function (lines) {
      var n = String(CFG.whatsappNumber).replace(/\D/g, "");
      if (!/^\d{10,15}$/.test(n)) return "WhatsApp number is not set yet. Add it in js/config.js.";
      window.open("https://wa.me/" + n + "?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener,noreferrer");
      return "";
    },
    showError: function (node, msg) { node.textContent = msg; node.classList.remove("hidden"); },
    hideError: function (node) { node.textContent = ""; node.classList.add("hidden"); },
    fillSelect: function (sel, values) { values.forEach(function (v) { var o = document.createElement("option"); o.value = v; o.textContent = v; sel.appendChild(o); }); },
    categories: function () { var c = []; PRODUCTS.forEach(function (p) { if (c.indexOf(p.cat) < 0) c.push(p.cat); }); return c; }
  };
})();
