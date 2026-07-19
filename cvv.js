const interruptorTema = document.getElementById("interruptor-tema");
const claveTema = "tema-portafolio";

function aplicarTema(modoOscuro) {
  document.documentElement.classList.toggle("modo-oscuro", modoOscuro);

  if (!interruptorTema) {
    return;
  }

  interruptorTema.setAttribute("aria-pressed", String(modoOscuro));
  interruptorTema.setAttribute(
    "aria-label",
    modoOscuro ? "Desactivar modo oscuro" : "Activar modo oscuro"
  );
  interruptorTema.querySelector(".interruptor-tema-texto").textContent = modoOscuro
    ? "Claro"
    : "Oscuro";
}

const temaGuardado = localStorage.getItem(claveTema);
const prefiereOscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;
const iniciarEnOscuro = temaGuardado === "oscuro" || (!temaGuardado && prefiereOscuro);

aplicarTema(iniciarEnOscuro);

if (interruptorTema) {
  interruptorTema.addEventListener("click", function () {
    const modoOscuroActivo = !document.documentElement.classList.contains("modo-oscuro");
    aplicarTema(modoOscuroActivo);
    localStorage.setItem(claveTema, modoOscuroActivo ? "oscuro" : "claro");
  });
}

/* Edita este arreglo para agregar o cambiar preguntas y respuestas del chat */
const respuestasChat = [
  {
    id: "experiencia",
    pregunta: "¿Cuál es tu experiencia profesional?",
    respuesta:
      "Trabajo como desarrollador Full Stack en Holding Grupo Firma, donde he liderado proyectos con Angular y NestJS, incluyendo el rediseño de Autos Ya, generación de imágenes con IA y automatización de minutas.",
  },
  {
    id: "stack",
    pregunta: "¿Con qué tecnologías trabajas?",
    respuesta:
      "Mi stack principal es TypeScript, Angular, NestJS y SQL. También tengo conocimientos en React, Django, MongoDB y herramientas de IA como Gemini vía OpenRouter.",
  },
  {
    id: "ia",
    pregunta: "¿Qué has hecho con IA?",
    respuesta:
      "Integré Gemini para generación y edición de imágenes en Autos Ya, y armé un flujo con Fathom + Gemini para generar y enviar minutas de forma automática tambien aplicando a esto una interfaz visual para poder configurar la minuta.",
  },
  {
    id: "disponibilidad",
    pregunta: "¿Estás disponible para nuevas oportunidades?",
    respuesta:
      "Sí, estoy abierto a conversar sobre roles Full Stack o de desarrollo con foco en IA aplicada. Puedes escribirme por correo o LinkedIn y te respondere a la brevedad.",
  },
  {
    id: "contacto",
    pregunta: "¿Cómo te contacto?",
    respuesta:
      "Escríbeme a javierriosrojas114@gmail.com, llámame al +56 9 1013 5366 o contáctame por LinkedIn. También puedes descargar mi CV desde el pie de página.",
  },
  {
    id: "pais",
    pregunta: "¿En qué país te encuentras?",
    respuesta: "Estoy en Chile, pero me encuentro disponible para trabajar en cualquier país.",
  },
  {
    id: "metodologias",
    pregunta: "¿Qué metodologías de desarrollo usas?",
    respuesta: "Soy un desarrollador Full Stack que utiliza metodologías ágiles como Scrum para llevar a cabo mis proyectos.",
  },
  
];

const listaMensajesChat = document.getElementById("chat-mensajes");
const selectChat = document.getElementById("chat-select");
const formularioChat = document.getElementById("chat-formulario");

function agregarBurbujaChat(texto, tipo) {
  if (!listaMensajesChat) {
    return;
  }

  const burbuja = document.createElement("div");
  burbuja.className = "chat-burbuja chat-burbuja-" + tipo;
  burbuja.textContent = texto;
  listaMensajesChat.appendChild(burbuja);
  listaMensajesChat.scrollTop = listaMensajesChat.scrollHeight;
}

function buscarRespuestaChat(idPregunta) {
  for (let indice = 0; indice < respuestasChat.length; indice++) {
    if (respuestasChat[indice].id === idPregunta) {
      return respuestasChat[indice];
    }
  }

  return null;
}

if (selectChat) {
  for (let indice = 0; indice < respuestasChat.length; indice++) {
    const opcion = document.createElement("option");
    opcion.value = respuestasChat[indice].id;
    opcion.textContent = respuestasChat[indice].pregunta;
    selectChat.appendChild(opcion);
  }
}

if (formularioChat && selectChat) {
  formularioChat.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const idPregunta = selectChat.value;
    const entrada = buscarRespuestaChat(idPregunta);

    if (!entrada) {
      return;
    }

    agregarBurbujaChat(entrada.pregunta, "reclutador");
    agregarBurbujaChat(entrada.respuesta, "yo");
    selectChat.selectedIndex = 0;
  });
}

const enlaceCurriculum = document.querySelector(".pie-contacto-descargar-cv");

if (enlaceCurriculum) {
  enlaceCurriculum.addEventListener("click", async function (evento) {
    const rutaCv = this.getAttribute("href");
    const nombreArchivo = this.getAttribute("download") || "CV_Javier_Rios.pdf";

    if (window.location.protocol === "file:") {
      return;
    }

    evento.preventDefault();

    try {
      const respuesta = await fetch(rutaCv);

      if (!respuesta.ok) {
        throw new Error("No se pudo obtener el CV");
      }

      const archivo = await respuesta.blob();
      const urlTemporal = URL.createObjectURL(archivo);
      const enlaceTemporal = document.createElement("a");

      enlaceTemporal.href = urlTemporal;
      enlaceTemporal.download = nombreArchivo;
      document.body.appendChild(enlaceTemporal);
      enlaceTemporal.click();
      document.body.removeChild(enlaceTemporal);
      URL.revokeObjectURL(urlTemporal);
    } catch {
      window.open(rutaCv, "_blank", "noopener,noreferrer");
    }
  });
}
