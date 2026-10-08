/* Checkout links and downloads.
   FILES: slug -> the app file a buyer downloads after paying (apps with no entry stay "Not on sale yet").
   USE_CHECKOUT: false = use the hand-made Stripe links in PAYMENTS below.
                 true  = every app in FILES buys through /api/checkout (needs STRIPE_SECRET_KEY set in Vercel).
   When true, the download is only released for a paid purchase (see api/download.js). */
const USE_CHECKOUT = false;
const PAYMENTS = {
  "steady-day": "https://buy.stripe.com/eVq00c1dP4whbr69li0RG01"
};
const FILES = {
  "steady-day": "apps/steady-day/index.html"
};
APPS.forEach(a => {
  if (USE_CHECKOUT && FILES[a.slug]) a.buy = "/api/checkout?slug=" + a.slug;
  else if (PAYMENTS[a.slug]) a.buy = PAYMENTS[a.slug];
});
