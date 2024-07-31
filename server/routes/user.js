import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Router } from "express";

import { User } from "../models/users.js";
import { Account } from "../models/accounts.js";
import { tokenHandler } from "../middlewares/tokenAuth.js";
import {
  validateLoginInfo,
  validateProfileUpdateInfo,
  validateRegisterInfo,
} from "../middlewares/zodValidation.js";

const router = Router();

router.post("/register", validateRegisterInfo, async (req, res) => {
  const { email, firstName, lastName, password, pin } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ message: `${email} already registered with another User` });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    user = new User({
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });

    await user.save();

    const account = new Account({
      userId: user._id,
      pin: Number(pin),
      balance: Math.floor(Math.random() * 1000) + 1,
    });

    await account.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    return res.status(200).json({ token, balance: account.balance });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/login", validateLoginInfo, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: `User with ${email} does not exist` });
    }

    const isCorrect = await bcrypt.compare(password, user.password);

    if (!isCorrect) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/details", tokenHandler, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    const { email, firstName, lastName } = user;

    return res
      .status(200)
      .json({ userId: user._id, email, firstName, lastName });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.put(
  "/update",
  tokenHandler,
  validateProfileUpdateInfo,
  async (req, res) => {
    let { password, firstName, lastName, pin } = req.body;

    try {
      let updateUser = {};

      if (password) {
        password = await bcrypt.hash(password, 12);
        updateUser.password = password;
      }

      if (firstName) {
        updateUser.firstName = firstName;
      }

      if (lastName) {
        updateUser.lastName = lastName;
      }

      const user = await User.findByIdAndUpdate(req.userId, updateUser, {
        new: true,
      });

      if (pin !== null || pin !== undefined || pin != 0) {
        await Account.findByIdAndUpdate(req.userId, {
          pin,
        });
      }

      return res
        .status(200)
        .json({ firstName: user.firstName, lastName: user.lastName });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

router.get("/bulk", tokenHandler, async (req, res) => {
  const filter = req.query.filter || "";

  try {
    let users = await User.find({
      $or: [
        { firstName: { $regex: filter } },
        { lastName: { $regex: filter } },
      ],
    });

    users = users.filter((user) => user._id.toString() !== req.userId);

    return res.status(200).json({
      user: users.map((user) => ({
        userId: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      })),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
