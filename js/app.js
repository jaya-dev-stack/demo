const app = document.getElementById("app");
const navAuth = document.getElementById("navAuth");
const toastEl = document.getElementById("toast");
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

function toast(message) {
  toastEl.textContent = message;
  toastEl.hidden = false;
  clearTimeout(toast.t);
  toast.t = setTimeout(() => {
    toastEl.hidden = true;
  }, 1800);
}

function parseHash() {
  const raw = (location.hash || "#/").replace(/^#/, "") || "/";
  const [pathPart, queryPart = ""] = raw.split("?");
  const path = pathPart.startsWith("/") ? pathPart : `/${pathPart}`;
  const query = Object.fromEntries(new URLSearchParams(queryPart));
  const parts = path.split("/").filter(Boolean);
  return { path, parts, query };
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function srcdoc(html, css, js) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${css}</style></head><body>${html}<script>${js || ""}<\/script></body></html>`;
}

function renderNavAuth() {
  const user = Api.me();
  if (user) {
    navAuth.innerHTML = `<a href="#/account">${escapeHtml(user.name)}</a><button type="button" class="text-btn" id="logoutBtn">Log out</button>`;
    document.getElementById("logoutBtn").onclick = () => {
      Api.logout();
      toast("Signed out");
      renderNavAuth();
      route();
    };
  } else {
    navAuth.innerHTML = `<a class="btn-sm" href="#/login">Log in</a><a class="btn-sm ghost" href="#/register">Sign up</a>`;
  }
  document.querySelectorAll("[data-nav]").forEach((a) => {
    const { parts } = parseHash();
    const key = parts[0] || "home";
    a.classList.toggle(
      "active",
      a.dataset.nav === key ||
        ((key === "designs" || key === "types") && (a.dataset.nav === "types" || a.dataset.nav === "designs"))
    );
    if (!parts[0]) a.classList.toggle("active", a.dataset.nav === "home");
  });
}

function homeView() {
  return `
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">Website design library</p>
        <h1>Every kind of page,<br /><span>sorted by type and motion.</span></h1>
        <p class="lede">Pick a mood (formal, informal, branding), a website type, then a look — 2D, 3D, animated, or unique. Simple designs let anyone copy the code. Intermediate and advanced source stays behind login.</p>
        <div class="hero-actions">
          <a class="cta" href="#/types">Browse types</a>
          <a class="cta ghost" href="#/designs?level=simple">Free simple code</a>
        </div>
      </div>
      <div class="hero-3d">
        <div class="cube">
          <div class="face front">Sign up</div>
          <div class="face back">Join</div>
          <div class="face right">Create</div>
          <div class="face left">Start</div>
          <div class="face top">New</div>
          <div class="face bottom">User</div>
        </div>
      </div>
    </section>
    <section class="band">
      <article><strong id="statDesigns">—</strong><span>Page designs</span></article>
      <article><strong>6</strong><span>Website types</span></article>
      <article><strong>4</strong><span>Motion styles</span></article>
    </section>
    <section class="how">
      <h2>How FormLab works</h2>
      <div class="how-grid">
        <article><span>01</span><h3>Choose a type</h3><p>Formal, informal, branding, or a website kind such as landing, shop, portfolio, or registration. Previews live under Designs — not on home.</p></article>
        <article><span>02</span><h3>Filter the look</h3><p>2D, 3D, animated, and unique experimental layouts. Simple items include a Free code badge.</p></article>
        <article><span>03</span><h3>Copy when allowed</h3><p>Anyone can copy simple source. Log in for intermediate and advanced HTML, CSS, and JavaScript.</p></article>
      </div>
    </section>`;
}

function filterHref(query, patch) {
  const params = new URLSearchParams();
  const next = { ...query, ...patch };
  ["mood", "site", "motion", "level", "method", "q"].forEach((key) => {
    if (next[key]) params.set(key, next[key]);
  });
  const q = params.toString();
  return `#/designs${q ? "?" + q : ""}`;
}

function chipGroup(label, options, active, query, key) {
  const chips = options
    .map((opt) => {
      const id = opt.id || opt;
      const title = opt.title || opt;
      const on = active === id;
      const href = on ? filterHref(query, { [key]: "" }) : filterHref(query, { [key]: id });
      return `<a class="chip slim ${on ? "on" : ""}" href="${href}">${title}</a>`;
    })
    .join("");
  return `<div class="filter-group"><span>${label}</span><div class="chip-row">${chips}</div></div>`;
}

function typesView(tax) {
  const block = (title, items, key) => `
    <h3>${title}</h3>
    <div class="type-grid">
      ${items
        .map(
          (item) => `
        <a class="type-card" href="#/designs?${key}=${item.id}">
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.summary)}</p>
        </a>`
        )
        .join("")}
    </div>`;
  return `
    <section class="page-head">
      <p class="eyebrow">Start here</p>
      <h1>Design types</h1>
      <p class="lede">Choose a mood, a kind of website, or a motion style. Then open the matching layouts.</p>
    </section>
    ${block("Mood", tax.moods, "mood")}
    ${block("Website", tax.sites, "site")}
    ${block("Look & motion", tax.motions, "motion")}
    <p class="jump"><a class="cta" href="#/designs">See every design</a> <a class="cta ghost" href="#/designs?level=simple">Simple + free code</a></p>`;
}

