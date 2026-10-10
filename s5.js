const APPS = AP1.concat(AP2).concat(AP3).concat(AP4);


/* ==========================================================================
   3. Artwork — the shop's key-bitting mark is used for NumeraKey itself and
      for the category shelves. Each APP instead generates its own piece:
      one of ten geometric systems, in its own colour, both picked from the
      slug, so no two products look alike and none of it is an image file.
   ========================================================================== */
function rng(seed){
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seed.length; i++){ h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
  let x = h || 1;
  return function(){
    x ^= x << 13; x >>>= 0;
    x ^= x >> 17;
    x ^= x << 5;  x >>>= 0;
    return x / 4294967296;
  };
}
function hashBytes(seed, n){
  const r = rng(seed), out = [];
  while (out.length < n) out.push(r());
  return out;
}

/* Each category owns a band of the colour wheel, so a shelf still reads as a
   family while every app inside it sits at its own point on the band. */
const HUES = {
  wellness:[186,256], neuro:[110,150], narc:[338,398], sound:[156,202],
  divine:[256,314],  money:[30,70],   home:[296,348], style:[350,382]
};

const MOTIFS = ["bitting","wave","rings","spokes","field","orbits","lattice","bloom","stack"];
const ART = {};

function artFor(a){
  if (ART[a.slug]) return ART[a.slug];
  const r = rng(a.slug + "|art");
  const band = HUES[a.cat] || [200,290];
  const h1 = (band[0] + r() * (band[1] - band[0])) % 360;
  const h2 = (h1 + 14 + r() * 26) % 360;
  const o = { h1, h2, sat: 58 + r() * 30, motif: "bitting",
              ang: r(), light: 58 + r() * 10 };
  ART[a.slug] = o;
  return o;
}

/* Motif is hashed, then nudged so no two apps on the same shelf collide. */
(function assignMotifs(){
  for (const c of CATEGORIES){
    const used = new Set();
    for (const a of APPS.filter(x => x.cat === c.id)){
      const o = artFor(a);
      let i = Math.floor(rng(a.slug + "|m")() * MOTIFS.length), guard = 0;
      while (used.has(i) && guard++ < MOTIFS.length) i = (i + 1) % MOTIFS.length;
      used.add(i);
      o.motif = MOTIFS[i];
    }
  }
})();

