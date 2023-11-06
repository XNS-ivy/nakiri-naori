const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const pino = require("pino");
const { handleMessages } = require('./src/handlingMessage');

async function start() {
  const { state, saveCreds } = await useMultiFileAuthState('./session');
  const Naori = makeWASocket({
    logger: pino({ level: 'silent' }),
    printQRInTerminal: true,
    auth: state,
    browser: ["Nyakura", "Firefox", '1.0.0'],
  });

  Naori.ev.on('connection.update', ({ connection }) => {
    if (connection === "open") {
      console.log("Connected: " + Naori.user.jid);
    } else if (connection === "close") {
      console.log("Disconnected");
      Naori.start();
    }
  });

  Naori.ev.on('messages.upsert', ({ messages }) => {
    if (messages && messages.length > 0) {
      const m = messages[0];
      if (m && m.message && m.message.conversation) {
        handleMessages(Naori, m);
      }
    }
  });

  Naori.ev.on('creds.update', saveCreds);
}

start();