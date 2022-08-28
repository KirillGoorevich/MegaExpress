const { Card } = require("../Routes/Cards/cardModel");
const User = require("../Routes/Users/userModel");
const chalk = require("chalk");
const { generateHashPassword } = require("../services/bcrypt");

const data = {
  users: [
    {
      name: "User",
      email: "user@gmail.com",
      password: "123456Aa!",
      biz: false,
      phone: "052-1234567",
      _id : "621f3f27dde069e62aa3bcaa",
    },
    {
      name: "Seller",
      email: "seller@gmail.com",
      password: "123456Aa!",
      biz: true,
      isAdmin: false,
      phone: "02 12345678",
      _id : "621f3f27dde069e62aa3bcab",
    },
    {
      name: "Admin",
      email: "admin@gmail.com",
      password: "123456Aa!",
      biz: true,
      isAdmin: true,
      phone: "05287654321",
      _id : "621f3f27dde069e62aa3bcac",
    },
  ],
  cards: [
    {
      _id : "621f3f27dde069e62aa3bcad",
      name: "10g Party DIY Fluorescent Super luminous Particles Glow Pigment Bright Gravel Noctilucent Sand Glowing in the Dark Sand Powder",
      description: "These are glowing particles",
      image: {
        url: "https://ae01.alicdn.com/kf/H81572820268f4d3c8d2a84d092c9b1a1Y/10g-Party-DIY-Fluorescent-Super-luminous-Particles-Glow-Pigment-Bright-Gravel-Noctilucent-Sand-Glowing-in-the.jpg_Q90.jpg_.webp",
        alt: "A blue glowing jar",
      },
      sellerId: "621f3f27dde069e62aa3bcac",
      user_id: "621f3f27dde069e62aa3bcac",
      category: "tools",
      subcategory: "sets",
      bizNumber: "0000000",
      bizName: "MegaExpress",
      sold: 0,
      price: 0.94,
      ship: 0.95,
      returnfree : "no",
      likes: [],
      numFeatures: 0,
      feature1: "",
      feature2: "",
      feature2price: null,
      feature3: "",
      feature3price: null,
      feature4: "",
      feature4price: null,
      feature5: "",
      feature5price: null,
      numColors: 5,
      color1: "Blue",
      color2: "Purple",
      image2: {
        url: "https://ae01.alicdn.com/kf/Hccecb56ce6bd4f6fa3cbb0ca24b0ca80R/10g-Party-DIY-Fluorescent-Super-luminous-Particles-Glow-Pigment-Bright-Gravel-Noctilucent-Sand-Glowing-in-the.jpg_640x640.jpg",
        alt: "Purple particles",
      },
      color3: "Peach",
      image3: {
        url: "https://ae01.alicdn.com/kf/H3e021e21374b495dbba12b2f0e952d6bY/10g-Party-DIY-Fluorescent-Super-luminous-Particles-Glow-Pigment-Bright-Gravel-Noctilucent-Sand-Glowing-in-the.jpg_640x640.jpg",
        alt: "Peach particles",
      },
      color4: "Orange",
      image4: {
        url: "https://ae01.alicdn.com/kf/H002b867c93a444ccb65d83f5540870c0N/10g-Party-DIY-Fluorescent-Super-luminous-Particles-Glow-Pigment-Bright-Gravel-Noctilucent-Sand-Glowing-in-the.jpg_640x640.jpg",
        alt: "Orange particles",
      },
      color5: "Yellow",
      image5: {
        url: "https://ae01.alicdn.com/kf/H0c96d414b5bd4c0e869353be59c60f76n/10g-Party-DIY-Fluorescent-Super-luminous-Particles-Glow-Pigment-Bright-Gravel-Noctilucent-Sand-Glowing-in-the.jpg_640x640.jpg",
        alt: "Yellow particles",
      },
      quantity: 8456,
      cart: [],
    },
    {
      _id : "621f3f27dde069e62aa3bcae",
      name: "Kuzuwata 2022 Summer New Chinese Style Vestido Round Neck Pleated Print Slim Waist Dress Fresh Sweert Flying Sleeve Femme Robe",
      description: " It's a dress",
      image: {
        url: "https://ae01.alicdn.com/kf/S32826d68dd5244d8b4e9bfa25f8da39d9/Kuzuwata-2022-Summer-New-Chinese-Style-Vestido-Round-Neck-Pleated-Print-Slim-Waist-Dress-Fresh-Sweert.jpg_Q90.jpg_.webp",
        alt: "A dress",
      },
      sellerId: "621f3f27dde069e62aa3bcac",
      user_id: "621f3f27dde069e62aa3bcac",
      category: "women",
      subcategory: "dresses",
      bizNumber: "0000000",
      bizName: "MegaExpress",
      sold: 0,
      price: 45.32,
      ship: 0,
      returnfree : "yes",
      likes: [],
      numFeatures: 3,
      feature1: "L",
      feature2: "M",
      feature2price: 45.32,
      feature3: "S",
      feature3price: 45.32,
      feature4: "",
      feature4price: null,
      feature5: "",
      feature5price: null,
      numColors: 3,
      color1: "Blue",
      color2: "Pink",
      image2: {
        url: "https://ae01.alicdn.com/kf/S6680c19395cd46b6b5b0ffd74683cf7aq/Kuzuwata-2022-Summer-New-Chinese-Style-Vestido-Round-Neck-Pleated-Print-Slim-Waist-Dress-Fresh-Sweert.jpg_640x640.jpg",
        alt: "Pic Of Product",
      },
      color3: "Cofee",
      image3: {
        url: "https://ae01.alicdn.com/kf/Sb4f295733c7746be836d9faeab2b85b7a/Kuzuwata-2022-Summer-New-Chinese-Style-Vestido-Round-Neck-Pleated-Print-Slim-Waist-Dress-Fresh-Sweert.jpg_640x640.jpg",
        alt: "Pic Of Product",
      },
      color4: "",
      image4: {
        url: "https://www.arraymedical.com/wp-content/uploads/2018/12/product-image-placeholder.jpg",
        alt: "Pic Of Product",
      },
      color5: "",
      image5: {
        url: "https://www.arraymedical.com/wp-content/uploads/2018/12/product-image-placeholder.jpg",
        alt: "Pic Of Product",
      },
      quantity: 99999,
      cart: [],
    },
    {
      _id : "621f3f27dde069e62aa3bcaf",
      name: "Disney 28cm Pvc Yoda Figure Grogu Plush Action Figure Toys Yoda Baby Star Wars The Mandalorian Anime Dolls Gifts Children Toys",
      description: " PLUSH YODA BABY DOLL Product material: PVC Product height: 28cm Application: suitable for micro landscape ornaments / cream mobile phone shell ornaments / car ornaments / household ornaments, etc",
      image: {
        url: "https://ae01.alicdn.com/kf/H52ea32d6d77d412bbfd0ade0fbbaf3766/Disney-28cm-Pvc-Yoda-Figure-Grogu-Plush-Action-Figure-Toys-Yoda-Baby-Star-Wars-The-Mandalorian.jpg_Q90.jpg_.webp",
        alt: "Figure Toys Yoda",
      },
      sellerId: "621f3f27dde069e62aa3bcac",
      user_id: "621f3f27dde069e62aa3bcac",
      category: "toys",
      subcategory: "child-shoes",
      bizNumber: "0000000",
      bizName: "MegaExpress",
      sold: 0,
      price: 35.30,
      ship: 0,
      returnfree : "yes",
      likes: [],
      numFeatures: 0,
      feature1: "",
      feature2: "",
      feature2price: null,
      feature3: "",
      feature3price: null,
      feature4: "",
      feature4price: null,
      feature5: "",
      feature5price: null,
      numColors: 0,
      color1: "",
      color2: "",
      image2: {
        url: "https://www.arraymedical.com/wp-content/uploads/2018/12/product-image-placeholder.jpg",
        alt: "Pic Of Product",
      },
      color3: "",
      image3: {
        url: "https://www.arraymedical.com/wp-content/uploads/2018/12/product-image-placeholder.jpg",
        alt: "Pic Of Product",
      },
      color4: "",
      image4: {
        url: "https://www.arraymedical.com/wp-content/uploads/2018/12/product-image-placeholder.jpg",
        alt: "Pic Of Product",
      },
      color5: "",
      image5: {
        url: "https://www.arraymedical.com/wp-content/uploads/2018/12/product-image-placeholder.jpg",
        alt: "Pic Of Product",
      },
      quantity: 3,
      cart: [],
    },
    {
      _id : "621f3f27dde069e62aa3bcba",
      name: "RGB 5050 Led Strip Light Bluetooth App Control 5V USB Led Tape Flexible Ribbon Diode Tape for TV Backlight Room Decoration",
      description: "Led Strip Light",
      image: {
        url: "https://ae01.alicdn.com/kf/He5d8ffe287cd40e18340f2b72110c68bf/RGB-5050-Led-Strip-Light-Bluetooth-App-Control-5V-USB-Led-Tape-Flexible-Ribbon-Diode-Tape.jpg_Q90.jpg_.webp",
        alt: "Led Strip Light on Tv",
      },
      sellerId: "621f3f27dde069e62aa3bcac",
      user_id: "621f3f27dde069e62aa3bcac",
      category: "electronic",
      subcategory: "accessories",
      bizNumber: "0000000",
      bizName: "MegaExpress",
      sold: 0,
      price: 4.03,
      ship: 0,
      returnfree : "yes",
      likes: [],
      numFeatures: 5,
      feature1: "0.5m",
      feature2: "1m",
      feature2price: 4.27,
      feature3: "2m",
      feature3price: 4.76,
      feature4: "3m",
      feature4price: 5.15,
      feature5: "5m",
      feature5price: 5.93,
      numColors: 0,
      color1: "",
      color2: "",
      image2: {
        url: "https://www.arraymedical.com/wp-content/uploads/2018/12/product-image-placeholder.jpg",
        alt: "Pic Of Product",
      },
      color3: "",
      image3: {
        url: "https://www.arraymedical.com/wp-content/uploads/2018/12/product-image-placeholder.jpg",
        alt: "Pic Of Product",
      },
      color4: "",
      image4: {
        url: "https://www.arraymedical.com/wp-content/uploads/2018/12/product-image-placeholder.jpg",
        alt: "Pic Of Product",
      },
      color5: "",
      image5: {
        url: "https://www.arraymedical.com/wp-content/uploads/2018/12/product-image-placeholder.jpg",
        alt: "Pic Of Product",
      },
      quantity: 75,
      cart: [],
    },
    {
      _id : "621f3f27dde069e62aa3bcbb",
      name: "Magic Light Ball USB Voice Controlled Electrostatic Ball Plasma Magic Small Night Lighting Ball Light Touch Electrostatic Ball",
      description: "When this ions sphere works, a field similar to a point charge is formed around this electrode in this center of this sphere. When you touch this ball with your hand (people are connected with this earth), this distribution of electric field and potential around this ball is no longer uniform and symmetrical, so this glow becomes brighter around this finger, and this generated arc moves and s along this touch of your hand, dancing with this movement of your finger.",
      image: {
        url: "https://ae01.alicdn.com/kf/Sb251aea78d05454ab9858756d229bfb2B/Magic-Light-Ball-USB-Voice-Controlled-Electrostatic-Ball-Plasma-Magic-Small-Night-Lighting-Ball-Light-Touch.jpg_Q90.jpg",
        alt: "Plasma Ball",
      },
      sellerId: "621f3f27dde069e62aa3bcac",
      user_id: "621f3f27dde069e62aa3bcac",
      category: "electronic",
      subcategory: "accessories",
      bizNumber: "0000000",
      bizName: "MegaExpress",
      sold: 0,
      price: 3.12,
      ship: 8.69,
      returnfree : "yes",
      likes: [],
      numFeatures: 2,
      feature1: "3.5 Inch",
      feature2: "4 Inch",
      feature2price: 3.34,
      feature3: "",
      feature3price: null,
      feature4: "",
      feature4price: null,
      feature5: "",
      feature5price: null,
      numColors: 0,
      color1: "",
      color2: "",
      image2: {
        url: "https://www.arraymedical.com/wp-content/uploads/2018/12/product-image-placeholder.jpg",
        alt: "Pic Of Product",
      },
      color3: "",
      image3: {
        url: "https://www.arraymedical.com/wp-content/uploads/2018/12/product-image-placeholder.jpg",
        alt: "Pic Of Product",
      },
      color4: "",
      image4: {
        url: "https://www.arraymedical.com/wp-content/uploads/2018/12/product-image-placeholder.jpg",
        alt: "Pic Of Product",
      },
      color5: "",
      image5: {
        url: "https://www.arraymedical.com/wp-content/uploads/2018/12/product-image-placeholder.jpg",
        alt: "Pic Of Product",
      },
      quantity: 200,
      cart: [],
    },
    {
      _id : "621f3f27dde069e62aa3bcbc",
      name: "Portable 319 2.4Ghz Wireless Mouse Adjustable 1200DPI Optical Gaming Mouse Wireless Home Office Game Mice for PC Computer Laptop",
      description: "4 buttons: Left click button, right click button, middle wheel scrool and DPI button. The fast wireless mouse is rated at 1200 DPI, which allows for precise, quick, and smooth movement. This cordless mouse provides an ergonomic and ambidextrous design that specializes in a higher arch for maximum comfort. Easy to install: Intelligent connectivity, no need to code, insert & play. Can joint with the mouse pad better,move smoothly and positioning accuracy. Advanced 2.4GHz Wireless - Stable connection, precise track, fast data transmission speed. Up to 30ft / 10m working distance, eliminates delays, dropouts and interference.",
      image: {
        url: "https://ae01.alicdn.com/kf/Hc0241b1be2d341dfa1820b970da00df7u/Portable-319-2-4Ghz-Wireless-Mouse-Adjustable-1200DPI-Optical-Gaming-Mouse-Wireless-Home-Office-Game-Mice.jpg_640x640.jpg",
        alt: "Red Mouse",
      },
      sellerId: "621f3f27dde069e62aa3bcac",
      user_id: "621f3f27dde069e62aa3bcac",
      category: "office",
      subcategory: "mice",
      bizNumber: "0000000",
      bizName: "MegaExpress",
      sold: 0,
      price: 2.68,
      ship: 1.13,
      returnfree : "yes",
      likes: [],
      numFeatures: 0,
      feature1: "",
      feature2: "",
      feature2price: null,
      feature3: "",
      feature3price: null,
      feature4: "",
      feature4price: null,
      feature5: "",
      feature5price: null,
      numColors: 5,
      color1: "Red",
      color2: "Green",
      image2: {
        url: "https://ae01.alicdn.com/kf/Hfa8df64cb420431a90796f3e1fe76b46b/Portable-319-2-4Ghz-Wireless-Mouse-Adjustable-1200DPI-Optical-Gaming-Mouse-Wireless-Home-Office-Game-Mice.jpg_640x640.jpg",
        alt: "Green Mouse",
      },
      color3: "Yellow",
      image3: {
        url: "https://ae01.alicdn.com/kf/H6da454a5bf184c7ebe0c5f9d48a41c3fA/Portable-319-2-4Ghz-Wireless-Mouse-Adjustable-1200DPI-Optical-Gaming-Mouse-Wireless-Home-Office-Game-Mice.jpg_640x640.jpg",
        alt: "Yellow Mouse",
      },
      color4: "Blue",
      image4: {
        url: "https://ae01.alicdn.com/kf/Hbe4946a9ff4d4583a41b64c07d7edbc3Y/Portable-319-2-4Ghz-Wireless-Mouse-Adjustable-1200DPI-Optical-Gaming-Mouse-Wireless-Home-Office-Game-Mice.jpg_640x640.jpg",
        alt: "Blue Mouse",
      },
      color5: "Grey",
      image5: {
        url: "https://ae01.alicdn.com/kf/Hf5b9de556c304bf3a6d02b68dcc916f90/Portable-319-2-4Ghz-Wireless-Mouse-Adjustable-1200DPI-Optical-Gaming-Mouse-Wireless-Home-Office-Game-Mice.jpg_640x640.jpg",
        alt: "Grey Mouse",
      },
      quantity: 1530,
      cart: [],
    },
    {
      _id : "621f3f27dde069e62aa3bcbd",
      name: "2021 New Colorful Flame Hoodie 3d Fluorescence Sweatshirt Men/Women Autumn And Winter Coat Clothing funny Jacket black Hoodies",
      description: "It's a hoodie.",
      image: {
        url: "https://ae01.alicdn.com/kf/H5d04a2a38f9b4de88321015ab37513e08/2021-New-Colorful-Flame-Hoodie-3d-Fluorescence-Sweatshirt-Men-Women-Autumn-And-Winter-Coat-Clothing-funny.jpg_Q90.jpg",
        alt: "Flame Hoodie",
      },
      sellerId: "621f3f27dde069e62aa3bcab",
      user_id: "621f3f27dde069e62aa3bcab",
      category: "men",
      subcategory: "hoodies",
      bizNumber: "0000000",
      bizName: "Seller",
      sold: 0,
      price: 3.06,
      ship: 12.38,
      returnfree : "yes",
      likes: [],
      numFeatures: 5,
      feature1: "XS",
      feature2: "Small",
      feature2price: 3.06,
      feature3: "Medium",
      feature3price: 3.06,
      feature4: "Large",
      feature4price: 3.06,
      feature5: "XL",
      feature5price: 3.06,
      numColors: 3,
      color1: "117",
      color2: "119",
      image2: {
        url: "https://ae01.alicdn.com/kf/S3416e7ab9e764e02943915eb666f340fk/2021-New-Colorful-Flame-Hoodie-3d-Fluorescence-Sweatshirt-Men-Women-Autumn-And-Winter-Coat-Clothing-funny.jpg_640x640.jpg",
        alt: "Fish Hoodie",
      },
      color3: "114",
      image3: {
        url: "https://ae01.alicdn.com/kf/Haebae043816b48d39fa86bbaff677d4d9/2021-New-Colorful-Flame-Hoodie-3d-Fluorescence-Sweatshirt-Men-Women-Autumn-And-Winter-Coat-Clothing-funny.jpg_640x640.jpg",
        alt: "Blue Flame Hoodie",
      },
      color4: "121",
      image4: {
        url: "https://ae01.alicdn.com/kf/S1726434607ce4a2fbf89779455482548F/2021-New-Colorful-Flame-Hoodie-3d-Fluorescence-Sweatshirt-Men-Women-Autumn-And-Winter-Coat-Clothing-funny.jpg_640x640.jpg",
        alt: "Checkered Hoodie",
      },
      color5: "122",
      image5: {
        url: "https://ae01.alicdn.com/kf/S274353d47fd54abbb19bbb1765fbfe94Q/2021-New-Colorful-Flame-Hoodie-3d-Fluorescence-Sweatshirt-Men-Women-Autumn-And-Winter-Coat-Clothing-funny.jpg_640x640.jpg",
        alt: "Acid Hoodie",
      },
      quantity: 1695,
      cart: [],
    },
    {
      _id : "621f3f27dde069e62aa3bcbe",
      name: "Star Wars Mandalorian Car Interior Engine Ignition Start Stop Button Protective Cover Decoration Stick Car Interior Accessories",
      description: "Start Stop Button Protective Cover",
      image: {
        url: "https://ae01.alicdn.com/kf/S7715cae001654eb4a0600c41b65977adX/Star-Wars-Mandalorian-Car-Interior-Engine-Ignition-Start-Stop-Button-Protective-Cover-Decoration-Stick-Car-Interior.jpg_Q90.jpg",
        alt: "Star Wars Helmet",
      },
      sellerId: "621f3f27dde069e62aa3bcab",
      user_id: "621f3f27dde069e62aa3bcab",
      category: "automobiles",
      subcategory: "other",
      bizNumber: "0000000",
      bizName: "Seller",
      sold: 0,
      price: 3.8,
      ship: 0,
      returnfree : "yes",
      likes: [],
      numFeatures: 0,
      feature1: "",
      feature2: "",
      feature2price: null,
      feature3: "",
      feature3price: null,
      feature4: "",
      feature4price: null,
      feature5: "",
      feature5price: null,
      numColors: 3,
      color1: "Silver",
      color2: "Black",
      image2: {
        url: "https://ae01.alicdn.com/kf/S4eab29523e4e425082605e592c769656V/Star-Wars-Mandalorian-Car-Interior-Engine-Ignition-Start-Stop-Button-Protective-Cover-Decoration-Stick-Car-Interior.jpg_640x640.jpg",
        alt: "Black Helemt",
      },
      color3: "Titanium Black",
      image3: {
        url: "https://ae01.alicdn.com/kf/S0a06a89b9a084f7897e5956ece572747m/Star-Wars-Mandalorian-Car-Interior-Engine-Ignition-Start-Stop-Button-Protective-Cover-Decoration-Stick-Car-Interior.jpg_640x640.jpg",
        alt: "Titanium Helemt",
      },
      color4: "",
      image4: {
        url: "https://www.arraymedical.com/wp-content/uploads/2018/12/product-image-placeholder.jpg",
        alt: "Pic Of Product",
      },
      color5: "",
      image5: {
        url: "https://www.arraymedical.com/wp-content/uploads/2018/12/product-image-placeholder.jpg",
        alt: "Pic Of Product",
      },
      quantity: 97,
      cart: [],
    },
  ],
};

async function primaryUsers(user) {
  try {
    user = new User(user);
    user.password = generateHashPassword(user.password);
    await user.save();
  } catch (error) {
    console.log(chalk.redBright(error.message));
  }
}

async function primaryCards(card) {
  try {
    card = new Card(card);
    await card.save();
  } catch (error) {
    console.log(chalk.redBright(error.message));
  }
}

const primaryData = () => {
  for (let i of data.users) {
    primaryUsers(i);
  }
  for (let i of data.cards) {
    primaryCards(i);
  }
};

module.exports = primaryData;
