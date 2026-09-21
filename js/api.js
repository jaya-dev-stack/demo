/**
 * Front-end API layer. Swap these functions to real HTTP calls later.
 * Example: GET /api/designs  POST /api/auth/login
 */
const Api = (() => {
  const USERS_KEY = "formlab_users";
  const SESSION_KEY = "formlab_session";

  const delay = (ms = 180) => new Promise((r) => setTimeout(r, ms));

  function users() {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  }

  function saveUsers(list) {
    localStorage.setItem(USERS_KEY, JSON.stringify(list));
  }

  function session() {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
    } catch {
      return null;
    }
  }

  async function getDesigns(filters = {}) {
    await delay();
    let items = DESIGNS_DATA.map(({ html, css, js, ...meta }) => meta);
    if (filters.level) items = items.filter((d) => d.level === filters.level);
    if (filters.mood) items = items.filter((d) => d.mood === filters.mood);
    if (filters.site) items = items.filter((d) => d.site === filters.site);
    if (filters.motion) items = items.filter((d) => d.motion === filters.motion);
    if (filters.method) items = items.filter((d) => d.method === filters.method);
    if (filters.q) {
      const q = filters.q.toLowerCase();
      items = items.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.mood.includes(q) ||
          d.site.includes(q)
      );
    }
    return { ok: true, items };
  }

  async function getDesign(id) {
    await delay();
    const found = DESIGNS_DATA.find((d) => d.id === id);
    if (!found) return { ok: false, error: "Design not found" };
    const { html, css, js, ...meta } = found;
    return { ok: true, design: { ...meta, preview: { html, css, js } } };
  }

  async function getDesignSource(id) {
    await delay();
    const found = DESIGNS_DATA.find((d) => d.id === id);
    if (!found) return { ok: false, status: 404, error: "Design not found" };
    const free = found.level === "simple";
    if (!free && !session()) {
      return { ok: false, status: 401, error: "Login required to view source" };
    }
    return {
      ok: true,
      free,
      source: { html: found.html, css: found.css, js: found.js || "" },
    };
  }

  async function getTaxonomy() {
    await delay();
    return {
      ok: true,
      moods: DESIGN_MOODS,
      sites: SITE_TYPES,
      motions: MOTION_STYLES,
      methods: REGISTRATION_METHODS,
    };
  }

  async function getMethods() {
    await delay();
    return { ok: true, items: REGISTRATION_METHODS };
  }

  async function register({ name, email, password }) {
    await delay(320);
    if (!name || !email || !password) {
      return { ok: false, error: "All fields are required" };
    }
    if (password.length < 6) {
      return { ok: false, error: "Password must be at least 6 characters" };
    }
    const list = users();
    if (list.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: "An account with this email already exists" };
    }
    const user = { id: crypto.randomUUID(), name, email, createdAt: Date.now() };
    list.push({ ...user, password });
    saveUsers(list);
    localStorage.setItem(SESSION_KEY, JSON.stringify({ id: user.id, name, email }));
    return { ok: true, user };
  }

  async function login({ email, password }) {
    await delay(320);
    const user = users().find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!user) return { ok: false, error: "Invalid email or password" };
    const sessionUser = { id: user.id, name: user.name, email: user.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    return { ok: true, user: sessionUser };
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
  }

  function me() {
    return session();
  }

  return {
    getDesigns,
    getDesign,
    getDesignSource,
    getTaxonomy,
    getMethods,
    register,
    login,
    logout,
    me,
  };
})();
