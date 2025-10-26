/*VERSIONCUATRO 29-11: esta versión tiene el movimiento fluido (+ comentarios), el fondo-skatepark-test.png (TEST), ajustes de la música y los 4 treats. Se puede pausar con "P" y resetear con "R" */

//PODRIA limitar los valores a los de prueba-minima.js
//HAYQUE limitar el movimiento de goofy dentro del canvas (sobrepasa el límite izquierdo del canvas al retroceder), ubicar el texto "skate por encima de las demás capas", hacer los arrays de treats y obstáculos y sortearlos, agregarle el fondo de recorte de papel a los treats y obstáculos

//canvas
let canvas;
let ctx;

//font
let fuente = new FontFace('Flood', "url(fonts/Flood.otf) format('opentype')");
document.fonts.add(fuente);

//juego
let vidas = 5;
let puntos = 0;
let score = 0;
let x = 0;
let y = 0;
let gravedad = 1;
let velocidad = 4;
let saltando = false;
let carrilesY = [100, 200];
let carrilesX = [1300, 1000, 800];
let carrilObstaculo = [1300, 800];
let dificultad = 1000 / 60;
let inicio = false;
let fin = false;
let pausado = false;
let placaInicio = false;
let controles = false;
let instruccionesGoofy = false;
let instruccionesObstaculos = false;
let instruccionesSkatepark = false;
let ganaste;
let touchHandlersAdded = false; // evitar agregar listeners múltiples

//variables iniciales del personaje
let altoGoofy = 150;
let anchoGoofy = 147 / 2;
let posXGoofy = 200;
let posYGoofy = 400;

//incremento de velocidad
let factorVelocidad = 1;

//capas del fondo
let posicionFaroles = 0;
let posicionFondo1 = 0;
let posicionFondo2 = 0;
let posicionFondo3 = 0;
let posicionFondo4 = 0;

//imagenes
let imgGoofy = new Image();
let imgEnergizante = new Image();
let imgRemera = new Image();
let imgAerosol = new Image();
let imgZapatillas = new Image();
let imgCono = new Image();
let imgTacho = new Image();
let imgBotonInicio = new Image();
imgBotonInicio.src = "img/boton-jugar.png"
let imgBotonInicio2 = new Image();
imgBotonInicio2.src = "img/boton-jugar-2.png"
let imgBotonFlecha = new Image();
imgBotonFlecha.src = "img/boton-flecha.png"
let imgBotonFlecha2 = new Image();
imgBotonFlecha2.src = "img/boton-flecha-2.png"
let imgPlacaInicio = new Image();
imgPlacaInicio.src = "img/placa-inicio.png"
let imgFinalGanador = new Image();
imgFinalGanador.src = "img/final-ganador.png"
let imgFinalPerdedor = new Image();
imgFinalPerdedor.src = "img/final-perdedor.png"
let imgBotonNuevo = new Image();
imgBotonNuevo.src = "img/boton-jugar-de-nuevo-3.png"
let imgBotonNuevo2 = new Image();
imgBotonNuevo2.src = "img/boton-jugar-de-nuevo-2.png"
let imgControles = new Image();
imgControles.src = "img/placa-controles.png"
let imgInstruccionesGoofy = new Image();
imgInstruccionesGoofy.src = "img/placa-juego-goofy.png"
let imgInstruccionesObstaculos = new Image();
imgInstruccionesObstaculos.src = "img/placa-obstaculos.png"
let imgInstruccionesSkatepark = new Image();
imgInstruccionesSkatepark.src = "img/placa-skatepark.png"
let imgFaroles = new Image();
// assign main sprites & elements once so preloader can fetch them
imgGoofy.src = "img/sprite.png";
imgEnergizante.src = "img/energizante.png";
imgRemera.src = "img/remera.png";
imgAerosol.src = "img/aerosol.png";
imgZapatillas.src = "img/zapatillas.png";
imgCono.src = "img/cono.png";
imgTacho.src = "img/tacho.png";
imgFaroles.src = "img/faroles-largo.png";

//goofy, treats, obstaculos y faroles
let goofy = new Personaje(imgGoofy, posXGoofy, posYGoofy, anchoGoofy, altoGoofy);
let energizante = new Elemento(imgEnergizante, 820, 200, 30, 50, "energizante");
let aerosol = new Elemento(imgAerosol, 820, 200, 30, 60, "aerosol");
let zapatillas = new Elemento(imgZapatillas, 820, 200, 60, 60, "zapatillas");
let remera = new Elemento(imgRemera, 820, 200, 60, 70, "remera");
let cono = new Elemento(imgCono, 500, 330, 60, 100, "obstaculo");
let tacho = new Elemento(imgTacho, 700, 330, 70, 110, "obstaculo");
let faroles = new Capa(imgFaroles, posicionFaroles, 10, 24000, 450) //h=450

