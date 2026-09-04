// =========================================
// ELEMENTOS
// =========================================

const track = document.getElementById("galeriaTrack");

const indicadores =
    document.querySelectorAll(".indicador");

const abrirCarta =
    document.getElementById("abrirCarta");

const cartaSection =
    document.getElementById("cartaSection");

const cartaAbierta =
    document.getElementById("cartaAbierta");

const finalSection =
    document.getElementById("finalSection");

const corazonesContainer =
    document.getElementById("corazonesContainer");

const musica =
    document.getElementById("musica");


// =========================================
// CARRUSEL
// =========================================

let slideActual = 0;

const totalSlides = indicadores.length;

// =========================================
// MOSTRAR FOTO
// =========================================
function mostrarSlide(numero) {

    // Carrusel circular
    if (numero >= totalSlides) {
        slideActual = 0;
    } 
    else if (numero < 0) {
        slideActual = totalSlides - 1;
    } 
    else {
        slideActual = numero;
    }

    // Mover carrusel
    track.style.transform =
        `translateX(-${slideActual * 100}%)`;

    // Actualizar indicadores
    indicadores.forEach((indicador, index) => {

        indicador.classList.toggle(
            "activo",
            index === slideActual
        );

    });
}


// =========================================
// CLICK EN INDICADORES
// =========================================

indicadores.forEach((indicador, index) => {

    indicador.addEventListener("click", () => {

        mostrarSlide(index);

    });

});


// =========================================
// INDICADORES
// =========================================

indicadores.forEach((indicador, index) => {

    indicador.addEventListener("click", () => {

        mostrarSlide(index);

    });

});


// =========================================
// DESLIZAMIENTO EN CELULAR
// =========================================

const galeria = document.querySelector(".galeria");

let inicioX = 0;
let finalX = 0;


// Cuando empieza el toque
galeria.addEventListener("touchstart", (evento) => {

    inicioX = evento.touches[0].clientX;

}, { passive: true });


// Cuando termina el toque
galeria.addEventListener("touchend", (evento) => {

    finalX = evento.changedTouches[0].clientX;

    const diferencia = inicioX - finalX;


    // Deslizar hacia la izquierda
    // 1 → 2 → 3 → 1

    if (diferencia > 50) {

        mostrarSlide(slideActual + 1);

    }


    // Deslizar hacia la derecha
    // 1 → 3 → 2 → 1

    else if (diferencia < -50) {

        mostrarSlide(slideActual - 1);

    }

}, { passive: true });


// =========================================
// ABRIR CARTA
// =========================================

abrirCarta.addEventListener("click", () => {

    // Evitar doble click
    abrirCarta.disabled = true;


    // Animación de la tapa
    const tapa =
        document.querySelector(".sobre-tapa");

    tapa.style.transform =
        "rotateX(180deg)";


    // La carta de dentro sube
    const cartaDentro =
        document.querySelector(".carta-dentro");

    setTimeout(() => {

        cartaDentro.style.transform =
            "translateY(-70px)";

    }, 300);


    // Ocultar sobre
    setTimeout(() => {

        cartaSection.style.opacity = "0";

        cartaSection.style.transform =
            "translateY(-30px)";

    }, 900);


    // Mostrar carta
    setTimeout(() => {

        cartaSection.style.display = "none";

        cartaAbierta.classList.add("mostrar");


        // Reproducir música
        reproducirMusica();


        // Iniciar corazones
        iniciarCorazones();


    }, 1400);


    // Mostrar foto final después de leer
    setTimeout(() => {

        mostrarFinal();

    }, 40500);

});


// =========================================
// MÚSICA
// =========================================

function reproducirMusica() {

    musica.currentTime = 0;


    const promesa =
        musica.play();


    if (promesa !== undefined) {

        promesa.catch((error) => {

            console.log(
                "El navegador bloqueó el audio:",
                error
            );

        });

    }

}


// =========================================
// CORAZONES
// =========================================

let corazonesActivo = false;


function iniciarCorazones() {

    corazonesActivo = true;


    // Crear corazones inmediatamente
    for (let i = 0; i < 15; i++) {

        setTimeout(() => {

            crearCorazon();

        }, i * 150);

    }


    // Crear continuamente
    crearCorazonesContinuamente();

}


function crearCorazonesContinuamente() {

    if (!corazonesActivo) {
        return;
    }


    crearCorazon();


    const tiempo =
        Math.random() * 500 + 250;


    setTimeout(
        crearCorazonesContinuamente,
        tiempo
    );

}


function crearCorazon() {

    const corazon =
        document.createElement("div");


    corazon.classList.add(
        "corazon-cayendo"
    );


    // Diferentes corazones
    const formas = [
        "♥",
        "♡",
        "❤",
        "💗",
        "💕"
    ];


    corazon.textContent =
        formas[
            Math.floor(
                Math.random() * formas.length
            )
        ];


    // Posición horizontal
    corazon.style.left =
        `${Math.random() * 100}%`;


    // Tamaño aleatorio
    const tamaño =
        Math.random() * 18 + 12;


    corazon.style.fontSize =
        `${tamaño}px`;


    // Duración aleatoria
    const duracion =
        Math.random() * 4 + 4;


    corazon.style.animationDuration =
        `${duracion}s`;


    // Retraso
    corazon.style.animationDelay =
        `${Math.random() * 0.5}s`;


    corazonesContainer.appendChild(
        corazon
    );


    // Eliminar después de la animación
    setTimeout(() => {

        corazon.remove();

    }, (duracion + 1) * 1000);

}


// =========================================
// FOTO FINAL
// =========================================

function mostrarFinal() {

    finalSection.classList.add(
        "mostrar-final"
    );


    // Desplazar suavemente hacia la foto
    setTimeout(() => {

        finalSection.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 500);


    // Más corazones para el final
    setTimeout(() => {

        for (let i = 0; i < 25; i++) {

            setTimeout(() => {

                crearCorazon();

            }, i * 100);

        }

    }, 1000);

}
