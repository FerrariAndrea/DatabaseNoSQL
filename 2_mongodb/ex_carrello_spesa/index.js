const DB = "mongodb+srv://:xxxxxxx/prova"
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

async function dropAllCollections(){
    await Carrello.deleteMany({});
    await Prodotto.deleteMany({});
    await User.deleteMany({});
    console.log("Collezioni pulite, drop.")
}

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
    var somma=0;
    for(var i =0;i<carrello.prodottoId.length;i++){
        const id_prod_corrente =carrello.prodottoId[i];
        const prodotto= await Prodotto.findOne({"id":id_prod_corrente});
        if(prodotto!==null){
            somma=somma+prodotto.prezzo;
        }
    }
    console.log("somma",somma)
}

async function cambiaprezzo(id_prod,new_prezzo){
    await Prodotto.updateOne({"id":id_prod},{"prezzo":new_prezzo})
}

async function trovaProdCostosi(){
    console.log("Prodotti costosi:");
   const arr_prod= await Prodotto.find({"prezzo":{$gt:100}})
   for(var i=0;i<arr_prod.length;i++){
    console.log(arr_prod[i].name)
   }
}

async function run(){
    //DB connection
    await mongoose.connect(DB);
    console.log("Connessione DB conclusa!");
    await dropAllCollections();
    await popolaDB()
    await inserisciNellCarrello()
    await getTotSpesa(1);
    await cambiaprezzo(2,200);
    await getTotSpesa(1);
    await trovaProdCostosi();

    console.log("FINE :))))");
}

run();
