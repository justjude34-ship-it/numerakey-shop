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
  "steady-day": "apps/steady-day/index.html",
  "comet": "private/comet.html",
  "sanctuary": "private/sanctuary.html",
  "elegy": "private/elegy.html",
  "wind-and-water": "private/wind-and-water.html",
  "synergy": "private/synergy.html",
  "numera": "private/numera.html",
  "goodwin-readings": "private/goodwin-readings.html",
  "nest-light": "private/nest-light.html",
  "night-garden": "private/night-garden.html",
  "first-light": "private/first-light.html",
  "pulse-plus": "private/pulse-plus.html",
  "sacred-address": "private/sacred-address.html",
  "harbor": "private/harbor.html",
  "held": "private/held.html",
  "unspoken": "private/unspoken.html",
  "spirit-breath": "private/spirit-breath.html",
  "paws-of-destiny": "private/paws-of-destiny.html",
  "accord": "private/accord.html",
  "unwritten": "private/unwritten.html",
  "frequency-guide": "private/frequency-guide.html",
  "room-to-breathe": "private/room-to-breathe.html",
  "ember": "private/ember.html"
};
APPS.forEach(a => {
  if (USE_CHECKOUT && FILES[a.slug]) a.buy = "/api/checkout?slug=" + a.slug;
  else if (PAYMENTS[a.slug]) a.buy = PAYMENTS[a.slug];
});
