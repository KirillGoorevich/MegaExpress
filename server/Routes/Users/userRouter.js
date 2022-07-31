const validateRegistration = require("./usersValidations/registraion");
const validateSignin = require("./usersValidations/signIn");
const {
  comparePassword,
  generateHashPassword,
} = require("../../services/bcrypt");
const { generateAuthToken } = require("../../services/token");
const _ = require("lodash");
const router = require("express").Router();
const User = require("./userModel");
const auth = require("../../middlewares/authorization");
const chalk = require("chalk");
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
	windowMs: 24 * 60 * 60 * 1000, // 24 Hours
	max: 100*4*24, // Limit each IP to 9600 requests per `window` (here, per 24 hours)
});

router.post("/register",limiter, async (req, res) => {
  const { error } = validateRegistration(req.body);
  if (error) {
    console.log(chalk.redBright(error.details[0].message));
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    console.log(chalk.redBright("Registration Error: User already registered"));
    return res.status(400).send("User already registered.");
  }

  user = new User(
    _.pick(req.body, ["name", "email", "password", "biz", "cards", "isAdmin", "address","phone","bank","bankNumber",])
  );

  user.password = generateHashPassword(user.password);
  await user.save();
  res.send(_.pick(user, ["_id", "name", "email"]));
});

router.post("/login",limiter, async (req, res) => {
  const { error } = validateSignin(req.body);
  if (error) {
    console.log(chalk.redBright(error.details[0].message));
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    console.log(chalk.redBright("Invalid email"));
    return res.status(400).send("Invalid email or password.");
  }

  const validPassword = comparePassword(req.body.password, user.password);
  if (!validPassword) {
    console.log(chalk.redBright("Invalid password"));
    return res.status(400).send("Invalid email or password.");
  }

  res.json({
    token: generateAuthToken(user),
  });
});

router.get("/userInfo",limiter, auth, (req, res) => {
  let user = req.user;

  User.findById(user._id)
    .select(["-password", "-createdAt", "-__v"])
    .then((user) => res.send(user))
    .catch((errorsFromMongoose) => res.status(500).send(errorsFromMongoose));
});

//reset password
router.post("/reset",limiter, async (req, res) => {
  try{
    let user = await User.findOne({ email: req.body.email });
    if(user.isAdmin){
      console.log(chalk.redBright("Like hell am I gonna let a hacker reset an Admin password"));
      return res.status(400).send("Admins can't change passwords!");
    }
  if (!user) {
    console.log(chalk.redBright("Registration Error: User isn't registered"));
    return res.status(400).send("User isn't registered.");
  }
  user.password = req.body.password;
  user.password = generateHashPassword(user.password);
  user = await User.findOneAndUpdate(user._id, user);
  if (!user) {
    console.log(chalk.redBright("No user with this ID in the database!"));
    return res.status(404).send("No user with this ID in the database!");
  }
  user = await User.findById(user._id);
  return res.send(user);
  }catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error.message);
}});

module.exports = router;
