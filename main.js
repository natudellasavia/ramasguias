// Me traigo del HTML los botones
let boxZero = document.getElementById("boxA");
let boxOne = document.getElementById("boxB");
let boxTwo = document.getElementById("boxC");
let boxThree = document.getElementById("boxD");
let boxFour = document.getElementById("boxE");
let boxFive = document.getElementById("boxF");
let boton = document.getElementsByClassName("boton");
let txFallos = document.getElementById("txFallos");
let denuevo = document.getElementById("denuevo");

// Arreglo de RAMAS
let ramas = [
  { id: "0", nombre: "RAMO", clase: "ramo" }, // Pongo: ramas[0].nombre y va a tirar "RAMO"
  { id: "1", nombre: "RONDA", clase: "ronda" },
  { id: "2", nombre: "CARAVANA", clase: "caravana" },
  { id: "3", nombre: "COLONIA", clase: "colonia" },
  { id: "4", nombre: "SOLAR", clase: "solar" },
  { id: "5", nombre: "CLAN", clase: "clan" },
];

// Matriz que representa los botones y donde guarda las ramas
let botonera = [0, 0, 0, 0, 0, 0];

// Variable donde guardo la posición del botón que hago click
var posicion;

// Variable que va guardando el número de rama que se está analizando
var numRama = 0;

// Variable que va a acumular los puntos por cada error
var fallos = 0;

// --COMIENZO DE JUEGO
ramasAleatorias();
imprimirBotonera();
habilitarBotones();

// --OBTENER NUMERO ALEATORIO (entre 0 y max)
function randomNum(max) {
  return Math.floor(Math.random() * max + 1) - 1;
}

// --ASIGNAR NUMERO DE RAMAS A LA 'BOTONERA' (ALEATORIAMENTE Y SIN REPETIR)
function ramasAleatorias() {
  // Le asignamos un número aleatorio (1 a 6) a la posición 0
  botonera[0] = randomNum(6);

  // Recorremos la matriz de la posición 1 a la 5 (la pos 0 ya tuvo número asignado afuera)
  for (x = 1; x <= 5; x++) {
    let flag = 0;
    while (flag < x) {
      // Conseguimos un número aleatorio para posteriormente chequear si se repite
      number = randomNum(6);

      // Recorre las posiciones de la matiz (hasta x posición) que ya tienen cargado un número
      for (i = 0; i <= x; i++) {
        if (botonera[i] == number) {
          flag = 0; // Para no salir del while
          botonera[x] = 0; // Para volver a poner en 0 por si ya le habia asignado un número que aún no se había duplicado en posiciones anteriores
          break;
        } else {
          flag++; // Acumulador para salir del while
        }
      }
      botonera[x] = number;
    }
  }
}

// --IMPRIMIR EN CONSOLA EL ARRAY ALEATORIO (es para controlar)
function imprimirBotonera() {
  for (x = 0; x < 6; x++) {
    console.log(botonera[x]);
  }
}
// --ACCIONES DE CLICK EN LA BOTONERA DEL JUEGO
function clickBotonera(boton) {
  // Me guardo como número la "pos" del botón
  posicion = parseInt(boton.getAttribute("pos"));

  if (botonera[posicion] == numRama) {
    agregarClase(posicion, numRama);
    numRama++; // Cada vez que hago bien click, avanza 1 rama.
    if (numRama == 6) {
      denuevo.style.display = "block"; // Muestro el botón que en CSS está oculto
      deshabilitarBotones();
      return;
    }
  } else {
    botoneraEnNegro();
    puntaje();
  }
}

// --ACCIONES CUANDO SE PRESIONA EL BOTON "NUEVA PARTIDA" (el cual aparece sólo cuando se completa el juego)
function reiniciarJuego(reiniciar) {
  txFallos.innerHTML = ""; // Saco el texto de "fallos" de la vista hasta que se vuelvan a equivocar
  denuevo.style.display = "none"; // Oculto el botón de reinicio de juego
  fallos = 0;
  botoneraEnNegro();
  ramasAleatorias();
  imprimirBotonera();
  habilitarBotones();
  console.log("aca es ADENTRO post boton"); // ELIMINARRRRR
}

// --CONTROL DE FALLOS POR JUEGO
function puntaje() {
  fallos++;
  txFallos.style.display = "block";
  if (fallos == 1) {
    txFallos.innerHTML = "FALLO: " + fallos;
  } else {
    txFallos.innerHTML = "FALLOS: " + fallos;
  }
}