//audio
audioGolpe = new Audio();
audioGolpe.src = "audios/golpe.mp3";
audioEnergizante = new Audio();
audioEnergizante.src = "audios/energizante.mp3";
audioRemera = new Audio();
audioRemera.src = "audios/remera.mp3";
audioAerosol = new Audio();
audioAerosol.src = "audios/aerosol.mp3";
audioZapatillas = new Audio();
audioZapatillas.src = "audios/zapatillas.mp3";
audioSalto = new Audio();
audioSalto.src = "audios/salto.mp3";
audioPatina = new Audio();
audioPatina.src = "audios/patina.mp3";
audioMusica = new Audio();
audioMusica.src = "audios/musica.mp3";
// loop background music
audioMusica.loop = true;
audioGanaste = new Audio();
audioGanaste.src = "audios/ganaste.mp3";
audioCaida = new Audio();
audioCaida.src = "audios/caida.mp3";
audioPerdedor = new Audio();
audioPerdedor.src = "audios/perdedor.mp3";
audioInstrucciones = new Audio();
audioInstrucciones.src = "audios/instrucciones.mp3";
audioClick = new Audio();
audioClick.src = "audios/click.mp3";
audioGolpe.volume = 0.3;
audioEnergizante.volume = 0.3;
audioRemera.volume = 0.7;
audioAerosol.volume = 0.5;
audioZapatillas.volume = 1;
audioSalto.volume = 0.5;
audioPatina.volume = 0.2;
audioMusica.volume = 0.2;
audioGanaste.volume = 0.2;
audioCaida.volume = 0.2;
audioPerdedor.volume = 0.3;
audioInstrucciones.volume = 0.2;
audioClick.volume = 0.5;



let tftStarted = false;

function tft() {
    if (tftStarted) return; // guard against double-calls
    tftStarted = true;
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    // show a simple loading message while assets load
    borrar();
    ctx.save();
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, 800, 450);
    ctx.font = "30px Flood, sans-serif";
    ctx.fillStyle = '#fff';
    ctx.fillText('Cargando...', 340, 220);
    ctx.restore();

    // Load all images, audio and fonts before showing the initial plate
    loadAllAssets().then(function () {
        const loader = document.getElementById('loader');
        if (loader) loader.style.display = 'none';
        // Set background now to avoid showing it before assets load
        canvas.style.backgroundImage = "url(img/fondo-skatepark-test.png),url(img/fondo-02.png),url(img/fondo-03.png),url(img/fondo-04.png)";
        canvas.style.backgroundSize = "cover";
        canvas.style.backgroundPosition = "left";
        dibujarInicio();
    });
    audioSalto.pause();
    /*controles = false;*/

    // Agregar soporte táctil sólo una vez
    if (!touchHandlersAdded && canvas) {
        touchHandlersAdded = true;

        // touchstart: procesar toques activos
        canvas.addEventListener('touchstart', function (ev) {
            ev.preventDefault();
            // If we're on an UI plate, interpret a single touch as a tap on buttons
            if (ev.touches && ev.touches.length === 1) {
                const pos = getCanvasCoords(ev.touches[0]);
                // Reuse the same hit tests as the click handler for plates
                if (placaInicio == true && (pos.x > 350 && pos.x < 450 && pos.y > 275 && pos.y < 335)) {
                    audioClick.play().catch(() => {});
                    dibujarInstruccionesGoofy();
                    audioInstrucciones.play().catch(() => {});
                    return;
                } else if (instruccionesGoofy == true && (pos.x > 740 && pos.x < 780 && pos.y > 385 && pos.y < 435)) {
                    audioClick.play().catch(() => {});
                    dibujarInstruccionesObstaculos();
                    return;
                } else if (instruccionesObstaculos == true && (pos.x > 740 && pos.x < 780 && pos.y > 385 && pos.y < 435)) {
                    audioClick.play().catch(() => {});
                    dibujarInstruccionesSkatepark();
                    return;
                } else if (instruccionesSkatepark == true && (pos.x > 740 && pos.x < 780 && pos.y > 385 && pos.y < 435)) {
                    audioClick.play().catch(() => {});
                    dibujarControles();
                    return;
                } else if (controles == true && (pos.x > 570 && pos.x < 670 && pos.y > 100 && pos.y < 160)) {
                    audioClick.play().catch(() => {});
                    audioMusica.currentTime = 0;
                    audioMusica.play().catch(() => {});
                    tft();
                    juego();
                    return;
                } else if (fin == true && (pos.x > 320 && pos.x < 470 && pos.y > 300 && pos.y < 380)) {
                    reset();
                    return;
                }
            }
            // otherwise treat as gameplay touch input (possibly multi-touch)
            processTouches(ev.touches);
        }, { passive: false });

        // touchmove: actualizar acciones según el/los toques actuales
        canvas.addEventListener('touchmove', function (ev) {
            ev.preventDefault();
            processTouches(ev.touches);
        }, { passive: false });

        // touchend / touchcancel: procesar los toques restantes; si no hay toques, parar movimiento
        function handleTouchEnd(ev) {
            ev.preventDefault();
            if (ev.touches && ev.touches.length > 0) {
                processTouches(ev.touches);
            } else {
                // no quedan toques: detener movimiento horizontal
                if (goofy) goofy.vx = 0;
            }
        }

        canvas.addEventListener('touchend', handleTouchEnd, { passive: false });
        canvas.addEventListener('touchcancel', handleTouchEnd, { passive: false });
    }

    // DPI/backing-store scaling: make canvas crisp on HiDPI devices
    // resize immediately and also on window resize/orientation change
    resizeCanvasForDPR();
    const onResize = function () {
        resizeCanvasForDPR();
        updateOrientationOverlay();
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
};

