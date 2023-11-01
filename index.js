// file index.js by XNS-ivy
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require("@whiskeysockets/baileys");
const pino = require("pino");
const { Boom } = require("@hapi/boom");
const { handleMessages } = require('./src/handlingMessage');

async function connectWa() {
  const { state, saveCreds } = await useMultiFileAuthState('./session');
  const conn = makeWASocket({
    logger: pino({ level: 'silent' }),
    printQRInTerminal: true,
    auth: state,
    browser: ["Nyakura", "Firefox", '1.0.0'],
  });
  conn.ev.on('connection.update', ({ connection }) => {
    if (connection === "open") {
      console.log("Connected : " + conn.user.id.split(':')[0]);
    } 
    if (connection === "close") connectWa();
  });
  conn.ev.on('messages.upsert', ({ messages }) => {
    console.log(messages)
    if (messages && messages.length > 0) {
      const m = messages[0];
      if (m && m.message && m.message.conversation) {
        const lowMsg = m.message.conversation.toLowerCase();
        console.log("Get Message : " +lowMsg);
        handleMessages(conn, m);
      }
    }
  });
  conn.ev.on('creds.update', saveCreds);
  return conn;
}
connectWa();