function designsView(items, query) {
  const cards = items
    .map(
      (d) => `
      <a class="design-card" href="#/designs/${d.id}">
        <div class="swatch" style="--sw:${d.accent}"></div>
        <div class="card-body">
          <p class="level">${d.mood} · ${d.site} · ${d.motion}${d.level === "simple" ? " · free code" : ""}</p>
          <h3>${escapeHtml(d.title)}</h3>
          <p>${escapeHtml(d.description)}</p>
        </div>
      </a>`
    )
    .join("");

  return `
    <section class="page-head">
      <p class="eyebrow"><a href="#/types">Types</a> / library</p>
      <h1>Designs</h1>
      <p class="lede">Simple patterns include copyable source for everyone. Other levels need an account.</p>
    </section>
    <div class="filters">
      ${chipGroup("Level", ["simple", "intermediate", "advanced"], query.level, query, "level")}
      ${chipGroup("Mood", DESIGN_MOODS, query.mood, query, "mood")}
      ${chipGroup("Website", SITE_TYPES, query.site, query, "site")}
      ${chipGroup("Look", MOTION_STYLES, query.motion, query, "motion")}
      <label class="search"><input id="designSearch" type="search" placeholder="Search titles…" value="${escapeHtml(
        query.q || ""
      )}" /></label>
    </div>
    <div class="design-grid">${cards || `<p class="empty">No designs match those filters.</p>`}</div>`;
}

function designDetailView(design, source, locked) {
  const tabs = ["html", "css", "js"]
    .map((t) => `<button type="button" class="tab ${t === "html" ? "on" : ""}" data-tab="${t}">${t.toUpperCase()}</button>`)
    .join("");

  const codePanels = locked
    ? `<div class="lock">
        <h3>Source is members-only</h3>
        <p>Log in to copy HTML, CSS, and JavaScript. Simple designs stay free without an account.</p>
        <a class="cta" href="#/login">Log in</a>
        <a class="cta ghost" href="#/register">Create account</a>
      </div>`
    : `<pre class="code on" data-pane="html">${escapeHtml(source.html)}</pre>
       <pre class="code" data-pane="css">${escapeHtml(source.css)}</pre>
       <pre class="code" data-pane="js">${escapeHtml(source.js || "// no script")}</pre>
       <button type="button" class="copy-btn" id="copyCode">Copy</button>`;

  return `
    <section class="detail">
      <a class="back" href="#/designs">← All designs</a>
      <div class="detail-head">
        <p class="level">${design.mood} · ${design.site} · ${design.motion} · ${design.level}${
          design.level === "simple" ? " · free code" : ""
        }</p>
        <h1>${escapeHtml(design.title)}</h1>
        <p class="lede">${escapeHtml(design.description)}</p>
      </div>
      <div class="detail-grid">
        <div>
          <h2>Live preview</h2>
          <iframe class="preview-frame" title="Design preview" sandbox="allow-scripts"></iframe>
        </div>
        <div>
          <h2>Source code</h2>
          <div class="code-box">
            <div class="tab-row">${tabs}</div>
            ${codePanels}
          </div>
        </div>
      </div>
    </section>`;
}

function methodsView(items) {
  const cards = items
    .map(
      (m) => `
      <article class="method-card">
        <h3>${escapeHtml(m.title)}</h3>
        <p>${escapeHtml(m.summary)}</p>
        <p class="when">Use when: ${escapeHtml(m.when)}</p>
        <a href="#/designs?method=${m.id}">See designs</a>
      </article>`
    )
    .join("");
  return `<section class="page-head"><p class="eyebrow">Flows</p><h1>Registration methods</h1><p class="lede">How people prove who they are. Pair a method with a visual type from Designs.</p></section><div class="method-grid">${cards}</div>`;
}

function authView(mode) {
  const isLogin = mode === "login";
  return `
    <section class="auth-card">
      <h1>${isLogin ? "Welcome back" : "Create your FormLab account"}</h1>
      <p>Members can copy intermediate and advanced source. Simple designs are already free. This form talks to a local API you can replace with a real backend.</p>
      <form id="authForm">
        ${isLogin ? "" : `<label>Name<input name="name" required /></label>`}
        <label>Email<input name="email" type="email" required /></label>
        <label>Password<input name="password" type="password" required minlength="6" /></label>
        <button type="submit">${isLogin ? "Log in" : "Sign up"}</button>
        <p class="auth-alt">${
          isLogin
            ? `New here? <a href="#/register">Create an account</a>`
            : `Already a member? <a href="#/login">Log in</a>`
        }</p>
        <p class="form-error" id="formError" hidden></p>
      </form>
    </section>`;
}