//dibujar placa del inicio
function dibujarInicio() {
    borrar();
    ctx.drawImage(imgPlacaInicio, 0, 0);
    ctx.drawImage(imgBotonInicio, 350, 275, 100, 60);
    placaInicio = true;
};

//dibujar placa de intrucciones goofy
function dibujarInstruccionesGoofy() {
    borrar();
    ctx.drawImage(imgInstruccionesGoofy, 0, 0);
    ctx.drawImage(imgBotonFlecha, 740, 385, 40, 50);
    instruccionesGoofy = true;
    placaInicio = false;
};

//dibujar placa de intrucciones obstaculos
function dibujarInstruccionesObstaculos() {
    borrar();
    ctx.drawImage(imgInstruccionesObstaculos, 0, 0);
    ctx.drawImage(imgBotonFlecha, 740, 385, 40, 50);
    instruccionesObstaculos = true;
    instruccionesGoofy = false;
};

//dibujar placa de intrucciones skatepark
function dibujarInstruccionesSkatepark() {
    borrar();
    ctx.drawImage(imgInstruccionesSkatepark, 0, 0);
    ctx.drawImage(imgBotonFlecha, 740, 385, 40, 50);
    instruccionesSkatepark = true;
    instruccionesObstaculos = false;
};

//dibujar placa de controles
function dibujarControles() {
    borrar();
    ctx.drawImage(imgControles, 0, 0);
    ctx.drawImage(imgBotonInicio, 570, 100, 100, 60);
    controles = true;
    instruccionesSkatepark = false;
};

function juego() {

    inicio = true;
    placaInicio = false;
    controles = false;
    audioInstrucciones.pause();
    borrar();
    requestAnimationFrame(juego);

    canvas = document.getElementById("canvas");
    canvas.style.backgroundImage = "url(img/fondo-skatepark-test.png),url(img/fondo-02.png),url(img/fondo-03.png),url(img/fondo-04.png)";
    canvas.style.backgroundSize = "cover";
    /*canvas.style.position = "absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto";*/
    ctx = canvas.getContext("2d");
    // ensure overlay state reflects current orientation while playing
    updateOrientationOverlay();

    //dibujar
    // Images are loaded during initialization; just draw current frame

    if (pausado == false) {
        if (inicio == true) {

            //incrementa la velocidad
            factorVelocidad += 0.0015;

            //mover las capas del fondo y los faroles
            posicionFaroles -= 6 * factorVelocidad;
            posicionFondo1 -= 5 * factorVelocidad;
            posicionFondo2 -= 3 * factorVelocidad;
            posicionFondo3 -= 2 * factorVelocidad;
            posicionFondo4 -= 1 * factorVelocidad;

            canvas.style.backgroundPosition = posicionFondo1 + "px 0px," + posicionFondo2 + "px 0px," + posicionFondo3 + "px 0px," + posicionFondo4 + "px 0px";

            //musica: only start when currently paused to avoid repeated play() calls
            if (audioMusica.paused) {
                audioMusica.play().catch(() => {});
            }

            //mover los treats y los obstáculos de derecha a izquierda
            energizante.mover();
            remera.mover();
            aerosol.mover();
            zapatillas.mover();
            cono.mover();
            tacho.mover();

            //mover el personaje siempre en y
            goofy.velocidad += gravedad;
            goofy.y += goofy.velocidad;

            //En lugar de tocar la posicion en x dentro de avanzar o retroceder lo hago aca, de acuerdo a una velocidad. Si es cero queda igual, si es positivo avanza y si es negativo retrocede.
            goofy.x += goofy.vx

            // Clamp goofy.x to canvas logical bounds so the character cannot escape left/right
            const logicalW = 800;
            if (goofy.x < 0) goofy.x = 0;
            if (goofy.x > logicalW - goofy.ancho) goofy.x = logicalW - goofy.ancho;

            //logica para devolver a goofy al suelo
            if (goofy.y > 400 - goofy.alto) {//470 = piso
                if (goofy.saltando) { //salto caída solo cuando está en el suelo
                    audioCaida.play();
                };
                goofy.velocidad = 0; //que no tenga más impulso
                goofy.y = 400 - goofy.alto; //reubico al personaje en y
                goofy.saltando = false;
                if (audioPatina.paused) audioPatina.play();
            } else {
                audioPatina.pause();
            };

            //chequear si los Elementos colisionan con goofy
            energizante.colisionar();
            remera.colisionar();
            aerosol.colisionar();
            zapatillas.colisionar();
            cono.colisionar();
            tacho.colisionar();

            //borrar todo lo que está dentro del canvas
            borrar();

            //redibujar todo
            dibujarTexto();
            goofy.dibujar();
            energizante.dibujar();
            remera.dibujar();
            aerosol.dibujar();
            zapatillas.dibujar();
            cono.dibujar();
            tacho.dibujar();
            faroles.dibujar();
            // draw visible touch buttons only for mobile-like touch devices
            if (isMobileTouch()) {
                drawTouchButtons();
            }

            //PERDISTE
        } if (vidas < 1) {
            audioPerdedor.play();
            fin = true;
            pausado = true;
            ganaste = false;
            //GANASTE
        } if (posicionFondo1 <= -15400) {
            audioGanaste.play();
            fin = true;
            pausado = true;
            ganaste = true;
        };

    } else if (fin == true) {
        //cuando el juego llegó a su fin se pausa y se dibuja el final
        dibujarFinal();
    } else {
        //cuando el juego no llegó todavía a su fin solamente se pausa
        pausar();
    };
};

