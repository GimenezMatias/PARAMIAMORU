// Sincronizar las letras con la canción
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

// Fecha de inicio: 12 de febrero de 2026 a las 03:40
var fechaInicio = new Date(2026, 1, 12, 3, 40, 0); // Meses 0-index (1 = febrero)

function pluralize(value, singular, plural) {
  return value + " " + (value === 1 ? singular : plural);
}

function calcularDiferencia() {
  var ahora = new Date();
  var msDiferencia = ahora - fechaInicio;

  if (msDiferencia < 0) {
    msDiferencia = 0;
  }

  // TIEMPO TOTAL
  var totalSegundos = Math.floor(msDiferencia / 1000);
  var diasTotal = Math.floor(totalSegundos / 86400);
  var restoSegundos = totalSegundos % 86400;
  var horas = Math.floor(restoSegundos / 3600);
  restoSegundos %= 3600;
  var minutos = Math.floor(restoSegundos / 60);
  var segundos = restoSegundos % 60;

  // CÁLCULO CORRECTO DE AÑOS, MESES Y DÍAS
  var años = ahora.getFullYear() - fechaInicio.getFullYear();
  var meses = ahora.getMonth() - fechaInicio.getMonth();
  var diasMes = ahora.getDate() - fechaInicio.getDate();

  if (diasMes < 0) {
    meses -= 1;
    var ultimoMes = new Date(ahora.getFullYear(), ahora.getMonth(), 0);
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

  // MOSTRAR RESULTADO
  lyrics.style.opacity = 1;
  lyrics.innerHTML =
    pluralize(diasTotal, "día", "días") + ", " +
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
