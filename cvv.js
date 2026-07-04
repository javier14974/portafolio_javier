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
