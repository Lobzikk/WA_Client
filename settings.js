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
if (process.env.LANGUAGE=="ru") {
    phrases=langs.ruSettings;
}
if (consoleInput(phrases[0])=="Yes"){
    console.log(phrases[1]);
    console.log(fs.readFileSync("./langs/exampleTable.txt","utf-8"));
    for (let i = 2; i < phrases.slice(2,9).length; i++) {
        answers[i-2]=consoleInput(phrases[i]);
    }
}
for (let i = 0; i < phrases.slice(7).length; i++) {
    answers[i+5]=consoleInput(phrases[i+7]);
}
fs.writeFileSync('.env','');
for (let i = 0; i < params.length; i++){
    fs.appendFileSync('.env',`${params[i]}="${answers[i]}"\n`);
}