function accountView(user) {
  return `
    <section class="auth-card">
      <h1>Account</h1>
      <p>Signed in as <strong>${escapeHtml(user.name)}</strong> (${escapeHtml(user.email)}).</p>
      <p>Your session is stored in this browser until you log out. Swap <code>js/api.js</code> for HTTP calls when the backend is ready.</p>
      <a class="cta" href="#/designs">Browse designs</a>
    </section>`;
}

async function route() {
  const { parts, query } = parseHash();
  const user = Api.me();
  renderNavAuth();
  mainNav.classList.remove("open");
  app.classList.add("fade");

  if (!parts.length) {
    app.innerHTML = homeView();
    const { items } = await Api.getDesigns();
    const el = document.getElementById("statDesigns");
    if (el) el.textContent = String(items.length);
  } else if (parts[0] === "types") {
    const tax = await Api.getTaxonomy();
    app.innerHTML = typesView(tax);
  } else if (parts[0] === "designs" && parts[1]) {
    const { ok, design } = await Api.getDesign(parts[1]);
    if (!ok) {
      app.innerHTML = `<section class="page-head"><h1>Not found</h1><a href="#/designs">Back to designs</a></section>`;
    } else {
      const src = await Api.getDesignSource(parts[1]);
      app.innerHTML = designDetailView(design, src.source, !src.ok);
      document.querySelector(".preview-frame").srcdoc = srcdoc(
        design.preview.html,
        design.preview.css,
        design.preview.js
      );
      bindCodeTabs();
    }
  } else if (parts[0] === "designs") {
    const { items } = await Api.getDesigns(query);
    app.innerHTML = designsView(items, query);
    const search = document.getElementById("designSearch");
    search.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const params = new URLSearchParams(query);
        if (search.value) params.set("q", search.value);
        else params.delete("q");
        location.hash = `#/designs?${params.toString()}`;
      }
    });
  } else if (parts[0] === "methods") {
    const { items } = await Api.getMethods();
    app.innerHTML = methodsView(items);
  } else if (parts[0] === "login" || parts[0] === "register") {
    if (user) {
      location.hash = "#/account";
      return;
    }
    app.innerHTML = authView(parts[0]);
    document.getElementById("authForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target));
      const res = parts[0] === "login" ? await Api.login(data) : await Api.register(data);
      const err = document.getElementById("formError");
      if (!res.ok) {
        err.hidden = false;
        err.textContent = res.error;
        return;
      }
      toast(parts[0] === "login" ? "Logged in" : "Account created");
      renderNavAuth();
      location.hash = "#/designs";
    });
  } else if (parts[0] === "account") {
    if (!user) {
      location.hash = "#/login";
      return;
    }
    app.innerHTML = accountView(user);
  } else {
    app.innerHTML = `<section class="page-head"><h1>Page not found</h1><a href="#/">Go home</a></section>`;
  }

  requestAnimationFrame(() => app.classList.remove("fade"));
}

function bindCodeTabs() {
  const tabs = [...document.querySelectorAll(".tab")];
  const panes = [...document.querySelectorAll(".code")];
  tabs.forEach((tab) => {
    tab.onclick = () => {
      tabs.forEach((t) => t.classList.toggle("on", t === tab));
      panes.forEach((p) => p.classList.toggle("on", p.dataset.pane === tab.dataset.tab));
    };
  });
  const copy = document.getElementById("copyCode");
  if (copy) {
    copy.onclick = async () => {
      const pane = document.querySelector(".code.on");
      await navigator.clipboard.writeText(pane.textContent);
      toast("Copied");
    };
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("formlab_theme", theme);
  document.getElementById("modeLight").classList.toggle("on", theme === "light");
  document.getElementById("modeDark").classList.toggle("on", theme === "dark");
}

document.getElementById("modeLight").addEventListener("click", () => applyTheme("light"));
document.getElementById("modeDark").addEventListener("click", () => applyTheme("dark"));
applyTheme(document.documentElement.getAttribute("data-theme") || "dark");

navToggle.addEventListener("click", () => mainNav.classList.toggle("open"));
window.addEventListener("hashchange", route);

(function particles() {
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");
  let dots = [];
  function rgb() {
    return getComputedStyle(document.documentElement).getPropertyValue("--particle").trim() || "210, 220, 235";
  }
  function size() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    dots = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.3 + 0.3,
      s: Math.random() * 0.25 + 0.06,
      a: Math.random() * 0.22 + 0.06,
    }));
  }
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const color = rgb();
    dots.forEach((p) => {
      p.y -= p.s;
      if (p.y < 0) p.y = canvas.height;
      ctx.beginPath();
      ctx.fillStyle = `rgba(${color},${p.a})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  size();
  draw();
  window.addEventListener("resize", size);
})();

if (!location.hash) location.hash = "#/";
route();
