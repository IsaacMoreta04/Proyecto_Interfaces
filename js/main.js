// --- Elementos del DOM ---
const mensaje = "Hola!\nSoy tu asistente virtual.\n¿En qué puedo ayudarte hoy?";
const texto = document.getElementById("texto");
const cursor = document.getElementById("cursor");
const robot = document.getElementById("robot");
const btnLogin = document.getElementById("btnLogin");
const reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 
// --- Efecto de escritura en la burbuja ---
let timerEscritura = null;
 
function escribir() {
  clearInterval(timerEscritura);
 
  if (reducirMovimiento) {
    texto.innerHTML = mensaje.replace(/\n/g, "<br>");
    cursor.classList.add("fin");
    return;
  }
 
  texto.innerHTML = "";
  cursor.classList.remove("fin");
  let i = 0;
 
  timerEscritura = setInterval(() => {
    const letra = mensaje[i++];
    texto.innerHTML += letra === "\n" ? "<br>" : letra;
 
    if (i >= mensaje.length) {
      clearInterval(timerEscritura);
      cursor.classList.add("fin");
    }
  }, 45);
}
 
// --- El robot saluda al cargar y al hacer clic ---
function saludar() {
  robot.classList.remove("saluda");
  void robot.offsetWidth; // reinicia la animación
  robot.classList.add("saluda");
}
 
robot.addEventListener("click", () => {
  saludar();
  escribir();
});
 
// --- Parpadeo ocasional ---
setInterval(() => {
  robot.classList.add("parpadea");
  setTimeout(() => robot.classList.remove("parpadea"), 260);
}, 4000);
 
// --- Botón de inicio de sesión (reemplaza por tu ruta real) ---
btnLogin.addEventListener("click", () => {
  // window.location.href = "login.html";
  alert("Aquí irá la pantalla de inicio de sesión.");
});
 
// --- Inicio ---
saludar();
escribir();

// ===== Barra de navegación =====
(function () {
  const navbar = document.getElementById("navbar");
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");
  const btnTramites = document.getElementById("navTramites");
  const subTramites = document.getElementById("subTramites");

  if (!navbar || !toggle || !menu) return;

  // Menú hamburguesa (celular)
  function abrirMenu(abrir) {
    menu.classList.toggle("is-open", abrir);
    toggle.setAttribute("aria-expanded", String(abrir));
    toggle.setAttribute("aria-label", abrir ? "Cerrar menú" : "Abrir menú");
  }

  toggle.addEventListener("click", () => {
    abrirMenu(!menu.classList.contains("is-open"));
  });

  // Submenú "Trámites"
  function abrirSubmenu(abrir) {
    if (!btnTramites || !subTramites) return;
    btnTramites.setAttribute("aria-expanded", String(abrir));
    subTramites.hidden = !abrir;
  }

  if (btnTramites && subTramites) {
    btnTramites.addEventListener("click", (e) => {
      e.stopPropagation();
      abrirSubmenu(subTramites.hidden);
    });
  }

  // Enlace activo
  const enlaces = menu.querySelectorAll("a.navbar__link");

  function marcarActivo(enlace) {
    enlaces.forEach((a) => {
      a.classList.remove("is-active");
      a.removeAttribute("aria-current");
    });
    enlace.classList.add("is-active");
    enlace.setAttribute("aria-current", "page");
  }

  enlaces.forEach((a) => {
    a.addEventListener("click", () => {
      marcarActivo(a);
      abrirMenu(false);
    });
  });

  if (subTramites) {
    subTramites.addEventListener("click", (e) => {
      if (e.target.closest("a")) {
        abrirSubmenu(false);
        abrirMenu(false);
      }
    });
  }

  // Cerrar al hacer clic fuera o con Escape
  document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target)) {
      abrirSubmenu(false);
      abrirMenu(false);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      abrirSubmenu(false);
      abrirMenu(false);
    }
  });

  // Si se agranda la ventana, se reinicia el menú móvil
  window.matchMedia("(min-width: 821px)").addEventListener("change", () => {
    abrirMenu(false);
  });

  // Sombra al hacer scroll
  function actualizarSombra() {
    navbar.classList.toggle("con-sombra", window.scrollY > 4);
  }
  window.addEventListener("scroll", actualizarSombra, { passive: true });
  actualizarSombra();
})();