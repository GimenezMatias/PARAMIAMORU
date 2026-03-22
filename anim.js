// Sincronizar las letras con la canción
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

// Fecha de inicio: 12 de febrero de 2026 a las 03:40
var fechaInicio = new Date(2026, 1, 12, 3, 40, 0); // Meses 0-index (1 = febrero)

function formatNumber(n) {
  return n < 10 ? "0" + n : n;
}

function pluralize(value, singular, plural) {
  return value + " " + (value === 1 ? singular : plural);
}

function calcularDiferencia() {
  var ahora = new Date();
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

  // Cálculo de meses + días (dos partes) a partir de la misma fecha
  var mesesTotales =
    ahora.getFullYear() * 12 + ahora.getMonth() -
    (fechaInicio.getFullYear() * 12 + fechaInicio.getMonth());

  if (mesesTotales < 0) {
    mesesTotales = 0;
  }

  var fechaConMeses = new Date(fechaInicio.getTime());
  fechaConMeses.setMonth(fechaInicio.getMonth() + mesesTotales);

  if (fechaConMeses > ahora) {
    mesesTotales -= 1;
    fechaConMeses = new Date(fechaInicio.getTime());
    fechaConMeses.setMonth(fechaInicio.getMonth() + mesesTotales);
  }

  var diasMeses = Math.floor((ahora - fechaConMeses) / 86400000);
  if (diasMeses < 0) {
    diasMeses = 0;
  }

  var años = Math.floor(mesesTotales / 12);
  var meses = mesesTotales % 12;

  var detalleMesesDias = [];
  if (años > 0) {
    detalleMesesDias.push(pluralize(años, "año", "años"));
  }
  if (meses > 0) {
    detalleMesesDias.push(pluralize(meses, "mes", "meses"));
  }
  detalleMesesDias.push(pluralize(diasMeses, "día", "días"));

  lyrics.style.opacity = 1;
  lyrics.innerHTML =
    pluralize(dias, "día", "días") + ", " +
    pluralize(horas, "hora", "horas") + ", " +
    pluralize(minutos, "minuto", "minutos") + ", " +
    pluralize(segundos, "segundo", "segundos") +
    "<br>(" + detalleMesesDias.join(", ") + ")";
}

// Actualizar el texto cada segundo
calcularDiferencia();
setInterval(calcularDiferencia, 1000);

//funcion titulo
// Función para ocultar el título después de 216 segundos
function ocultarTitulo() {
  var titulo = document.querySelector(".titulo");
  if (!titulo) return;
  titulo.style.animation =
    "fadeOut 3s ease-in-out forwards"; /* Duración y función de temporización de la desaparición */
  setTimeout(function () {
    titulo.style.display = "none";
  }, 3000); // Espera 3 segundos antes de ocultar completamente
}

// Llama a la función después de 216 segundos (216,000 milisegundos)
setTimeout(ocultarTitulo, 216000);