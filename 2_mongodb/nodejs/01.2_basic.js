/*
Simple calculator
npm module required: npm install prompt-sync 
*/

//import the dependency
const prompt = require('prompt-sync')();

//define a function to add 2 numers togheder
function sum(a, b) {
    return a + b;
}

//define a function to subtract 2 numers togheder
function sub(a, b) {
    return a - b;
    // Another way to subtract 2 numbers,
    // is add the negative of the second addend to the first addend
    // you can try commenting the upper line "return a-b;" and uncomment the line below 
    //    return sum(a,-b)

    //the line upper uses the fun sum passing as a second argument its negation
}

function mul(a, b) {
    return a * b;
}

//function that try to read 2 addend from the user command 
function read2Addend(user_command) {
    // we suppose that the command will ALWAYS composed
    // by "command, space, first addend, space, second addend" 

    // there are a lot of different ways to extrapolate these 2 number from that string
    // here only one example, we will subdivide the command string
    // into an array (list) of strings by the space char
    const array_str = user_command.split(" ")
    //the expected result is a list composed by 3 element
    //the first position array_str[0], can be ignored, because is the name of the command
    //but the other 2 are the 2 numbers that we need

    // here we try to handle a wrong command, that don't contains the 2 number
    // we check if the array contains exactly 3 elements, and the 2° and 3° elements are number
    if (array_str.length !== 3 || isNaN(array_str[1]) || isNaN(array_str[2])) {
        console.log("An error in your command found!")
        return { a: 0, b: 0 }
    }


    //we should to force a type conversion, in order to be sure that our numbers will be considered
    //as real number
    //In node.js the operatore "+" works for numbers and string as well
    //you can try to run "1"+"1" and it will be "11" not 2
    const number_a = Number(array_str[1])
    const number_b = Number(array_str[2])
    //we return a json object composed by the 2 numbers
    //the json object will be formed by 2 keys: "a" and "b"
    //the Key "a" will contain the value of the const "number_a"
    //the Key "b" will contain the value of the const "number_b"
    return { a: number_a, b: number_b }
}


function avg(user_command) {
    const array_str = user_command.split(" ")
    var acc = 0
    var scartati = 1
    for (var x = 1; x < array_str.length; x++) {
        var tmp = Number(array_str[x])
        if (isNaN(tmp)) {
            scartati = scartati + 1
        } else {
            acc = acc + tmp
        }
    }
    return acc / (array_str.length - scartati)
}


//simple function that will just print the instruction
//of this program
function help() {
    console.log("-----------------INSTRUCTIONS")
    console.log("#### add\nUse the command 'add' in order to sum 2 number.\nexample: add 2 4\nwill calculate 2+4")
    console.log("#### sub\nUse the command 'sub' in order to subtract 2 number.\nexample: sub 4 2\nwill calculate 4-2")
    console.log("#### mul\nUse the command 'mul' in order to multiply 2 number.\nexample: mul 4 2\nwill calculate 4*2")
    console.log("#### help\nUse the command 'help' in order to see the list of instruction avaible")
    console.log("#### exit\nUse the command 'exit' in order to close this program")
    console.log("-----------------INSTRUCTIONS")
}

//function to understand the user command and execute the releated function
function heandler(user_command) {
    /*
    Here we have a list of if-else
    that will check if the command of the user start with one of the commands
    that we know, and if possible will execute the related function
    */
    if (user_command.startsWith("help")) {
        help();
    } else if (user_command.startsWith("exit")) {
        console.log("bye bye")
        // this is the only command that will return "true" 
        // because in that case the boolean that is returned by this function "handler"
        // will be used in order to understand if we need to close the program or not
        // look at the end of this function, you will find a "return false"
        return true;
    } else if (user_command.startsWith("add")) {
        //we read the 2 addends from the command user
        const addends = read2Addend(user_command)
        //we call the "sum" function passing the 2 addend contained into addends
        const result = sum(addends.a, addends.b)
        console.log("result: " + result)
    } else if (user_command.startsWith("sub")) {
        //we read the 2 addends from the command user
        const addends = read2Addend(user_command)
        //we call the "sub" function passing the 2 addend contained into addends
        const result = sub(addends.a, addends.b)
        console.log("result: " + result)
    } else if (user_command.startsWith("mul")) {
        //we read the 2 addends from the command user
        const addends = read2Addend(user_command)
        //we call the "sub" function passing the 2 addend contained into addends
        const result = mul(addends.a, addends.b)
        console.log("result: " + result)
    } else if (user_command.startsWith("avg")) {
        const result = avg(user_command)
        console.log("result: " + result)
    } else {
        console.log("Sorry, I don't understand :(")
    }
    //we don't close the program
    return false;
}

//creation of the main function
function main() {
    console.log("Hi this is a simple calculator")
    console.log("Write 'help' to see the command list")
    var exit = false;
    //the program will be waiting for an user input
    while (!exit) {
        const current_cmd = prompt('Enter a new request:')
        //the return of the function "heandler"
        //is used to understand if we need keep asking for request
        //or if we should close the program
        exit = heandler(current_cmd)
    }
}

//running the main function
main()