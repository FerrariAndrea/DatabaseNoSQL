const prompt = require('prompt-sync')();

function applicaSconto(prez, scon) {
    return prez - (prez * scon) / 100
}


const minPrezzo = prompt("Inserisci prezzo minimo: ")
const sconto = prompt("Inserisci sconto: ")

//singolo oggetto json
const prod01 = { "nome": "matita", "prezzo": 10 }

//array di oggetti json
const prodotti = [
    { "nome": "pc", "prezzo": 1200 },
    prod01,
    { "nome": "monitor", "prezzo": 200 },
]

//--------------------------inserimento altri prodotti nel catalogo
var nonUscire = true
while (nonUscire) {
    const nome_prodotto = prompt("[NUOVO PRODOTTO] Inserisci nome prodotto oppure Q per uscire: ")
    if (nome_prodotto.toUpperCase() == "Q") {
        nonUscire = false
    } else {
        const prezzo_prodotto = prompt("Inserisci prezzo: ")

        //SOLUZIONE A
        const nuovo_prodotto={}
        nuovo_prodotto.nome=nome_prodotto
        nuovo_prodotto.prezzo=Number(prezzo_prodotto)
        prodotti.push(nuovo_prodotto)

        //SOLUZIONE B
       // prodotti.push({ "nome": nome_prodotto, "prezzo": Number(prezzo_prodotto) })

    }

}

//--------------------------calcolo spesa con sconto se applicabile
const prezzi = []

nonUscire = true
while (nonUscire) {
    const nome_prodotto = prompt("[COMPRA] Inserisci nome prodotto oppure Q per uscire: ")
    if (nome_prodotto.toUpperCase() == "Q") {
        nonUscire = false
    } else {
        var nonTrovato = true
        for (var x = 0; x < prodotti.length; x++) {
            if (prodotti[x].nome == nome_prodotto) {
                prezzi.push(prodotti[x].prezzo)
                console.log("Prezzo prodotto selezionato: " + prodotti[x].prezzo)
                nonTrovato = false
                break//<--- esce dal for in anticipo
            }
        }
        if (nonTrovato) {
            console.log("Prodotto non trovato")
        }
    }
}

var tot = 0
for (var x = 0; x < prezzi.length; x++) {
    tot = tot + prezzi[x]
}

if (tot > Number(minPrezzo)) {
    console.log("Sconto applicabile")
    console.log("Result: " + applicaSconto(tot, sconto))
} else {
    console.log("Sconto non applicabile")
    console.log("Result: " + tot)
}