//sortear treats y obstáculos
energizante.sortear();
remera.sortear();
aerosol.sortear();
zapatillas.sortear();
cono.sortear();
tacho.sortear();

//dibujar puntaje y "skate" durante el juego
function dibujarTexto() {
    ctx.font = "30px Flood";
    ctx.fillStyle = "#3bb22e";
    ctx.fillText("Treats: " + puntos, 330, 40);
    ctx.font = "30px Flood";
    ctx.fillStyle = "#fff";
    ctx.fillText("Treats: " + puntos, 332, 42);
    if (vidas < 1) {
        ctx.font = "100px Flood";
        ctx.fillStyle = "#eb5396";
        ctx.fillText("Skate", 250, 250);
        ctx.fillStyle = "#000";
        ctx.fillText("Skate", 252, 252);
    } else if (vidas == 1) {
        ctx.font = "100px Flood";
        ctx.fillStyle = "#eb5396";
        ctx.fillText("Skat", 250, 250);
        ctx.fillStyle = "#000";
        ctx.fillText("Skat", 252, 252);
    } else if (vidas == 2) {
        ctx.font = "100px Flood";
        ctx.fillStyle = "#eb5396";
        ctx.fillText("Ska", 250, 250);
        ctx.fillStyle = "#000";
        ctx.fillText("Ska", 252, 252);
    } else if (vidas == 3) {
        ctx.font = "100px Flood";
        ctx.fillStyle = "#eb5396";
        ctx.fillText("Sk", 250, 250);
        ctx.fillStyle = "#000";
        ctx.fillText("Sk", 252, 252);
    } else if (vidas == 4) {
        ctx.font = "100px Flood";
        ctx.fillStyle = "#eb5396";
        ctx.fillText("S", 250, 250);
        ctx.fillStyle = "#000";
        ctx.fillText("S", 252, 252);
    };
};

//dibujar placa según ganaste o perdiste
function dibujarFinal() {
    if (vidas < 1) {
        //PERDISTE
        borrar();
        ctx.drawImage(imgFinalPerdedor, 0, 0);
        ctx.drawImage(imgBotonNuevo, 320, 300, 150, 80);
        ctx.font = "20px Flood";
        ctx.fillStyle = "#FFF";
        ctx.fillText("puntos: " + puntos, 340, 150);

        /*audioMusica.pause();*/
        audioPatina.pause();
        audioSalto.pause();
    } else {
        //GANASTE
        borrar();

        ctx.drawImage(imgFinalGanador, 0, 0);
        ctx.drawImage(imgBotonNuevo, 320, 300, 150, 80);
        ctx.font = "20px Flood";
        ctx.fillStyle = "#FFF";
        ctx.fillText("puntos: " + puntos, 340, 145);

        audioMusica.pause();
        audioPatina.pause();
        audioSalto.pause();
    };
};

//borrar
function borrar() {
    ctx.clearRect(x, y, canvas.width, canvas.height);
};

// convertir coordenadas del evento del mouse a coordenadas del canvas
function getCanvasCoords(e) {
    // prefer existing canvas reference; fall back to DOM lookup
    const cnv = canvas || document.getElementById('canvas');
    if (!cnv) {
        return { x: 0, y: 0 };
    }
    // rect del canvas en el viewport
    const rect = cnv.getBoundingClientRect();
    // factor de escala entre tamaño real del canvas (píxeles) y tamaño en CSS
    const dpr = window.devicePixelRatio || 1;
    // canvas.width/height may be backing-store pixels (logical * dpr).
    // We want logical coordinates (0..800), so remove dpr from the scale.
    const scaleX = (cnv.width / rect.width) / dpr;
    const scaleY = (cnv.height / rect.height) / dpr;
    // usar clientX/Y para considerar scroll y margen del viewport
    const clientX = (typeof e.clientX === 'number') ? e.clientX : (e.clientX === undefined && e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const clientY = (typeof e.clientY === 'number') ? e.clientY : (e.clientY === undefined && e.touches && e.touches[0] ? e.touches[0].clientY : 0);
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;
    return { x, y };
};

// resize canvas backing store for devicePixelRatio so the canvas is crisp on HiDPI
function resizeCanvasForDPR() {
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    // logical resolution we want to keep for drawing commands
    const logicalWidth = 800;
    const logicalHeight = 450;

    // set backing store size
    canvas.width = Math.round(logicalWidth * dpr);
    canvas.height = Math.round(logicalHeight * dpr);

    // keep the CSS size as responsive (it's controlled by CSS: width:100% max-width:800px)
    // Reset transforms and scale the context so drawing can use logical coordinates
    ctx = canvas.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0); // reset
    ctx.scale(dpr, dpr);
}

