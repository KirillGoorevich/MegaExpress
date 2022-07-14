const { Card } = require("../Cards/cardModel");
const { validateCard } = require("../Cards/cardValidation");
const express = require("express");
const auth = require("../../middlewares/authorization");
const router = express.Router();
const chalk = require("chalk");
const User = require("../Users/userModel");
const { Order } = require("./orderModel")
const { validateOrder } = require("./orderValidation");


/********** Create Order **********/
router.post("/", auth, async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      console.log(
        chalk.redBright("A non user attempted to create an order!")
      );
      return res.status(403).json("Not a user!");
    }

    let order = req.body;

    const { error } = validateOrder(order);
    if (error) {
      console.log(chalk.redBright(error.details[0].message));
      return res.status(400).send(error.details[0].message);
    }

    const seller = await User.findById(order.card.sellerId);

    let contact = "";
    if(seller.isAdmin){
      contact = "MegaExpress";
    }
    else if(seller.biz){
      contact = seller.phone;
    }
    else{
      contact = "A Hacker!";
      return;
    }

    order = new Order({
      card: order.card,
      data : order.data,
      buyerId : user._id,
      status : "Awaiting delivery",
      date : order.date,
      contact: contact,
      deliveryDate: order.deliveryDate,
    });

    order = await order.save();
    return res.send(order);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error);
  }
});

/********** Get All Orders **********/
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    return res.send(orders);
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
      title: card.title,
      description: card.description,
      address: card.address,
      phone: card.phone,
      image: {
        url: card.url,
        alt: card.alt,
      },
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
      return res.status(403).send("You are not authorized to delete cards");
    }

    return res.send(card);
  } catch (error) {
    console.log(chalk.redBright("Could not delet card:", error.message));
    return res.status(500).send(error.message);
  }
});
/********** Like Card **********/

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

module.exports = router;
