# The Artloft - Requirements

## Functional
- [x] Separate pages: home, collection, custom orders, about, checkout (shared header and footer).
- [x] Distinctive animated hero, scroll reveals, hover effects, page transitions (respecting reduced motion).
- [x] Collection page with category filters (generated from `js/products.js`).
- [x] Add to bag, change quantity, remove, subtotal. Bag persists across reloads.
- [x] Checkout page (`checkout.html`) form: name, phone, address, payment method, notes, with validation.
- [x] Order sent to WhatsApp as a pre-filled message (no payment gateway).
- [x] Custom order request form sent to WhatsApp.
- [x] Product cards work before photos exist (soft rose panel with category) and show the photo automatically once added.

## Design
- [x] Minimal, elegant, warm; palette exactly as briefed (`#781845`, `#C47B89`, `#B85C38`, `#FFF8F8`, `#FFF0F4`, `#2B2125`).
- [x] Responsive from 360 px phones to wide desktops.
- [x] Visible keyboard focus, skip link, labelled form fields, Escape closes the bag, reduced-motion respected.

## Technical
- [x] Tailwind CSS (compiled locally), vanilla JS, no backend.
- [x] No image placeholders and no external links/images/CDNs. Fonts are bundled locally.
- [x] `images/` folder for the owner's files (`images/logo.png`, `images/products/`).
- [x] Strict CSP, no `innerHTML`, input sanitising, price integrity (see `context.md`).

## Requires owner action
- [ ] Set the real WhatsApp number in `js/config.js`.
- [ ] Replace sample prices and descriptions in `js/products.js`.
- [ ] Add product photos to `images/products/`.
- [ ] Deploy over HTTPS and add the security headers listed in `context.md`.

## Run / build
```
npm install        # once, only needed to rebuild CSS
npm run build      # regenerate css/tailwind.css after editing classes
```
Just opening `index.html` works without Node; `css/tailwind.css` is already built.

## Out of scope (for now)
Payment gateway, user accounts, backend or database, order tracking, shipping calculators.
