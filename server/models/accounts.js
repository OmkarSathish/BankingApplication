import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Only regustered users are allowed to have an account"],
  },
  balance: {
    type: Number,
    required: true,
  },
  pin: {
    type: Number,
    required: true,
  },
});

export const Account = mongoose.model("Account", AccountSchema);