const DRAW = {
  bitting(r, w, h, g){
    const n = Math.max(7, Math.min(46, Math.round(w / 26)));
    const gap = Math.max(1, (w / n) * .16);
    const bw = (w - gap * (n - 1)) / n;
    let o = "";
    for (let i = 0; i < n; i++){
      const t = n > 1 ? i / (n - 1) : .5;
      const bell = .5 + .5 * Math.sin(Math.PI * t);
      const hh = h * (.14 + r() * .8 * bell);
      o += `<rect x="${(i*(bw+gap)).toFixed(2)}" y="${(h-hh).toFixed(2)}" width="${bw.toFixed(2)}" height="${hh.toFixed(2)}" fill="url(#${g})"/>`;
    }
    return o;
  },
  strata(r, w, h, g){
    const n = Math.max(4, Math.min(13, Math.round(h / 13)));
    let y = 0, o = "";
    for (let i = 0; i < n && y < h; i++){
      const bh = (h / n) * (.5 + r() * 1.1);
      const x = r() * w * .22;
      const bw = Math.max(2, w - x - r() * w * .18);
      o += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(1.5,bh*.72).toFixed(1)}" fill="url(#${g})" opacity="${(.25+r()*.7).toFixed(2)}"/>`;
      y += bh;
    }
    return o;
  },
  wave(r, w, h, g){
    const layers = 3 + Math.floor(r() * 3), steps = 46;
    let o = "";
    for (let L = 0; L < layers; L++){
      const amp = h * (.12 + r() * .28), freq = 1 + r() * 3.2, ph = r() * Math.PI * 2;
      const base = h * (.26 + (L / layers) * .58);
      let d = "";
      for (let i = 0; i <= steps; i++){
        const x = w * i / steps;
        const y = base + Math.sin(ph + freq * Math.PI * 2 * i / steps) * amp * (.35 + .65 * Math.sin(Math.PI * i / steps));
        d += (i ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1);
      }
      o += `<path d="${d}" fill="none" stroke="url(#${g})" stroke-width="${(1+r()*2.4).toFixed(2)}" opacity="${(.4+r()*.5).toFixed(2)}"/>`;
    }
    return o;
  },
  rings(r, w, h, g){
    const n = Math.max(1, Math.min(6, Math.round(w / h)));
    let o = "";
    for (let k = 0; k < n; k++){
      const cx = w * (k + .5) / n, cy = h * (.42 + r() * .2), R = h * (.5 + r() * .34);
      const m = 4 + Math.floor(r() * 4);
      for (let i = 0; i < m; i++){
        const rr = R * (i + 1) / m;
        const dash = r() < .45 ? ` stroke-dasharray="${(rr*(.5+r()*1.6)).toFixed(1)} ${(rr*(.3+r()*.9)).toFixed(1)}"` : "";
        o += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${rr.toFixed(1)}" fill="none" stroke="url(#${g})" stroke-width="${(.8+r()*2.6).toFixed(2)}" opacity="${(.35+r()*.6).toFixed(2)}"${dash}/>`;
      }
    }
    return o;
  },
  spokes(r, w, h, g){
    const n = Math.max(1, Math.min(6, Math.round(w / h)));
    let o = "";
    for (let k = 0; k < n; k++){
      const cx = w * (k + .5) / n, cy = h * (.58 + r() * .24), R = h * (.78 + r() * .45);
      const m = 12 + Math.floor(r() * 18);
      for (let i = 0; i < m; i++){
        const ang = Math.PI * (1.06 + (m > 1 ? i / (m - 1) : .5) * .88);
        const len = R * (.35 + r() * .75);
        o += `<line x1="${cx.toFixed(1)}" y1="${cy.toFixed(1)}" x2="${(cx+Math.cos(ang)*len).toFixed(1)}" y2="${(cy+Math.sin(ang)*len).toFixed(1)}" stroke="url(#${g})" stroke-width="${(.8+r()*2.2).toFixed(2)}" opacity="${(.35+r()*.6).toFixed(2)}"/>`;
      }
    }
    return o;
  },
  field(r, w, h, g){
    const cols = Math.max(6, Math.min(52, Math.round(w / 17)));
    const rows = Math.max(3, Math.min(12, Math.round(h / 17)));
    const cw = w / cols, ch = h / rows;
    let o = "";
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++){
      const v = r();
      if (v < .32) continue;
      const s = Math.min(cw, ch) * (.3 + v * .62);
      o += `<rect x="${(x*cw+(cw-s)/2).toFixed(1)}" y="${(y*ch+(ch-s)/2).toFixed(1)}" width="${s.toFixed(1)}" height="${s.toFixed(1)}" fill="url(#${g})" opacity="${(.2+v*.76).toFixed(2)}"/>`;
    }
    return o;
  },
  orbits(r, w, h, g){
    const n = Math.max(1, Math.min(5, Math.round(w / h)));
    let o = "";
    for (let k = 0; k < n; k++){
      const cx = w * (k + .5) / n, cy = h * .5;
      const m = 3 + Math.floor(r() * 4);
      for (let i = 0; i < m; i++){
        const rx = h * (.3 + r() * .58), ry = h * (.12 + r() * .34), rot = r() * 180;
        o += `<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" fill="none" stroke="url(#${g})" stroke-width="${(.8+r()*2).toFixed(2)}" opacity="${(.4+r()*.55).toFixed(2)}" transform="rotate(${rot.toFixed(1)} ${cx.toFixed(1)} ${cy.toFixed(1)})"/>`;
      }
    }
    return o;
  },
  lattice(r, w, h, g){
    let o = "";
    for (let f = 0; f < 2; f++){
      const ang = (f ? 1 : -1) * (12 + r() * 26) * Math.PI / 180;
      const step = Math.max(5, h * (.1 + r() * .12));
      const dx = Math.tan(ang) * h, span = Math.abs(dx);
      for (let x = -span; x < w + span; x += step){
        o += `<line x1="${x.toFixed(1)}" y1="0" x2="${(x+dx).toFixed(1)}" y2="${h}" stroke="url(#${g})" stroke-width="${(.6+r()*1.1).toFixed(2)}" opacity="${(.18+r()*.5).toFixed(2)}"/>`;
      }
    }
    return o;
  },
  bloom(r, w, h, g){
    const n = Math.max(1, Math.min(5, Math.round(w / h)));
    let o = "";
    for (let k = 0; k < n; k++){
      const cx = w * (k + .5) / n, cy = h * .54, R = h * (.34 + r() * .24);
      const petals = 5 + Math.floor(r() * 8);
      for (let i = 0; i < petals; i++){
        const rot = (i / petals) * 360 + r() * 8;
        o += `<ellipse cx="${cx.toFixed(1)}" cy="${(cy-R*.6).toFixed(1)}" rx="${(R*(.16+r()*.16)).toFixed(1)}" ry="${(R*(.55+r()*.5)).toFixed(1)}" fill="url(#${g})" opacity="${(.2+r()*.5).toFixed(2)}" transform="rotate(${rot.toFixed(1)} ${cx.toFixed(1)} ${cy.toFixed(1)})"/>`;
      }
    }
    return o;
  },
  stack(r, w, h, g){
    const n = Math.max(1, Math.min(6, Math.round(w / h)));
    let o = "";
    for (let k = 0; k < n; k++){
      const cx = w * (k + .5) / n;
      const m = 4 + Math.floor(r() * 5);
      for (let i = 0; i < m; i++){
        const t = i / m;
        const bw = h * (.92 - t * .62) * (1 + r() * .16), bh = h * (.9 - t * .6);
        const ox = (r() - .5) * h * .2, oy = (r() - .5) * h * .14;
        o += `<rect x="${(cx-bw/2+ox).toFixed(1)}" y="${(h/2-bh/2+oy).toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" rx="${(bh*.06).toFixed(1)}" fill="none" stroke="url(#${g})" stroke-width="${(.8+r()*2).toFixed(2)}" opacity="${(.3+r()*.6).toFixed(2)}"/>`;
      }
    }
    return o;
  }
};

