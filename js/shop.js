(function () {
  "use strict";
  var A = window.Artloft, grid = document.getElementById("grid"), box = document.getElementById("filters");
  var limit = parseInt(grid.getAttribute("data-limit") || "0", 10);
  var cats = ["All"].concat(A.categories()), active = "All";
  var h = decodeURIComponent((location.hash || "").slice(1));
  if (box && cats.indexOf(h) > 0) active = h;

  function card(p, idx) {
    var art = A.el("div", "fallback-art relative aspect-[4/3] overflow-hidden rounded-xl");
    var label = A.el("span", "absolute inset-0 flex items-center justify-center font-display text-xl italic text-mulberry/60", p.cat);
    art.appendChild(label);
    var img = new Image(); img.alt = p.name; img.loading = "lazy"; img.decoding = "async";
    img.className = "zoom absolute inset-0 h-full w-full object-cover";
    img.addEventListener("load", function () { label.remove(); });
    img.addEventListener("error", function () { img.remove(); });
    img.src = "images/products/" + p.image; art.appendChild(img);

    var w = A.el("article", "reveal lift rounded-2xl bg-cream p-2 pb-4");
    w.style.setProperty("--d", (idx % 3) * 90 + "ms");
    w.appendChild(art);
    var row = A.el("div", "mt-3 flex items-baseline justify-between gap-3 px-1");
    row.appendChild(A.el("h3", "font-display text-xl font-semibold", p.name));
    row.appendChild(A.el("span", "whitespace-nowrap text-mulberry", A.money(p.price)));
    w.appendChild(row);
    w.appendChild(A.el("p", "mt-1 px-1 text-xs leading-relaxed text-espresso/70", p.desc));
    var b = A.el("button", "btn btn-ghost ml-1 mt-3 px-3 py-1.5 text-sm", "Add to cart"); b.type = "button";
    b.addEventListener("click", function () { A.add(p.id); A.toast(p.name + " added to your cart"); });
    w.appendChild(b);
    return w;
  }
  function renderGrid() {
    grid.textContent = "";
    var list = A.PRODUCTS.filter(function (p) { return active === "All" || p.cat === active; });
    if (limit) list = list.slice(0, limit);
    list.forEach(function (p, i) { var c = card(p, i); grid.appendChild(c); A.observe ? A.observe(c) : c.classList.add("in"); });
  }
  function renderFilters() {
    if (!box) return; box.textContent = "";
    cats.forEach(function (c) {
      var on = c === active;
      var b = A.el("button", "rounded-full border px-4 py-1.5 text-sm transition-all duration-300 " + (on ? "border-mulberry bg-mulberry text-cream" : "border-rose/50 hover:border-mulberry hover:text-mulberry"), c);
      b.type = "button"; b.setAttribute("aria-pressed", String(on));
      b.addEventListener("click", function () { active = c; renderFilters(); renderGrid(); });
      box.appendChild(b);
    });
  }
  document.addEventListener("DOMContentLoaded", function () { renderFilters(); renderGrid(); });
})();
