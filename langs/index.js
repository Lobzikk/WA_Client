const fs=require("fs");
const path=require("path");
const english=fs.readFileSync(path.resolve(__dirname+'English.txt'),'utf-8');
const russian=fs.readFileSync(path.resolve(__dirname+'Russian.txt'),'utf-8');
module.exports.ru=russian.split("\n");
module.exports.en=english.split("\n");