// Wait for images, audio and font to be ready before starting (simple aggregator)
function loadAllAssets() {
    const imgs = [imgGoofy, imgEnergizante, imgRemera, imgAerosol, imgZapatillas, imgCono, imgTacho, imgBotonInicio, imgBotonInicio2, imgBotonFlecha, imgBotonFlecha2, imgPlacaInicio, imgFinalGanador, imgFinalPerdedor, imgBotonNuevo, imgBotonNuevo2, imgControles, imgInstruccionesGoofy, imgInstruccionesObstaculos, imgInstruccionesSkatepark, imgFaroles];
    const audios = [audioGolpe, audioEnergizante, audioRemera, audioAerosol, audioZapatillas, audioSalto, audioPatina, audioMusica, audioGanaste, audioCaida, audioPerdedor, audioInstrucciones, audioClick];
    let remaining = imgs.length + audios.length + 1; // +1 for font

    return new Promise((resolve) => {
        function oneDone() {
            remaining--;
            if (remaining <= 0) resolve();
        }

        imgs.forEach(img => {
            if (!img) return oneDone();
            if (img.complete && img.naturalWidth !== 0) return oneDone();
            img.addEventListener('load', oneDone);
            img.addEventListener('error', oneDone);
        });

        audios.forEach(a => {
            try {
                if (!a) return oneDone();
                if (a.readyState >= 3) return oneDone();
                a.addEventListener('canplaythrough', oneDone, { once: true });
                a.addEventListener('error', oneDone, { once: true });
            } catch (e) {
                oneDone();
            }
        });

        // font
        fuente.load().then(oneDone).catch(oneDone);

        // Safety: if something never fires, timeout after 8s
        setTimeout(() => {
            remaining = 0; oneDone();
        }, 8000);
    });
}

// Procesar un TouchList (o array-like) y aplicar controles según zonas del canvas
function processTouches(touches) {
    if (!canvas) return;
    // use logical canvas dimensions (after DPR scaling) so coordinates are consistent with drawing
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;
    const leftBound = w * 0.33;
    const rightBound = w * 0.66;
    const midY = h * 0.5;

    // Primero: decidir movimiento horizontal (left/right). Si existe al menos
    // un touch en la izquierda, retroceder; si existe al menos uno en derecha, avanzar.
    let foundLeft = false;
    let foundRight = false;
    for (let i = 0; i < touches.length; i++) {
        const pos = getCanvasCoords(touches[i]);
        if (pos.x < leftBound) foundLeft = true;
        if (pos.x > rightBound) foundRight = true;
        if (foundLeft && foundRight) break;
    }
    if (foundLeft && !foundRight) {
        goofy.retroceder();
    } else if (foundRight && !foundLeft) {
        goofy.avanzar();
    } else if (!foundLeft && !foundRight) {
        // no touches horizontales -> parar movimiento horizontal
        goofy.vx = 0;
    }

    // Luego: acciones verticales en la columna central
    for (let i = 0; i < touches.length; i++) {
        const pos = getCanvasCoords(touches[i]);
        if (pos.x >= leftBound && pos.x <= rightBound) {
            if (pos.y < midY) {
                // top middle -> salto
                goofy.saltar();
            } else {
                // bottom middle -> bajar pero sólo si está saltando
                if (goofy.saltando) goofy.bajar();
            }
            break; // una vez aplicada la acción vertical, salir
        }
    }
}

// Detectar si estamos en un dispositivo táctil tipo móvil (coarse pointer OR small width)
function isMobileTouch() {
    const touch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
    const coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    const small = window.innerWidth <= 900; // heuristic for embed/mobile
    return touch && (coarse || small);
}

// Draw semi-transparent on-screen touch buttons that match the touch zones.
function drawTouchButtons() {
    if (!canvas || !ctx) return;
    const w = 800; // logical width
    const h = 450; // logical height
    const leftBound = w * 0.33;
    const rightBound = w * 0.66;
    const midY = h * 0.5;

    ctx.save();
    ctx.globalAlpha = 0.25;
    ctx.fillStyle = '#000';

    // left zone (visual on left third)
    ctx.fillRect(0, 0, leftBound, h);
    // right zone (visual on right third)
    ctx.fillRect(rightBound, 0, w - rightBound, h);
    // middle top (jump)
    ctx.fillRect(leftBound, 0, rightBound - leftBound, midY);
    // middle bottom (down)
    ctx.fillRect(leftBound, midY, rightBound - leftBound, h - midY);

    ctx.globalAlpha = 1;
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '36px Flood';

    // icons/text for zones
    ctx.fillText('◀', leftBound / 2, h / 2);
    ctx.fillText('▶', rightBound + (w - rightBound) / 2, h / 2);
    ctx.fillText('▲', w / 2, midY / 2);
    ctx.fillText('▼', w / 2, midY + (h - midY) / 2);

    ctx.restore();
}

// Orientation helper: show an overlay in portrait on mobile to suggest landscape
function updateOrientationOverlay() {
    const el = document.getElementById('rotate');
    if (!el) return;
    const isPortrait = window.innerHeight > window.innerWidth;
    if (isMobileTouch() && isPortrait) {
        el.style.display = 'flex';
    } else {
        el.style.display = 'none';
    }
}

