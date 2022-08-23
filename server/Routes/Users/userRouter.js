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

const limiter100 = rateLimit({
	windowMs: 15 * 60 * 1000, // 24 Hours
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
});

const limiter10 = rateLimit({
	windowMs: 15 * 60 * 1000, // 24 Hours
	max: 10, // Limit each IP to 10 requests per `window` (here, per 15 minutes)
});

router.post("/register",limiter100, async (req, res) => {
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

router.post("/login",limiter10, async (req, res) => {
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

router.get("/userInfo",limiter100, auth, (req, res) => {
  let user = req.user;

  User.findById(user._id)
    .select(["-password", "-createdAt", "-__v"])
    .then((user) => res.send(user))
    .catch((errorsFromMongoose) => res.status(500).send(errorsFromMongoose));
  
});

//reset password
router.post("/reset",limiter10, async (req, res) => {
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

/********** Get All Users **********/
router.get("/users",limiter100, async (req, res) => {
  try {
    const users = await User.find();
    return res.send(users);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error.message);
  }
});

/********** Delete User **********/
router.delete("/:id", auth, async (req, res) => {
  try {
    let cur_user = req.user;
    if (cur_user.isAdmin) {
      let foundUser = await User.findOne({ _id: req.params.id });
      if(!foundUser){
        console.log(
          chalk.redBright("User doesn't Exist.")
        );
        return res.status(404).json("Can't delete user that doesn't exist");
      }
      let user = await User.findOneAndRemove({
        _id: req.params.id,
      });
      return res.send(user);
    }
    else{
      console.log(
        chalk.redBright("A non admin user attempted to delete a user!")
      );
      return res.status(403).json("You are not authorized to delete this user!");
    }
  } catch (error) {
    console.log(chalk.redBright("Could not delete user:", error.message));
    return res.status(500).send(error.message);
  }
});


/********** Make User Admin **********/
router.put("/:id",limiter10, auth, async (req, res) => {
  try {
    let cur_user = req.user;
    if (!cur_user.isAdmin) {
      console.log(
        chalk.redBright("A non-admin user attempted to promote a user to an admin!")
      );
      return res.status(403).json("You are not authorize to promote to Admin");
    }

    if (cur_user.isAdmin) {
      let user = await User.findOne({ _id: req.params.id });
      if(!user){
        console.log(
          chalk.redBright("User doesn't Exist.")
        );
        return res.status(404).json("Can't Make a user that doesn'e exist admin!");
      }
      if(user.isAdmin){
        console.log(
          chalk.redBright("User is Already Admin.")
        );
        return res.status(404).json("User is Already Admin!");
      }
      const filter = {
        _id: req.params.id,

      };
      user = {
        isAdmin: true,
      }
      user = await User.findOneAndUpdate(filter, user);
      return res.send(user);
    }
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error.message);
  }
});

//change profile picture
router.post("/changeProfilePic",limiter100,auth,async (req,res) => {
  try {
    const userId = req.user._id;
    const formData = req.body;
    const base64Image = formData.file.split(';base64,').pop();
    const fs = require('fs');
    fs.writeFile("./profilePictures/"+userId+".jpg", base64Image, {encoding: 'base64'}, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('File created');
    });
    return res.send("File created");
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error.message);
  }
});

//return profile pic to client
router.get("/getProfilePic/:id",limiter100,auth,async (req,res)=>{
  try {
    const userId = req.params.id;
    const imageUrl = "./profilePictures/"+userId+".jpg";
    const fs = require('fs');
    fs.readFile(imageUrl, 'base64', function(err, data){  
      if (err) {
        console.log(err);
        return res.send(null);;
      }
      return res.send(data);
    });
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error.message);
  }
});

module.exports = router;
