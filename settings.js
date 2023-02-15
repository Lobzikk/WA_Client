const fs=require("fs");
const langs=require("./langs.js");
let phrases=langs.enSettings;
require("dotenv").config();
const lang="en"||process.env.LANGUAGE;
const params=['HOST','USER','DATABASE','PASSWORD','TABLE','LANGUAGE','FORM'];
const prompt=require("prompt-sync")({sigint:true});
function consoleInput(promptText) {
    console.log(promptText);
    let inputResult=prompt();
    return inputResult;
}
let answers=new Array(7);
if (lang=="ru") {
    phrases=langs.ruSettings;
}
if (consoleInput(phrases[0])=="Yes"){
    console.log(phrases[1]);
    console.log(fs.readFileSync("./langs/exampleTable.txt","utf-8"));
    for (let i = 2; i < phrases.slice(2,8).length; i++) {
        answers[i]=consoleInput(phrases[i]);
    }
}
for (let i = 8; i < phrases.slice(9).length; i++) {
    const element = array[i];
    
}
console.log(answers);
fs.writeFileSync('.env',`HOST="${answers[0]}"\nUSER="${answers[1]}"\nDATABASE="${answers[2]}"\nPASSWORD="${answers[3]}"\nTABLE="${answers[4]}"\nLANGUAGE="${answers[5]}"\nFORM="${answers[6]}"`)