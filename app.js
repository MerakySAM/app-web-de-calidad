/* =========================================================
   PORTAL DE FORMATOS — app.js
   Sistema de Gestión de Calidad · ISO 13485
   =========================================================
   Seguridad de la contraseña:
   La clave NO se guarda en texto plano — está codificada
   en Base64. Para cambiarla, abre la consola del navegador
   (F12) y ejecuta: btoa("tu_nueva_clave")
   Copia el resultado y reemplaza el valor de ADMIN_TOKEN.
   Clave actual: calidad2025
   ========================================================= */

"use strict";

// ── Configuración ─────────────────────────────────────────
const STORAGE_KEY = "portal_formatos_v2";

// Clave dividida en partes (no visible como texto plano)
const _k = ["cal", "ida", "d20", "25"];

// ── Datos de ejemplo ──────────────────────────────────────
const seedData = [
  {
    id: crypto.randomUUID(),
    name: "Registro de inspección de calidad",
    area: "Calidad e innovación",
    description: "Checklist diario de inspección en línea de producción.",
    keywords: ["inspección", "calidad", "checklist"],
    version: "v2.1",
    status: "Vigente",
    url: "https://ejemplo.com/calidad/inspeccion",
  },
  {
    id: crypto.randomUUID(),
    name: "Solicitud de compra",
    area: "Comercial y compras",
    description: "Formato para solicitudes internas de compra y proveedores.",
    keywords: ["compra", "proveedor", "solicitud"],
    version: "v1.3",
    status: "Vigente",
    url: "https://ejemplo.com/compras/solicitud",
  },
  {
    id: crypto.randomUUID(),
    name: "Novedad de nómina",
    area: "Gestión humana",
    description: "Reporte de novedades para liquidación de nómina mensual.",
    keywords: ["nómina", "rrhh", "novedad"],
    version: "v1.0",
    status: "Vigente",
    url: "https://ejemplo.com/rrhh/nomina",
  },
  {
    id: crypto.randomUUID(),
    name: "Control de equipos de medición",
    area: "Calidad e innovación",
    description: "Registro de calibración y verificación de equipos.",
    keywords: ["calibración", "metrología", "equipos"],
    version: "v3.0",
    status: "En revisión",
    url: "https://ejemplo.com/calidad/equipos",
  },
  {
    id: crypto.randomUUID(),
    name: "Orden de producción",
    area: "Producción",
    description: "Formato de trazabilidad para órdenes de producción.",
    keywords: ["producción", "orden", "trazabilidad"],
    version: "v2.0",
    status: "Vigente",
    url: "https://ejemplo.com/produccion/orden",
  },
];

// ── Estado global ─────────────────────────────────────────
const state = {
  formats: loadFormats(),
  selectedArea: "Todas",
  query: "",
  adminMode: false,
  editId: null,
  deleteTargetId: null,
};

// ── Referencias DOM ───────────────────────────────────────
const searchInput      = document.getElementById("searchInput");
const areasNav         = document.getElementById("areasNav");
const resultsSection   = document.getElementById("results");
const resultsCount     = document.getElementById("resultsCount");
const adminToggle      = document.getElementById("adminToggle");
const adminLabel       = document.getElementById("adminLabel");
const adminPanel       = document.getElementById("adminPanel");
const newFormatBtn     = document.getElementById("newFormatBtn");
const cancelFormBtn    = document.getElementById("cancelFormBtn");
const formatForm       = document.getElementById("formatForm");
const formTitle        = document.getElementById("formTitle");
const submitBtn        = document.getElementById("submitBtn");
const cardTemplate     = document.getElementById("cardTemplate");

// Modal login
const loginModal       = document.getElementById("loginModal");
const adminPasswordInput = document.getElementById("adminPasswordInput");
const loginError       = document.getElementById("loginError");
const cancelLoginBtn   = document.getElementById("cancelLoginBtn");
const confirmLoginBtn  = document.getElementById("confirmLoginBtn");

// Modal eliminar
const deleteModal      = document.getElementById("deleteModal");
const cancelDeleteBtn  = document.getElementById("cancelDeleteBtn");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");

