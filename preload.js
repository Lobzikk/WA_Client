require('dotenv').config();
const nodeCMD=require('console');
const terminal=new nodeCMD.Console(process.stdout,process.stderr);
const techInfoFile=require('fs').readFileSync('package.json','utf-8');
const msgLog=require('./ErrLogging');
const mysql2=require("mysql2");
const langs=require('./langs.js');
const {Client, LocalAuth}=require("whatsapp-web.js");
const qrcode=require("qrcode-terminal");
let phrases=langs.en;
if (process.env.LANGUAGE=="ru") {
    phrases=langs.ru;
}
const client=new Client({authStrategy:new LocalAuth()});
client.on('qr',qr=>{
    qrcode.generate(qr,{small:true});
});
client.initialize();
const connection=mysql2.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    database:process.env.DATABASE,
    password:process.env.PASSWORD
});
window.addEventListener('DOMContentLoaded',()=>{
    client.on('auth_failure',(err)=>{
        document.getElementById('client-status').style.color="#e00";
        msgLog('Error',err);
        replaceText('client-status',phrases[11]);
    });
    client.on('disconnected',()=>{
        document.getElementById('client-status').style.color="#bebebe";
        msgLog('Info','Client disconnected');
        replaceText('client-status',phrases[14]);
    });
    client.on('ready',()=>{
        document.getElementById('client-status').style.color='#00e000';
        replaceText('client-status',phrases[10]);
        msgLog('Info','Client connected');
    });
    const msgBlock=document.getElementById('messages');
    client.on('message',async msg=>{
        let messageBlock=document.createElement('div');
        messageBlock.innerHTML=`<b>${(JSON.stringify((await msg.getChat()).name)).slice(1,-1)}</b>,${JSON.stringify((await msg.getContact()).id.user).slice(1,-1)}>${msg.body}<br>`;
        messageBlock.classList.add('message');
        msgBlock.appendChild(messageBlock);
        let date_ob=new Date();
        if (process.env.HOST!="undefined"){
            connection.query(
            `INSERT INTO ${process.env.TABLE}(body,phone_number,channel_name,date_received) VALUES(?, ?, ?, ?)`,
            [msg.body,JSON.stringify((await msg.getContact()).id.user),JSON.stringify((await msg.getChat()).name),`${date_ob.getFullYear()}-${('0' + (date_ob.getMonth() + 1)).slice(-2)}-${("0" + date_ob.getDate()).slice(-2)}`],
            function (err,results) {
                if (err){
                    msgLog('Error',err)
                }
                else {
                    msgLog('Info',phrases[8]);
                }
            }
        )}
    });
    const replaceText=(selector,text)=>{
        const element=document.getElementById(selector);
        if (element) {
            element.innerText=text
        }
    }
    for (const dependency of ['chrome','node','electron']) {
        replaceText(`${dependency}-version`,process.versions[dependency])
    }
    replaceText('client-version',techInfoFile.slice(techInfoFile.indexOf('"version":')+12,techInfoFile.indexOf('"version":')+17));
    replaceText('client-status',phrases[15]);

    connection.connect((err) => {
        if (err) {
            msgLog('Error', err);
            replaceText('mysql-status', phrases[11]);
            document.getElementById('mysql-status').style.color = '#e00';
        }
        else {
            msgLog('Info', phrases[1]);
            replaceText('mysql-status', phrases[10]);
        }
    });
    replaceText('mysql-status-text',phrases[9]);
    replaceText('client-status-text',phrases[13]);
    replaceText('software-info-text',phrases[12]);
});