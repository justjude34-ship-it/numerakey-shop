/* Shared helpers for the shop's payment functions. */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

/* Read the catalogue straight from the shop's own files, so prices and which apps
   are for sale are defined in exactly one place. */
function loadCatalogue() {
  const root = path.join(__dirname, "..");
  const names = ["s1.js","s2.js","s3.js","s4.js","s5.js","s5b.js","s5c.js","s5d.js"];
  const src = names.map(n => fs.readFileSync(path.join(root, n), "utf8")).join("\n;\n")
    + "\n;({ APPS, FILES })";
  return vm.runInNewContext(src, {}, { timeout: 2000 });
}

function stripe(pathAndQuery, formBody) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return fetch("https://api.stripe.com/v1/" + pathAndQuery, {
    method: formBody ? "POST" : "GET",
    headers: {
      Authorization: "Bearer " + key,
      ...(formBody ? { "Content-Type": "application/x-www-form-urlencoded" } : {})
    },
    body: formBody ? formBody.toString() : undefined
  }).then(async r => {
    const j = await r.json();
    if (!r.ok) throw new Error((j.error && j.error.message) || "Stripe error " + r.status);
    return j;
  });
}

module.exports = { loadCatalogue, stripe };
