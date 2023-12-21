
const prompt = require('prompt-sync')();
/*
Media N voti usando un while
*/
var media=0;
var numero_voti=0;
var nonUscire=true;
while(nonUscire){
    const voto = prompt("Inserisci il prossimo voto, oppure exit: ");
    if(voto=="exit"){
        nonUscire=false;
    }else{
        numero_voti=numero_voti+1;
        media=media+Number(voto);
    }
}
media = media/numero_voti;
console.log("media: "+ media)

if(media>90){
    console.log(":))))))))))))))");
}else if(media>60){

    console.log(":)");
}
else{
    console.log(":(");
}


