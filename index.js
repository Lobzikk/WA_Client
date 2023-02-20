<<<<<<< Updated upstream
require("dotenv").config();
console.log(`PID:${process.pid}`);//to kill the process if needed
const mysql2=require("mysql2");
const langs=require('./langs.js');
const {Client, LocalAuth}=require("whatsapp-web.js");
const qrcode=require("qrcode-terminal");
const shortFl=process.argv[2];
let phrases=langs.en;
if (process.argv[3]="ru") {
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
=======
const {app,BrowserWindow}=require("electron");
const path=require("path");
const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences:{
        preload:path.join(__dirname,'preload.js')
      }
    });
    win.loadFile('index.html')
  }
  app.whenReady().then(()=>{
    createWindow();
  })
  app.on('window-all-closed',()=>{
    if (process.platform!=="darwin") {
        app.quit()
>>>>>>> Stashed changes
    }
  });
  