// --AGREGA LA CLASE DE LA RAMA CUANDO ES CORRECTO
function agregarClase(posicion, numRama) {
  var claseRama = ramas[numRama].clase; // Guardo la propiedad 'clase' (de css) en una variable según el número de rama que me traje
  //"posicion" de botón que estamos analizando
  if (posicion == 0) {
    boxZero.classList.add(claseRama);
    boxZero.innerHTML = ramas[numRama].nombre;
    boxZero.disabled = true; //Deshabilita el botón para que no se pueda volver a apretar
  } else if (posicion == 1) {
    boxOne.classList.add(claseRama);
    boxOne.innerHTML = ramas[numRama].nombre;
    boxOne.disabled = true;
  } else if (posicion == 2) {
    boxTwo.classList.add(claseRama);
    boxTwo.innerHTML = ramas[numRama].nombre;
    boxTwo.disabled = true;
  } else if (posicion == 3) {
    boxThree.classList.add(claseRama);
    boxThree.innerHTML = ramas[numRama].nombre;
    boxThree.disabled = true;
  } else if (posicion == 4) {
    boxFour.classList.add(claseRama);
    boxFour.innerHTML = ramas[numRama].nombre;
    boxFour.disabled = true;
  } else if (posicion == 5) {
    boxFive.classList.add(claseRama);
    boxFive.innerHTML = ramas[numRama].nombre;
    boxFive.disabled = true;
  }
}

// --REINICIA EL HTML Y CCS DE LA BOTONERA
function botoneraEnNegro() {
  // Reinicia a 0 que es el RAMO para volver a comparar con las posiciones de la botonera
  numRama = 0;
  habilitarBotones();
  boxZero.innerHTML = "?";
  boxOne.innerHTML = "?";
  boxTwo.innerHTML = "?";
  boxThree.innerHTML = "?";
  boxFour.innerHTML = "?";
  boxFive.innerHTML = "?";
  /*     !!!!!-----     ESTOOOO FUNCIONA PERO ¿SE PUEDE ACHICAR?     -----!!!!!     */
  for (rec = 0; rec <= 5; rec++) {
    if (botonera[rec] == 0) {
      boxZero.classList.remove("ramo");
      boxOne.classList.remove("ramo");
      boxTwo.classList.remove("ramo");
      boxThree.classList.remove("ramo");
      boxFour.classList.remove("ramo");
      boxFive.classList.remove("ramo");
    } else if (botonera[rec] == 1) {
      boxZero.classList.remove("ronda");
      boxOne.classList.remove("ronda");
      boxTwo.classList.remove("ronda");
      boxThree.classList.remove("ronda");
      boxFour.classList.remove("ronda");
      boxFive.classList.remove("ronda");
    } else if (botonera[rec] == 2) {
      boxZero.classList.remove("caravana");
      boxOne.classList.remove("caravana");
      boxTwo.classList.remove("caravana");
      boxThree.classList.remove("caravana");
      boxFour.classList.remove("caravana");
      boxFive.classList.remove("caravana");
    } else if (botonera[rec] == 3) {
      boxZero.classList.remove("colonia");
      boxOne.classList.remove("colonia");
      boxTwo.classList.remove("colonia");
      boxThree.classList.remove("colonia");
      boxFour.classList.remove("colonia");
      boxFive.classList.remove("colonia");
    } else if (botonera[rec] == 4) {
      boxZero.classList.remove("solar");
      boxOne.classList.remove("solar");
      boxTwo.classList.remove("solar");
      boxThree.classList.remove("solar");
      boxFour.classList.remove("solar");
      boxFive.classList.remove("solar");
    } else if (botonera[rec] == 5) {
      boxZero.classList.remove("clan");
      boxOne.classList.remove("clan");
      boxTwo.classList.remove("clan");
      boxThree.classList.remove("clan");
      boxFour.classList.remove("clan");
      boxFive.classList.remove("clan");
    }
  }
}

function habilitarBotones() {
  boxZero.disabled = false;
  boxOne.disabled = false;
  boxTwo.disabled = false;
  boxThree.disabled = false;
  boxFour.disabled = false;
  boxFive.disabled = false;
}

function deshabilitarBotones() {
  boxZero.disabled = true;
  boxOne.disabled = true;
  boxTwo.disabled = true;
  boxThree.disabled = true;
  boxFour.disabled = true;
  boxFive.disabled = true;
}

