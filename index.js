require("dotenv").config();
console.log(process.pid);//to kill the process if needed
const mysql2=require("mysql2");
const {Client, LocalAuth}=require("whatsapp-web.js");
const qrcode=require("qrcode-terminal");
const shortFl=process.argv[2];
const connection=mysql2.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    database:process.env.DATABASE,
    password:process.env.PASSWORD
});
connection.connect(function(err){
    if (err){
        return console.error(`Ошибка: ${err.message}`)
    }
    else {
        console.log("Подключение к БД успешно!");
    }
});
const client=new Client({
    authStrategy:new LocalAuth()
});
client.on("qr",qr=>{
    qrcode.generate(qr,{small:true})
});
client.on("ready",()=>{
    console.log("Клиент готов!");
    setInterval(() => { //Optional functionality
        client.setStatus(`Random number: ${Math.round( Math.random()*(1000))}`);
    }, 5000);
});
client.on("message",async msg=>{ //TODO: Make an english version
    if (shortFl=="short"){
        console.log(`${JSON.stringify((await msg.getChat()).name)},${JSON.stringify((await msg.getContact()).id.user)},${msg.body}`) //TODO: Display contact's name if it's not undefined
    }else{
    console.log(`Тело сообщения: ${msg.body}\n 
    Автор сообщения (телефон): ${JSON.stringify((await msg.getContact()).number)}\n
    Автор сообщения (контакт): ${JSON.stringify((await msg.getContact()).name)}\n
    Автор сообщения (id): ${JSON.stringify((await msg.getContact()).id)}\n
    Группа? ${JSON.stringify((await msg.getChat()).isGroup)}`);
    if ((await msg.getChat()).isGroup) {
        console.log(JSON.stringify(await msg.getChat().name))
    }}
    console.log("<—————————————————————————————————————————————————————————————————————————————————————>");
    let date_ob=new Date();
    connection.query(
        `INSERT INTO ${process.env.TABLE}(body,author,chname,whensent) VALUES(?, ?, ?, ?)`,
        [msg.body,JSON.stringify((await msg.getContact()).id.user),JSON.stringify((await msg.getChat()).name),`${date_ob.getFullYear()}-${('0' + (date_ob.getMonth() + 1)).slice(-2)}-${("0" + date_ob.getDate()).slice(-2)}`],
        function (err,results) {
            if (err){
                console.log(`Ошибка: ${err}`)
            }
            else {
                console.log("Данные добавлены");
            }
        }
    )
});
client.initialize();