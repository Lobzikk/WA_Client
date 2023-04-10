    /**
     * txtLog() allows to write messages of 2 types ('Error','Info') in log.txt file which you can read later
     * 
     * @param msgType type of the message ('Error' or 'Info' only!)
     * 
     * @param msgText text that you want to be written in log.txt file
     */
function txtLog(msgType,msgText) {
    const date=new Date();
    const fs=require('fs');
    if (!fs.existsSync('log.txt')) fs.writeFileSync('log.txt','');
    switch (msgType) {
        case 'Error':
            fs.appendFileSync('log.txt',`${date} || ERROR || ${msgText} || IN ${__filename} \n`);
            break;
        case 'Info':
            fs.appendFileSync('log.txt',`${date} || FROM ${__filename} || ${msgText} \n`);
            break;
        default:
            console.log('\x1b[33m','Please use only "Error" and "Info" message types');
            break;
    }
}
module.exports=txtLog;