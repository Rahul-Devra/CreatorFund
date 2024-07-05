"use client";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import { fetchpayments, initiate, fetchuser } from "@/app/actions/useractions";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";


const PaymentPage = ({ username }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [payments, setPayments] = useState([]);
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      let u = await fetchuser(username);
      setCurrentUser(u);
      let dbPayments = await fetchpayments(username);
      setPayments(dbPayments);
    };

    getData();
  }, [username]);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/login");
    }
    
  }, [router, session, status]);

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <div className="cover w-full bg-red-50 relative mt-5">
        <img
          className="object-cover w-full h-48 md:h-[350px] shadow-blue-700 shadow-sm"
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

        <div className="supporters md:w-[50%] bg-slate-900 mx-5 my-5 rounded-lg p-10 ">
          {payments.length === 0 ? (<h1 className="text-center">No payments yet.</h1>):
         (<div><h2 className="text-2xl font-bold my-5">Top 7 Supporters</h2><ul className="mx-5">
              {payments.map((p, i) => (
                <li key={i} className="my-4 flex gap-2 items-center">
                  <img
                    width={33}
                    height={33}
                    src="/profile.png"
                    alt="user profile"
                    className="rounded-full" />
                  <span>
                    {p.name} donated
                    <span className="font-bold"> {p.amount}</span> with a message{" "}
                    {p.message}.
                  </span>
                </li>
              ))}
            </ul></div> )}
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
