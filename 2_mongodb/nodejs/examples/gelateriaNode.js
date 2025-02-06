// ricordatevi di cambiare il valore di "DB" con il vostro URL di connessione
const DB = "mongodb+srv://<username>:<pw>@<cluster>/gelateriaN"

// ricordatevi di installare la libreria mongoose se non l'avete già fatto
// npm install mongoose
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

// -------------- DEFINIZIONE DEGLI SCHEMA
const userSchema = new Schema({
    data_cre: Date,
    identificativo: String,
    indirizzo: {
        via: String,
        civico: Number,
        cap: Number,
        citta: String
    }
})

const User = mongoose.model("user", userSchema, "user");

const gustoSchema = new Schema({
    nome: String,
    peso: Number,
    prezzo: Number
})

const Gusto = mongoose.model("gusto", gustoSchema, "gusto");

const ordineSchema = new Schema({
    data_cre: Date,
    id_user: Schema.Types.ObjectId,
    id_gusto: Schema.Types.ObjectId,
    quantita: Number,
    prezzoTot: Number
})

const Ordine = mongoose.model("ordine", ordineSchema, "ordine");

// -------------- DEFINIZIONE DELLE FUNZIONI che andremo ad usare nella funzione principale work
async function dispGustiInEsaurimento() {
    // Ottenere tutti i gusti in magazzino che sono disponibili
    // in quantità minori di 5Kg
    const gusti = await Gusto.find({ peso: { $lt: 5 } })
    console.log('N° Gusti con quantità minore di 5kg:', gusti.length)
    /*  
    for (var x = 0; x < gusti.length; x++) {
         console.log('Gusto[' + x + ']', gusti[x])
    }
    */

}

// await totaleKGVendutiACliente(documentoUserCC._id)
async function totaleKGVendutiACliente(id_utente) {
    // Ottenere il numero totale di kg di gelato venduti ad uno specifico cliente
    const ordiniCliente = await Ordine.find({ id_user: id_utente })
    var acc = 0
    for (var x = 0; x < ordiniCliente.length; x++) {
        acc = acc + ordiniCliente[x].quantita
    }

    return acc
}

async function compra(quantita, nomeGusto, user_id) {
    // simulo l'acquito di un gusto da un utente,
    // se e solo se il gusto è disponibile almeno nella quantità richeista

    const documentoGustoCC = await Gusto.findOne({ "nome": nomeGusto, peso: { $gte: quantita } })
    if (documentoGustoCC !== null) {
        const prezzoT = documentoGustoCC.prezzo * quantita

        const gustoOrdine = new Ordine({
            data_cre: new Date(),
            id_user: user_id,
            id_gusto: documentoGustoCC._id,
            quantita: quantita,
            prezzoTot: prezzoT
        })
        await gustoOrdine.save()

        // rimuovo dal magazino la quantità di gelato comprata 
        const pesoDaAggiornare = documentoGustoCC.peso - quantita
        await Gusto.findOneAndUpdate({ "_id": documentoGustoCC._id }, { "peso": pesoDaAggiornare })

    } else {
        console.log("Errore gusto non trovato o non disponibile nella quantità richeista")
    }
}

// funzione principale work (il nome ovviamente non è importante)

async function work() {
    // connessione dal DB
    await mongoose.connect(DB);
    console.log("DB connected!")
    // pulisco la collezione "User" se esiste
    await User.deleteMany({})
    // pulisco la collezione "Gusto" se esiste
    await Gusto.deleteMany({})


    // creo e salvo un nuovo utente "A" sulla collezione "User"
    const userA = new User({
        data_cre: new Date(),
        identificativo: "A",
        indirizzo: {
            civico: 34,
            cap: 40130,
            citta: "Bologna"
        },
    })
    await userA.save()

    // creo e salvo un nuovo utente "B" sulla collezione "User"
    const userB = new User({
        data_cre: new Date(),
        identificativo: "B",
        indirizzo: {
            via: "delle pere",
            civico: 36,
            cap: 40131,
            citta: "Bologna"
        }
    })
    await userB.save()

    const gustoFragola = new Gusto({
        nome: "Fragola",
        peso: 10,
        prezzo: 24.5
    })
    await gustoFragola.save()

    const gustoPera = new Gusto({
        nome: "Pera",
        peso: 2,
        prezzo: 10000
    })
    await gustoPera.save()

    const gustoMela = new Gusto({
        nome: "Mela",
        peso: 5.5,
        prezzo: 18.8
    })
    await gustoMela.save()

    // -----Primo Step identificazione utente
    // query: {"identificativo":"A"}
    // pezzo di query per ordinare:
    // {"identificativo":-1}

    // stamp numero gusti con meno di 5kg di disponibilità
    await dispGustiInEsaurimento()
    const identificativoUtenteCheCompra = "A"
    const documentoUserCC = await User.findOne({ "identificativo": identificativoUtenteCheCompra }, { _id: 1 })
    if (documentoUserCC !== null) {
        // per ogni gusto da comprare: 
        // Secondo Step identificazione gusto
        //query: { "nome": "Mela", "peso": { $gte: 5 } }

        // terzo step inserimento ordine
        /*
        {
            data_cre: "06/02/2025",
            id_user:{
                "$oid": "679cb7b98fc90318abc9afea"
              },
            id_gusto:{
                "$oid": "679cb7b98fc90318abc9afea"
              },
            quantita: 5,
            prezzoTot: 18.8*5
        }
        */
        // 4° step aggiornamento della quantità (peso) nel magazzino 
        /*
            query: { "_id": {
                    "$oid": "679cb7b98fc90318abc9afea"
                    } }
            da aggiornare: { "peso": 0.5 }
        */
        await compra(5, "Mela", documentoUserCC._id)
        await compra(2, "Fragola", documentoUserCC._id)

        // stampo numero gusti con meno di 5kg di disponibilità
        await dispGustiInEsaurimento()

        // stampo numero kg in totale (tra tutti gli ordini) venduti ad uno specifico cliente
        const totComprato = await totaleKGVendutiACliente(documentoUserCC._id)
        console.log("totComprato", totComprato)
    } else {
        console.log("Errore utente A non trovato")
    }


    console.log("Done")
}

// esecuzione della funzione principale
work()








