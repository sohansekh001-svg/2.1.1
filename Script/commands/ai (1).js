const axios = require("axios");

module.exports.config = {
  name: "ai",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Sohan Ahmed",
  description: "AI chat command (ChatGPT style)",
  commandCategory: "ai",
  usages: "ai [your question]",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
  const text = args.join(" ");

  if (!text) {
    return api.sendMessage("❌ দয়া করে কিছু লিখো!\nউদাহরণ: ai তুমি কে?", event.threadID, event.messageID);
  }

  api.sendMessage("🤖 AI ভাবছে...", event.threadID, event.messageID);

  try {
    const res = await axios.get(
      `https://api.popcat.xyz/chatbot?msg=${encodeURIComponent(text)}&owner=Sohan&botname=MiraBot`
    );

    const reply = res.data.response;

    return api.sendMessage(`🤖 Mira AI:\n\n${reply}`, event.threadID, event.messageID);

  } catch (err) {
    return api.sendMessage("❌ AI কাজ করছে না, পরে চেষ্টা করো!", event.threadID, event.messageID);
  }
};
