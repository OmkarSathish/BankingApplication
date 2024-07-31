import { Router } from "express";
import { tokenHandler } from "../middlewares/tokenAuth.js";
import { Account } from "../models/accounts.js";
import { User } from "../models/users.js";
import mongoose from "mongoose";

const router = Router();

router.get("/balance", tokenHandler, async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findOne({ _id: userId });
    const account = await Account.findOne({ userId });

    return res
      .status(200)
      .json({ firstName: user.firstName, balance: account.balance });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/transfer", tokenHandler, async (req, res) => {
  const { receiver, amount, pin } = req.body;

  try {
    const transactionSession = await mongoose.startSession();
    transactionSession.startTransaction();

    const fromAcc = await Account.findOne({ userId: req.userId }).session(
      transactionSession
    );

    if (!fromAcc) {
      transactionSession.abortTransaction();
      return res
        .status(400)
        .json({ message: "Your account not found", status: "NOT OK" });
    }

    if (pin != fromAcc.pin) {
      transactionSession.abortTransaction();
      return res.status(400).json({ message: "Wrong Pin", status: "NOT OK" });
    }

    if (fromAcc.balance < amount) {
      transactionSession.abortTransaction();
      return res
        .status(400)
        .json({ message: "Insufficient funds", status: "NOT OK" });
    }

    const toAcc = await Account.findOne({ userId: receiver }).session(
      transactionSession
    );

    if (!toAcc) {
      transactionSession.abortTransaction();
      return res
        .status(400)
        .json({ message: "Invalid receiver ID", status: "NOT OK" });
    }

    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } },
      { new: true }
    );
    await Account.updateOne(
      { userId: receiver },
      { $inc: { balance: amount } },
      { new: true }
    );

    transactionSession.commitTransaction();

    return res
      .status(200)
      .json({ message: "Transaction successful", status: "OK" });
  } catch (error) {
    transactionSession.abortTransaction();
    return res.status(500).json({ message: error.message, status: "NOT OK" });
  }
});

// router.post('/transfer', tokenHandler, async (req, res) => {
//   const { receiver, amount } = req.body;
//   try {
//     const transactionSession = await mongoose.startSession();

//     transactionSession.startTransaction();

//     const fromAcc = await Account.findOne({ userId: req.userId }).session(
//       transactionSession
//     );

//     if (fromAcc.balance < amount) {
//       return res.status(400).json({ message: 'Insufficient amount' });
//     }

//     const toAcc = await Account.findOne({ userId: receiver }).session(
//       transactionSession
//     );

//     if (!toAcc) {
//       transactionSession.abortTransaction();
//       return res.status(400).json({ message: 'Invalid revceiver ID provided' });
//     }

//     await fromAcc.updateOne({ balance: -amount });
//     await toAcc.updateOne({ balance: +amount });

//     transactionSession.commitTransaction();

//     return res.status(200).json({ message: 'Transaction successful' });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// });

export default router;
