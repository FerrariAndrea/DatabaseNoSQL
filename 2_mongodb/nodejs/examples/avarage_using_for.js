
const prompt = require('prompt-sync')();
/*
Media N voti usando un ciclo for
*/
const numero_voti = Number(prompt("Quanti voti vuoi inserire: "));
var voto=0;
for(var x=0;x<numero_voti;x++){
    const temp_voto = prompt("Inserisci il prossimo voto: ")
    voto=voto+ Number(temp_voto);
}

const media = voto/numero_voti;
console.log("media: "+ media)

if(media>90){
    console.log(":))))))))))))))");
}else if(media>60){

    console.log(":)");
}
else{
    console.log(":(");
}


