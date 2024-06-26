import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useFirebase } from "../../context/Firebase";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const firebase = useFirebase();
  const location = useLocation();
  console.log(firebase.userData);
  return (
    <nav
      className={`bg-white sticky w-full z-20 top-0 start-0 border-b border-gray-200 ${
        firebase.theme ? "dark:bg-gray-900 dark:border-gray-600" : ""
      } `}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          onClick={()=>{window.scrollTo(0,0)}}
          to="/chatapp"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 mx-1" viewBox="0 0 512 512"><path fill={firebase.theme?"#ffffff":""} d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/></svg>
          <span
            className={`self-center text-2xl font-semibold whitespace-nowrap ${
              firebase.theme ? "dark:text-white" : ""
            }`}
          >
            ChatPlane
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {firebase.loggedIn && (
            <div className="flex h-12">
              {firebase.loggedIn && (
                <div className="flex justify-center align-center">
                  <img
                    src={firebase.userData.photoURL}
                    className="rounded-full border border-gray-100 shadow-sm"
                    alt="You Here"
                  />
                  <button
                    onClick={() => signOut(firebase.auth)}
                    type="button"
                    className="m-1 mx-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          )}
          {!firebase.loggedIn && (
            <Link
              to="/signin"
              className="m-1 mx-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sign In
            </Link>
          )}
          {/* toggle theme button here */}
          <label className="inline-flex items-center cursor-pointer rotate-90">
            <input
              type="checkbox"
              onChange={() => {
                firebase.settheme(!firebase.theme);
                const locTheme = localStorage.getItem("chatapptheme");
                if (
                  locTheme === undefined ||
                  locTheme === null ||
                  locTheme === "false"
                ) {
                  localStorage.setItem("chatapptheme", "true");
                } else {
                  localStorage.setItem("chatapptheme", "false");
                }
              }}
              className="sr-only peer"
              defaultChecked={firebase.theme ? "true" : ""}
            />
            <div className="relative w-7 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>

          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul
            className={`flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white ${
              firebase.theme
                ? "dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
                : ""
            }`}
          >
            <li>
              <Link 
                onClick={()=>{window.scrollTo(0,0)}}
                to="/chatapp"
                className={`block py-2 px-3 rounded md:p-0 ${
                  location.pathname === "/"
                    ? "md:dark:text-blue-500 text-blue-700"
                    : "text-gray-900 hover:bg-gray-100"
                } md:bg-transparent  ${
                  firebase.theme
                    ? "md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    : ""
                }`}
                aria-current={location.pathname === "/" ? "page" : undefined}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                onClick={()=>{window.scrollTo(0,0)}}
                to="/chatapp/about"
                className={`block py-2 px-3 rounded md:p-0 ${
                  location.pathname === "/about"
                    ? "md:dark:text-blue-500 text-blue-700 bg-blue-700"
                    : "text-gray-900 hover:bg-gray-100"
                } md:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 ${
                  firebase.theme
                    ? "md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    : ""
                }`}
                aria-current={
                  location.pathname === "/chatapp/about" ? "page" : undefined
                }
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/chatwall"
                className={`block py-2 px-3 rounded md:p-0 ${
                  location.pathname === "/chatwall"
                    ? "md:dark:text-blue-500 text-blue-700 bg-blue-700"
                    : "text-gray-900 hover:bg-gray-100"
                } md:bg-transparent md:hover:text-blue-700 md:p-0 ${
                  firebase.theme
                    ? "md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    : ""
                }`}
                aria-current={
                  location.pathname === "/chatwall" ? "page" : undefined
                }
              >
                Chatwall
              </Link>
            </li>
            <li></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
