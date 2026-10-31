/* Shared header, footer, toast, scroll reveals and page transitions. Markup below is a fixed constant (no user data). */
(function () {
  "use strict";
  document.documentElement.classList.add("js");
  var A = window.Artloft;
  var page = document.documentElement.getAttribute("data-page") || "";
  var links = [["shop.html", "Collection", "shop"], ["custom.html", "Custom orders", "custom"], ["about.html", "About", "about"]];

  function nav(cls) {
    return links.map(function (l) {
      return '<a class="link-u ' + cls + '" href="' + l[0] + '"' + (page === l[2] ? ' aria-current="page"' : "") + ">" + l[1] + "</a>";
    }).join("");
  }
  var header = '<header class="sticky top-0 z-30 border-b border-rose/25 bg-cream/90 backdrop-blur"><div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">' +
    '<a href="index.html" class="flex items-center gap-3" aria-label="The Artloft home"><img src="images/logo.png" alt="" class="h-10 w-10 rounded-full"><span class="font-display text-2xl font-semibold text-mulberry">The Artloft</span></a>' +
    '<nav class="hidden items-center gap-8 text-sm md:flex" aria-label="Main">' + nav("py-1 hover:text-mulberry") + "</nav>" +
    '<div class="flex items-center gap-2"><a id="bag-link" href="checkout.html" class="flex items-center gap-2 rounded-full border border-mulberry/40 px-4 py-2 text-sm text-mulberry transition-colors hover:bg-mulberry hover:text-cream" aria-label="Bag and checkout">' +
    '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg><span>Bag</span><span id="bag-count" class="min-w-5 rounded-full bg-mulberry px-1.5 text-center text-xs leading-5 text-cream">0</span></a>' +
    '<button id="menu-btn" type="button" class="rounded-full p-2 md:hidden" aria-label="Menu" aria-expanded="false"><svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 8h16M4 16h16"/></svg></button></div></div>' +
    '<nav id="menu" class="hidden border-t border-rose/20 px-5 py-4 md:hidden" aria-label="Mobile"><div class="flex flex-col gap-4">' + nav("w-fit py-1") + "</div></nav></header>";
  var footer = '<footer class="border-t border-rose/30 py-12 text-center text-sm text-espresso/70"><img src="images/logo.png" alt="The Artloft" class="mx-auto h-20 w-20 rounded-full">' +
    '<p class="mt-4">Handmade crochet. Orders and questions on WhatsApp.</p><p class="mt-3 flex justify-center gap-6">' + nav("py-1 hover:text-mulberry") + '</p><p class="mt-5 text-xs text-espresso/50">&copy; <span id="year"></span> The Artloft. All rights reserved.</p></footer>';

  document.addEventListener("DOMContentLoaded", function () {
    document.body.insertAdjacentHTML("afterbegin", '<a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-mulberry focus:px-4 focus:py-2 focus:text-cream">Skip to content</a>' + header);
    document.body.insertAdjacentHTML("beforeend", footer);
    document.getElementById("year").textContent = String(new Date().getFullYear());

    var toast = A.el("div", "pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 translate-y-4 rounded-full bg-espresso px-5 py-3 text-sm text-cream opacity-0 transition-all duration-300");
    toast.setAttribute("role", "status"); document.body.appendChild(toast);
    var tt; A.toast = function (m) {
      toast.textContent = m; toast.classList.remove("opacity-0", "translate-y-4");
      clearTimeout(tt); tt = setTimeout(function () { toast.classList.add("opacity-0", "translate-y-4"); }, 1800);
    };

    var badge = document.getElementById("bag-count"), last = A.count();
    function sync() {
      var c = A.count(); badge.textContent = String(c);
      if (c > last) { badge.classList.remove("animate-pop"); void badge.offsetWidth; badge.classList.add("animate-pop"); }
      last = c;
    }
    sync(); A.onChange(sync);

    var btn = document.getElementById("menu-btn"), menu = document.getElementById("menu");
    btn.addEventListener("click", function () { var o = menu.classList.toggle("hidden"); btn.setAttribute("aria-expanded", String(!o)); });

    var items = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { threshold: 0.12 });
      items.forEach(function (n) { io.observe(n); });
      A.observe = function (n) { io.observe(n); };
    } else { items.forEach(function (n) { n.classList.add("in"); }); A.observe = function (n) { n.classList.add("in"); }; }

    var track = document.getElementById("marquee");
    if (track) { var c = track.cloneNode(true); c.removeAttribute("id"); c.setAttribute("aria-hidden", "true"); track.parentNode.appendChild(c); }

    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("a[href]");
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target) return;
      var h = a.getAttribute("href");
      if (!/^[a-z0-9-]+\.html(#[\w-]*)?$/i.test(h)) return;
      e.preventDefault(); document.body.classList.add("leaving");
      setTimeout(function () { window.location.href = h; }, 250);
    });
    window.addEventListener("pageshow", function () { document.body.classList.remove("leaving"); });
  });
})();
