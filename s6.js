function ramp(t){
  t = Math.max(0, Math.min(1, t));
  const n = STOPS.length - 1, x = t*n, i = Math.min(Math.floor(x), n-1), f = x - i;
  const hx = s => [parseInt(s.slice(1,3),16), parseInt(s.slice(3,5),16), parseInt(s.slice(5,7),16)];
  const a = hx(STOPS[i]), b = hx(STOPS[i+1]);
  return `rgb(${a.map((v,j)=>Math.round(v+(b[j]-v)*f)).join(",")})`;
}

/* ==========================================================================
   4. Views
   ========================================================================== */
const cat = id => CATEGORIES.find(c => c.id === id);
const app = slug => APPS.find(a => a.slug === slug);
const money = n => SITE.currency + n;
const buyUrl = a => a.buy || `${SITE.store}/buy/${a.slug}`;
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

function appCard(a){
  const soon = a.status === "soon";
  return `<a class="card" href="#/app/${a.slug}">
    ${coverHTML(a)}
    <span class="card-meta">
      <span class="card-name">${esc(a.name)}</span>
      <span class="card-price ${soon?"soon":""}">${soon ? "Coming soon" : money(a.price)}</span>
    </span>
    <span class="card-desc">${esc(a.desc)}</span>
  </a>`;
}

function viewHome(){
  const live = APPS.filter(a => a.status === "live").length;

  const shelves = CATEGORIES.map(c => {
    const list = APPS.filter(a => a.cat === c.id);
    if (!list.length) return "";
    return `<section class="cat" id="${c.id}">
      <div class="cat-head">
        <h2><a href="#/c/${c.id}">${c.name}</a></h2>
        <span class="count">${esc(c.note)}</span>
      </div>
      <div class="grid">${list.map(appCard).join("")}</div>
    </section>`;
  }).join("");

  /* Three rows of covers drifting at different speeds. Each track holds its
     tiles twice over so the loop closes with no seam. */
  const shuffled = APPS.map(a => ({ a, k: rng(a.slug + "|wall")() }))
                       .sort((x, y) => x.k - y.k).map(o => o.a);
  const rows = [0,1,2].map(n => {
    const tiles = shuffled.filter((_, i) => i % 3 === n);
    const run = tiles.map(a => `<span class="wall-tile">${coverHTML(a, "", true)}</span>`).join("");
    return `<div class="wall-row r${n}"><div class="wall-track">${run}${run}</div></div>`;
  }).join("");

  return `
  <section class="wall">
    <div class="wall-rows" aria-hidden="true">${rows}</div>
    <div class="wall-scrim" aria-hidden="true"></div>
    <div class="wall-copy wrap">
      <h1><span class="spectrum">Apps you buy once<br>and then own.</span></h1>
      <p class="lede">Every NumeraKey app is <strong>a single file</strong>. It runs in your browser, works with the wifi off, keeps your data on your own device, and never asks you to log in. Pay once. It's yours.</p>
    </div>
  </section>
  <div class="keyline">${heroSVG()}</div>
  <nav class="wrap shelf-index" aria-label="Shelves">
    ${CATEGORIES.filter(c => APPS.some(a => a.cat === c.id)).map(c => {
      const n = APPS.filter(a => a.cat === c.id).length;
      return `<a href="#/c/${c.id}"><span class="si-name">${c.name}</span><span class="si-n">${n}</span></a>`;
    }).join("")}
  </nav>
  <div class="wrap hero-meta">
    <span>${live} apps available now</span>
    <span>No subscriptions</span>
    <span>No accounts</span>
    <span>No tracking</span>
    <span>Prices in AUD</span>
  </div>

  <div class="wrap">
    ${shelves}
  </div>

  <div class="wrap why">
    <h2>Why one file</h2>
    <div class="why-grid">
      <div>
        <h3>It can't be taken away</h3>
        <p>The file sits in your downloads folder. If this shop closes tomorrow, every app you bought still opens.</p>
      </div>
      <div>
        <h3>It can't leak what it never sends</h3>
        <p>There is no server, no account and no analytics. What you type stays in the browser on your machine.</p>
      </div>
      <div>
        <h3>It works where you are</h3>
        <p>Phone, laptop, tablet, aeroplane, hospital waiting room. Add it to your home screen and it behaves like any other app.</p>
      </div>
    </div>
  </div>`;
}

