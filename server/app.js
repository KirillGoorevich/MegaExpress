require("./DB/connectToDb");
// require("./primeryData/primeryCards")();
const express = require("express");
const app = express();
const rateLimit = require('express-rate-limit');

const usersRouter = require("./Routes/Users/userRouter");
const cardsRouter = require("./Routes/Cards/cardsRouter");
const ordersRouter = require("./Routes/Orders/OrderRouter");

const chalk = require("chalk");
const morgan = require("morgan");
const cors = require("cors");

app.use(morgan(chalk.cyan(":method :url :status :response-time ms")));
app.use(cors());
app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/cards", cardsRouter);
app.use("/api/orders", ordersRouter);

const PORT = 8181;
app.listen(PORT, () =>
  console.log(chalk.blueBright.bold(`server run on: http://:localhost:${PORT}`))
);

const limiter = rateLimit({
	windowMs: 24 * 60 * 60 * 1000, // 24 Hours
	max: 100*4*24, // Limit each IP to 9600 requests per `window` (here, per 24 hours)
});

// Apply the rate limiting middleware to all requests
app.use(limiter);