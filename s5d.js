/* Checkout links and downloads.
   PAYMENTS: slug -> Stripe Payment Link. An app with no entry stays "Not on sale yet".
   FILES:    slug -> the single HTML file a buyer downloads after paying.
   After paying, Stripe sends the buyer to  #/thanks/<slug>  which shows the download. */
const PAYMENTS = {
  "steady-day": "https://buy.stripe.com/eVq00c1dP4whbr69li0RG01"
};
const FILES = {
  "steady-day": "apps/steady-day/index.html"
};
APPS.forEach(a => { if (PAYMENTS[a.slug]) a.buy = PAYMENTS[a.slug]; });
