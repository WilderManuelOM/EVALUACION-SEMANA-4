
//Fumulario de contacto 
const formulario = document.getElementById("formContacto");

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