function viewCategory(id){
  const c = cat(id);
  if (!c) return viewMissing();
  const list = APPS.filter(a => a.cat === c.id);
  document.title = `${c.name} — NumeraKey`;
  return `
  <div class="wrap"><a class="back" href="#/">← All categories</a></div>
  <div class="banner">${bittingSVG("shelf-"+c.id, c.colour, {bars:40, w:1200, h:170})}</div>
  <div class="wrap">
    <div class="prod-head">
      <p class="eyebrow"><a href="#/">All shelves</a></p>
      <h1><span class="spectrum">${c.name}</span></h1>
      <p class="prod-tag">${esc(c.note)}</p>
    </div>
    <section class="cat cat-flush">
      <div class="grid">${list.map(appCard).join("")}</div>
    </section>
  </div>`;
}

function viewApp(slug){
  const a = app(slug);
  if (!a) return viewMissing();
  const c = cat(a.cat);
  document.title = `${a.name} — NumeraKey`;
  const soon = a.status === "soon";
  return `
  <div class="wrap"><a class="back" href="#/c/${c.id}">← ${c.name}</a></div>
  <div class="cover-hero">${coverHTML(a)}</div>
  <div class="wrap">
    <div class="prod-head">
      <p class="eyebrow"><a href="#/c/${c.id}">${c.name}</a></p>
      <h1><span class="spectrum">${esc(a.name)}</span></h1>
      <p class="prod-tag">${esc(a.tag)}</p>
    </div>
    <div class="prod-body">
      <div class="prod-copy">
        ${a.body.map(p => `<p>${esc(p)}</p>`).join("")}
        <h3 style="margin-top:32px">What's inside</h3>
        <ul class="inside" style="--accent:${accentOf(a)}">
          ${a.inside.map(i => `<li>${esc(i)}</li>`).join("")}
        </ul>
      </div>
      <aside class="buy" style="--accent:${accentOf(a)}">
        <div class="price">${soon ? "Soon" : money(a.price)}</div>
        <p class="once">${soon ? "Not finished yet." : "One payment. No renewal."}</p>
        ${soon
          ? `<span class="btn soon">In development</span>`
          : `<a class="btn" href="${buyUrl(a)}">Buy ${esc(a.name)}</a>`}
        ${(!soon && a.demo) ? `<a class="btn" href="${a.demo}" target="_blank" rel="noopener" style="display:block;margin-top:10px;background:transparent;border:1px solid var(--line-2)">Open ${esc(a.name)}</a>` : ""}
        <ul class="specs">
          ${soon ? `
          <li><span>Status</span><span>In development</span></li>
          <li><span>Price when it lands</span><span>${money(a.price)}</span></li>
          <li><span>Tell me when it's ready</span><span><a href="mailto:${SITE.email}?subject=${encodeURIComponent(a.name)}" style="border-bottom:1px solid var(--line-2)">Email</a></span></li>
          ` : a.ready ? `
          <li><span>Format</span><span>Single HTML file</span></li>
          <li><span>Runs on</span><span>Any modern browser</span></li>
          <li><span>Offline</span><span>Yes</span></li>
          <li><span>Account</span><span>None</span></li>
          <li><span>Updates</span><span>Free, emailed</span></li>
          ` : `
          <li><span>Runs on</span><span>Any modern browser</span></li>
          <li><span>Account</span><span>None</span></li>
          <li><span>Updates</span><span>Free, emailed</span></li>
          `}
        </ul>
        <p class="small muted" style="margin:16px 0 0">Personal licence. <a href="#/licence" style="text-decoration:underline">Read it</a>.</p>
      </aside>
    </div>
  </div>`;
}

