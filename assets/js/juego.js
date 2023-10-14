/*
* 2C = Two of Clubs (Treboles)
* 2D = Two of Diamonds (Diamantes)
* 2H = Two of Hearts (Corazones)
* 2S = Two of Spades (Espadas)
*/


let deck = [];

const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];
// Esta funcion crea una nueva baraja
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
    console.log(carta);
    return carta;
}

const valorCarta = (carta) => {
    const valor = carta.substring(0,carta.length - 1);
    return (isNaN(valor))  ?
            (valor ==='A') ? 11 : 10
            :valor * 1;

}
const valor = valorCarta(pedirCarta() );
console.log({valor});