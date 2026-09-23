console.log("Script de tours.html cargado");

// Buscamos todos los botones que tengan la clase "btn-reservar"
const botonesReservar = document.querySelectorAll(".btn-reservar");

console.log("Cantidad de botones encontrados: " + botonesReservar.length);

// Recorremos cada botón uno por uno
for (let i = 0; i < botonesReservar.length; i++) {
  const boton = botonesReservar[i];

  boton.addEventListener("click", function () {
    console.log("Se hizo clic en el botón Reservar");
    // Redirigimos hacia el formulario de contacto
    window.location.href = "contacto.html#formContacto";
  });
}

