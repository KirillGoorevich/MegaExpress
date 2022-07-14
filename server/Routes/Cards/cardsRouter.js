const { Card } = require("./cardModel");
const express = require("express");
const auth = require("../../middlewares/authorization");
const router = express.Router();
const chalk = require("chalk");
const { generateBizNum } = require("./services/generateBizNum");
const { validateCard } = require("./cardValidation");
const User = require("../Users/userModel");

/********** Get All Cards **********/
router.get("/cards", async (req, res) => {
  try {
    const cards = await Card.find();
    return res.send(cards);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error.message);
  }
});

/********** Get One Card **********/
router.get("/card/:id", async (req, res) => {
  try {
    const cardID = req.params.id;
    const card = await Card.findOne({ _id: cardID });
    return res.send(card);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error.message);
  }
});

/********** Get My Cards **********/
router.get("/my-cards", auth, async (req, res) => {
  try {
    let user = req.user;
    if (!user.biz) return res.status(403).json("Un authorize user!");
    const cards = await Card.find({ user_id: user._id });
    return res.send(cards);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error.message);
  }
});

/********** Create Card **********/
router.post("/", auth, async (req, res) => {
  try {
    const user = req.user;

    if (!user.biz) {
      console.log(
        chalk.redBright("A non biz user attempted to create a card!")
      );
      return res.status(403).json("Un authorize user!");
    }

    let card = req.body;
    
    const { error } = validateCard(card);
    if (error) {
      console.log(chalk.redBright(error.details[0].message));
      return res.status(400).send(error.details[0].message);
    }
    
    let bizName = null;
    if(user.isAdmin){
      bizName = "MegaExpress";
    }
    else{
      bizName = (await User.findById(user._id)).name; //user is biz
    }

    card = new Card({
      name: card.name,
      description: card.description,
      image: {
        url: card.url
          ? card.url
          : "https://www.arraymedical.com/wp-content/uploads/2018/12/product-image-placeholder.jpg",
        alt: card.alt ? card.alt : "Pic Of Product",
      },
      user_id: user._id,
      category: card.category,
      subcategory: card.subcategory,
      bizNumber: await generateBizNum(),
      bizName: bizName,
      sold: card.sold,
      price: Number(card.price),
      ship: Number(card.ship),
      returnfree: card.returnfree,
      numFeatures: card.numFeatures,
      feature1: card.feature1,
      feature2: card.feature2,
      feature2price: card.feature2price,
      feature3: card.feature3,
      feature3price: card.feature3price,
      feature4: card.feature4,
      feature4price: card.feature4price,
      feature5: card.feature5,
      feature5price: card.feature5price,
      numColors: card.numColors,
      color1: card.color1,
      color2: card.color2,
      image2: {
        url: card.url2
          ? card.url2
          : "https://www.arraymedical.com/wp-content/uploads/2018/12/product-image-placeholder.jpg",
        alt: card.alt2 ? card.alt2 : "Pic Of Product",
      },
      color3: card.color3,
      image3: {
        url: card.url3
          ? card.url3
          : "https://www.arraymedical.com/wp-content/uploads/2018/12/product-image-placeholder.jpg",
        alt: card.alt3 ? card.alt3 : "Pic Of Product",
      },
      color4: card.color4,
      image4: {
        url: card.url4
          ? card.url4
          : "https://www.arraymedical.com/wp-content/uploads/2018/12/product-image-placeholder.jpg",
        alt: card.alt4 ? card.alt4 : "Pic Of Product",
      },
      color5: card.color5,
      image5:{
        url: card.url5
          ? card.url5
          : "https://www.arraymedical.com/wp-content/uploads/2018/12/product-image-placeholder.jpg",
        alt: card.alt5 ? card.alt5 : "Pic Of Product",
      },
      quantity: card.quantity,
      sellerId: card.sellerId,
    });
    
    
    card = await card.save();
    return res.send(card);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error);
  }
});

