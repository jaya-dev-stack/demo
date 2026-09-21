const DESIGN_MOODS = [
  { id: "formal", title: "Formal", summary: "Serif, quiet color, corporate or legal tone." },
  { id: "informal", title: "Informal", summary: "Friendly copy, rounded shapes, casual products." },
  { id: "branding", title: "Branding", summary: "Logo-first layouts that sell identity." },
  { id: "playful", title: "Playful", summary: "Motion, bright palettes, youth or games." },
  { id: "luxury", title: "Luxury", summary: "Sparse type, gold or ink, high-end retail." },
];

const SITE_TYPES = [
  { id: "registration", title: "Registration", summary: "Sign-up and account creation screens." },
  { id: "landing", title: "Landing", summary: "First-impression marketing pages." },
  { id: "portfolio", title: "Portfolio", summary: "Personal or studio work showcases." },
  { id: "shop", title: "Shop", summary: "Product grids and storefronts." },
  { id: "restaurant", title: "Restaurant", summary: "Menus, hours, and booking mood." },
  { id: "dashboard", title: "Dashboard", summary: "App shells with cards and stats." },
];

const MOTION_STYLES = [
  { id: "2d", title: "2D", summary: "Flat layout, no depth tricks." },
  { id: "3d", title: "3D", summary: "Perspective, cubes, isometric stacks." },
  { id: "animated", title: "2D animated", summary: "Keyframes, loops, moving color." },
  { id: "unique", title: "Unique", summary: "Experimental shapes and glow." },
];

const REGISTRATION_METHODS = [
  { id: "email", title: "Email + password", summary: "Classic identity plus a secret.", when: "Most products." },
  { id: "social", title: "Social / OAuth", summary: "Continue with Google, GitHub, Apple.", when: "Consumer apps." },
  { id: "magic", title: "Magic link", summary: "One-time email link, no password.", when: "Low-friction tools." },
  { id: "otp", title: "OTP / SMS", summary: "Short code to a phone or inbox.", when: "Fintech, marketplaces." },
  { id: "stepper", title: "Multi-step wizard", summary: "Split a long signup into screens.", when: "Heavy onboarding." },
  { id: "passkey", title: "Passkeys", summary: "Device biometrics instead of a password.", when: "Security-first apps." },
];