//pausar
function pausar() {
    borrar();
    pausado = true;

    canvas.style.opacity = 0.7;
    ctx.font = "40px Flood";
    ctx.fillStyle = "#fff";
    ctx.fillText("Pausa", 325, 250);
    ctx.font = "40px Flood";
    ctx.fillStyle = "#000";
    ctx.fillText("Pausa", 327, 252);

    audioMusica.pause();
    audioEnergizante.pause();
    audioRemera.pause();
    audioAerosol.pause();
    audioZapatillas.pause();
    audioGolpe.pause();
    audioSalto.pause();
    audioCaida.pause();
    audioPatina.pause();
};

//reanudar
function reanudar() {
    borrar();
    pausado = false;
    canvas.style.opacity = 1;
};

//reset
function reset() {
    borrar();
    reanudar();
    audioGanaste.pause();
    posicionFaroles = 0;
    posicionFondo1 = 0;
    posicionFondo2 = 0;
    posicionFondo3 = 0;
    posicionFondo4 = 0;
    vidas = 5;
    puntos = 0;
    x = 0;
    y = 0;
    gravedad = 1;
    velocidad = 4;
    saltando = false;
    goofy.x = 200;
    goofy.y = 400;
    factorVelocidad = 1;
    fin = false;
    energizante.sortear();
    remera.sortear();
    aerosol.sortear();
    zapatillas.sortear();
    cono.sortear();
    tacho.sortear();
};

//faroles
function Capa(img, x, y, ancho, alto) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;

    this.dibujar = function () {
        ctx.drawImage(imgFaroles, posicionFaroles, this.y, this.ancho, this.alto);
    }
}

//funciones de goofy
function Personaje(img, x, y, ancho, alto) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.velocidad = 0;
    this.posicion = 0;
    this.saltando = false;//arranca quieto, sin saltar
    this.anchoRecorte = ancho;
    this.altoRecorte = alto;
    //Lo que necesitan es una variable para la velocidad que se va a ir pisando. Puede ser un atributo de goofy, o una variable global.
    this.vx = 0;
    /*TEST fluidez (intenté hacerlo con this. a pesar de que en 01_movimientos están dentro de la function juego() porque los consideré atributos específicos del Personaje y no como variables generales del juego)
    this.vxl = -10; (l es de left, para que no compartan la misma variable en x y evitar que se atasquen)
    this.vxr = 10; (lo mismo pero con r de right)
    this.x += this.vxl;
    this.x += this.vxy;*/

    //métodos

    //dibujar a goofy
    this.dibujar = function () {
        ctx.drawImage(
            imgGoofy,
            this.posicion * this.ancho, //donde empieza el recorte en x
            0, //donde empieza el recorte en y
            this.anchoRecorte, //ancho del recorte
            this.altoRecorte,//alto del recorte
            this.x,//ubicacion del personaje en x
            this.y,//ubicacion del personaje en y
            this.ancho,//ancho de la imagen
            this.alto //alto de la imagen
        );
    };
    //avanzar (ir hacia la derecha)
    this.avanzar = function () {
        this.posicion = 0;
        if (this.x < 720) {
            //antes: this.x += 5;
            //si avanzo aplico una velocidad en positivo
            this.vx = 5;
            //prefiero que no mueva al fondo
            /*posicionFondo1 -= 2;
            posicionFondo2 -= 3;
            posicionFondo3 -= 4;
            posicionFondo4 -= 5;*/
        } else {
            this.vx = 0;
        };
    };
    //retroceder (ir hacia la izquierda)
    this.retroceder = function () {
        this.posicion = 1;
        if (this.x > 0) {
            //antes: this.x -= 5;
            //si retrocedo aplico la velocidad en negativo
            this.vx = -10
            //prefiero que no mueva al fondo
            /*posicionFondo1 += 2;
            posicionFondo2 += 3;
            posicionFondo3 += 4;
            posicionFondo4 += 5;*/
        } else {
            this.vx = 0;
        };
    };
    //bajar
    this.bajar = function () {
        this.alto = 150;
        this.y = 400;
    };
    //saltar
    this.saltar = function () {
        //si no está saltando, entonces salta y la velocidad aminora
        if (this.saltando == false) {
            this.saltando = true;
            this.velocidad -= velocidad * 5;
            audioSalto.play();
            //si está sobre el piso, entonces no salta y la velocidad se mantiene en 0
        } else if (this.y == 340) { //340 es el piso
            this.saltando = false;
            this.velocidad = 0;
        };
    };
};

