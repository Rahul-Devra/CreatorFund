"use server";
import Razorpay from "razorpay";
import Payment from "../models/Payment";
import connectDB from "../db/connectDB";
import User from "../models/User";

export const initiate = async (amount, to_username, paymentform) => {
  await connectDB();

  let user = await User.findOne({ username: to_username });
  let secret = user.razorpaysecret;

  var instance = new Razorpay({
    key_id: user.razorpayid,
    key_secret: secret,
  });

  let options = {
    amount: Number.parseInt(amount) * 100,
    currency: "INR",
  };

  let order = await instance.orders.create(options);

  const paymentData = {
    oid: order.id,
    amount: amount,
    to_user: to_username,
    name: paymentform.name,
    message: paymentform.message,
    done: false,
    email: paymentform.email || "fundrisenow98@gmail.com",
  };
  await Payment.create(paymentData);
  return order;
};

export const findCreator = async (creator) => {
  await connectDB();
  let Creator = await User.findOne({ username: creator });
  return JSON.parse(JSON.stringify(Creator));
};

export const fetchuser = async (username) => {
  await connectDB();
  try {
    let u = await User.findOne({ username: username });
    let user = u.toObject({ flatenObjectIds: true });
    return user;
  } catch (error) {
    console.error(error);
  }
};

export const deleteProfile = async (email) => {
  await connectDB();
  let delUser = await User.deleteOne({ email: email });
  let delPay = await Payment.deleteMany({ email: email });
  if (delUser && delPay) {
    return true;
  } else {
    return false;
  }
};

export const fetchpayments = async (username) => {
  await connectDB();
  let p = await Payment.find({ to_user: username, done: true })
    .sort({ amount: -1 })
    .limit(7)
    .lean();
  return p;
};

export const fetchUserEmail = async (username) => {
  await connectDB();
  let userInfo = await User.findOne({ username: username });
  if (userInfo) {
    return userInfo.email;
  }
};

export const updateProfile = async (data, oldusername) => {
  await connectDB();
  let ndata = Object.fromEntries(data);

  if (oldusername !== ndata.username) {
    let u = await User.findOne({ username: ndata.username });
    if (u) {
      return { error: "Username already exists" };
    }
    await User.updateOne({ email: ndata.email }, ndata);

    await Payment.updateMany(
      { to_user: oldusername },
      { to_user: ndata.username }
    );
  } else {
    await User.updateOne({ email: ndata.email }, ndata);
  }
};
