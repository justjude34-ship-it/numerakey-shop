/* GET /api/checkout?slug=<app>  ->  303 redirect to a Stripe Checkout page for that app. */
const { loadCatalogue, stripe } = require("./_lib");

module.exports = async (req, res) => {
  try {
    const slug = String((req.query && req.query.slug) || "");
    const { APPS, FILES } = loadCatalogue();
    const app = APPS.find(a => a.slug === slug);
    const origin = "https://" + req.headers.host;

    if (!app || app.status !== "live" || !app.ready || !FILES[slug] || !(app.price > 0)) {
      res.statusCode = 303;
      res.setHeader("Location", origin + "/#/app/" + encodeURIComponent(slug));
      return res.end();
    }

    const form = new URLSearchParams();
    form.set("mode", "payment");
    form.set("line_items[0][quantity]", "1");
    form.set("line_items[0][price_data][currency]", "aud");
    form.set("line_items[0][price_data][unit_amount]", String(Math.round(app.price * 100)));
    form.set("line_items[0][price_data][tax_behavior]", "inclusive");
    form.set("line_items[0][price_data][product_data][name]", app.name);
    form.set("metadata[slug]", slug);
    form.set("success_url", origin + "/#/thanks/" + slug + "?s={CHECKOUT_SESSION_ID}");
    form.set("cancel_url", origin + "/#/app/" + slug);

    const session = await stripe("checkout/sessions", form);
    res.statusCode = 303;
    res.setHeader("Location", session.url);
    res.end();
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("Checkout is not available right now. Please try again shortly or email hello@numerakey.com.");
    console.error("checkout failed:", e.message);
  }
};
