const DB = "mongodb+srv://:xxxxxxx/prova"
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
var id_bigl_corrente=0

const userSchema = new Schema({
    id:Number,
    data_cre:Date,
    name:String,
    surname:String,
    anni:Number,
    credito:Number
})
const User= mongoose.model("user", userSchema, "user");

const trenoSchema = new Schema({
    id:Number,
    bici:Number,
    vip:Number,
    tratte:[{
        src:String,
        dst:String,
        dist:Number,
        srcTime:Number,
        dstTime:Number
    }]
})
const Treno= mongoose.model("treno", trenoSchema, "treno");

const bigliettoSchema = new Schema({
    id:Number,
    id_utente:Number,
    id_Treno:Number,
    prezzo:Number,
    tipo:String
})
const Biglietto= mongoose.model("biglietto", bigliettoSchema, "biglietto");

async function dropAllCollections(){
    await Treno.deleteMany({});
    await Biglietto.deleteMany({});
    await User.deleteMany({});
    console.log("Collezioni pulite, drop.")
}

async function popolaDB(){
    const nome= "Paperino"
    await User.create({"id":0,"name":nome,"credito":1000});
    await User.create({"id":1,"name":"Pluto","credito":100});
    console.log("Utenti aggiunti");
    await Treno.create({"id":0,"bici":10, "vip":10,"tratte":[
        {
        "src":"Bologna",
        "dst":"Imola",
        "dist":40,
        "srcTime":12,
        "dstTime":13
        },
        {
        "src":"Imola",
        "dst":"Faenza",
        "dist":25,
        "srcTime":13,
        "dstTime":14
        },
        {
            "src":"Faenza",
            "dst":"Fano",
            "dist":120,
            "srcTime":14,
            "dstTime":16
            },
    ]});
    await Treno.create({"id":1,"bici":0, "vip":20,"tratte":[
        {
        "src":"Milano",
        "dst":"Bologna",
        "dist":200,
        "srcTime":12,
        "dstTime":14
        },
        {
        "src":"Bologna",
        "dst":"Faenza",
        "dist":45,
        "srcTime":14,
        "dstTime":16
        }
    ]});
    console.log("Treni aggiunti");
}

async function creaBiglietto(id_utente,src,dst,tipo){
    var treni;
    var costoPerTipo=0
    if(tipo==="bici"){
        costoPerTipo=0.2
        treni= await  Treno.find({"bici":{$gt:0},"tratte.src":src,"tratte.dst":dst})
    }else if(tipo==="vip"){
        costoPerTipo=0.4
        treni= await Treno.find({"vip":{$gt:0},"tratte.src":src,"tratte.dst":dst})
    }else{
        costoPerTipo=0.1
        treni= await Treno.find({"tratte.src":src,"tratte.dst":dst})
    }
    for(var x=0;x<treni.length;x++){
        console.log("treno: "+x,treni[x])
    }
    if(treni.length>0){
        const tratte = treni[0].tratte
        var startSomma=false
        var somma=0
        for(var x=0;x<tratte.length;x++){
            if(tratte[x].src===src){
                startSomma=true;
            }
            if(startSomma){
                somma=somma+tratte[x].dist
            }
            if(tratte[x].dst===dst){
                startSomma=false
            }
        }
        somma=somma*costoPerTipo
        
        await Biglietto.create({id:id_bigl_corrente})
        id_bigl_corrente++
    }else{
        console.log("MANCO UN TRENO :(")
    }
}

async function run(){
    //DB connection
    await mongoose.connect(DB);
    console.log("Connessione DB conclusa!");
    await dropAllCollections();
    await popolaDB()

    console.log("FINE :))))");
}

run();
