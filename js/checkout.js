(function () {
  "use strict";
  var A = window.Artloft, $ = function (i) { return document.getElementById(i); };

  function render() {
    var items = A.items(), list = $("lines"); list.textContent = "";
    items.forEach(function (i) {
      var p = A.byId[i.id], li = A.el("li", "flex items-center justify-between gap-3 py-4");
      var info = A.el("div"); info.appendChild(A.el("p", "font-display text-xl font-semibold", p.name));
      info.appendChild(A.el("p", "text-sm text-espresso/60", A.money(p.price) + " each"));
      var ctl = A.el("div", "flex items-center gap-2");
      [["\u2212", -1, "Remove one "], ["+", 1, "Add one "]].forEach(function (d, k) {
        var b = A.el("button", "h-8 w-8 rounded-full border border-rose/50 transition-colors hover:bg-blush", d[0]);
        b.type = "button"; b.setAttribute("aria-label", d[2] + p.name);
        b.addEventListener("click", function () { A.change(i.id, d[1]); });
        ctl.appendChild(b); if (k === 0) ctl.appendChild(A.el("span", "w-6 text-center", String(i.qty)));
      });
      li.appendChild(info); li.appendChild(ctl); li.appendChild(A.el("span", "w-24 text-right text-mulberry", A.money(p.price * i.qty)));
      list.appendChild(li);
    });
    var has = items.length > 0;
    $("empty").classList.toggle("hidden", has); $("filled").classList.toggle("hidden", !has);
    $("subtotal").textContent = A.money(A.total());
  }

  function place() {
    var err = $("o-error"); A.hideError(err);
    var name = A.clean($("o-name").value, 60), phone = A.clean($("o-phone").value, 20), addr = A.clean($("o-address").value, 250),
        notes = A.clean($("o-notes").value, 300), pay = A.CFG.paymentOptions.indexOf($("o-pay").value) >= 0 ? $("o-pay").value : A.CFG.paymentOptions[0];
    if (!A.items().length) return A.showError(err, "Your bag is empty.");
    if (name.length < 2) return A.showError(err, "Please enter your full name.");
    if (!/^[+0-9\s-]{7,20}$/.test(phone)) return A.showError(err, "Please enter a valid phone number.");
    if (addr.length < 10) return A.showError(err, "Please enter your full delivery address and city.");
    var L = ["*New order - " + A.CFG.brand + "*", "", "Name: " + name, "Phone: " + phone, "Address: " + addr, "Payment: " + pay, "", "*Items*"];
    A.items().forEach(function (i, n) { var p = A.byId[i.id]; L.push((n + 1) + ". " + p.name + " x " + i.qty + " - " + A.money(p.price * i.qty)); });
    L.push("", "*Subtotal: " + A.money(A.total()) + "* (delivery to be confirmed)"); if (notes) L.push("", "Notes: " + notes);
    var r = A.whatsapp(L);
    if (r) return A.showError(err, r);
    $("sent").classList.remove("hidden");
  }

  document.addEventListener("DOMContentLoaded", function () {
    A.fillSelect($("o-pay"), A.CFG.paymentOptions);
    render(); A.onChange(render);
    $("checkout").addEventListener("submit", function (e) { e.preventDefault(); place(); });
    $("clear").addEventListener("click", function () { A.clear(); $("sent").classList.add("hidden"); });
  });
})();
