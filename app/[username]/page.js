import PaymentPage from "@/components/paymentpage";
import React from "react";
import connectDB from "../db/connectDB";
import User from "../models/User";
import { notFound } from "next/navigation";

const Username = async ({ params }) => {

  const checkUser = async () => {

    await connectDB();
    let u = await User.findOne({username:params.username})
    if(!u){
      return notFound();
    } 
  }
  await checkUser();
  
  return (
    <>
      <PaymentPage username={params.username} />
    </>
  );
};

export default Username;

export async function generateMetadata({params}) {
  return {
    title : `Your Page - ${params.username} - CreatorFund!!!`
  }
}
