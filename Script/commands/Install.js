const axios = require("axios");
const fs = require('fs');
const path = require("path");
const vm = require('vm');

module.exports.config = {
  name: "install",
  version: "1.3.0",
  hasPermission: 0x2,
  credits: "乛 M𝆠፝֟R ཐི༏ཋྀ JU𝆠፝֟W𝆠፝֟ELꜛཐི༏ཋྀ࿐",
  usePrefix: true,
  description: "Create a new JS file and safely auto-reload it (overwrite if exists).",
  commandCategory: "utility",
  usages: "[file name] [link/code]",
  cooldowns: 0x5
};

module.exports.run = async ({ message, args, api, event }) => {
  try {
    const fileName = args[0];
    const codeInput = args.slice(1).join(" ");

    if (!fileName || !codeInput) {
      return api.sendMessage("⚠️ দয়া করে একটি বৈধ ফাইল নাম এবং কোড বা লিঙ্ক দিন!", event.threadID, event.messageID);
    }

    if (fileName.includes('..') || path.isAbsolute(fileName)) {
      return api.sendMessage("❌ অবৈধ ফাইল নাম!", event.threadID, event.messageID);
    }

    if (!fileName.endsWith(".js")) {
      return api.sendMessage("⚠️ শুধুমাত্র .js ফাইল অনুমোদিত!", event.threadID, event.messageID);
    }

    let codeContent;
    const linkRegex = /^(http|https):\/\/[^ "]+$/;

    if (linkRegex.test(codeInput)) {
      if (!codeInput.startsWith("https://trustedsource.com/")) {
        return api.sendMessage("❌ অনুমোদিত উৎস ব্যতীত কোড ডাউনলোড করা যাবে না!", event.threadID, event.messageID);
      }
      const response = await axios.get(codeInput);
      codeContent = response.data;
    } else {
      codeContent = codeInput;
    }

    // সিনট্যাক্স চেক
    try { new vm.Script(codeContent); } 
    catch (err) {
      return api.sendMessage("❌ কোডে সিনট্যাক্স ত্রুটি: " + err.message, event.threadID, event.messageID);
    }

    const filePath = path.join(__dirname, fileName);

    // **ফাইল ওভাররাইট**
    fs.writeFileSync(filePath, codeContent, "utf-8");

    // **সেফ রিলোড ফাংশন**
    const safeReload = (path) => {
      try {
        delete require.cache[require.resolve(path)];
        require(path);
        return true;
      } catch (err) {
        console.error("Reload Error:", err);
        return false;
      }
    };

    const reloaded = safeReload(filePath);

    if (reloaded) {
      api.sendMessage("✅ সফলভাবে ফাইল তৈরি এবং রিলোড হয়েছে: " + filePath, event.threadID, event.messageID);
    } else {
      api.sendMessage("⚠️ ফাইল তৈরি হয়েছে কিন্তু রিলোড করতে সমস্যা হয়েছে।", event.threadID, event.messageID);
    }

  } catch (err) {
    console.error("Error:", err);
    api.sendMessage("❌ ফাইল তৈরি করতে একটি সমস্যা হয়েছে!", event.threadID, event.messageID);
  }
};
