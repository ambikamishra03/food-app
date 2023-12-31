const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const jwtSecret = "mynameisambikamishraandiamacsestudent";
const bcrypt = require("bcrypt");

//  for signup user
router.post(
  "/creatuser",
  [
    body("email", "Invalid Email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password", "Incorrect Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let securePassword = await bcrypt.hash(req.body.password, salt);
    try {
      await User.create({
        // ----------dynamic ---------
        name: req.body.name,
        password: securePassword,
        email: req.body.email,
        location: req.body.location,

        // ------------static------------
        // name: "Ambika",
        // password: "ambika111",
        // email:"ambika123@gmail.com",
        // location:"Deoria"
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

//   for login user
router.post(
  "/loginuser",
  [
    body("email", "Invalid Email").isEmail(),
    body("password", "Incorrect Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Oops! try login failed with correct credentials." });
      }

      const pswCompare = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      if (!pswCompare) {
        return res
          .status(400)
          .json({ errors: "Oops! try login failed with correct credentials." });
      }
      const data = {
        user: {
          // sending id from database
          id: userData.id,
        },
      };

      //  Authentication
      const authToken = jwt.sign(data, jwtSecret);
      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
