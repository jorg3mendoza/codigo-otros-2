var formulario = document.querySelector("#form"); // Selecciona el formulario con el ID "form" y lo asigna a la variable "formulario".

formulario.onsubmit = function(e) {
  e.preventDefault(); // Evita que el formulario se envíe de forma predeterminada, lo que causaría una recarga de la página.

  var nombre = formulario.elements[0].value; // Obtiene el valor del primer elemento del formulario (el nombre) y lo asigna a la variable "nombre".
  var edad = parseInt(formulario.elements[1].value); // Obtiene el valor del segundo elemento (la edad), lo convierte a un número entero y lo asigna a la variable "edad".
  var nacionalidad = formulario.elements[2].value; // Obtiene el valor del tercer elemento (la nacionalidad) y lo asigna a la variable "nacionalidad".

  // Validación de los datos ingresados
  if (nombre.length === 0) {
    formulario.elements[0].classList.add("error"); // Agrega la clase "error" al primer elemento si el nombre está vacío.
  }
  if (edad < 18 || edad > 120) {
    formulario.elements[1].classList.add("error"); // Agrega la clase "error" al segundo elemento si la edad no está entre 18 y 120.
  }

  if (nombre.length > 0 && edad >= 18 && edad <= 120) { // Si el nombre no está vacío y la edad es válida, agrega el invitado a la lista.
    agregarInvitado(nombre, edad, nacionalidad);
  }
};

// Objeto que mapea los códigos de país a sus nombres completos.
const nacionalidades = {
  ar: 'Argentina',
  mx: 'Mexicana',
  vnzl: 'Venezolana',
  per: 'Peruana',
};

// Función para crear un elemento HTML con una etiqueta y un contenido dado.
function crearElemento(etiqueta, contenido) {
  const div = document.createElement('div'); // Crea un nuevo elemento div.
  const label = document.createElement('label'); // Crea un nuevo elemento label.
  label.textContent = etiqueta + ': '; // Establece el texto del label como la etiqueta seguida de dos puntos.
  const input = document.createElement('input'); // Crea un nuevo elemento input.
  input.value = contenido; // Establece el valor del input como el contenido proporcionado.
  div.appendChild(label); // Agrega el label al div.
  div.appendChild(input); // Agrega el input al div.
  return div; // Devuelve el div creado.
}

// Función para agregar un invitado a la lista.
function agregarInvitado(nombre, edad, nacionalidad) {
  const lista = document.getElementById("lista-de-invitados"); // Obtiene la lista donde se agregarán los invitados.

  // Busca el nombre completo de la nacionalidad en el objeto "nacionalidades".
  for (const codigo in nacionalidades) {
    if (nacionalidad === codigo) {
      nacionalidad = nacionalidades[codigo];
      break;
    }
  }

  const elementoLista = document.createElement('div'); // Crea un nuevo elemento div para representar un invitado.
  elementoLista.classList.add("elemento-lista"); // Agrega la clase "elemento-lista" para aplicar estilos.
  lista.appendChild(elementoLista); // Agrega el nuevo elemento a la lista.

  // Crea elementos para mostrar el nombre, edad y nacionalidad del invitado.
  elementoLista.appendChild(crearElemento('Nombre', nombre));
  elementoLista.appendChild(crearElemento('Edad', edad));
  elementoLista.appendChild(crearElemento('Nacionalidad', nacionalidad));

  // Crea un botón para eliminar el invitado.
  const botonBorrar = document.createElement("button");
  botonBorrar.textContent = "Eliminar invitado";
  botonBorrar.onclick = () => {
    elementoLista.remove(); // Elimina el elemento de la lista cuando se hace clic en el botón.
  };
  elementoLista.appendChild(botonBorrar);
}