/********** Edit Card **********/
router.put("/:id", auth, async (req, res) => {
  try {
    let user = req.user;
    if (!user.biz) {
      console.log(
        chalk.redBright("A non-business user attempted to edit a card!")
      );
      return res.status(403).json("You are not authorize to edit card!");
    }

    let card = req.body;
    delete card._id;
    const { error } = validateCard(card);
    if (error) {
      const errorMessage = error.details[0].message;
      console.log(chalk.redBright(errorMessage));
      return res.status(400).send(errorMessage);
    }

    card = {
      name: card.name,
      description: card.description,
      image: {
        url: card.url
          ? card.url
          : "https://www.arraymedical.com/wp-content/uploads/2018/12/product-image-placeholder.jpg",
        alt: card.alt ? card.alt : "Pic Of Product",
      },
      user_id: user._id,
      category: card.category,
      subcategory: card.subcategory,
      bizNumber: await generateBizNum(),
      bizName: card.bizName,
      sold: card.sold,
      price: Number(card.price),
      ship: Number(card.ship),
      returnfree: card.returnfree,
      numFeatures: card.numFeatures,
      feature1: card.feature1,
      feature2: card.feature2,
      feature2price: card.feature2price,
      feature3: card.feature3,
      feature3price: card.feature3price,
      feature4: card.feature4,
      feature4price: card.feature4price,
      feature5: card.feature5,
      feature5price: card.feature5price,
      numColors: card.numColors,
      color1: card.color1,
      color2: card.color2,
      image2: {
        url: card.url2
          ? card.url2
          : "https://www.arraymedical.com/wp-content/uploads/2018/12/product-image-placeholder.jpg",
        alt: card.alt2 ? card.alt2 : "Pic Of Product",
      },
      color3: card.color3,
      image3: {
        url: card.url3
          ? card.url3
          : "https://www.arraymedical.com/wp-content/uploads/2018/12/product-image-placeholder.jpg",
        alt: card.alt3 ? card.alt3 : "Pic Of Product",
      },
      color4: card.color4,
      image4: {
        url: card.url4
          ? card.url4
          : "https://www.arraymedical.com/wp-content/uploads/2018/12/product-image-placeholder.jpg",
        alt: card.alt4 ? card.alt4 : "Pic Of Product",
      },
      color5: card.color5,
      image5:{
        url: card.url5
          ? card.url5
          : "https://www.arraymedical.com/wp-content/uploads/2018/12/product-image-placeholder.jpg",
        alt: card.alt5 ? card.alt5 : "Pic Of Product",
      },
      quantity: card.quantity,
      sellerId: card.sellerId,
    };

    const filter = {
      _id: req.params.id,
      userID: user._id,
    };

    card = await Card.findOneAndUpdate(filter, card);
    if (!card) {
      console.log(chalk.redBright("No card with this ID in the database!"));
      return res.status(404).send("No card with this ID in the database!");
    }
    card = await Card.findById(card._id);
    return res.send(card);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error.message);
  }
});

/********** Delete Card **********/
router.delete("/:id", auth, async (req, res) => {
  try {
    let user = req.user;
    if (user.isAdmin) {
      let foundCard = await Card.findOne({ _id: req.params.id });
      let cardOwnerId = foundCard.user_id;
      let card = await Card.findOneAndRemove({
        _id: req.params.id,
        user_id: cardOwnerId,
      });
      return res.send(card);
    }
    if (!user.biz) {
      console.log(
        chalk.redBright("A non-business user attempted to delete a card!")
      );
      return res.status(403).json("You are not authorized to delete this card!");
    }

    let card = await Card.findOneAndRemove({
      _id: req.params.id,
      user_id: user._id,
    });

    if (!card) {
      console.log(chalk.redBright("Unauthorized user!"));
      return res.status(403).send("You are noe authorized to delete cards");
    }

    return res.send(card);
  } catch (error) {
    console.log(chalk.redBright("Could not delet card:", error.message));
    return res.status(500).send(error.message);
  }
});
/********** Like/Dislike Card **********/

router.patch("/card-like/:id", auth, async (req, res) => {
  try {
    // console.log(req.params.id);
    const user = req.user;
    let card = await Card.findOne({ _id: req.params.id });

    const cardLikes = card.likes.find((id) => id === user._id);

    if (!cardLikes) {
      card.likes.push(user._id);
      card = await card.save();
      return res.send(card);
    }

    const cardFiltered = card.likes.filter((id) => id !== user._id);
    card.likes = cardFiltered;
    card = await card.save();
    return res.send(card);
  } catch (error) {
    console.log(chalk.redBright("Could not edit like:", error.message));
    return res.status(500).send(error.message);
  }
});

/********** Add/Remove to Cart **********/

router.patch("/cart/:id", auth, async (req, res) => {
  try {
    // console.log(req.params.id);
    const user = req.user;
    let card = await Card.findOne({ _id: req.params.id });

    const cart = card.cart.find((id) => id === user._id);

    if (!cart) {
      card.cart.push(user._id);
      card = await card.save();
      return res.send(card);
    }

    const cardFiltered = card.cart.filter((id) => id !== user._id);
    card.cart = cardFiltered;
    card = await card.save();
    return res.send(card);
  } catch (error) {
    console.log(chalk.redBright("Could not edit like:", error.message));
    return res.status(500).send(error.message);
  }
});

module.exports = router;
