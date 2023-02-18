require("dotenv").config();
console.log(`PID:${process.pid}`);//to kill the process if needed
const mysql2=require("mysql2");
const langs=require('./langs.js');
const {Client, LocalAuth}=require("whatsapp-web.js");
const qrcode=require("qrcode-terminal");
let phrases=langs.en;
if (process.env.LANGUAGE="ru") {
    phrases=langs.ru;
}
const connection=mysql2.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    database:process.env.DATABASE,
    password:process.env.PASSWORD
});
connection.connect(function(err){
    if (err){
        return console.error(`${phrases[0]} ${err.message}`)
    }
    else {
        console.log(phrases[1]);
    }
});
const client=new Client({
    authStrategy:new LocalAuth()
});
client.on("qr",qr=>{
    qrcode.generate(qr,{small:true})
});
client.on("ready",()=>{
    console.log(phrases[2]);
    setInterval(() => { //Optional functionality
        client.setStatus(`Random number: ${Math.round( Math.random()*(1000))}`);
    }, 5000);
});
client.on("message",async msg=>{
    if (process.env.FORM=="short"){
        console.log(`${JSON.stringify((await msg.getChat()).name)},${JSON.stringify((await msg.getContact()).id.user)},${msg.body}`) //TODO: Display contact's name if it's not undefined
    }else{
    console.log(`${phrases[3]} ${msg.body}\n 
    ${phrases[4]} ${JSON.stringify((await msg.getContact()).number)}\n
    ${phrases[5]} ${JSON.stringify((await msg.getContact()).name)}\n
    ${phrases[6]} ${JSON.stringify((await msg.getContact()).id)}\n
    ${phrases[7]} ${JSON.stringify((await msg.getChat()).isGroup)}`);
    if ((await msg.getChat()).isGroup) {
        console.log(JSON.stringify(await msg.getChat().name))
    }}
    console.log("<—————————————————————————————————————————————————————————————————————————————————————>");
    let date_ob=new Date();
    if (process.env.HOST!="undefined"){
        connection.query(
        `INSERT INTO ${process.env.TABLE}(body,phone_number,channel_name,date_received) VALUES(?, ?, ?, ?)`,
        [msg.body,JSON.stringify((await msg.getContact()).id.user),JSON.stringify((await msg.getChat()).name),`${date_ob.getFullYear()}-${('0' + (date_ob.getMonth() + 1)).slice(-2)}-${("0" + date_ob.getDate()).slice(-2)}`],
        function (err,results) {
            if (err){
                console.log(`${phrases[0]} ${err}`)
            }
            else {
                console.log(phrases[8]);
            }
        }
    )}
});
client.initialize();