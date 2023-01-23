/*
    To run that example just open a terminal in that folder and run:
    node 03_import_export.js

    How to write code in different files?
    Easy, create a file .js and use
    "module.exports =" and your stuff

    then from anohter file import your suff using
    "require('file_name');"
*/

//the "require" function don't need ".js" at the end of your imported file name
const hello = require('./import_example');
//go and look at "import_example.js" file (inside the same folder)
hello();