"use client";
import React, { useState, useEffect } from "react";
import Script from "next/script";
import { fetchpayments, initiate, fetchuser } from "@/app/actions/useractions";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import { useRouter } from "next/navigation";


const Creatorpage = ({ username, email }) => {
  const [paymentform, setPaymentform] = useState({
    name: "",
    message: "",
    amount: "",
    email: "",
  });
  const [currentUser, setCurrentUser] = useState({});
  const [payments, setPayments] = useState([]);
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleChange = (e) => {
    setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (session) {
      console.log(session.user.email);
      setPaymentform({ ...paymentform, name: session.user.name, email: email });
    }
  }, [session]);

  const getData = async () => {
    let u = await fetchuser(username);
    setCurrentUser(u);
    let dbPayments = await fetchpayments(username);
    setPayments(dbPayments);
  };

  useEffect(() => {
    if (searchParams.get("paymentdone") == "true") {
      toast("Thanks for your donation!!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }

    router.push(`/creator/${username}`);
  }, []);

  const pay = async (amount) => {
    const paymentData = {
      name: paymentform.name,
      message: paymentform.message,
      email: paymentform.email,
      contact: "9000090000",
    };

    try {
      const response = await initiate(amount, username, paymentData);
      const orderId = response.id;

      const options = {
        key: process.env.NEXT_PUBLIC_KEY_ID,
        amount: amount * 100,
        currency: "INR",
        name: "CreatorFund",
        description: "Test Transaction",
        img: "/logo.gif",
        order_id: orderId,
        callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
        prefill: {
          name: paymentData.name,
          message: paymentData.message,
          contact: paymentData.contact,
          email: paymentData.email,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      toast.error("Payment initiation failed. Please try again later.");
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <div className="cover w-full bg-red-50 relative mt-5">
        <img
          className="object-cover w-full h-48 md:h-[350px] shadow-blue-700 shadow-sm"
          unoptimized 
          src={currentUser.coverpic}
          layout="fill"
          objectFit="cover"
          alt=""
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute -bottom-14 right-[38%] md:right-[46%] border-white overflow-hidden border-2 rounded-full size-24">
          <img
            className="rounded-full object-cover size-24"
            width={100}
            height={100}
            src={currentUser.profilepic}
            alt=""
          />
        </div>
      </div>

      <div className="info flex flex-col justify-center items-center my-16 gap-2">
        <div className="font-bold text-lg">@{username}</div>
        <div className="text-slate-400">Let's help {username}.</div>
        <div className="bg slate-400">
          {payments.length} Payments . ₹
          {payments.reduce((a, b) => a + b.amount, 0)} raised.
        </div>
        <div className="payment flex flex-col gap-3 w-[80%] mt-11 md:flex-row">
          <div className="supporters w-full md:w-1/2 bg-slate-900 rounded-lg p-10">
            <h2 className="text-2xl font-bold my-5">Top 7 Supporters</h2>
            <ul className="mx-5">
              {payments.length === 0 && <li>No payments yet.</li>}
              {payments.map((p, i) => (
                <li key={i} className="my-4 flex gap-2 items-center">
                  <img
                    height={33}
                    width={33}
                    src="/profile.png"
                    alt="user profile"
                    className="rounded-full"
                  />
                  <span>
                    {p.name} donated
                    <span className="font-bold"> {p.amount}</span> with a
                    message {p.message}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="makepayment w-full md:w-1/2 bg-slate-900 p-10">
            <h2 className="text-2xl font-bold my-5">Make a Payment</h2>
            <div className="flex gap-2 flex-col">
              <input
                type="text"
                name="name"
                placeholder="Enter your name [Autofilled at login]"
                className="w-full p-5 rounded-lg bg-slate-800"
                value={paymentform.name}
              />
              <input
                type="text"
                name="message"
                placeholder="Enter Message"
                className="w-full p-5 rounded-lg bg-slate-800"
                onChange={handleChange}
                value={paymentform.message}
              />
              <input
                type="number"
                name="amount"
                placeholder="Enter Amount"
                className="w-full p-5 rounded-lg bg-slate-800"
                onChange={handleChange}
                value={paymentform.amount}
              />
              <button
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:bg-slate-600 disabled:text-gray-400"
                disabled={
                  paymentform.name?.length < 3 ||
                  paymentform.message?.length < 4 ||
                  paymentform.amount?.length < 1
                }
                onClick={() => {
                  if (!session) {
                    alert("Login to Pay");
                  } else if (username == session.user.name) {
                    alert("You can't pay yourself");
                  } else {
                    pay(Number(paymentform.amount));
                  }
                }}
              >
                Pay
              </button>
            </div>
            <div className="flex flex-col md:flex-row gap-2 mt-5">
              <button
                className="bg-slate-800 p-5 rounded-lg"
                onClick={() => {
                  if (!session) {
                    alert("Login to Pay");
                  } else if (username == session.user.name) {
                    alert("You can't pay yourself");
                  } else {
                    pay(10);
                  }
                }}
              >
                Pay ₹10
              </button>
              <button
                className="bg-slate-800 p-5 rounded-lg"
                onClick={() => {
                  if (!session) {
                    alert("Login to Pay");
                  } else if (username == session.user.name) {
                    alert("You can't pay yourself");
                  } else {
                    pay(20);
                  }
                }}
              >
                Pay ₹20
              </button>
              <button
                className="bg-slate-800 p-5 rounded-lg"
                onClick={() => {
                  if (!session) {
                    alert("Login to Pay");
                  } else if (username == session.user.name) {
                    alert("You can't pay yourself");
                  } else {
                    pay(30);
                  }
                }}
              >
                Pay ₹30
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Creatorpage;
