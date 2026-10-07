function viewHow(){
  document.title = "How it works — NumeraKey";
  return `<div class="wrap page">
    <h1><span class="spectrum">How it works</span></h1>
    <p class="lede" style="margin-top:20px">Four steps, and none of them involve a password.</p>
    <h2>1. You buy the app</h2>
    <p><strong>The shop isn't open for orders yet.</strong> The catalogue below is real and the apps are finished, but payment isn't switched on — so nothing can be bought today. Have a look around, and check back shortly.</p>
    <h2>2. You get a file</h2>
    <p>A download link arrives by email straight after payment, along with a copy of your receipt. The file is the app — there is nothing else to install.</p>
    <h2>3. You open it</h2>
    <p>Double-click it on a computer, or open it on your phone and choose <em>Add to Home Screen</em>. From then on it opens like any other app, with or without a connection.</p>
    <h2>4. It stays yours</h2>
    <p>Keep the file. Back it up. Move it between devices. There is no licence check phoning home, so it will keep working long after anyone stops maintaining it.</p>
    <h2>Where your data lives</h2>
    <p>In the browser on the device you opened the file with, and nowhere else. That also means data doesn't follow you between devices, and clearing your browser storage will clear it. Apps that hold anything worth keeping include an export.</p>
    <h2>Refunds</h2>
    <p>If an app doesn't do what this site says it does, email within 14 days and you'll get your money back. Because the apps are files, please don't ask for a refund on something you're still using.</p>
  </div>`;
}

function viewSupport(){
  document.title = "Support — NumeraKey";
  return `<div class="wrap page">
    <h1><span class="spectrum">Support</span></h1>
    <p class="lede" style="margin-top:20px">One person builds these, and the same person answers the email.</p>
    <h2>Lost your file</h2>
    <p>Your original download link stays live. If it has expired or the email is gone, send the address you paid with and it will be re-sent.</p>
    <h2>Something's broken</h2>
    <p>Tell me what you did, what happened, and which browser you were in. Bugs get fixed and the fix is emailed to everyone who bought the app.</p>
    <h2>Moving to a new phone</h2>
    <p>Copy the file across. If the app has an export option, export before you wipe the old device — data does not travel with the file.</p>
    <h2>Everything else</h2>
    <p>Feature requests, questions before buying, or a disagreement with something an app told you: <a id="mailto2" href="#" style="text-decoration:underline"></a>. Replies usually take a day or two, Australian time.</p>
  </div>`;
}

function viewLicence(){
  document.title = "Licence — NumeraKey";
  return `<div class="wrap page">
    <h1><span class="spectrum">Licence</span></h1>
    <p class="lede" style="margin-top:20px">Plain terms, because you shouldn't need a lawyer to buy a $39 app.</p>
    <h2>What you may do</h2>
    <ul>
      <li>Use the app for as long as you like, on any device you personally own.</li>
      <li>Keep copies and backups.</li>
      <li>Show it to people, and tell them where you got it.</li>
    </ul>
    <h2>What you may not do</h2>
    <ul>
      <li>Resell it, give copies away, or put it on a site for others to download.</li>
      <li>Strip the branding and pass the app off as your own work.</li>
      <li>Use it inside a business or practice to serve clients without a commercial licence — email if you want one.</li>
    </ul>
    <h2>No guarantees of outcome</h2>
    <p>Several of these apps deal with wellbeing, recovery and divination. They are tools for reflection, not medical, legal or financial advice, and none of them replaces a qualified human being. If you are in crisis, contact a local emergency service or crisis line.</p>
    <h2>Liability</h2>
    <p>The apps are provided as they are. Nothing here limits rights you have under Australian Consumer Law or your own local consumer protections.</p>
  </div>`;
}

function viewMissing(){
  document.title = "Not found — NumeraKey";
  return `<div class="wrap page">
    <h1><span class="spectrum">Nothing here</span></h1>
    <p class="lede" style="margin-top:20px">That link doesn't point at an app. The catalogue is one tap away.</p>
    <p style="margin-top:24px"><a class="btn" style="display:inline-block;padding:12px 26px" href="#/">See all apps</a></p>
  </div>`;
}

/* ==========================================================================
   5. Router
   ========================================================================== */
function render(){
  const h = (location.hash || "#/").slice(1);
  const parts = h.split("/").filter(Boolean);
  let html;
  document.title = "NumeraKey — apps you buy once and own";
  if (parts[0] === "app" && parts[1])  html = viewApp(parts[1]);
  else if (parts[0] === "c" && parts[1]) html = viewCategory(parts[1]);
  else if (parts[0] === "how")         html = viewHow();
  else if (parts[0] === "support")     html = viewSupport();
  else if (parts[0] === "licence")     html = viewLicence();
  else if (!parts.length)              html = viewHome();
  else                                 html = viewMissing();

  const main = document.getElementById("app");
  main.innerHTML = html;
  requestAnimationFrame(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  });
  main.querySelectorAll(".art img").forEach(img => {
    img.addEventListener("error", () => img.remove(), { once:true });
  });

  document.querySelectorAll(".bar nav a").forEach(a => {
    a.toggleAttribute("aria-current", a.getAttribute("href") === (location.hash || "#/"));
  });
  /* No payment processor is connected yet, so every Buy button is sent to the
     How it works page, which says plainly that the shop isn't open. When a
     checkout exists, delete this block and the buttons work as written. */
  main.querySelectorAll('a.btn[href*="lemonsqueezy"]').forEach(b => {
    b.setAttribute("href", "#/how");
    b.textContent = "Not on sale yet";
  });

  const m2 = document.getElementById("mailto2");
  if (m2){ m2.href = "mailto:" + SITE.email; m2.textContent = SITE.email; }
}

document.getElementById("mailto").href = "mailto:" + SITE.email;
document.getElementById("yr").textContent = new Date().getFullYear();
addEventListener("hashchange", render);
render();
