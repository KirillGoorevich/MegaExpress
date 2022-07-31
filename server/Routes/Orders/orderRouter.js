const { Card } = require("../Cards/cardModel");
const express = require("express");
const auth = require("../../middlewares/authorization");
const router = express.Router();
const chalk = require("chalk");
const User = require("../Users/userModel");
const { Order } = require("./orderModel")
const { validateOrder } = require("./orderValidation");
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
	windowMs: 24 * 60 * 60 * 1000, // 24 Hours
	max: 100*4*24, // Limit each IP to 9600 requests per `window` (here, per 24 hours)
});


/********** Create Order **********/
router.post("/",limiter, auth, async (req, res) => {
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
    card = await Card.findById(order.card.cardId);
    card.quantity = card.quantity - order.data.selectedQuantity;
    card.sold = card.sold + order.data.selectedQuantity;
    const filter = {
      _id: order.card.cardId,
      userID: order.card.sellerId,
    };
    card = await Card.findOneAndUpdate(filter, card);
    return res.send(order);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error);
  }
});

/********** Get All Orders **********/
router.get("/orders",limiter, async (req, res) => {
  try {
    const orders = await Order.find();
    return res.send(orders);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error.message);
  }
});


module.exports = router;
