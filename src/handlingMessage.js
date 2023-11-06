// Habdling All Message By XNS-ivy
const wikipedia = require('wikipedia-js');
const axios = require("axios");
const fs = require('fs');

async function handleMessages(Naori, m) {
  async function reply(text) {
    await Naori.sendMessage(m.key.remoteJid, { text: text });
  }
const mmc = m.message.conversation.toLowerCase();

if (mmc.startsWith('.wiki')){
  const searchTerm = mmc.substring(6).trim();
    const options = { language: 'id' };
    try {
      const response = await axios.get(`https://en.wikipedia.org/w/api.php`, {
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
      const extract = pages[pageId].extract;

      if (extract) {
        await reply(extract);
      } else {
        await reply("Maaf, artikel "+mmc.substring(6)+ " tidak ditemukan.");
      }
    } catch (error) {
      console.error(error);
      await reply("Terjadi kesalahan saat mencari artikel.");
    }
}

switch (mmc){
  case ".menu":
    console.log(m);
    await reply(
        "» » » Demo Menu « « «\n" +
        "► .dmmlbb (Topup Diamond MLBB)\n" +
        "► .wiki (query)\n" +
        "► list 3\n" +
        "► list 4\n" +
        "» N A O R I - B O T «");
    break;
  case ".dmmlbb":
    console.log(m);
  await reply("» List Harga Diamond MLBB 💎\n\n"+
  "» 14 DM(13 + 1 Bonus ) = Rp.5,000\n\n"+
  "» 28 DM(26 + 2 Bonus ) = Rp.7,800\n\n"+
  "» 44 DM(40 + 4 Bonus ) = Rp.12,000\n\n"+
  "» 59 DM(53 + 6 Bonus ) = Rp.16,000\n\n"+
  "» 86 DM(78 + 8 Bonus ) = Rp.23,000\n\n"+
  "» 172 DM(154 + 16 Bonus ) = Rp.46,500\n\n"+
  "» 240 DM(217 + 23 Bonus ) = Rp.66,000\n\n"+
  "» 296 DM(256 + 40 Bonus ) = Rp.81,000\n\n"+
  "» 408 DM(255 + 40 Bonus ) = Rp.110,000\n\n"+
  "» 514 DM(468 + 46 Bonus ) = Rp.140,000\n\n"+
  "» 878 DM(781 + 97 Bonus ) = Rp.232,000\n\n"+
  "» Weekly Diamond Pass = Rp.28,500\n\n" +
  "» Weekly Diamond Pass 2x = Rp.57,500\n\n" +
  "» Weekly Diamond Pass 3x = Rp.86,500\n\n" +
  "» Weekly Diamond Pass 5x = Rp.146,000\n\n" +
  "» Twilight Member Pass = Rp.130,000\n\n" +
  "» Bonus Tidak Dihitung Event Topup!!\n\n"+
  "» Silahkan Kirim Id Dan Id Server Jika Ingin Topup!\n\n"+
  "» N A O R I - B O T «");
    break;
  default:
  console.log(m);
    break;
}
}

module.exports = { handleMessages };