//funciones de los treats y obstaculos
function Elemento(img, x, y, ancho, alto, tipo) {
    //atributos
    this.img = img;
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.tipo = tipo;

    //métodos

    //dibujar
    this.dibujar = function () {
        ctx.drawImage(this.img, this.x, this.y, this.ancho, this.alto);
    };

    //sumar de a 5 px la ubicacion en x hasta que sea = -100
    this.mover = function () {
        if (this.x > -100) {
            this.x -= 5 * factorVelocidad;
            //si la x de los Elementos es menor a -100, entonces se sortea su valor
        } else {
            this.sortear();
        };
    };

    //sortear los valores de x e y de los Elementos
    this.sortear = function () {
        if (this.tipo == "obstaculo") {
            //fórmula: Math.floor(Math.random() * (max - min + 1))+ min;
            this.x = carrilObstaculo[Math.floor(Math.random() * 2)];
            //uno de los 2 valores posibles del array de carriles, porque quiero que aparezcan unicamente en 2 posibles alturas: alta y media
        } else {
            this.x = carrilesX[Math.floor(Math.random() * 3)];
            this.y = carrilesY[Math.floor(Math.random() * 2)];
        };
    };

    //colisionar
    this.colisionar = function () {
        //aca vamos a evaluar, si colisiona y por tipo de elemento, sumar puntos o restar vidas
        if (
            (this.x > goofy.x - this.ancho)
            && (this.x < goofy.x + goofy.ancho)
            && (this.y > goofy.y - this.alto)
            && (this.y < goofy.y + goofy.alto)
        ) {
            //si es un treat, entonces sumar 10 puntos más a lo acumulado y reproducir audio de puntaje. como cada uno tiene su audio van separados. si es un obstáculo restar una vida y reproducir audio de golpe
            if (this.tipo == "energizante") {
                puntos += 10;
                audioEnergizante.play();
            } else if (this.tipo == "remera") {
                puntos += 10;
                audioRemera.play();
            } else if (this.tipo == "aerosol") {
                puntos += 10;
                audioAerosol.play();
            } else if (this.tipo == "zapatillas") {
                puntos += 10;
                audioZapatillas.play();
            } else if (this.tipo == "obstaculo") {
                vidas--;
                audioGolpe.play();
            }
            //volver a sortear los elementos con los que goofy colisiona, para que se borren del canvas y reaparezcan en una nueva posición
            this.sortear();
        };
    };
};

//listener para teclas apretadas
document.addEventListener("keydown", function (e) {
    if (e.key == "ArrowUp") {
        goofy.saltar();
    };
    if (e.key == "ArrowDown") {
        goofy.bajar();
    };
    if (e.key == "ArrowLeft") {
        goofy.retroceder();
    };
    if (e.key == "ArrowRight") {
        goofy.avanzar();
    };
    //salto con barra espaciadora
    if (e.key == " " && inicio == true) {
        goofy.saltar();
    };
});

//listener para teclas levantadas
//agrego que al soltar las teclas de movimiento la velocidad en x vuelva a cero, asi se detiene el movimiento.
document.addEventListener("keyup", function (e) {
    if (e.key == "ArrowDown") {//goofy desciende del salto
        goofy.alto = altoGoofy;
        goofy.y = posYGoofy;
    };
    // volver a cero
    if (e.key == "ArrowLeft") {
        goofy.vx = 0;
    };
    if (e.key == "ArrowRight") {
        goofy.vx = 0;
    };
    //botón de pausa
    if (e.key == "p" && pausado == true && inicio == true && fin == false) {
        reanudar();
    } else if (e.key == "p" && pausado == false && inicio == true && fin == false) {
        pausar();
    } else if (e.key == "p" && (inicio == false || fin == true)) {
        console.log("No puedes pausar en las placas :)")
    };
    //boton de reset
    if (e.key == "r" && inicio == true) {
        reset();
    };
    //avanzar por las placas y presionar botones con tecla Enter o barra espaciadora
    if (e.key == "Enter" || e.key == " ") {
        if (placaInicio == true) { //de placa inicio a instrucciones goofy
            audioClick.play().catch(() => {});
            dibujarInstruccionesGoofy();
            audioInstrucciones.play().catch(() => {});
        } else if (instruccionesGoofy == true) { //de instrucciones goofy a instrucciones obstaculos
            audioClick.play().catch(() => {});
            dibujarInstruccionesObstaculos();
        } else if (instruccionesObstaculos == true) { //de instrucciones obstaculos a instrucciones skatepark
            audioClick.play().catch(() => {});
            dibujarInstruccionesSkatepark();
        } else if (instruccionesSkatepark == true) { //de instrucciones skatepark a  instrucciones controles
            audioClick.play().catch(() => {});
            dibujarControles();
        } else if (controles == true) { //de controles al juego
            audioClick.play().catch(() => {});
            audioMusica.currentTime = 0;
            audioMusica.play().catch(() => {});
            tft();
            juego();
        } else if (fin == true) { //al llegar al fin, reiniciar
            audioClick.play().catch(() => {});
            reset();
        }
    };
});

