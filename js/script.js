// Variables constantes y configuración
const TOTAL_PREGUNTAS = 26;
const TIEMPO_JUEGO = 120;
const NO_RESPONDIDA = 0;
const RESPONDIDA = 1;
const PREGUNTA_NO_SELECCIONADA = -1;

let numPreguntaActual = PREGUNTA_NO_SELECCIONADA;
let numAcertadas = 0;
let timeLeft = TIEMPO_JUEGO;
let countdown;
let estadoPreguntas = Array(TOTAL_PREGUNTAS).fill(NO_RESPONDIDA);
let respuestasUsuario = [];

// Selección de elementos del DOM
const timer = document.getElementById("tiempo");
const respuesta = document.getElementById("respuesta");
const container = document.querySelector(".container");

// Se crea la base de datos de preguntas
const preguntasJuego = [
  {
    id: 'A',
    pregunta:
      "Método para identificar que solo usuarios autorizados tengan acceso a un sistema",
    respuesta: "autenticacion",
  },
  {
    id: 'B',
    pregunta:
      "Tipo de almacenamiento de datos que permite acceder a ellos en formato de tabla",
    respuesta: "base de datos",
  },
  {
    id: 'C',
    pregunta:
      "Lenguaje de estilos utilizado para describir la presentación de un documento HTML",
    respuesta: "CSS",
  },
  {
    id: 'D',
    pregunta: "Proceso de encontrar y corregir errores en un programa",
    respuesta: "depuracion",
  },
  {
    id: 'E',
    pregunta:
      "Archivo binario, cuyo contenido se interpreta por el ordenador como un programa",
    respuesta: "ejecutable",
  },
  {
    id: 'F',
    pregunta: "Bloque de código que realiza alguna operación",
    respuesta: "funcion",
  },
  {
    id: 'G',
    pregunta:
      "Sistema de control de versiones ampliamente utilizado en el desarrollo de software",
    respuesta: "git",
  },
  {
    id: 'H',
    pregunta:
      "Protocolo utilizado para la transferencia de archivos a través de la web",
    respuesta: "http",
  },
  {
    id: 'I',
    pregunta: "Medio que permite la comunicación entre un usuario y el sistema",
    respuesta: "interfaz",
  },
  {
    id: 'J',
    pregunta:
      "Lenguaje de programación con el cual se diseñó el sistema operativo Android",
    respuesta: "java",
  },

  {
    id: 'K',
    pregunta: "Unidad de medida de información que equivale a 1024 bytes",
    respuesta: "kilobyte",
  },

  {
    id: 'L',
    pregunta:
      "Framework de código abierto para desarrollar aplicaciones y servicios web con PHP",
    respuesta: "laravel",
  },

  {
    id: 'M',
    pregunta:
      "Tipo de sistema operativo que permite que varias tareas se realicen simultáneamente",
    respuesta: "multitarea",
  },

  {
    id: 'N',
    pregunta: "Proceso para reducir redundancia en bases de datos relacionales",
    respuesta: "normalizacion",
  },

  {
    id: 'O',
    pregunta:
      "Entidad dentro de un lenguaje de programación que contiene al mismo tiempo un estado y un comportamiento",
    respuesta: "objeto",
  },

  {
    id: 'P',
    pregunta:
      "Lenguaje de programación que se utiliza comúnmente para el desarrollo web del lado del servidor ",
    respuesta: "php",
  },

  {
    id: 'Q',
    pregunta:
      "Instrucciones que se envían a una base de datos para recuperar, cambiar o manipular datos ",
    respuesta: "query",
  },

  {
    id: 'R',
    pregunta:
      "Lenguaje de programación interpretado, reflexivo y orientado a objetos, creado por el programador japonés Yukihiro Matsumoto",
    respuesta: "ruby",
  },

  {
    id: 'S',
    pregunta:
      "Conjunto de instrucciones que un programa sigue para realizar una tarea",
    respuesta: "script",
  },

  {
    id: 'T',
    pregunta:
      "Lenguaje de programación libre y de código abierto desarrollado y mantenido por Microsoft. ",
    respuesta: "typescript",
  },

  {
    id: 'U',
    pregunta:
      "Sistema operativo basado en Linux, que incluye principalmente software libre y de código abierto",
    respuesta: "ubuntu",
  },

  {
    id: 'V',
    pregunta:
      "Editor de código fuente que soporta múltiples lenguajes de programación",
    respuesta: "visual studio code",
  },

  {
    id: 'W',
    pregunta:
      "Sistema operativo desarrollado por la compañía estadounidense Microsoft",
    respuesta: "windows",
  },

  {
    id: 'X',
    pregunta:
      "Lenguaje de marcado que se utiliza para definir la estructura de documentos en XML",
    respuesta: "XHTML",
  },

  {
    id: 'Y',
    pregunta:
      "Contiene la Y. Lenguaje de programación utilizado en las aplicaciones web, desarrollo de software, ciencia de datos y 'machine learning'",
    respuesta: "phyton",
  },

  {
    id: 'Z',
    pregunta:
      "Formato de archivo comprimido que permite reducir el tamaño de archivos y carpetas, facilitando su almacenamiento y transferencia",
    respuesta: "zip",
  },
];

// Función para iniciar el juego
function iniciarJuego() {
  document.getElementById("pantalla-inicial").style.display = "none";
  document.getElementById("pantalla-juego").style.display = "block";
  contadorTiempo();
  cargarPregunta();
}

