/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import Script from "next/script";
import {
  fetchpayments,
  initiate,
  fetchuser,
  fetchdetail,
} from "@/app/actions/useractions";
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
  const [form, setform] = useState({});
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleChange = (e) => {
    setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const getData = async () => {
      try {
        let u = await fetchuser(username);
        setCurrentUser(u);
        let projectDetail = await fetchdetail(username);
        console.log("project", projectDetail);
        if (projectDetail) {
          setform(projectDetail);
        } else {
          console.log("No user detail found");
        }
        let dbPayments = await fetchpayments(username);
        setPayments(dbPayments);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, [username]);

  useEffect(() => {
    if (session) {
      console.log(session.user.email);
      setPaymentform({ ...paymentform, name: session.user.name, email: email });
    }
  }, [session, email]);

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
  }, [searchParams, router, username]);

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

        <div className="bg-slate-800 w-full max-w-7xl mx-auto px-4">
          {/* First row: Project info and description */}
          <div className="flex flex-col md:flex-row gap-6 my-6">
            {/* Project info */}
            <div className="w-full md:w-1/2 part1 bg-slate-900 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-3 text-white">
                Funding Details
              </h2>
              <div className="mb-4">
                <h3 className="mb-2 text-white">Project Name:</h3>
                <input
                  className="w-full rounded-lg p-2 border border-violet-800 bg-white text-black"
                  value={form.projectName || ""}
                  readOnly
                />
              </div>
              <div className="mb-4">
                <h3 className="mb-2 text-white">Funding Amount:</h3>
                <input
                  className="w-full rounded-lg p-2 border border-violet-800 bg-white text-black"
                  value={form.fundingAmount || ""}
                  readOnly
                />
              </div>
              <div className="mb-4">
                <h3 className="mb-2 text-white">Funding Goal:</h3>
                <input
                  className="w-full rounded-lg p-2 border border-violet-800 bg-white text-black"
                  value={form.fundingGoal || ""}
                  readOnly
                />
              </div>
              <div>
                <h3 className="mb-2 text-white">Project Update:</h3>
                <textarea
                  className="w-full p-2 border border-violet-800 bg-white text-black resize-none rounded-lg"
                  rows={3}
                  value={form.projectUpdate || ""}
                  readOnly
                />
              </div>
            </div>

            {/* Project description */}
            <div className="w-full md:w-1/2 part2 bg-slate-900 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-3 text-white">
                Project Description
              </h2>
              <textarea
                className="w-full p-3 border border-violet-800 bg-white text-black resize-none rounded-lg"
                rows={13}
                value={form.projectDescription || ""}
                readOnly
              />
            </div>
          </div>

          {/* Second row: Supporters and payment */}
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            {/* Supporters */}
            <div className="w-full md:w-1/2 part3 bg-slate-900 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-5 text-white">
                Top 7 Supporters
              </h2>
              <ul className="mx-5">
                {payments.length === 0 && (
                  <li className="text-white">No payments yet.</li>
                )}
                {payments.map((p, i) => (
                  <li
                    key={i}
                    className="my-4 flex gap-2 items-center text-white"
                  >
                    <img
                      height={33}
                      width={33}
                      src="/profile.png"
                      alt="user profile"
                      className="rounded-full"
                    />
                    <span>
                      {p.name} donated
                      <span className="font-bold"> ₹{p.amount}</span> with a
                      message: {p.message}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Make a payment */}
            <div className="w-full md:w-1/2 part4 bg-slate-900 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-5 text-white">
                Make a Payment
              </h2>
              <div className="flex gap-2 flex-col">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name [Autofilled at login]"
                  className="w-full p-3 rounded-lg  text-black"
                  value={paymentform.name}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="message"
                  placeholder="Enter Message"
                  className="w-full p-3 rounded-lg  text-black"
                  onChange={handleChange}
                  value={paymentform.message}
                />
                <input
                  type="number"
                  name="amount"
                  placeholder="Enter Amount"
                  className="w-full p-3 rounded-lg  text-black"
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
                  className="bg-slate-800 p-3 rounded-lg "
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
                  className="bg-slate-800 p-3 rounded-lg "
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
                  className="bg-slate-800 p-3 rounded-lg "
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
      </div>
    </>
  );
};

export default Creatorpage;
