const DB = "mongodb://<username>:<pw>@localhost:27017/?authMechanism=DEFAULT"
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;



const userSchema = new Schema({
    id:Number,
    data_cre:Date,
    name:String,
    surname:String,
    anni:Number
})
const User= mongoose.model("user", userSchema, "user");

const prodottoSchema = new Schema({
    id:Number,
    name:String,
    prezzo:Number,
})
const Prodotto= mongoose.model("prodotto", prodottoSchema, "prodotto");

const carrelloSchema = new Schema({
    id:Number,
    prodottoId:[Number],
    userId:Number
})
const Carrello= mongoose.model("carrello", carrelloSchema, "carrello");


async function popolaDB(){
    const nome= "Paperino"
    await User.create({"id":0,"name":nome});
    await User.create({"id":1,"name":"Pluto"});
    console.log("Utenti aggiunti");

    await Prodotto.create({"id":0,"name":"pc","prezzo":2000});
    await Prodotto.create({"id":1,"name":"matita","prezzo":0.5});
    await Prodotto.create({"id":2,"name":"zaino","prezzo":30});
    await Prodotto.create({"id":3,"name":"padella","prezzo":50});
    await Prodotto.create({"id":4,"name":"coltello","prezzo":25});
    console.log("Prodotti aggiunti");
}

async function inserisciNellCarrello(){
    const prodID=[1,2,3];
    const uID=1;
    await Carrello.create({"prodottoId":prodID,"userId":uID});
    console.log("Carrello creato");
}

async function getTotSpesa(idUtente){
 const carrello= await Carrello.findOne({"userId":idUtente});
 console.log("carrello",carrello)
}

async function run(){
    //DB connection
    await mongoose.connect(DB);
    console.log("Connessione DB conclusa!");
    await popolaDB()
    await inserisciNellCarrello()
    await getTotSpesa(1);
    console.log("FINE :))))");
}

run();
