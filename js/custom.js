(function () {
  "use strict";
  var A = window.Artloft, $ = function (i) { return document.getElementById(i); };
  document.addEventListener("DOMContentLoaded", function () {
    var select = $("c-type"), picker = $("c-type-picker");
    A.fillSelect(select, A.categories().concat(["Something else"]));
    var trigger = A.el("button", "custom-select-trigger", select.options[0].textContent);
    trigger.type = "button"; trigger.setAttribute("aria-haspopup", "listbox"); trigger.setAttribute("aria-expanded", "false");
    var arrow = A.el("span", "custom-select-arrow", "⌄"); trigger.appendChild(arrow);
    var menu = A.el("div", "custom-select-menu"); menu.setAttribute("role", "listbox");
    Array.prototype.forEach.call(select.options, function (option, index) {
      var item = A.el("button", "custom-select-option" + (index === 0 ? " is-selected" : ""), option.textContent);
      item.type = "button"; item.setAttribute("role", "option"); item.setAttribute("aria-selected", String(index === 0));
      item.addEventListener("click", function () {
        select.value = option.value; trigger.firstChild.textContent = option.textContent;
        menu.querySelectorAll(".custom-select-option").forEach(function (node) { node.classList.remove("is-selected"); node.setAttribute("aria-selected", "false"); });
        item.classList.add("is-selected"); item.setAttribute("aria-selected", "true");
        menu.classList.remove("is-open"); trigger.setAttribute("aria-expanded", "false");
      });
      menu.appendChild(item);
    });
    trigger.addEventListener("click", function () {
      var open = menu.classList.contains("is-open"); menu.classList.toggle("is-open", !open); trigger.setAttribute("aria-expanded", String(!open));
    });
    document.addEventListener("click", function (e) { if (!picker.contains(e.target)) { menu.classList.remove("is-open"); trigger.setAttribute("aria-expanded", "false"); } });
    picker.appendChild(trigger); picker.appendChild(menu);
    $("custom-form").addEventListener("submit", function (e) {
      e.preventDefault(); var err = $("c-error"); A.hideError(err);
      var name = A.clean($("c-name").value, 60), type = A.clean($("c-type").value, 40), d = A.clean($("c-details").value, 600);
      if (name.length < 2) return A.showError(err, "Please enter your name.");
      if (d.length < 10) return A.showError(err, "Please describe your idea in a few words.");
      var r = A.whatsapp(["*Custom request - " + A.CFG.brand + "*", "", "Name: " + name, "Item: " + type, "", d]);
      if (r) A.showError(err, r);
    });
  });
})();
