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
      var remove = A.el("button", "ml-2 rounded-full p-2 text-mulberry/70 transition-colors hover:bg-blush hover:text-mulberry", "");
      remove.type = "button"; remove.setAttribute("aria-label", "Remove " + p.name + " from cart");
      remove.innerHTML = '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M4 7h16"/><path d="M10 11v6M14 11v6"/><path d="M6 7l1 13h10l1-13"/><path d="M9 7V4h6v3"/></svg>';
      remove.addEventListener("click", function () { A.remove(i.id); });
      ctl.appendChild(remove);
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
    if (!A.items().length) return A.showError(err, "Your cart is empty.");
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

  function setupPaymentPicker() {
    var select = $("o-pay"), picker = $("o-pay-picker");
    var trigger = A.el("button", "custom-select-trigger", "");
    trigger.type = "button"; trigger.setAttribute("aria-haspopup", "listbox"); trigger.setAttribute("aria-expanded", "false");
    var label = A.el("span", "", select.options[0].textContent);
    var arrow = A.el("span", "custom-select-arrow", "⌄"); trigger.appendChild(label); trigger.appendChild(arrow);
    var menu = A.el("div", "custom-select-menu"); menu.setAttribute("role", "listbox");
    Array.prototype.forEach.call(select.options, function (option, index) {
      var item = A.el("button", "custom-select-option" + (index === 0 ? " is-selected" : ""), option.textContent);
      item.type = "button"; item.setAttribute("role", "option"); item.setAttribute("aria-selected", String(index === 0));
      item.addEventListener("click", function () {
        select.value = option.value; label.textContent = option.textContent;
        menu.querySelectorAll(".custom-select-option").forEach(function (node) { node.classList.remove("is-selected"); node.setAttribute("aria-selected", "false"); });
        item.classList.add("is-selected"); item.setAttribute("aria-selected", "true");
        menu.classList.remove("is-open"); trigger.setAttribute("aria-expanded", "false");
      });
      menu.appendChild(item);
    });
    trigger.addEventListener("click", function () {
      var open = menu.classList.contains("is-open"); menu.classList.toggle("is-open", !open); trigger.setAttribute("aria-expanded", String(!open));
    });
    document.addEventListener("click", function (e) {
      if (!picker.contains(e.target)) { menu.classList.remove("is-open"); trigger.setAttribute("aria-expanded", "false"); }
    });
    picker.appendChild(trigger); picker.appendChild(menu);
  }

  document.addEventListener("DOMContentLoaded", function () {
    A.fillSelect($("o-pay"), A.CFG.paymentOptions);
    setupPaymentPicker();
    render(); A.onChange(render);
    $("checkout").addEventListener("submit", function (e) { e.preventDefault(); place(); });
    $("clear").addEventListener("click", function () { A.clear(); $("sent").classList.add("hidden"); });
  });
})();
