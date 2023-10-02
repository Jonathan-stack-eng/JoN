const tarjeta = document.querySelector('#tarjeta'),
	btnAbrirFormulario = document.querySelector('#btn-abrir-formulario'),
	formulario = document.querySelector('#formulario-tarjeta'),
	nombreTarjeta = document.querySelector('#tarjeta .nombre'),
     textarea = document.getElementById('texto-formulario');
     textoEnTarjeta = document.getElementById('texto-en-tarjeta');
	 botonGirarTarjeta = document.querySelector('#boton-girar-tarjeta'); // El botón para girar la tarjeta
     inputTexto = document.getElementById('inputTexto');
     botonMoverTexto = document.getElementById('moverTexto');

 



// Selecciona los elementos de la tarjeta para ambas partes
  tarjetaDelantera = document.querySelector('.delantera');
 tarjetaTrasera = document.querySelector('.trasera');
// Función para girar la tarjeta
const girarTarjeta = () => {
    tarjeta.classList.toggle('active'); // Alternar la clase "active" para girar
}

// Agrega un evento de clic al botón de girar tarjeta
botonGirarTarjeta.addEventListener('click', girarTarjeta);

// * Boton de abrir formulario
btnAbrirFormulario.addEventListener('click', () => {
	btnAbrirFormulario.classList.toggle('active');
	formulario.classList.toggle('active');
});


// * Input nombre de tarjeta
formulario.inputNombre.addEventListener('keyup', (e) => {
  const valorInput = e.target.value;




	nombreTarjeta.textContent = valorInput;
	firma.textContent = valorInput;

	if(valorInput == ''){
		nombreTarjeta.textContent = 'Jhon Doe';
	}

	mostrarFrente();
});


// Selecciona el input por su ID
const inputNombre = document.getElementById('inputNombre');

// Agrega un evento al input para capturar la tecla "Enter"
inputNombre.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault(); // Evita que el formulario se envíe al presionar "Enter"
    // Obtiene el valor actual del input
    const valorInput = inputNombre.value;
    // Actualiza el contenido de la tarjeta con el nuevo texto
    const nombreTarjeta = document.querySelector('.nombre');
    nombreTarjeta.textContent = valorInput;
    // Limpia el valor del input después de agregar el texto
    inputNombre.value = '';
  }
});


// Obtén el canvas y el contexto de dibujo
const canvas = document.getElementById('TextoPersonalizado');
const ctx = canvas.getContext('2d');
const agregarTextoBtn = document.getElementById('agregarTextoBtn');


// Variables para el texto y su posición
let texto = ' ';
let x = 50;
let y = 50;

// Función para dibujar el texto en el canvas
function dibujarTexto() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Borra el canvas
    ctx.font = '20px Arial'; // Establece la fuente y el tamaño
    ctx.fillText(texto, x, y); // Dibuja el texto en la posición (x, y)
}

// Llama a la función para dibujar el texto inicialmente
dibujarTexto();


// Agrega un evento al input para capturar el texto ingresado
inputNombre.addEventListener('input', () => {
    texto = inputNombre.value; // Actualiza la variable de texto con el valor del input
    dibujarTexto(); // Vuelve a dibujar el texto en el canvas con el nuevo valor
});


// Agrega un evento al botón para agregar texto
agregarTextoBtn.addEventListener('click', () => {
    const inputNombre = document.getElementById('inputNombre');
    texto = inputNombre.value; // Actualiza la variable de texto con el valor del input
    dibujarTexto(); // Vuelve a dibujar el texto en el canvas con el nuevo valor
    inputNombre.value = ''; // Limpia el input después de agregar el texto
});
























// Evento de teclado para permitir al usuario escribir en el canvas
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        // Cuando se presiona Enter, actualiza el texto con lo que haya escrito el usuario
        texto = e.target.value;
        dibujarTexto();
        e.target.value = ''; // Limpia el input
    }
});

// Eventos de ratón para permitir al usuario mover el texto
let isDragging = false;

canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    // Verifica si el clic fue dentro del texto
    if (offsetX >= x && offsetX <= x + ctx.measureText(texto).width && offsetY >= y - 18 && offsetY <= y) {
        isDragging = true;
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const rect = canvas.getBoundingClientRect();
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
        dibujarTexto();
    }
});

canvas.addEventListener('mouseup', () => {
    isDragging = false;
});

// Evento de rueda de desplazamiento para mover el canvas por toda la página
canvas.addEventListener('wheel', (e) => {
  const rect = canvas.getBoundingClientRect();
  const canvasX = rect.left + x;
  const canvasY = rect.top + y;
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  if (
      mouseX >= canvasX &&
      mouseX <= canvasX + canvas.width &&
      mouseY >= canvasY &&
      mouseY <= canvasY + canvas.height
  ) {
      // Solo permite mover el canvas si el ratón está dentro del canvas
      x += e.deltaX;
      y += e.deltaY;
      dibujarTexto();
      e.preventDefault(); // Evita el comportamiento predeterminado de la rueda de desplazamiento
  }
});

