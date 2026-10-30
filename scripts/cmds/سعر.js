
module.exports = {
  config: {
    name: "سعر",
    version: "1.0.0",
    author: "MARVEN RES",
    countDown: 3,
    role: 0,
    shortDescription: "استفسار عن أسعار المنتجات",
    description: "عرض سعر المنتج حسب الوزن مع صورته",
    category: "المتجر",
    guide: "{pn} 200غرام"
  },

  onStart: async function ({ message, args }) {
    const prices = {
      "200": {
        price:"  100الف",
        weight: "200 غرام"
      },
      "400": {
        price:" 150الف ",
        weight: "400 غرام"
      },
      "800": {
        price " 250الف",
        weight: "800 غرام"
      },
      "2000": {
        price: "750الف",
        weight: "2 كيلو"
      }
    };

    const text = args.join("").replace(/\s/g, "");
    const match = text.match(/(2000|200|400|800)/);

    if (!match || !prices[match[1]]) {
      return message.reply(
        "يرجى تحديد الوزن:\n200غرام\n400غرام\n800غرام\n2كيلو"
      );
    }

    const item = prices[match[1]];

    const imageUrl = "ضع_رابط_صورة_المنتج_هنا";

    const axios = require("axios");
    const response = await axios.get(imageUrl, {
      responseType: "stream"
    });

    return message.reply({
      body:
        "🛍️ معلومات المنتج\n\n" +
        "⚖️ الوزن: " + item.weight + "\n" +
        "💰 السعر: " + item.price,
      attachment: response.data
    });
  }
};
