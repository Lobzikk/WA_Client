const {app,BrowserWindow, inAppPurchase}=require("electron");
const path=require("path");
const createWindow = () => {
    const win = new BrowserWindow({
      width: 1024,
      height: 576,
      resizable: false,
      webPreferences:{
        preload:path.join(__dirname,'preload.js'),
        nodeIntegration: true,
        contextIsolation: true
      },
      title:'WA stealthy client'
    });
    win.loadFile('loadingScreen.html');
    setTimeout(()=>{
      win.loadFile('index.html');
    },10000)
  }
  app.disableHardwareAcceleration();
  app.whenReady().then(()=>{
    createWindow();
  })
  app.on('window-all-closed',()=>{
    if (process.platform!=="darwin") {
        app.quit()
    }
  });
