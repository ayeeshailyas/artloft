/* Shared header, footer, toast, scroll reveals and page transitions. Markup below is a fixed constant (no user data). */
(function () {
  "use strict";
  document.documentElement.classList.add("js");
  var A = window.Artloft;
  var page = document.documentElement.getAttribute("data-page") || "";
  var links = [["index.html", "Home", "home"], ["shop.html", "Collection", "shop"], ["custom.html", "Custom orders", "custom"], ["about.html", "About", "about"]];

  function nav(cls) {
    return links.map(function (l) {
      return '<a class="link-u ' + cls + '" href="' + l[0] + '"' + (page === l[2] ? ' aria-current="page"' : "") + ">" + l[1] + "</a>";
    }).join("");
  }
  var header = '<header class="sticky top-0 z-30 border-b border-rose/25 bg-cream/90 backdrop-blur"><div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">' +
    '<a href="index.html" class="flex items-center gap-3" aria-label="The Artloft home"><img src="images/logo.png" alt="" class="h-10 w-10 rounded-full"><span class="font-display text-2xl font-semibold text-mulberry">The Artloft</span></a>' +
    '<nav class="hidden items-center gap-8 text-sm md:flex" aria-label="Main">' + nav("py-1 hover:text-mulberry") + "</nav>" +
    '<div class="flex items-center gap-2"><a id="bag-link" href="checkout.html" class="flex items-center gap-2 rounded-full border border-mulberry/40 px-4 py-2 text-sm text-mulberry transition-colors hover:bg-mulberry hover:text-cream" aria-label="Cart and checkout">' +
    '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg><span>Cart</span><span id="bag-count" class="min-w-5 rounded-full bg-mulberry px-1.5 text-center text-xs leading-5 text-cream">0</span></a>' +
    '<button id="menu-btn" type="button" class="rounded-full p-2 md:hidden" aria-label="Menu" aria-expanded="false"><svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 8h16M4 16h16"/></svg></button></div></div>' +
    '<nav id="menu" class="mobile-menu border-t border-rose/20 px-5 md:hidden" aria-label="Mobile"><div class="flex flex-col gap-4 py-4">' + nav("w-fit py-1") + "</div></nav></header>";
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

    var whatsapp = A.el("a", "whatsapp-float");
    whatsapp.id = "whatsapp-float";
    whatsapp.href = "#";
    whatsapp.setAttribute("aria-label", "Chat with The Artloft on WhatsApp");
    whatsapp.innerHTML = '<svg class="whatsapp-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.83 11.83 0 0 0 12.08 0C5.55 0 .24 5.31.24 11.84c0 2.09.55 4.13 1.59 5.93L.14 24l6.38-1.67a11.85 11.85 0 0 0 5.56 1.38h.01c6.52 0 11.83-5.31 11.83-11.84 0-3.17-1.23-6.15-3.4-8.39Zm-8.44 18.2h-.01a9.84 9.84 0 0 1-5.02-1.37l-.36-.21-3.79.99 1.01-3.7-.23-.38a9.82 9.82 0 0 1-1.51-5.17C2.17 6.42 6.61 1.98 12.08 1.98a9.8 9.8 0 0 1 6.97 2.89 9.82 9.82 0 0 1 2.89 6.99c0 5.47-4.44 9.82-9.86 9.82Zm5.4-7.35c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.51-1.79-1.69-2.09-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.71.63.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"/></svg>';
    whatsapp.addEventListener("click", function (e) {
      e.preventDefault();
      var error = A.whatsapp(["Hello The Artloft! I would love to know more about your handmade crochet products."]);
      if (error) A.toast(error);
    });
    document.body.appendChild(whatsapp);

    var badge = document.getElementById("bag-count"), last = A.count();
    function sync() {
      var c = A.count(); badge.textContent = String(c);
      if (c > last) { badge.classList.remove("animate-pop"); void badge.offsetWidth; badge.classList.add("animate-pop"); }
      last = c;
    }
    sync(); A.onChange(sync);

    var btn = document.getElementById("menu-btn"), menu = document.getElementById("menu");
    btn.addEventListener("click", function () { var open = menu.classList.toggle("is-open"); btn.setAttribute("aria-expanded", String(open)); });

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