function coverHTML(a, cls, lite){
  /* three layers: generated artwork, a generated title card, then the app's own
     cover on top. If that cover can't load, the generated one is already there. */
  const gen = `<span class="gen"><span class="gen-name">${esc(a.name)}</span><span class="gen-tag">${esc(a.tag)}</span></span>`;
  const img = a.cover
    ? `<img src="${a.cover}" alt="${esc(a.name)} cover" loading="lazy" decoding="async" onerror="this.remove()">`
    : "";
  const o = artFor(a);
  const bg = `background:hsl(${o.h1.toFixed(0)} 38% 7%)`;
  const art = (lite && a.cover) ? "" : artSVG(a, 1200, 630);
  return `<span class="art ${cls||""}" style="${bg}">${art}${gen}${img}</span>`;
}

function accentOf(a){
  const o = artFor(a);
  return `hsl(${o.h1.toFixed(1)} ${o.sat.toFixed(0)}% ${o.light.toFixed(0)}%)`;
}

function artSVG(a, w, h){
  const o = artFor(a);
  const r = rng(a.slug + "|draw");
  const g  = "k" + Math.random().toString(36).slice(2, 9);
  const gl = g + "g", vg = g + "v", bg = g + "b";
  const c1 = `hsl(${o.h1.toFixed(1)} ${o.sat.toFixed(0)}% ${o.light.toFixed(0)}%)`;
  const c2 = `hsl(${o.h2.toFixed(1)} ${(o.sat*.92).toFixed(0)}% ${(o.light-10).toFixed(0)}%)`;
  const deep = `hsl(${o.h1.toFixed(1)} 46% 7%)`;
  const diag = o.ang < .5;

  /* A cover is a dark field, a soft light in it, a texture, and a vignette.
     The motif is texture here — it sits back so the title can carry the card. */
  return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${esc(a.name)} cover">
    <defs>
      <linearGradient id="${g}" x1="${diag?0:0}" y1="1" x2="${diag?1:0}" y2="0">
        <stop offset="0" stop-color="${c1}" stop-opacity=".18"/>
        <stop offset="1" stop-color="${c2}" stop-opacity=".9"/>
      </linearGradient>
      <linearGradient id="${bg}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${deep}"/>
        <stop offset="1" stop-color="#050408"/>
      </linearGradient>
      <radialGradient id="${gl}" cx="50%" cy="${(38 + r()*16).toFixed(0)}%" r="62%">
        <stop offset="0"   stop-color="${c1}" stop-opacity=".46"/>
        <stop offset=".45" stop-color="${c2}" stop-opacity=".16"/>
        <stop offset="1"   stop-color="${c2}" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="${vg}" cx="50%" cy="50%" r="72%">
        <stop offset=".45" stop-color="#000" stop-opacity="0"/>
        <stop offset="1"   stop-color="#000" stop-opacity=".76"/>
      </radialGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#${bg})"/>
    <rect width="${w}" height="${h}" fill="url(#${gl})"/>
    <g opacity=".42">${DRAW[o.motif](r, w, h, g)}</g>
    <rect width="${w}" height="${h}" fill="url(#${vg})"/>
  </svg>`;
}

/* The key-bitting mark itself — kept for NumeraKey and the shelves. */
function bittingSVG(seed, colour, opts){
  const o = Object.assign({ bars:26, w:600, h:160, floor:.16 }, opts||{});
  const r = hashBytes(seed, o.bars);
  const gap = 2;
  const bw  = (o.w - gap*(o.bars-1)) / o.bars;
  const id  = "g" + Math.random().toString(36).slice(2,8);
  let bars = "";
  for (let i = 0; i < o.bars; i++){
    const t = o.bars > 1 ? i / (o.bars - 1) : .5;
    const bell = 0.55 + 0.45 * Math.sin(Math.PI * t);
    const hgt  = o.h * (o.floor + r[i] * 0.82 * bell);
    bars += `<rect x="${(i*(bw+gap)).toFixed(2)}" y="${(o.h-hgt).toFixed(2)}" width="${bw.toFixed(2)}" height="${hgt.toFixed(2)}" fill="url(#${id})"/>`;
  }
  return `<svg viewBox="0 0 ${o.w} ${o.h}" preserveAspectRatio="none" role="img" aria-label="${seed} key profile">
    <defs><linearGradient id="${id}" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stop-color="${colour}" stop-opacity=".18"/>
      <stop offset="1" stop-color="${colour}" stop-opacity=".92"/>
    </linearGradient></defs>${bars}</svg>`;
}

/* wordmark-scale bitting for the hero: the site's own key */
function heroSVG(){
  const bars = 64, w = 1200, h = 200, gap = 3;
  const r = hashBytes("numerakey", bars);
  const bw = (w - gap*(bars-1)) / bars;
  let out = "";
  for (let i = 0; i < bars; i++){
    const t = i/(bars-1);
    const bell = 0.5 + 0.5*Math.sin(Math.PI*t);
    const hgt = h * (0.12 + r[i]*0.85*bell);
    out += `<rect class="kb" x="${(i*(bw+gap)).toFixed(2)}" y="${(h-hgt).toFixed(2)}" width="${bw.toFixed(2)}" height="${hgt.toFixed(2)}" fill="${ramp(t)}" opacity=".85" style="animation-delay:${i*14}ms"/>`;
  }
  return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true">${out}</svg>`;
}

const STOPS = ["#F4B740","#F2789A","#B478F0","#5CC8F5"];