//listener para click
document.addEventListener('click', function (e) {
    if (!canvas) return; // ignore document clicks before canvas is ready
    const pos = getCanvasCoords(e);
    console.log("canvas X:" + Math.round(pos.x) + " Y:" + Math.round(pos.y));
    //de placa inicio a instrucciones goofy
    // NOTE: hitboxes use canvas coordinates where the buttons are drawn
    if (placaInicio == true && (pos.x > 350 && pos.x < 450 && pos.y > 275 && pos.y < 335)) {
        audioClick.play().catch(() => {});
        dibujarInstruccionesGoofy();
        audioInstrucciones.play().catch(() => {});
    } else if (instruccionesGoofy == true && (pos.x > 740 && pos.x < 780 && pos.y > 385 && pos.y < 435)) { //de instrucciones goofy a instrucciones obstaculos
        audioClick.play().catch(() => {});
        dibujarInstruccionesObstaculos();
    } else if (instruccionesObstaculos == true && (pos.x > 740 && pos.x < 780 && pos.y > 385 && pos.y < 435)) { //de instrucciones obstaculos a instrucciones skatepark
        audioClick.play().catch(() => {});
        dibujarInstruccionesSkatepark();
    } else if (instruccionesSkatepark == true && (pos.x > 740 && pos.x < 780 && pos.y > 385 && pos.y < 435)) { //de instrucciones skatepark a instrucciones controles
        audioClick.play().catch(() => {});
        dibujarControles();
    } else if (controles == true && (pos.x > 570 && pos.x < 670 && pos.y > 100 && pos.y < 160)) { //de controles al juego
        audioClick.play().catch(() => {});
        audioMusica.currentTime = 0;
        audioMusica.play().catch(() => {});
        tft();
        juego();
    } else if (fin == true && ganaste == false && (pos.x > 320 && pos.x < 470 && pos.y > 300 && pos.y < 380)) { //al perder o ganar, reiniciar
        audioClick.play().catch(() => {});
        reset();
    } else if (fin == true && ganaste == true && (pos.x > 320 && pos.x < 470 && pos.y > 300 && pos.y < 380)) { //al perder o ganar, reiniciar
        audioClick.play().catch(() => {});
        reset();
        audioMusica.currentTime = 0;
    }
});

//listener para hover
document.addEventListener('mousemove', function (e) {
    if (!canvas) return; // ignore hover before canvas is ready
    const pos = getCanvasCoords(e);
    //de placa inicio a instrucciones goofy
    if (placaInicio == true) {
        if (pos.x > 350 && pos.x < 450 && pos.y > 275 && pos.y < 335) {
            canvas.style.cursor = "pointer";
            ctx.drawImage(imgBotonInicio2, 350, 275, 100, 60);
        } else {
            canvas.style.cursor = "default";
            borrar();
            ctx.drawImage(imgPlacaInicio, 0, 0);
            ctx.drawImage(imgBotonInicio, 350, 275, 100, 60);
        };
    } else if (instruccionesGoofy == true || instruccionesObstaculos == true || instruccionesSkatepark == true) {
        if (pos.x > 740 && pos.x < 780 && pos.y > 385 && pos.y < 435) { //entre placas de instrucciones
            canvas.style.cursor = "pointer";
            ctx.drawImage(imgBotonFlecha2, 740, 385, 40, 50);
        } else {
            canvas.style.cursor = "default";
            ctx.drawImage(imgBotonFlecha, 740, 385, 40, 50);
        };
    } else if (controles == true) {
        if (pos.x > 570 && pos.x < 670 && pos.y > 100 && pos.y < 160) {//de placa de controles al juego
            canvas.style.cursor = "pointer";
            ctx.drawImage(imgBotonInicio2, 570, 100, 100, 60);
        } else {
            canvas.style.cursor = "default";
            ctx.drawImage(imgBotonInicio, 570, 100, 100, 60);
        };
    } else if (fin == true) { //al perder o ganar
        if (pos.x > 320 && pos.x < 470 && pos.y > 300 && pos.y < 380) {
            canvas.style.cursor = "pointer";
            borrar();
            ctx.drawImage(imgBotonNuevo2, 320, 300, 150, 80);
        } else {
            canvas.style.cursor = "default";
            borrar();
            ctx.drawImage(imgBotonNuevo2, 320, 300, 150, 80);
        };
    } else if (inicio == true) { //durante el juego
        canvas.style.cursor = "default";
    };
});

document.addEventListener("mouseup", function (e) {
    if (!canvas) return; // ignore before canvas is ready
    const pos = getCanvasCoords(e);
    if (placaInicio == true && (pos.x > 350 && pos.x < 450 && pos.y > 275 && pos.y < 335)) {
        audioClick.play().catch(() => {});
    } else if (instruccionesGoofy == true && (pos.x > 740 && pos.x < 780 && pos.y > 385 && pos.y < 435)) {
        audioClick.play().catch(() => {});
    } else if (instruccionesObstaculos == true && (pos.x > 740 && pos.x < 780 && pos.y > 385 && pos.y < 435)) {
        audioClick.play().catch(() => {});
    } else if (instruccionesSkatepark == true && (pos.x > 740 && pos.x < 780 && pos.y > 385 && pos.y < 435)) {
        audioClick.play().catch(() => {});
    } else if (controles == true && (pos.x > 570 && pos.x < 670 && pos.y > 100 && pos.y < 160)) {
        audioClick.play().catch(() => {});
    } else if (fin == true && (pos.x > 320 && pos.x < 470 && pos.y > 300 && pos.y < 380)) {
        audioClick.play().catch(() => {});
    };
    /*
    ctx.drawImage
    /*if (e.x>385 && e.x<415 && e.y>465 && e.y< 515){
    }
}*/
});

// local storage (example - currently disabled)
/*
if (localStorage){
    localStorage.setItem("currentScore", puntos);
}

if (localStorage){
    let score = localStorage.getItem("currentScore");
}
*/

// ensure tft runs once on full page load
window.addEventListener('load', tft, { once: true });