// Función para el contador de tiempo
function contadorTiempo() {
  countdown = setInterval(() => {
    timeLeft--;
    timer.innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(countdown);
      mostrarPantallaFinal();
    }
  }, 1000);
}

function roscoCompletado() {
  return estadoPreguntas.every((estado) => estado === RESPONDIDA);
}

// Función para cargar una pregunta nueva
function cargarPregunta() {
  if (numPreguntaActual != -1) {
    // No se ejecuta si el juego no ha empezado
    // Se elimina la clase "pregunta-actual" cuando se pasa palabra
    eliminarClasePregunta(
      preguntasJuego[numPreguntaActual].id,
      "pregunta-actual"
    );
  }

  // Si todas las preguntas han sido respondidas, mostrar pantalla final
  if (roscoCompletado()) {
    mostrarPantallaFinal();
    return;
  }

  do {
    numPreguntaActual = (numPreguntaActual + 1) % TOTAL_PREGUNTAS;
  } while (estadoPreguntas[numPreguntaActual] === RESPONDIDA);

  const preguntaActual = preguntasJuego[numPreguntaActual];
  document.getElementById("letra-pregunta").textContent = preguntaActual.id;
  document.getElementById("pregunta").textContent = preguntaActual.pregunta;
  actualizarClasePregunta(preguntaActual.id, "pregunta-actual");

  // Enfoca el campo de entrada
  respuesta.focus();
}

// Función para procesar la respuesta del usuario
function procesarEntrada() {
  const valorRespuesta = respuesta.value.trim();
  if (valorRespuesta === "") {
    alert("Por favor, introduce una respuesta.");
    return;
  }

  comprobarRespuesta(valorRespuesta);
  respuesta.value = ""; // Limpiar el campo de entrada
}

// Función para comprobar la respuesta
function comprobarRespuesta(valorRespuesta) {
  const preguntaActual = preguntasJuego[numPreguntaActual];
  const esCorrecta =
    valorRespuesta.toLowerCase() === preguntaActual.respuesta.toLowerCase();

  estadoPreguntas[numPreguntaActual] = RESPONDIDA;
  respuestasUsuario[numPreguntaActual] = valorRespuesta;

  if (esCorrecta) {
    numAcertadas++;
    actualizarClasePregunta(preguntaActual.id, "bien-respondida");
  } else {
    actualizarClasePregunta(preguntaActual.id, "mal-respondida");
  }

  cargarPregunta();
}

// Función para actualizar las clases de las preguntas (resaltado)
function actualizarClasePregunta(letra, claseNueva) {
  const letraElemento = document.getElementById(letra);
  letraElemento.classList.remove(
    "pregunta-actual",
    "bien-respondida",
    "mal-respondida"
  );
  letraElemento.classList.add(claseNueva);
}

// Función para eliminar las clases de las preguntas (resaltado)
function eliminarClasePregunta(letra, clase) {
  const letraElemento = document.getElementById(letra);
  letraElemento.classList.remove(clase);
}

// Función para mostrar la pantalla final
function mostrarPantallaFinal() {
  document.getElementById("acertadas").textContent = numAcertadas;
  document.getElementById("puntuacion").textContent = `${Math.round(
    (numAcertadas * 100) / TOTAL_PREGUNTAS
  )}% de aciertos`;
  document.getElementById("pantalla-juego").style.display = "none";
  document.getElementById("pantalla-final").style.display = "block";
}

// Función para reiniciar el juego
function reiniciarJuego() {
  numPreguntaActual = PREGUNTA_NO_SELECCIONADA;
  timeLeft = TIEMPO_JUEGO;
  numAcertadas = 0;
  estadoPreguntas.fill(NO_RESPONDIDA);
  timer.innerText = timeLeft;
  respuestasUsuario = [];

  limpiarClasesPreguntas();
  document.getElementById("pantalla-final").style.display = "none";
  document.getElementById("pantalla-juego").style.display = "block";
  respuesta.value = "";
  clearInterval(countdown);
  contadorTiempo();
  cargarPregunta();
}

// Función para limpiar las clases de las preguntas
function limpiarClasesPreguntas() {
  const circulos = document.getElementsByClassName("circle");
  for (let circulo of circulos) {
    circulo.classList.remove(
      "pregunta-actual",
      "bien-respondida",
      "mal-respondida"
    );
  }
}

// Crear círculos para las letras del abecedario
function crearCirculos() {
  for (let i = 1; i <= TOTAL_PREGUNTAS; i++) {
    const circle = document.createElement("div");
    circle.classList.add("circle");
    circle.textContent = String.fromCharCode(i + 96);
    circle.id = String.fromCharCode(i + 96).toUpperCase();
    container.appendChild(circle);

    const angle = ((i - 1) / TOTAL_PREGUNTAS) * Math.PI * 2 - Math.PI / 2;
    const x = Math.round(225 + 260 * Math.cos(angle));
    const y = Math.round(225 + 260 * Math.sin(angle));
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
  }
}

// Eventos de botones
document.getElementById("iniciar").addEventListener("click", iniciarJuego);
document.getElementById("pasar").addEventListener("click", cargarPregunta);
document.getElementById("responder").addEventListener("click", procesarEntrada);
respuesta.addEventListener("keyup", (event) => {
  if (event.key === "Enter") procesarEntrada();
});
document.getElementById("reiniciar").addEventListener("click", reiniciarJuego);

// Iniciar al cargar la página
crearCirculos();