/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import {
  fetchpayments,
  initiate,
  fetchuser,
  projectUpdate,
} from "@/app/actions/useractions";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { projectSave } from "@/app/actions/useractions";
import { fetchdetail } from "@/app/actions/useractions";

const UserPage = ({ username }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [payments, setPayments] = useState([]);
  const [form, setform] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  //const [edit, setEdit] = useState(false)
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      try {
        let u = await fetchuser(username);
        setCurrentUser(u);
        let projectDetail = await fetchdetail(username);

        if (projectDetail) {
          setform(projectDetail);
          setIsEditable(projectDetail.isEditable);
        } else {
        }
        let dbPayments = await fetchpayments(username);
        setPayments(dbPayments);
      } catch (error) {}
    };

    getData();
  }, [username]);

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    let cnf = window.confirm(
      "Important: After saving, most project details cannot be edited.\n" +
        "You can only provide updates using the 'Project Update' field.\n" +
        "Are you sure you want to save?"
    );
    if (cnf) {
      try {
        const projectData = {
          ...form,
          email: session.user.email,
          username: username,
          isEditable: true,
        };
        const res = await projectSave(projectData);

        if (res == true) {
          toast("Project details saved successfully!", {
            // ... toast configuration ...
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setIsEditable(true);
          //setEdit(true);
          return true;
        } else {
          toast.error("Unable to save: Enter Project details", {
            // ... toast configuration ...
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          return false;
        }
      } catch (error) {
        return false;
      }
    }
  };

  const handleEdit = async () => {
    try {
      let res = await projectUpdate(username, { ...form, isEditable: true });
      if (res == true) {
        toast("Project details updated successfully!", {
          // ... toast configuration ...
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        return true;
      } else {
        toast.error("Unable to edit details: Please try again later", {
          // ... toast configuration ...
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return false;
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/login");
    }
  }, [router, session, status]);

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

        <div className="container bg-slate-900">
          <div className="h-[550px] flex  w-full  my-5 rounded-lg p-10 ml-6">
            <div className=" w-[33%] mr-10 border-r-4 border-gray-600 part1 pr-10">
              <h2 className="text-2xl font-bold mb-3 text-white">
                Funding Details
              </h2>
              <div>
                <h3 className="mb-2">Project Name:</h3>
                <input
                  className="w-full rounded-full p-3 border  border-violet-800 h-10 bg-white text-black"
                  type="text"
                  placeholder="Enter Project Name"
                  name="projectName"
                  value={form.projectName || ""}
                  onChange={handleChange}
                  disabled={isEditable}
                />
              </div>
              <div>
                <h3 className="mb-2">Funding Amount:</h3>
                <input
                  className="w-full rounded-full p-3 border border-violet-800 h-10 bg-white text-black"
                  type="number"
                  placeholder="Enter Funding Amount"
                  name="fundingAmount"
                  value={form.fundingAmount || ""}
                  onChange={handleChange}
                  disabled={isEditable}
                />
              </div>
              <div>
                <h3 className="mb-2">Funding Goal:</h3>
                <input
                  className="w-full rounded-full p-3 border border-violet-800 h-10 bg-white text-black"
                  type="text"
                  placeholder="Enter Funding Goal"
                  name="fundingGoal"
                  value={form.fundingGoal || ""}
                  onChange={handleChange}
                  disabled={isEditable}
                />
              </div>
              <div>
                <h3 className="mb-2">Project Link:</h3>
                <input
                  className="w-full rounded-full p-3 border border-violet-800 h-10 bg-white text-black"
                  type="text"
                  placeholder={
                    !form.projectLinkmb &&
                    "No link available. Enter Project Link"
                  }
                  name="projectLink"
                  value={form.projectLink || ""}
                  onChange={handleChange}
                />
                {form.projectLink && (
                  <a
                    href={form.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline block mt-2"
                  >
                    Visit Project Link
                  </a>
                )}
              </div>

              <div>
                <h3 className="mb-2">Project Update</h3>
                <textarea
                  className="w-full p-3 border border-violet-800 bg-white text-black resize-none"
                  placeholder="Enter Project Update"
                  name="projectUpdate"
                  rows={3}
                  value={form.projectUpdate || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="w-[33%] mr-16  part-2">
              <h1 className="text-2xl font-bold mb-3 text-white">
                Enter Project Description
              </h1>
              <textarea
                className="mx-5 mt-3 w-full p-3 border border-violet-800 bg-white text-black resize-none"
                placeholder="Enter Project Description"
                rows={13}
                name="projectDescription"
                value={form.projectDescription || ""}
                onChange={handleChange}
                disabled={isEditable}
              />
            </div>

            <div className="border-l-4 border-gray-600 pl-10 part-3">
              {payments.length === 0 ? (
                <h1 className="text-center">No payments yet.</h1>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold mb-3">Top 7 Supporters</h2>
                  <ul className="mx-5">
                    {payments.map((p, i) => (
                      <li key={i} className="my-4 flex gap-2 items-center">
                        <img
                          width={33}
                          height={33}
                          src="/profile.png"
                          alt="user profile"
                          className="rounded-full"
                        />
                        <span>
                          {p.name} donated
                          <span className="font-bold"> {p.amount}</span> with a
                          message {p.message}.
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="w-[66%] text-center pb-5">
            <button
              type="button"
              className=" text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-xl px-5 py-2.5 text-center mb-2"
              onClick={isEditable ? handleEdit : handleSave}
            >
              {isEditable ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPage;
