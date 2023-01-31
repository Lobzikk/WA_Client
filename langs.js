const fs=require("fs");
const english=fs.readFileSync('./langs/English.txt','utf-8');
const russian=fs.readFileSync('./langs/Russian.txt','utf-8');
module.exports.ru=russian.split("\n");
module.exports.en=english.split("\n");