module.exports.config = {
 name: "sohan",
 version: "1.0.0",
 hasPermssion: 2,
 credits: "Sohan Ahmed",
 description: "মেনশন করলে জানাবে",
 commandCategory: "group",
 usages: "[@মেনশন]",
 cooldowns: 5,
 dependencies: {
 "fs-extra": "",
 "axios": ""
 }
};

module.exports.run = async function ({ api, event, args }) {
 try {
 if (Object.keys(event.mentions).length === 0) {
 return api.sendMessage("আপনি কাকে শুভেচ্ছা জানাতে চান এমন একজন কে মেনশন করুন!😘", event.threadID);
 }

 const mention = Object.keys(event.mentions)[0];
 const name = event.mentions[mention].replace("@", "");
 const arraytag = [{ id: mention, tag: name }];

 const sendMessage = (msg) => {
 api.sendMessage({ body: msg, mentions: arraytag }, event.threadID);
 };

 
 sendMessage(`বস শাহাদাৎ সাহু'র পক্ষ থেকে তোমাকে জন্মদিনের শুভেচ্ছা, @${name}!\n🎉HAPPY BIRTHDAY🎉`);
 const messages = [
 { delay: 3000, msg: `সোহান আমার জান উম্মাহ😒@${name}` },
 { delay: 6000, msg: ` তোরা কেউ নজর দিবি না আমার সোহান বাবু রে🫦🌚 @${name}` },
 { delay: 10000, msg: ` সোহান কে দাখতে হলে 100 নাম্বারে  কল কর 🫦🤬@${name}` },
 { delay: 14000, msg: ` বাবু তুমি ওনেক অনেক কিউট @${name}` },
 { delay: 18000, msg: `সোহান নাম বলেছোস ঠিক আছে ওর দিকে নজর দিবি না 🤬🤬 @${name}` },
 { delay: 22000, msg: `তুমি সোহান সোহান করো কেন @${name}` },
 { delay: 26000, msg: `সোহান সোহান  না করে ইনবক্স যা আমার বাবুর এই যাবি না 🤬🤬@${name}` },
 { delay: 30000, msg: `ওই ওই চুপ` },
 { delay: 34000, msg: `পাগল নাকি বস বল বস🐸 @${name}` },

 ];

 messages.forEach(({delay, msg}) => {
 setTimeout(() => sendMessage(msg), delay);
 });

 } catch (error) {
 console.error(error);
 api.sendMessage("বার্তা পাঠাতে সমস্যা হয়েছে!\nদয়া করে আবার চেষ্টা করুন!", event.threadID);
 }
};
