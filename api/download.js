/* GET /api/download?s=<checkout session id>  ->  the app file, but only for a paid session. */
const fs = require("fs");
const path = require("path");
const { loadCatalogue, stripe } = require("./_lib");

module.exports = async (req, res) => {
  const fail = (code, msg) => {
    res.statusCode = code;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end(msg);
  };
  try {
    const sid = String((req.query && req.query.s) || "");
    if (!/^cs_(live|test)_[A-Za-z0-9]+$/.test(sid)) return fail(400, "Missing or invalid purchase reference.");

    const session = await stripe("checkout/sessions/" + sid);
    const keyIsLive = /^(sk|rk)_live_/.test(process.env.STRIPE_SECRET_KEY || "");
    if (session.livemode !== keyIsLive) return fail(403, "Purchase not recognised.");
    if (session.payment_status !== "paid") return fail(402, "This purchase has not been paid.");

    const slug = session.metadata && session.metadata.slug;
    const { APPS, FILES } = loadCatalogue();
    const app = APPS.find(a => a.slug === slug);
    if (!app || !FILES[slug] || !/^[a-z0-9-]+$/.test(slug)) return fail(404, "App not found.");

    const filePath = path.join(__dirname, "..", "private", slug + ".html");
    const size = fs.statSync(filePath).size;
    const name = app.name.replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "") + ".html";
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Content-Disposition", 'attachment; filename="' + name + '"');
    res.setHeader("Cache-Control", "private, no-store");
    res.setHeader("Content-Length", String(size));
    /* Stream the file so big apps (Adventure Friends is ~9 MB) are not capped by the buffered response limit. */
    const stream = fs.createReadStream(filePath);
    stream.on("error", e => { console.error("stream failed:", e.message); res.destroy(e); });
    stream.pipe(res);
  } catch (e) {
    console.error("download failed:", e.message);
    fail(500, "Download is not available right now. Email hello@numerakey.com with your receipt and we'll sort it out.");
  }
};
