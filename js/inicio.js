// =========================================
// CONFIGURACIÓN
// =========================================

const corazonBtn = document.getElementById("corazonBtn");
const corazon = corazonBtn.querySelector("span");

const porcentaje = document.getElementById("porcentaje");
const barraProgreso = document.getElementById("barraProgreso");
const mensajeProgreso = document.getElementById("mensajeProgreso");


// Porcentaje inicial
let progreso = 0;


// =========================================
// MENSAJES
// =========================================

const mensajes = {
    0: "Toca el corazón para comenzar...",
    25: "El comienzo de algo bonito ❤️",
    50: "Ya llevamos la mitad...",
    75: "Un poquito más... ❤️",
    100: "Llegamos al 100% ❤️"
};


// =========================================
// CLICK EN EL CORAZÓN
// =========================================

corazonBtn.addEventListener("click", () => {

    // Evitar que continúe después del 100%
    if (progreso >= 100) {
        return;
    }


    // Aumentar 25%
    progreso += 25;


    // Actualizar porcentaje
    porcentaje.textContent = progreso;


    // Actualizar barra
    barraProgreso.style.width = `${progreso}%`;


    // Actualizar mensaje
    mensajeProgreso.textContent = mensajes[progreso];


    // Animación del corazón
    corazon.classList.remove("corazon-pulso");

    // Reiniciar animación
    void corazon.offsetWidth;

    corazon.classList.add("corazon-pulso");


    // Cuando llegue al 100%
    if (progreso === 100) {

        completarCorazon();

    }

});


// =========================================
// COMPLETAR CORAZÓN
// =========================================

function completarCorazon() {

    // Deshabilitar botón
    corazonBtn.disabled = true;


    // Hacer que el corazón sea más grande
    setTimeout(() => {

        corazon.style.transform = "scale(1.4)";

    }, 200);


    // Pequeña pausa antes de cambiar
    setTimeout(() => {

        document.body.classList.add("salir-pagina");

    }, 900);


    // Ir a la segunda página
    setTimeout(() => {

        window.location.href = "carta.html";

    }, 1800);

}