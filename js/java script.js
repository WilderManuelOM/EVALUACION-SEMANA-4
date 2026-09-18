
// Menú hamburguesa para pantallas móviles y tablet.
document.addEventListener("DOMContentLoaded", function () {
  const botonMenu = document.getElementById("navToggle");
  const enlacesMenu = document.getElementById("navLinks");

  if (!botonMenu || !enlacesMenu) return;

  botonMenu.addEventListener("click", function () {
    const abierto = enlacesMenu.classList.toggle("open");
    botonMenu.setAttribute("aria-expanded", String(abierto));
    botonMenu.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
  });

  enlacesMenu.querySelectorAll("a").forEach(function (enlace) {
    enlace.addEventListener("click", function () {
      enlacesMenu.classList.remove("open");
      botonMenu.setAttribute("aria-expanded", "false");
      botonMenu.setAttribute("aria-label", "Abrir menú");
    });
  });
});

// Formulario de contacto.
const formulario = document.getElementById("formContacto");

if (formulario) {
formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const telefono = document.getElementById("telefono").value;
  const destino = document.getElementById("destino").value;
  const mensaje = document.getElementById("mensaje").value;

  console.log("Nombre: " + nombre);
  console.log("Correo: " + correo);
  console.log("Telefono: " + telefono);
  console.log("Destino: " + destino);
  console.log("Mensaje: " + mensaje);

  formulario.reset();
});
}

document.addEventListener("DOMContentLoaded", function() {
  // Verifica si llegamos al formulario de contacto
  if (window.location.hash === "#formContacto") {
    const inputNombre = document.querySelector("#nombre");
    
    if (inputNombre) {
      // Le damos un pequeño respiro al navegador para que termine de hacer scroll y renderizar
      setTimeout(() => {
        inputNombre.focus();
      }, 200);
    }
  }
});