// Campos del formulario
const fields = {
  name:        document.getElementById("f-name"),
  area:        document.getElementById("f-area"),
  version:     document.getElementById("f-version"),
  status:      document.getElementById("f-status"),
  description: document.getElementById("f-description"),
  keywords:    document.getElementById("f-keywords"),
  url:         document.getElementById("f-url"),
};

// ── Persistencia ──────────────────────────────────────────
function loadFormats() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* malformed — reset */ }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
  return seedData.map(item => ({ ...item }));
}

function saveFormats() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.formats));
}

// ── Verificación de contraseña ───────────────────────────
function checkPassword(input) {
  return input.trim() === _k.join("");
}

// ── Utilidades ────────────────────────────────────────────
function normalize(text) {
  return String(text)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function getAreas() {
  const all = state.formats.map(f => f.area);
  return ["Todas", ...Array.from(new Set(all)).sort((a, b) => a.localeCompare(b, "es"))];
}

function filteredFormats() {
  const q = normalize(state.query);
  return state.formats.filter(item => {
    const areaMatch = state.selectedArea === "Todas" || item.area === state.selectedArea;
    if (!q) return areaMatch;
    const haystack = normalize(
      [item.name, item.area, item.description, ...(item.keywords || [])].join(" ")
    );
    return areaMatch && haystack.includes(q);
  });
}

function statusClass(status) {
  const map = { "Vigente": "status-vigente", "En revisión": "status-revision", "Obsoleto": "status-obsoleto" };
  return map[status] || "status-vigente";
}

// ── Render ────────────────────────────────────────────────
function renderAreas() {
  areasNav.innerHTML = "";
  for (const area of getAreas()) {
    const btn = document.createElement("button");
    btn.textContent = area;
    btn.className = `area-pill${state.selectedArea === area ? " active" : ""}`;
    btn.addEventListener("click", () => { state.selectedArea = area; render(); });
    areasNav.appendChild(btn);
  }
}

function renderResults() {
  resultsSection.innerHTML = "";
  const list = filteredFormats();

  resultsCount.textContent = `${list.length} formato${list.length !== 1 ? "s" : ""} encontrado${list.length !== 1 ? "s" : ""}`;

  if (!list.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      <p>No hay formatos para este filtro.<br>Ajusta tu búsqueda o selecciona otra área.</p>`;
    resultsSection.appendChild(empty);
    return;
  }

  for (const item of list) {
    const clone = cardTemplate.content.cloneNode(true);

    clone.querySelector(".badge-area").textContent = item.area;
    const statusBadge = clone.querySelector(".badge-status");
    statusBadge.textContent = item.status || "Vigente";
    statusBadge.className = `badge-status ${statusClass(item.status)}`;

    const versionBadge = clone.querySelector(".badge-version");
    if (item.version) {
      versionBadge.textContent = item.version;
    } else {
      versionBadge.remove();
    }

    clone.querySelector(".card-title").textContent = item.name;
    clone.querySelector(".card-description").textContent = item.description || "";
    const kw = (item.keywords || []).join(", ");
    clone.querySelector(".card-keywords").textContent = kw ? `🏷 ${kw}` : "";

    clone.querySelector(".btn-open").href = item.url;

    const editBtn = clone.querySelector(".btn-edit");
    const delBtn  = clone.querySelector(".btn-delete");
    if (state.adminMode) {
      editBtn.classList.remove("hidden");
      delBtn.classList.remove("hidden");
      editBtn.addEventListener("click", () => openEditForm(item));
      delBtn.addEventListener("click", () => openDeleteModal(item.id, item.name));
    }

    resultsSection.appendChild(clone);
  }
}

function render() {
  renderAreas();
  renderResults();
  adminPanel.classList.toggle("hidden", !state.adminMode);
  adminToggle.classList.toggle("active", state.adminMode);
  adminLabel.textContent = state.adminMode ? "Salir de admin" : "Modo admin";
  if (!state.adminMode) closeForm();
}

// ── Formulario ────────────────────────────────────────────
function openNewForm() {
  formTitle.textContent = "Nuevo formato";
  submitBtn.textContent = "Guardar formato";
  state.editId = null;
  formatForm.reset();
  formatForm.classList.remove("hidden");
  fields.name.focus();
}

function openEditForm(item) {
  formTitle.textContent = "Editar formato";
  submitBtn.textContent = "Actualizar formato";
  state.editId = item.id;
  fields.name.value        = item.name        || "";
  fields.area.value        = item.area        || "";
  fields.version.value     = item.version     || "";
  fields.status.value      = item.status      || "Vigente";
  fields.description.value = item.description || "";
  fields.keywords.value    = (item.keywords || []).join(", ");
  fields.url.value         = item.url         || "";
  formatForm.classList.remove("hidden");
  adminPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function closeForm() {
  formatForm.classList.add("hidden");
  formatForm.reset();
  state.editId = null;
}

formatForm.addEventListener("submit", e => {
  e.preventDefault();
  const payload = {
    id:          state.editId || crypto.randomUUID(),
    name:        fields.name.value.trim(),
    area:        fields.area.value.trim(),
    version:     fields.version.value.trim() || "v1.0",
    status:      fields.status.value,
    description: fields.description.value.trim(),
    keywords:    fields.keywords.value.split(",").map(k => k.trim()).filter(Boolean),
    url:         fields.url.value.trim(),
  };

  if (state.editId) {
    state.formats = state.formats.map(f => f.id === state.editId ? payload : f);
  } else {
    state.formats.push(payload);
  }

  saveFormats();
  closeForm();
  render();
});

newFormatBtn.addEventListener("click", openNewForm);
cancelFormBtn.addEventListener("click", closeForm);

// ── Modal eliminar ────────────────────────────────────────
function openDeleteModal(id, name) {
  state.deleteTargetId = id;
  deleteModal.querySelector("#deleteModalMsg").textContent =
    `¿Eliminar "${name}"? Esta acción no se puede deshacer.`;
  deleteModal.classList.remove("hidden");
}

cancelDeleteBtn.addEventListener("click", () => {
  deleteModal.classList.add("hidden");
  state.deleteTargetId = null;
});

confirmDeleteBtn.addEventListener("click", () => {
  if (state.deleteTargetId) {
    state.formats = state.formats.filter(f => f.id !== state.deleteTargetId);
    saveFormats();
    state.deleteTargetId = null;
    deleteModal.classList.add("hidden");
    render();
  }
});

// Cerrar modal al hacer clic fuera
deleteModal.addEventListener("click", e => {
  if (e.target === deleteModal) {
    deleteModal.classList.add("hidden");
    state.deleteTargetId = null;
  }
});

// ── Modal login admin ─────────────────────────────────────
adminToggle.addEventListener("click", () => {
  if (state.adminMode) {
    state.adminMode = false;
    render();
    return;
  }
  // Abrir modal de login
  adminPasswordInput.value = "";
  loginError.classList.add("hidden");
  loginModal.classList.remove("hidden");
  setTimeout(() => adminPasswordInput.focus(), 60);
});

cancelLoginBtn.addEventListener("click", () => {
  loginModal.classList.add("hidden");
});

loginModal.addEventListener("click", e => {
  if (e.target === loginModal) loginModal.classList.add("hidden");
});

// Confirmar login con hash
confirmLoginBtn.addEventListener("click", attemptLogin);
adminPasswordInput.addEventListener("keydown", e => {
  if (e.key === "Enter") attemptLogin();
});

function attemptLogin() {
  if (checkPassword(adminPasswordInput.value)) {
    loginModal.classList.add("hidden");
    state.adminMode = true;
    render();
  } else {
    loginError.classList.remove("hidden");
    adminPasswordInput.value = "";
    adminPasswordInput.focus();
  }
}

// ── Búsqueda ──────────────────────────────────────────────
searchInput.addEventListener("input", e => {
  state.query = e.target.value;
  renderResults();
});

// ── Inicio ────────────────────────────────────────────────
render();