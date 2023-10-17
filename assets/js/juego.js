/*
* 2C = Two of Clubs (Treboles)
* 2D = Two of Diamonds (Diamantes)
* 2H = Two of Hearts (Corazones)
* 2S = Two of Spades (Espadas)
*/


let deck = [];

const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];
let puntosJugador = 0,
    puntosComputadora = 0;
// Esta funcion crea una nueva baraja

// Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');


const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#Computadora-cartas');
const puntosHTML = document.querySelectorAll('small');


const crearDeck =  () => {




//Crea todas las barajas de las cartas
    for(let i = 2; i<= 10; i++){
        for(let tipo of tipos){
            deck.push(i + tipo);
        }
    }
    //Crea todas las cartas especiales.
    for(let tipo of tipos){
        for(let esp of especiales){
            deck.push(esp + tipo);
        }
    }
    //console.log(deck);
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
    
}
crearDeck();


// Esta funcion me permite tomar una carta

const pedirCarta = () => {
    if(deck.length === 0){
        throw 'No hay cartas en el deck';
    }
// Elimina una carta de la baraja 
    const carta = deck.pop();

   console.log(deck);
    //console.log(carta);
    return carta;
}

const valorCarta = (carta) => {
    const valor = carta.substring(0,carta.length - 1);
    return (isNaN(valor))  ?
            (valor ==='A') ? 11 : 10
            :valor * 1;

}
//Turno de la computadora
const turnoComputadora = (puntosMinimos) => {

    do{
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta (carta);
        puntosHTML[1].innerText = puntosComputadora;
    
    
       // <img class="carta" src="assets/cartas/2C.png">
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`; // Valor de la carta que se inserta.
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);
        if(puntosMinimos > 21 ){
            break;
        }

    }while((puntosComputadora< puntosMinimos) && (puntosMinimos <= 21));
setTimeout( () => {


    if(puntosComputadora === puntosMinimos){
    alert('Nadie gana :(');
    }else if( puntosMinimos > 21){
    alert('Computadora Gana');
    }else if(puntosComputadora > 21){
        alert('Jugador Gana');
    } else{
        alert('Computadora Gana');
    }
},10);

}

const valor = valorCarta(pedirCarta() );
//console.log({valor});


// Evento

btnPedir.addEventListener('click', () =>{
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta (carta);
    puntosHTML[0].innerText = puntosJugador;


   // <img class="carta" src="assets/cartas/2C.png">
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`; // Valor de la carta que se inserta.
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);


    if(puntosJugador>21){
        console.warn('Lo siento mucho, perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }else if (puntosJugador === 21){
        console.warn('21, genial');
        btnDetener.disabled = true;
        btnPedir.disabled = true;
        turnoComputadora(puntosJugador);
    }
});
//Evento de los botones detener.
btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora(puntosJugador);

})

btnNuevo.addEventListener('click', () =>{
    deck = crearDeck();
    puntosJugador     = 0;
    puntosComputadora = 0;

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;


})