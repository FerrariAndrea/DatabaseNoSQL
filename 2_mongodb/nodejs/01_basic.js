/*
    To run that example just open a terminal in that folder and run:
    node 01_basic.js

    remember that node.js is javascript based!
    you can write code without enclosing it into a function
    the code below will run when the fill will be loaded
    (when you run it with the "node" command or when you will import the file inside another one)
*/

const a = 2;
const b = 3 //js won't get angry if you don't write the ";" at the end of a code line
const str1 ="this is a string" ; const str2 = "HELLO" //of course you need ";" between 2 different instruction
const c = a+b;
console.log("This is an example fo code that is running outside of a function!");
console.log("c is " + c);

/*
if you define a memory space with "const" you will not be able anymore to change its content.
but you can use "var" or "let" to define a variable that can be changed.
*/

var mystr = str1;
mystr= str2+" "+mystr;
console.log(mystr);

/*
node.js as javascript is a Functional language,
you can create functions and pass them as an argument 
into other functions, and you can create a function inside other functions.
You can save functions inside "const" or "var"
*/

function plus1(num){
 return num+1;
}

const sub = function(num1,num2){
    return num1-num2;
}
   
function myClac(){
    /*
    "anotherFunction" is a "const" that contains a function
    and this function needs 3 args
    "num" is a number
    "fun" is a function with 1 arg, which is a number
    "repeat" is a number
    "anotherFunction" will run "repeat" times, the function "fun" using "num" 
    as an argument for "fun"
    */

    const anotherFunction= function(num,fun,repeat){
        var temp= num;
        for(var x = 0;x<repeat;x++){
            temp=fun(temp);
        }
        return temp;
    }

    var n1 = 10;
    const n2 = 20;
    for(var x=0;x<5;x++){
        n1= plus1(n1);
    }
    //here n1 is 15
    const new_value= sub(n1,n2); //return 15-20=-5
    
    //now we will return the result of the "anotherFunction" call
    //using "new_value" (that is -5) as an argument for the function "plus1"
    //that will call 3 times
    //the result is -2
    return anotherFunction(new_value,plus1,3);
}

//let's call our "myClac" function

const res = myClac();
console.log("myClac result: "+res);