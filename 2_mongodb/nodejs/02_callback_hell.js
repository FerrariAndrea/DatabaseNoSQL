/*
    To run that example just open a terminal in that folder and run:
    node 02_callback_hell.js

    in the previous file (01_basic.js) we see that a function can be passed to another function.
    and we see only functions that were run one after one, in a sync queue
*/

var a = function(){
    console.log("I'm --> a");
}

var b = function(){
    console.log("I'm --> b");
}

//these 2 functions "a" and "b" are sync
//and if we run them we can see that the output order is the same as the call order
a();
b();
a();
console.log("---------------------------pt.1");

/*
that because "b()" is waiting for the end of the first call of "a()"
if inside "a()" there is an i/o call like a system call in order to write or read a file,
node.js will be paused "a()" but will not able to run other stuff meanwhile.
if "a()" is an async function every time that it needs to wait for something, node.js can run other stuff.

In order to be sure that a "b()" will run after "a()" (if "a()" is async)
you can use a callback, passing "b()" as an argument of "a()", in this way, "a()"" can run "b()"
*/


a= function(callback){
    //note: a is not async yet
    //so this is just an example of using callback
    console.log("I'm --> a");
    //here is missing an i/o call that will paused "a()"
    callback();
}

a(b);
console.log("---------------------------pt.2");

/*
The node.js (javascript) comunity agree that using callbacks are counterintuitive
A lot of callback can make your code hard understandable.
So you can use "async" and "await" instead passing callbacks (the Promise obj will help us)
*/

/*
"delay" is a function that is using a Promise.
The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
You can create a Promise, and when you call an async function without using await you will receive a Promise of the async function.
We will use "delay" in order to simulate an i/o request that will pause the function which calls it
*/
const delay = function(ms){return new Promise(function(resolve){setTimeout(resolve, ms)})}
/*
using "async" before "function" we are defining a function that is able to:
- paused and grant node.js to run other stuff while that function is paused
- to use the "await" in order to force node.js to wait for the end of another async function (that is called inside this one)
instead, go ahead while waiting.
*/
async function c(){
    /*
    "c" is an async function
    and is callyng "delay" that you can see as another async function
    (but it isen't, it is returning a Promise)
    */
    await delay(100);
    console.log("I'm --> c");
}

async function d(){
    console.log("I'm --> d");
}

async function work(){
    //not using await
    c();
    d();
    
    //wait in order to let's c() and d() ends
    await delay(500);
    console.log("---------------------------pt.3");

    //using wait
    await c();
    await d();
    //remember you can't use "await" inside a function that is NOT "async"
    //this is why "work" is defined as "async"
}

work();


