// Handling All Message By XNS-ivy
const wikipedia = require('wikipedia-js');
const axios = require("axios");
const fs = require('fs');
const api = require('./apikey.json');
const config = require('./config.json');
const botReply = require('./reply.json');
const anyanime = require('anyanime');
const Jikan = require ('jikan-node');

async function handleMessages(Naori, m) {
if(!m.message) return;
  const msType = Object.keys(m.message)[0];
  
// handling ephemeral message

//

  const msText = msType === "conversation" ? m.message.conversation : msType === "extendedTextMessage" ? m.message.extendedTextMessage.text : msType === "imageMessage" ? m.message.imageMessage.caption : msType === "protocolMessage" ? "Deleted" : "";
// Chat Variables
const Menu = [
  '≡ ≡ ≡ ▷ MENU ◁ ≡ ≡ ≡',
  'Hi '+m.pushName+'\n Here is the following are the features of the Naori bot',
  '  「 Common Feature 」',
  '❏ Wikipedia',
  ' └─ .wikiid <query> // Wiki Bahasa Indonesia',
  ' └─ .wikien <query> // Wiki English Language',
  '  「 Fun Feature 」',
  '❏ .randomanime',
  '  「 Others Feature 」',
  '❏ .dmmlbb (Topup Diamond MLBB)',
  '► list 4\n\n'+botReply.Footer];
// ++
const mlbb = [
  '💎💎 MLBB Diamond Price List 💎💎',
  '✯ 💎 Diamond 💎 ✯',
  '◈ 14 DM(13 + 1 Bonus ) = Rp.5,000',
  '◈ 28 DM(26 + 2 Bonus ) = Rp.7,800',
  '◈ 44 DM(40 + 4 Bonus ) = Rp.12,000',
  '◈ 59 DM(53 + 6 Bonus ) = Rp.16,000',
  '◈ 86 DM(78 + 8 Bonus ) = Rp.23,000',
  '◈ 172 DM(154 + 16 Bonus ) = Rp.46,500',
  '◈ 240 DM(217 + 23 Bonus ) = Rp.66,000',
  '◈ 296 DM(256 + 40 Bonus ) = Rp.81,000',
  '◈ 408 DM(255 + 40 Bonus ) = Rp.110,000',
  '◈ 514 DM(468 + 46 Bonus ) = Rp.140,000',
  '◈ 878 DM(781 + 97 Bonus ) = Rp.232,000',
  '◈ 1159 DM(1031 + 128 Bonus ) = Rp.310,000',
  '◈ 3688 DM(3099 + 589 Bonus ) = Rp.890,000',
  '◈ 5532 DM(4649 + 883 Bonus ) = Rp.1,450,000',
  '✯ ✨ MLBB Membership ✨ ✯',
  '☆ Weekly Diamond Pass = Rp.28,000',
  '☆ Twilight Pass = Rp.142,000',
  '▷▷ Promo?? ◁◁',
  'Ask The Bot If There Promo Available',
'Note : Give Your Id And Server Id before paying',
'Screenshot your payment and send to the bot, so your diamond will be process fast'
  ];
// ---------------------
  
  await listener(Naori, m);
  async function reply(text) {
    await Naori.sendMessage(m.key.remoteJid, { text: text },
    { quoted: m});
  }

  async function listener(Naori, m){
    const profile = m.pushName;
    const msg = msText;
    const messageInfo = `Message: ${msg}`;
    const isGroup = m.key.participant;
    const groupId = isGroup ? m.key.participant : false;
    
    const colorize = (text, ColorCode) => `\x1b[${ColorCode}m${text}\x1b[0m`;

    console.log(
        colorize("［ Get Message ］", 34), '\n',
        colorize("『 From:", 33), profile, '\n',
        colorize("『 On Group Number:", 36), groupId, '\n',
        colorize("『 Message:", 32), msg, '\n',
        colorize("  ↳ Message Type:", 31), msType, '\n'
    );
}

const mmc = msText.toLowerCase();
if(mmc.startsWith('.')){
  const [command, ...args] = mmc.substring(1).split(' ');
  
switch (command){
  case "menu":
    const id = m.key.remoteJid;
    const formattedMenu = Menu.join('\n\n');
  Naori.sendMessage(id,{image:{
   url: "./src/naori.jpg"
  },
    mimeType: "image/jpeg",
    caption: formattedMenu,
  },{quoted: m});
    
  break;
  case "wikiid":
  case "wikien":
  const searchTerm = args.join(' ').trim();
  try {
    const response = await axios.get(`https://${command === "wikien" ? "en" : "id"}.wikipedia.org/w/api.php`, {
    params: {
    format: 'json',
    action: 'query',
    prop: 'extracts',
    exintro: true,
    explaintext: true,
    redirects: 1,
    titles: searchTerm
    }
    });
    const pages = response.data.query.pages;
    const pageId = Object.keys(pages)[0];
    extract = pages[pageId].extract;

    if (extract) {
      await reply(extract);
    } else {
    await reply(`Maaf, artikel "${searchTerm}" tidak memiliki konten.\n\n`+botReply.Footer);
    }
      } catch (error) {
    console.error(error);
    await reply('Terjadi kesalahan saat mencari artikel.\n\n'+botReply.Footer);
    }
  break;
  case "randomanime":
  try {
    const animeResult = await anyanime.getAnime({ type: "png", number: 1 });
    const animeImageUrl = animeResult[0];
    await Naori.sendMessage(m.key.remoteJid, { image: { url: animeImageUrl } }, { quoted: m });
    } catch (error) {
    console.error('Error fetching anime image:', error);
    await reply('Terjadi kesalahan saat mencari gambar anime.\n\n' + botReply.Footer);
    }
  break;
  case "dmmlbb":
    const formattedMLBB = mlbb.join('\n\n');
    reply(formattedMLBB);
    break;
  case "owner":
    await reply("Berikut Adalah Owner Saya <3\n"+"https://github.com/XNS-ivy\n"+
    "Nama: "+config.ownerName);
    break;
  default:
    break;
    }
  }
}
module.exports = { handleMessages };