const DESIGNS_DATA = [
  {
    id: "minimal-line",
    title: "Minimal line form",
    level: "simple",
    mood: "formal",
    site: "registration",
    motion: "2d",
    method: "email",
    accent: "#6b7280",
    description: "Underline inputs, no box. Quiet and fast to scan. Free source.",
    html: `<form class="f"><h1>Sign up</h1><input type="email" placeholder="Email" required /><input type="password" placeholder="Password" required /><button>Create account</button></form>`,
    css: `body{margin:0;min-height:100vh;display:grid;place-items:center;font-family:Georgia,serif;background:#fafafa;color:#111}
.f{width:min(320px,90vw);display:grid;gap:1.2rem}
h1{font-weight:400;font-size:1.6rem;margin:0}
input,button{font:inherit;border:0;border-bottom:1px solid #ccc;padding:.6rem 0;background:transparent;outline:none}
button{border:0;background:#111;color:#fff;padding:.8rem;cursor:pointer;margin-top:.4rem}`,
    js: `document.querySelector("form").addEventListener("submit",e=>{e.preventDefault();alert("Demo only")})`,
  },
  {
    id: "classic-card",
    title: "Classic centered card",
    level: "simple",
    mood: "formal",
    site: "registration",
    motion: "2d",
    method: "email",
    accent: "#1b1630",
    description: "White card, labels, one primary button. Free source.",
    html: `<form class="card"><h1>Create account</h1><label>Name<input /></label><label>Email<input type="email" /></label><label>Password<input type="password" /></label><button>Register</button></form>`,
    css: `body{margin:0;min-height:100vh;display:grid;place-items:center;background:#e8e4f4;font-family:system-ui}
.card{background:#fff;padding:1.6rem;border-radius:16px;width:min(340px,92vw);box-shadow:0 20px 40px #0002;display:grid;gap:.7rem}
label{display:grid;gap:.3rem;font-size:.8rem;color:#555}
input{padding:.65rem;border:1px solid #ddd;border-radius:8px;font:inherit}
button{background:#1b1630;color:#fff;border:0;padding:.8rem;border-radius:8px;font-weight:600;cursor:pointer}`,
    js: `document.querySelector("form").addEventListener("submit",e=>{e.preventDefault();alert("Demo only")})`,
  },
  {
    id: "boxed-labels",
    title: "Outlined fieldset",
    level: "simple",
    mood: "formal",
    site: "registration",
    motion: "2d",
    method: "email",
    accent: "#2563eb",
    description: "Clear grouping and helper text. Free source.",
    html: `<form class="box"><fieldset><legend>New member</legend><input placeholder="Full name" /><input type="email" placeholder="Work email" /><input type="password" placeholder="Password" /><p class="hint">Use 8+ characters.</p><button>Join</button></fieldset></form>`,
    css: `body{margin:0;min-height:100vh;display:grid;place-items:center;background:#eff6ff;font-family:system-ui}
fieldset{border:2px solid #2563eb;border-radius:12px;padding:1.2rem;width:min(340px,90vw);display:grid;gap:.7rem;background:#fff}
legend{padding:0 .4rem;font-weight:700;color:#2563eb}
input,button{font:inherit;padding:.65rem;border-radius:8px;border:1px solid #cbd5e1}
button{background:#2563eb;color:#fff;border:0;cursor:pointer}
.hint{margin:0;font-size:.75rem;color:#64748b}`,
    js: `document.querySelector("form").addEventListener("submit",e=>{e.preventDefault();alert("Demo only")})`,
  },
  {
    id: "social-first",
    title: "Social-first register",
    level: "simple",
    mood: "informal",
    site: "registration",
    motion: "2d",
    method: "social",
    accent: "#111827",
    description: "OAuth first, email second. Free source.",
    html: `<div class="wrap"><h1>Join Pulse</h1><button class="g">Continue with Google</button><button class="gh">Continue with GitHub</button><p class="or">or email</p><form><input type="email" placeholder="Email" /><button class="mail">Continue</button></form></div>`,
    css: `body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f3f4f6;font-family:system-ui}
.wrap{width:min(340px,92vw);background:#fff;padding:1.6rem;border-radius:14px;display:grid;gap:.6rem;box-shadow:0 10px 30px #0001}
h1{margin:0 0 .4rem;font-size:1.3rem}
button{padding:.7rem;border-radius:8px;border:1px solid #e5e7eb;background:#fff;cursor:pointer;font:inherit}
.g{border-color:#d1d5db}.gh{background:#111827;color:#fff;border:0}
.or{text-align:center;color:#9ca3af;font-size:.8rem;margin:.2rem 0}
form{display:grid;gap:.5rem}
.mail{background:#4f46e5;color:#fff;border:0}`,
    js: `document.querySelector("form").addEventListener("submit",e=>{e.preventDefault();alert("Demo only")})`,
  },
  {
    id: "cafe-landing",
    title: "Sunday cafe landing",
    level: "simple",
    mood: "informal",
    site: "landing",
    motion: "2d",
    method: "",
    accent: "#c2410c",
    description: "Warm landing for a neighborhood cafe. Free source.",
    html: `<header><p>OPEN DAILY</p><h1>Sunday Oven</h1><p>Sourdough, drip coffee, slow mornings.</p><a href="#">See the menu</a></header>`,
    css: `body{margin:0;min-height:100vh;display:grid;place-items:center;background:#fff7ed;font-family:Georgia,serif;color:#431407;text-align:center}
header{padding:2rem}p{letter-spacing:.2em;font-size:.75rem;font-family:system-ui}
h1{font-size:2.6rem;margin:.3rem 0 1rem;font-weight:400}
a{display:inline-block;border:1px solid #c2410c;padding:.6rem 1rem;color:#c2410c;text-decoration:none}`,
    js: ``,
  },
  {
    id: "brand-mark",
    title: "Brand mark intro",
    level: "simple",
    mood: "branding",
    site: "landing",
    motion: "2d",
    method: "",
    accent: "#eab308",
    description: "Logo, one line, one action. Identity-first. Free source.",
    html: `<main><div class="mark">A</div><h1>ATLAS</h1><p>Wayfinding for modern teams.</p><button>Get the kit</button></main>`,
    css: `body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0a0a0a;color:#fafafa;font-family:system-ui;text-align:center}
.mark{width:64px;height:64px;margin:0 auto 1rem;border:2px solid #eab308;display:grid;place-items:center;font-size:1.6rem;color:#eab308}
h1{letter-spacing:.4em;margin:0;font-weight:500}p{color:#a3a3a3}
button{background:#eab308;border:0;padding:.7rem 1.2rem;cursor:pointer;font-weight:700}`,
    js: ``,
  },
  {
    id: "folio-flat",
    title: "Flat portfolio grid",
    level: "simple",
    mood: "formal",
    site: "portfolio",
    motion: "2d",
    method: "",
    accent: "#334155",
    description: "Name plus three work tiles. Free source.",
    html: `<main><h1>R. Mehta</h1><p>Product designer</p><div class="g"><i></i><i></i><i></i></div></main>`,
    css: `body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f8fafc;font-family:system-ui;color:#0f172a}
main{width:min(420px,90vw)}h1{margin:0;font-weight:500}p{color:#64748b;margin:.3rem 0 1rem}
.g{display:grid;grid-template-columns:1fr 1fr 1fr;gap:.5rem}
i{display:block;height:88px;background:#e2e8f0;border-radius:8px}i:nth-child(2){background:#cbd5e1}i:nth-child(3){background:#94a3b8}`,
    js: ``,
  },
  {
    id: "split-brand",
    title: "Split brand panel",
    level: "intermediate",
    mood: "branding",
    site: "registration",
    motion: "2d",
    method: "email",
    accent: "#6c5ce7",
    description: "Story on the left, form on the right.",
    html: `<div class="split"><aside><h2>Nova</h2><p>Ship ideas in hours, not sprints.</p></aside><form><h1>Get started</h1><input placeholder="Name" /><input type="email" placeholder="Email" /><input type="password" placeholder="Password" /><button>Continue</button></form></div>`,
    css: `*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;background:#ddd;font-family:system-ui}
.split{display:grid;grid-template-columns:1fr 1fr;width:min(640px,94vw);min-height:320px;border-radius:16px;overflow:hidden;box-shadow:0 20px 40px #0003}
aside{background:linear-gradient(160deg,#2b1b5e,#0f1024);color:#fff;display:grid;place-content:center;padding:1.5rem}
form{background:#f7f4ff;padding:1.5rem;display:grid;align-content:center;gap:.6rem}
input,button{font:inherit;padding:.7rem;border-radius:8px;border:1px solid #ddd}
button{background:#6c5ce7;color:#fff;border:0;cursor:pointer}
@media(max-width:640px){.split{grid-template-columns:1fr}}`,
    js: `document.querySelector("form").addEventListener("submit",e=>{e.preventDefault();alert("Demo only")})`,
  },
  {
    id: "floating-labels",
    title: "Floating labels",
    level: "intermediate",
    mood: "informal",
    site: "registration",
    motion: "animated",
    method: "email",
    accent: "#0d9488",
    description: "Labels rise when the field is focused or filled.",
    html: `<form class="fl"><h1>Register</h1><label><input required /><span>Email</span></label><label><input type="password" required /><span>Password</span></label><button>Sign up</button></form>`,
    css: `body{margin:0;min-height:100vh;display:grid;place-items:center;background:#ecfdf5;font-family:system-ui}
.fl{width:min(340px,90vw);background:#fff;padding:1.6rem;border-radius:14px;display:grid;gap:1.1rem;box-shadow:0 12px 30px #0d948822}
label{position:relative;display:block}
input{width:100%;padding:1rem .8rem .4rem;border:1px solid #99f6e4;border-radius:8px;font:inherit}
span{position:absolute;left:.8rem;top:.7rem;color:#5eead4;transition:.2s;pointer-events:none}
input:focus+span,input:valid+span{top:.15rem;font-size:.7rem;color:#0d9488}
button{background:#0d9488;color:#fff;border:0;padding:.8rem;border-radius:8px;cursor:pointer;font:inherit}`,
    js: `document.querySelector("form").addEventListener("submit",e=>{e.preventDefault();alert("Demo only")})`,
  },
  {
    id: "auth-tabs",
    title: "Login / register tabs",
    level: "intermediate",
    mood: "informal",
    site: "registration",
    motion: "2d",
    method: "email",
    accent: "#db2777",
    description: "One panel, two modes without leaving the page.",
    html: `<div class="panel"><div class="tabs"><button type="button" class="on" data-t="r">Register</button><button type="button" data-t="l">Log in</button></div><form id="r"><input placeholder="Name" /><input type="email" placeholder="Email" /><input type="password" placeholder="Password" /><button>Create</button></form><form id="l" hidden><input type="email" placeholder="Email" /><input type="password" placeholder="Password" /><button>Enter</button></form></div>`,
    css: `body{margin:0;min-height:100vh;display:grid;place-items:center;background:#fdf2f8;font-family:system-ui}
.panel{width:min(360px,92vw);background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 16px 40px #db277733}
.tabs{display:grid;grid-template-columns:1fr 1fr}
.tabs button{border:0;padding:.9rem;background:#fce7f3;cursor:pointer;font:inherit}
.tabs .on{background:#fff;font-weight:700;color:#db2777}
form{display:grid;gap:.6rem;padding:1.2rem}
input,form button{font:inherit;padding:.7rem;border-radius:8px;border:1px solid #fbcfe8}
form button{background:#db2777;color:#fff;border:0;cursor:pointer}`,
    js: `document.querySelectorAll(".tabs button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".tabs button").forEach(x=>x.classList.toggle("on",x===b));r.hidden=b.dataset.t!=="r";l.hidden=b.dataset.t!=="l"});
document.querySelectorAll("form").forEach(f=>f.onsubmit=e=>{e.preventDefault();alert("Demo only")})`,
  },
  {
    id: "glass-studio",
    title: "Glassmorphism studio",
    level: "intermediate",
    mood: "playful",
    site: "registration",
    motion: "animated",
    method: "email",
    accent: "#a78bfa",
    description: "Frosted panel over a moving color wash.",
    html: `<form class="glass"><h1>Join the studio</h1><input placeholder="Username" /><input type="email" placeholder="Email" /><input type="password" placeholder="Password" /><button>Create</button></form>`,
    css: `body{margin:0;min-height:100vh;display:grid;place-items:center;font-family:system-ui;background:linear-gradient(120deg,#5b3dff,#ff5ea8,#2ad4ff);background-size:200% 200%;animation:w 8s ease infinite;color:#fff}
@keyframes w{50%{background-position:100% 50%}}
.glass{width:min(340px,90vw);padding:1.6rem;border-radius:18px;background:#fff2;border:1px solid #fff5;backdrop-filter:blur(16px);display:grid;gap:.7rem}
input,button{font:inherit;padding:.7rem;border-radius:10px;border:0}
button{cursor:pointer;font-weight:600}`,
    js: `document.querySelector("form").addEventListener("submit",e=>{e.preventDefault();alert("Demo only")})`,
  },
  {
    id: "magic-link",
    title: "Magic link inbox",
    level: "intermediate",
    mood: "informal",
    site: "registration",
    motion: "2d",
    method: "magic",
    accent: "#f59e0b",
    description: "One field. A mail, no password.",
    html: `<form class="ml"><div class="icon">✉</div><h1>Sign in with email</h1><p>We will send a one-time link. No password.</p><input type="email" placeholder="you@studio.com" required /><button>Send magic link</button></form>`,
    css: `body{margin:0;min-height:100vh;display:grid;place-items:center;background:#fffbeb;font-family:system-ui}
.ml{width:min(360px,92vw);background:#fff;padding:1.8rem;border-radius:20px;text-align:center;box-shadow:0 12px 32px #f59e0b22;display:grid;gap:.7rem}
.icon{font-size:2rem}
h1{margin:0;font-size:1.3rem}p{margin:0;color:#92400e;font-size:.9rem}
input,button{font:inherit;padding:.75rem;border-radius:10px;border:1px solid #fde68a}
button{background:#f59e0b;border:0;font-weight:700;cursor:pointer}`,
    js: `document.querySelector("form").addEventListener("submit",e=>{e.preventDefault();alert("Link sent (demo)")})`,
  },
  {
    id: "bento-shop",
    title: "Animated shop bento",
    level: "intermediate",
    mood: "playful",
    site: "shop",
    motion: "animated",
    method: "",
    accent: "#f97316",
    description: "Product tiles that lift on a loop.",
    html: `<main><h1>Orb Shop</h1><div class="bento"><article>Lamp</article><article>Chair</article><article>Vase</article><article>Rug</article></div></main>`,
    css: `body{margin:0;min-height:100vh;display:grid;place-items:center;background:#fff7ed;font-family:system-ui;color:#9a3412}
main{width:min(440px,92vw)}h1{margin:0 0 1rem}
.bento{display:grid;grid-template-columns:1fr 1fr;gap:.6rem}
article{background:#ffedd5;padding:1.4rem;border-radius:14px;animation:lift 2.4s ease-in-out infinite}
article:nth-child(2){animation-delay:.2s;background:#fed7aa}
article:nth-child(3){animation-delay:.4s}article:nth-child(4){animation-delay:.6s;background:#fdba74}
@keyframes lift{50%{transform:translateY(-6px)}}`,
    js: ``,
  },
  {
    id: "dine-pulse",
    title: "Restaurant pulse menu",
    level: "intermediate",
    mood: "luxury",
    site: "restaurant",
    motion: "animated",
    method: "",
    accent: "#b45309",
    description: "Ink menu with a breathing gold rule.",
    html: `<section><p>TABLES FROM 7</p><h1>Orchid</h1><hr /><ul><li>Saffron risotto</li><li>Charred pear</li><li>Dark cacao</li></ul></section>`,
    css: `body{margin:0;min-height:100vh;display:grid;place-items:center;background:#1c1917;color:#fef3c7;font-family:Georgia,serif;text-align:center}
p{font-family:system-ui;letter-spacing:.25em;font-size:.7rem;color:#d6d3d1}
h1{font-weight:400;font-size:2.4rem;margin:.4rem 0}
hr{border:0;height:1px;background:#b45309;width:80px;margin:0 auto 1rem;animation:w 2s ease-in-out infinite}
@keyframes w{50%{width:140px;opacity:.5}}
ul{list-style:none;padding:0;margin:0;line-height:2}`,
    js: ``,
  },
  {
    id: "otp-phone",
    title: "Phone OTP verify",
    level: "advanced",
    mood: "playful",
    site: "registration",
    motion: "animated",
    method: "otp",
    accent: "#22c55e",
    description: "Phone first, then six digit cells.",
    html: `<form id="p1"><h1>Verify phone</h1><input placeholder="+91 98xxx" /><button>Send code</button></form><form id="p2" hidden><h1>Enter code</h1><div class="otp"><input maxlength="1" /><input maxlength="1" /><input maxlength="1" /><input maxlength="1" /><input maxlength="1" /><input maxlength="1" /></div><button>Confirm</button></form>`,
    css: `body{margin:0;min-height:100vh;display:grid;place-items:center;background:#052e16;color:#ecfccb;font-family:system-ui}
form{width:min(340px,90vw);display:grid;gap:.8rem}
input,button{font:inherit;padding:.75rem;border-radius:10px;border:1px solid #166534;background:#14532d;color:#fff}
button{background:#22c55e;color:#052e16;border:0;font-weight:700;cursor:pointer}
.otp{display:grid;grid-template-columns:repeat(6,1fr);gap:.35rem}
.otp input{text-align:center;font-size:1.2rem}`,
    js: `p1.onsubmit=e=>{e.preventDefault();p1.hidden=true;p2.hidden=false;p2.querySelector("input").focus()};
p2.onsubmit=e=>{e.preventDefault();alert("Verified (demo)")};
document.querySelectorAll(".otp input").forEach((el,i,arr)=>{el.addEventListener("input",()=>{if(el.value&&arr[i+1])arr[i+1].focus()})})`,
  },
  {
    id: "stepper-wizard",
    title: "Three-step wizard",
    level: "advanced",
    mood: "formal",
    site: "registration",
    motion: "animated",
    method: "stepper",
    accent: "#7c6cff",
    description: "Progress dots and one question at a time.",
    html: `<form class="st"><div class="dots"><i class="on"></i><i></i><i></i></div><div class="step on"><h1>Who are you?</h1><input placeholder="Full name" /></div><div class="step"><h1>Reach you</h1><input type="email" placeholder="Email" /></div><div class="step"><h1>Secure it</h1><input type="password" placeholder="Password" /></div><div class="row"><button type="button" id="back">Back</button><button type="button" id="next">Next</button></div></form>`,
    css: `body{margin:0;min-height:100vh;display:grid;place-items:center;background:#121018;color:#fff;font-family:system-ui}
.st{width:min(360px,90vw);background:#16141f;border:1px solid #2a2738;padding:1.4rem;border-radius:16px}
.dots{display:flex;gap:.4rem;margin-bottom:1rem}
.dots i{width:8px;height:8px;border-radius:50%;background:#3a3648}.dots .on{background:#7c6cff}
.step{display:none}.step.on{display:block;animation:s .3s ease}
@keyframes s{from{opacity:0;transform:translateX(10px)}}
input{width:100%;margin:.6rem 0 1rem;padding:.7rem;border-radius:8px;border:1px solid #3a3648;background:#1e1c28;color:#fff;font:inherit;box-sizing:border-box}
.row{display:flex;gap:.5rem}button{flex:1;padding:.7rem;border:0;border-radius:8px;background:#2a2738;color:#fff;cursor:pointer}
#next{background:#7c6cff}`,
    js: `let i=0;const steps=[...document.querySelectorAll(".step")];const dots=[...document.querySelectorAll(".dots i")];
function show(n){i=Math.max(0,Math.min(2,n));steps.forEach((s,x)=>s.classList.toggle("on",x===i));dots.forEach((d,x)=>d.classList.toggle("on",x===i));next.textContent=i===2?"Finish":"Next"}
next.onclick=()=>{if(i===2){alert("Registered (demo)");return}show(i+1)};back.onclick=()=>show(i-1)`,
  },
  {
    id: "neon-grid",
    title: "Neon dark grid",
    level: "advanced",
    mood: "playful",
    site: "registration",
    motion: "unique",
    method: "email",
    accent: "#4dffd2",
    description: "Glow, night UI, experimental mood.",
    html: `<form class="neon"><h1>Access</h1><input type="email" placeholder="email@night.io" /><input type="password" placeholder="passkey" /><button>Enter grid</button></form>`,
    css: `body{margin:0;min-height:100vh;display:grid;place-items:center;background:#05060c;font-family:ui-monospace,monospace;color:#4dffd2}
.neon{width:min(320px,90vw);padding:1.5rem;border:1px solid #4dffd2;border-radius:8px;display:grid;gap:.7rem;box-shadow:0 0 24px #4dffd244;animation:p 2.4s ease-in-out infinite}
@keyframes p{50%{box-shadow:0 0 36px #4dffd266}}
input{background:#0b0e18;border:1px solid #2a3a4a;color:#d6fff4;padding:.7rem;font:inherit}
button{background:transparent;color:#4dffd2;border:1px solid #4dffd2;padding:.75rem;cursor:pointer;font:inherit}`,
    js: `document.querySelector("form").addEventListener("submit",e=>{e.preventDefault();alert("Demo only")})`,
  },
  {
    id: "tilt-3d",
    title: "3D tilt card",
    level: "advanced",
    mood: "branding",
    site: "registration",
    motion: "3d",
    method: "email",
    accent: "#ff6b9d",
    description: "Perspective card that follows the pointer.",
    html: `<div class="scene"><form class="card"><h1>Elevate signup</h1><p>Move your pointer</p><input placeholder="Display name" /><input type="email" placeholder="Email" /><input type="password" placeholder="Password" /><button>Lift off</button></form></div>`,
    css: `body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0b0a12;font-family:system-ui;color:#fff}
.scene{perspective:1000px}
.card{width:min(340px,88vw);padding:1.6rem;border-radius:20px;background:linear-gradient(160deg,#201a38,#12101c);border:1px solid #fff2;display:grid;gap:.6rem;transform-style:preserve-3d;transition:transform .12s}
input{padding:.7rem;border-radius:8px;border:1px solid #fff2;background:#fff1;color:#fff;font:inherit}
button{padding:.75rem;border:0;border-radius:8px;background:linear-gradient(90deg,#7c6cff,#ff6b9d);color:#fff;font:inherit;cursor:pointer}
p{margin:0;color:#a8a3b8;font-size:.85rem}`,
    js: `const scene=document.querySelector(".scene");const card=document.querySelector(".card");
scene.onmousemove=e=>{const r=scene.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;card.style.transform="rotateY("+(x*22)+"deg) rotateX("+(-y*16)+"deg)"};
scene.onmouseleave=()=>card.style.transform="none";
card.onsubmit=e=>{e.preventDefault();alert("Demo only")}`,
  },
  {
    id: "passkey-cta",
    title: "Passkey first",
    level: "advanced",
    mood: "formal",
    site: "registration",
    motion: "2d",
    method: "passkey",
    accent: "#38bdf8",
    description: "Biometric primary action, password fallback.",
    html: `<form class="pk"><h1>Create your vault</h1><p>Use Face ID, Touch ID, or a security key.</p><button type="button" id="pk">Register with passkey</button><button type="submit" class="alt">Use password instead</button></form>`,
    css: `body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0f172a;color:#e0f2fe;font-family:system-ui}
.pk{width:min(360px,92vw);background:#1e293b;padding:1.8rem;border-radius:18px;display:grid;gap:.8rem;border:1px solid #334155}
h1{margin:0}p{margin:0;color:#94a3b8}
button{font:inherit;padding:.85rem;border-radius:12px;border:0;cursor:pointer}
#pk{background:#38bdf8;color:#0f172a;font-weight:700}
.alt{background:transparent;color:#7dd3fc;border:1px solid #334155}`,
    js: `pk.onclick=()=>alert("WebAuthn would run here (demo)");
document.querySelector("form").onsubmit=e=>{e.preventDefault();alert("Password fallback (demo)")}`,
  },
  {
    id: "iso-portfolio",
    title: "Isometric 3D portfolio",
    level: "advanced",
    mood: "branding",
    site: "portfolio",
    motion: "3d",
    method: "",
    accent: "#8b5cf6",
    description: "Stacked isometric slabs as a personal brand mark.",
    html: `<div class="stage"><div class="iso"><span></span><span></span><span></span></div><h1>Studio North</h1><p>Spatial brand systems</p></div>`,
    css: `body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0f0a1a;color:#ede9fe;font-family:system-ui;text-align:center}
.stage{perspective:700px}
.iso{height:120px;transform-style:preserve-3d;animation:spin 8s linear infinite}
.iso span{display:block;width:90px;height:54px;margin:-26px auto 0;background:linear-gradient(135deg,#8b5cf6,#f472b6);transform:rotateX(60deg) rotateZ(-45deg);box-shadow:10px 10px 0 #0006}
.iso span:nth-child(2){opacity:.75;transform:rotateX(60deg) rotateZ(-45deg) translateZ(18px)}
.iso span:nth-child(3){opacity:.5;transform:rotateX(60deg) rotateZ(-45deg) translateZ(36px)}
@keyframes spin{to{transform:rotateY(360deg)}}
h1{margin:1rem 0 0}p{color:#c4b5fd}`,
    js: ``,
  },
  {
    id: "dash-3d",
    title: "3D metric dashboard",
    level: "advanced",
    mood: "formal",
    site: "dashboard",
    motion: "3d",
    method: "",
    accent: "#22d3ee",
    description: "Stat cards that sit in perspective.",
    html: `<div class="board"><article><b>12.4k</b><span>Visits</span></article><article><b>8.1%</b><span>Convert</span></article><article><b>64</b><span>Tasks</span></article></div>`,
    css: `body{margin:0;min-height:100vh;display:grid;place-items:center;background:#082f49;font-family:system-ui;color:#ecfeff}
.board{display:grid;grid-template-columns:repeat(3,1fr);gap:.8rem;perspective:800px;width:min(520px,94vw)}
article{background:#164e63;padding:1.2rem;border-radius:14px;transform:rotateX(12deg) rotateY(-8deg);box-shadow:12px 18px 0 #022c3a}
article:nth-child(2){transform:rotateX(12deg)}article:nth-child(3){transform:rotateX(12deg) rotateY(8deg)}
b{display:block;font-size:1.6rem}span{opacity:.7;font-size:.8rem}
@media(max-width:520px){.board{grid-template-columns:1fr}}`,
    js: ``,
  },
  {
    id: "blob-unique",
    title: "Blob orbit landing",
    level: "advanced",
    mood: "playful",
    site: "landing",
    motion: "unique",
    method: "",
    accent: "#fb7185",
    description: "Morphing blobs and a short hero. Experimental.",
    html: `<div class="hero"><div class="blob a"></div><div class="blob b"></div><h1>Make strange</h1><p>A lab for odd interfaces.</p></div>`,
    css: `body{margin:0;min-height:100vh;display:grid;place-items:center;background:#1a0b12;font-family:system-ui;color:#ffe4e6;overflow:hidden}
.hero{position:relative;text-align:center;padding:2rem}
.blob{position:absolute;border-radius:60% 40% 70% 30%;filter:blur(8px);animation:m 7s ease-in-out infinite}
.a{width:180px;height:180px;background:#fb7185;left:-40px;top:-20px}
.b{width:140px;height:140px;background:#c084fc;right:-30px;bottom:-10px;animation-delay:-3s}
@keyframes m{50%{border-radius:30% 70% 40% 60%;transform:translate(12px,-10px) rotate(12deg)}}
h1,p{position:relative}`,
    js: ``,
  },
];
