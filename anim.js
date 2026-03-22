// AUDIO
window.addEventListener("load", () => {
  const audio = document.getElementById("musica");

  if (localStorage.getItem("playAudio") === "true") {
    audio.play().catch(() => {
      // fallback por si el navegador bloquea
      document.body.addEventListener("click", () => {
        audio.play();
      }, { once: true });
    });

    localStorage.removeItem("playAudio");
  }
});

// Sincronizar las letras con la canción
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

// Fecha de inicio (con hora para el contador principal)
var fechaInicio = new Date(2026, 1, 12, 3, 40, 0);

// Fecha SOLO para meses/días (sin hora)
var fechaInicioDia = new Date(2026, 1, 12);
fechaInicioDia.setHours(0, 0, 0, 0);

function pluralize(value, singular, plural) {
  return value + " " + (value === 1 ? singular : plural);
}

function calcularDiferencia() {
  var ahora = new Date();

  // =========================
  // PARTE 1: TIEMPO EXACTO
  // =========================
  var msDiferencia = ahora - fechaInicio;

  if (msDiferencia < 0) {
    msDiferencia = 0;
  }

  var totalSegundos = Math.floor(msDiferencia / 1000);
  var dias = Math.floor(totalSegundos / 86400);
  var restoSegundos = totalSegundos % 86400;

  var horas = Math.floor(restoSegundos / 3600);
  restoSegundos %= 3600;

  var minutos = Math.floor(restoSegundos / 60);
  var segundos = restoSegundos % 60;

  // =========================
  // PARTE 2: MESES Y DÍAS (SIN HORAS)
  // =========================
  var hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  var años = hoy.getFullYear() - fechaInicioDia.getFullYear();
  var meses = hoy.getMonth() - fechaInicioDia.getMonth();
  var diasMes = hoy.getDate() - fechaInicioDia.getDate();

  if (diasMes < 0) {
    meses -= 1;
    var ultimoMes = new Date(hoy.getFullYear(), hoy.getMonth(), 0);
    diasMes += ultimoMes.getDate();
  }

  if (meses < 0) {
    años -= 1;
    meses += 12;
  }

  var detalleMesesDias = [];

  if (años > 0) {
    detalleMesesDias.push(pluralize(años, "año", "años"));
  }

  if (meses > 0) {
    detalleMesesDias.push(pluralize(meses, "mes", "meses"));
  }

  detalleMesesDias.push(pluralize(diasMes, "día", "días"));

  // =========================
  // OUTPUT
  // =========================
  lyrics.style.opacity = 1;
  lyrics.innerHTML =
    pluralize(dias, "día", "días") + ", " +
    pluralize(horas, "hora", "horas") + ", " +
    pluralize(minutos, "minuto", "minutos") + ", " +
    pluralize(segundos, "segundo", "segundos") +
    "<br>(" + detalleMesesDias.join(", ") + ")";
}

// Actualizar cada segundo
calcularDiferencia();
setInterval(calcularDiferencia, 1000);

// Función para ocultar el título
function ocultarTitulo() {
  var titulo = document.querySelector(".titulo");
  if (!titulo) return;

  titulo.style.animation = "fadeOut 3s ease-in-out forwards";

  setTimeout(function () {
    titulo.style.display = "none";
  }, 3000);
}

// Ejecutar después de 216 segundos
setTimeout(ocultarTitulo, 216000);
