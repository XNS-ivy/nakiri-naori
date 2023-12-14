const {default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const pino = require("pino");
const { handleMessages } = require("./src/handlingMessage");
const useCd = process.argv.includes("--code");
const Boom = require('@hapi/boom');
// --------------------
const SESSION_FILE_PATH = "./session";
const PHONE_NUMBER_PROMPT_DELAY = 3000;

async function start() {
  try {
  const { state, saveCreds } = await useMultiFileAuthState(SESSION_FILE_PATH);
  
  const Naori = makeWASocket({
    logger: pino({ level: "silent" }),
    printQRInTerminal: !useCd, 
    auth: state,
    browser: useCd ? ["Chrome (Linux)", "", ""] : ["Naori", "Firefox", '1.0.0'],
    generateHighQualityLinkPreview: true,
  });

  if (useCd && !Naori.authState.creds.registered) {
    const question = () => new Promise((resolve) => {
      const readLine = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      readLine.question("Input Your Whatsapp Phone Number: +", (answer) => {
        resolve(answer);
        readLine.close();
      });
    });

    const phoneNumber = await question();
  setTimeout(async () => {
  const codePair = await Naori.requestPairingCode(phoneNumber);
  console.log("Connect With Pairing Code : " + codePair);
}, PHONE_NUMBER_PROMPT_DELAY);
  }
const handleConnectionUpdate = async ({ connection }) => {
    if (connection === "open") {
    console.log("Connected: " + Naori.user.id.split(":")[0]);
  } else if (connection === "close") {
    try {
      await start();
    } catch (error) {
      throw Boom.badImplementation('Error: ', error);
      }
    }
  };
  
  Naori.ev.on('connection.update', handleConnectionUpdate);
  Naori.ev.on('creds.update', saveCreds);
  
  Naori.ev.on('messages.upsert', ({ messages }) => {
    if (messages && messages.length > 0) {
      const m = messages[0];
      // console.log(m);
      handleMessages(Naori, m);
    }
  });
} catch (error){
  console.error('Error in start function:', error);
  }
}
start();

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});