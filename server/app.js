const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const app = express();
const PORT = 5000;
// const PORT = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URL;

const adminRouter = require("./routes/admin");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
const orderRouter = require("./routes/order");
const { isAuth } = require("./middleware/isAuth");

// session
const store = new MongoDBStore({
  uri: MONGODB_URL,
  collection: "sessions",
});

// middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: [
      'http://localhost:3002',
      process.env.URL_CLIENT,
      process.env.URL_ADMIN,
      process.env.URL_TEST,
    ],
    // origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// set cookie for client _ HTTPOnly:true _name: 'connect.sit'
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: parseInt(process.env.SESSION_EXP),
    },
    store: store,
    resave: false,
    saveUninitialized: false,
  })
);

// check cookie find User
app.use((req, res, next) => {
  const userId = req.cookies['userId']
  console.log("User :", userId ? userId : "no user");
  next();
});

// router
app.use("/api/admin", adminRouter);
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);

// error
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message;
  const data = err.data;
  res.status(status).json({
    message: message,
    data: data,
  });
  next();
});

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Run :", PORT);
    });
  })
  .catch((err) => console.log("err :>> ", err));
