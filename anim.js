// Zona horaria fija Argentina (UTC-3)
function ahoraArgentina() {
  const ahora = new Date();
  const utc = ahora.getTime() + (ahora.getTimezoneOffset() * 60000);
  return new Date(utc - (3 * 60 * 60 * 1000));
}

// Fecha de inicio en Argentina (12 Feb 2026 03:40)
const fechaInicio = new Date(Date.UTC(2026, 1, 12, 6, 40, 0));
// (Sumamos +3 horas porque UTC → Argentina es -3)

var lyrics = document.querySelector("#lyrics");

function pluralize(value, singular, plural) {
  return value + " " + (value === 1 ? singular : plural);
}

function calcularDiferencia() {
  const ahora = ahoraArgentina();

  let msDiferencia = ahora - fechaInicio;
  if (msDiferencia < 0) msDiferencia = 0;

  // TIEMPO TOTAL
  const totalSegundos = Math.floor(msDiferencia / 1000);
  const diasTotal = Math.floor(totalSegundos / 86400);
  let restoSegundos = totalSegundos % 86400;

  const horas = Math.floor(restoSegundos / 3600);
  restoSegundos %= 3600;

  const minutos = Math.floor(restoSegundos / 60);
  const segundos = restoSegundos % 60;

  // CÁLCULO EXACTO (Argentina)
  let años = ahora.getFullYear() - fechaInicio.getUTCFullYear();
  let meses = ahora.getMonth() - fechaInicio.getUTCMonth();
  let diasMes = ahora.getDate() - fechaInicio.getUTCDate();

  if (diasMes < 0) {
    meses -= 1;
    const ultimoMes = new Date(ahora.getFullYear(), ahora.getMonth(), 0);
    diasMes += ultimoMes.getDate();
  }

  if (meses < 0) {
    años -= 1;
    meses += 12;
  }

  const detalle = [];

  if (años > 0) {
    detalle.push(pluralize(años, "año", "años"));
  }

  if (meses > 0) {
    detalle.push(pluralize(meses, "mes", "meses"));
  }

  detalle.push(pluralize(diasMes, "día", "días"));

  // OUTPUT
  lyrics.style.opacity = 1;
  lyrics.innerHTML =
    pluralize(diasTotal, "día", "días") + ", " +
    pluralize(horas, "hora", "horas") + ", " +
    pluralize(minutos, "minuto", "minutos") + ", " +
    pluralize(segundos, "segundo", "segundos") +
    "<br>(" + detalle.join(", ") + ")";
}

// LOOP
calcularDiferencia();
setInterval(calcularDiferencia, 1000);

// OCULTAR TÍTULO
function ocultarTitulo() {
  const titulo = document.querySelector(".titulo");
  if (!titulo) return;

  titulo.style.animation = "fadeOut 3s ease-in-out forwards";

  setTimeout(() => {
    titulo.style.display = "none";
  }, 3000);
}

setTimeout(ocultarTitulo, 216000);
  }, 3000);
}

// Ejecutar después de 216 segundos
setTimeout(ocultarTitulo, 216000);
