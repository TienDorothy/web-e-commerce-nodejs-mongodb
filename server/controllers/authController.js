const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const { validateError, throwNewError } = require("../middleware/error");
const Session = require("../models/Session");

const saltRounds = 10;

exports.registerUser = async (req, res, next) => {
  try {
    await validateError(req, res, next);

    const { fullName, email, password, phone, address } = req.body;

    const hashPass = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      fullName,
      email,
      password: hashPass,
      phone,
      address,
    });

    await newUser.save();

    return res.status(201).json({
      message: "User created",
      userId: newUser._id,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    await validateError(req, res, next);
    console.log("Login req.body", req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }).populate("cart.product");

    const matchPass = await bcrypt.compare(password, user.password);
    if (!matchPass) {
      throwNewError(401, "Wrong password");
    }
    const fullName = user.fullName.split(" ");
    const lastName = fullName[fullName.length - 1];

    // const sessionID = req.session.id;

    // res.cookie("userId", user._id.toString(), {
    //   httpOnly: true,
    //   sameSite: "None",
    //   secure: false,
    //   maxAge: parseInt(process.env.SESSION_EXP),
    // });

    const token = generateToken(
      user._id.toString(),
      user.role === "admin"
    );
console.log('token', token)
    // res.cookie("jwt", token, {
    //   httpOnly: true,
    //   sameSite: "None",
    //   secure: true,
    //   maxAge: 24 * 60 * 60 * 1000,
    // });

    req.session.isAuth = true;
    req.session.userId = user._id.toString();
    req.session.role = user.role;
    req.session.token = token;

    return res.status(200).json({
      message: "Login success.",
      user: {
        userId: user._id,
        email: user.email,
        fullName: user.fullName,
        username: lastName,
        phone: user.phone,
        address: user.address,
        cart: user.cart,
      },
      isAdmin: user.role === "admin",
      token,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    await validateError(req, res, next);
    const userId = req.body.userId;
    const cart = req.body.cart;

    // update cart for Client
    if (Array.isArray(cart) && cart.length !== 0) {
      let cartUser = cart.map((item) => {
        return {
          product: item.product._id,
          quantity: item.quantity,
        };
      });

      const user = await User.findById(userId);
      user.cart = cartUser;
      await user.save();
    }

    // destroy session Database
    await Session.findOneAndDelete({ "session.userId": userId });

    // destroy session client
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Server error" });
      }
      res.clearCookie("connect.sid");
      res.status(200).json({ message: "Logout successful" });
    });
    console.log("Logout userId", req.body.userId);
  } catch (error) {
    next(console.error());
  }
};

exports.test = async (req, res, next) => {
  return res.status(200).json({ message: req.session });
};

// Fns //////////////////
const generateToken = (userId, isAdmin) => {
  return jwt.sign(
    { userId: userId, isAdmin: isAdmin },
    process.env.TOKEN_SECRET,
    {
      expiresIn: process.env.TOKEN_EXP,
    }
  );
};


