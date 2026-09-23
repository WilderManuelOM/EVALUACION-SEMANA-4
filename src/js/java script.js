// Arreglo global de contactos cargado desde LocalStorage
let listaContactos = JSON.parse(localStorage.getItem("contactos")) || [];

document.addEventListener("DOMContentLoaded", function () {
  // 1. Menú hamburguesa
  const botonMenu = document.getElementById("navToggle");
  const enlacesMenu = document.getElementById("navLinks");

  if (botonMenu && enlacesMenu) {
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
  }

  // 2. Colocar año en footer
  const anioSpan = document.getElementById("anio");
  if (anioSpan) {
    anioSpan.textContent = new Date().getFullYear();
  }

  // 3. Renderizar tabla al cargar
  renderizarTabla();

  // 4. Autofocus si se llega mediante hash
  if (window.location.hash === "#formContacto") {
    const inputNombre = document.querySelector("#nombre");
    if (inputNombre) {
      setTimeout(() => inputNombre.focus(), 200);
    }
  }
});

// Referencias del DOM para el Formulario CRUD
const formulario = document.getElementById("formContacto");
const inputNombre = document.getElementById("nombre");
const inputCorreo = document.getElementById("correo");
const inputTelefono = document.getElementById("telefono");
const selectDestino = document.getElementById("destino");
const inputMensaje = document.getElementById("mensaje");
const inputIndexEdit = document.getElementById("indexEdit");

const formTitulo = document.getElementById("formTitulo");
const btnGuardar = document.getElementById("btnGuardar");
const btnCancelar = document.getElementById("btnCancelar");
const tablaContactosBody = document.getElementById("tablaContactosBody");

// CREATE & UPDATE: Submit del formulario
if (formulario) {
  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nuevoContacto = {
      nombre: inputNombre.value.trim(),
      correo: inputCorreo.value.trim(),
      telefono: inputTelefono.value.trim(),
      destino: selectDestino.value,
      mensaje: inputMensaje.value.trim()
    };

    const index = parseInt(inputIndexEdit.value);

    if (index === -1) {
      // --- CREATE ---
      listaContactos.push(nuevoContacto);
    } else {
      // --- UPDATE ---
      listaContactos[index] = nuevoContacto;
      resetearFormulario();
    }

    guardarEnLocalStorage();
    renderizarTabla();
    formulario.reset();
  });
}

// READ: Dibujar filas de la tabla
function renderizarTabla() {
  if (!tablaContactosBody) return;

  tablaContactosBody.innerHTML = "";

  if (listaContactos.length === 0) {
    tablaContactosBody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align: center; padding: 15px; color: #777;">
          No hay solicitudes registradas.
        </td>
      </tr>
    `;
    return;
  }

  listaContactos.forEach((contacto, index) => {
    const tr = document.createElement("tr");
    tr.style.borderBottom = "1px solid #eee";

    tr.innerHTML = `
      <td style="padding: 10px;">${contacto.nombre}</td>
      <td style="padding: 10px;">${contacto.correo}</td>
      <td style="padding: 10px;">${contacto.destino}</td>
      <td style="padding: 10px; text-align: center;">
        <button 
          class="btn-editar" 
          data-index="${index}"
          style="background: #2196F3; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; margin-right: 5px;">
          Editar
        </button>
        <button 
          class="btn-eliminar" 
          data-index="${index}"
          style="background: #f44336; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">
          Eliminar
        </button>
      </td>
    `;

    // Eventos para botones dentro de la tabla
    tr.querySelector(".btn-editar").addEventListener("click", () => cargarParaEditar(index));
    tr.querySelector(".btn-eliminar").addEventListener("click", () => eliminarContacto(index));

    tablaContactosBody.appendChild(tr);
  });
}

// UPDATE (Cargar datos al formulario)
function cargarParaEditar(index) {
  const contacto = listaContactos[index];

  inputNombre.value = contacto.nombre;
  inputCorreo.value = contacto.correo;
  inputTelefono.value = contacto.telefono;
  selectDestino.value = contacto.destino;
  inputMensaje.value = contacto.mensaje;

  inputIndexEdit.value = index;
  formTitulo.textContent = "Editar Mensaje";
  btnGuardar.textContent = "Actualizar Mensaje";
  btnCancelar.style.display = "inline-block";
}

// DELETE
function eliminarContacto(index) {
  if (confirm("¿Deseas eliminar este registro?")) {
    listaContactos.splice(index, 1);
    guardarEnLocalStorage();
    renderizarTabla();

    if (parseInt(inputIndexEdit.value) === index) {
      resetearFormulario();
    }
  }
}

// Guardar en Storage
function guardarEnLocalStorage() {
  localStorage.setItem("contactos", JSON.stringify(listaContactos));
}

// Cancelar edición
if (btnCancelar) {
  btnCancelar.addEventListener("click", resetearFormulario);
}

function resetearFormulario() {
  formulario.reset();
  inputIndexEdit.value = "-1";
  formTitulo.textContent = "Envíanos un mensaje";
  btnGuardar.textContent = "Enviar Mensaje";
  btnCancelar.style.display = "none";
}