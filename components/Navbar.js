"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { findCreator } from "@/app/actions/useractions";
import { deleteProfile } from "@/app/actions/useractions";
import { MdHome } from "react-icons/md";

const Navbar = () => {
  const [showdropdown, setShowdropdown] = useState(false);
  const [creator, setCreator] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  const handleChange = (e) => {
    setCreator(e.target.value);
  };

  const handleDelete = async () => {
    let response = window.confirm(
      "Are you sure you want to delete your profile?"
    );

    if (response) {
      
      alert("Deleting...");
      let isDeleted = await deleteProfile(session.user.email);

      if (isDeleted) {
        const signOutResponse = await signOut();

        if (signOutResponse.error) {
          alert("Error signing out. Please try again.");
        } else {
          alert(
            "Your profile has been deleted and you have been signed out. You will now be redirected to the login page."
          );

          setTimeout(() => {
            router.push("/login");
          }, 5000);
        }
      } else {
        alert("Unable to delete your profile. Please try again later.");
      }
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    let creatorData = await findCreator(creator);
    if (creatorData) {
      router.push(`/creator/${creatorData.username}`);
    } else {
      alert("No such creator exists");
    }
  };

  return (
    <nav className="bg-gray-900 text-white flex flex-col justify-between items-center px-4 md:h-12 md:flex-row">
       <Link
        className="logo font-bold text-2xl flex justify-center items-center gap-1"
        href={"/"}
      >
        <span className="text-3xl">
          <MdHome />
        </span>
        <span className="my-3 md:my-0">
          CreatorFund
        </span>
      </Link>
      <div className="md:flex md:flex-row gap-4 items-center">
        <form className="max-w-md mx-auto" onSubmit={handleClick}>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-2 ps-10 text-sm text-gray-900 border  rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Creators"
              onChange={handleChange}
              value={creator}
              required
            />
            <button
              type="submit"
              className="absolute end-2 bottom-1 px-1 py-1 right-0 bg-blue-700 text-white rounded-lg"
            >
              Search
            </button>
          </div>
        </form>
        <ul className="flex justify-between gap-4 items-center">
          <div className="pt-2 relative gap-2 md:block">
            {session && (
              <>
                <button
                  onClick={() => setShowdropdown(!showdropdown)}
                  onBlur={() => {
                    setTimeout(() => {
                      setShowdropdown(false);
                    }, 300);
                  }}
                  id="dropdownDefaultButton"
                  data-dropdown-toggle="dropdown"
                  className="text-white mx-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                >
                  Welcome {session.user.name}
                  <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                <div
                  id="dropdown"
                  className={`z-10 ${
                    showdropdown ? "" : "hidden"
                  } absolute left-[145px] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    <li>
                      <Link
                        href="/about"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <a
                        href={`/${session.user.name}`}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Your Page
                      </a>
                    </li>
                    <li
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                      onClick={handleDelete}
                    >
                      Delete Profile
                    </li>
                  </ul>
                </div>
              </>
            )}
            {session && (
              <button
                type="button"
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                onClick={() => signOut()}
              >
                Logout
              </button>
            )}
          </div>
        </ul>
        <div className="flex justify-center items-center mt-2">
          {!session && (
            <Link href={"/login"}>
              <button
                type="button"
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
