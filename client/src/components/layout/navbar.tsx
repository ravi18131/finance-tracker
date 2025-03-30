import { Github, Code } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="fixed w-full z-50 border-b border-gray-800 bg-gray-950/90 backdrop-blur-sm">
      <nav className="py-2.5">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
          <Link to="/" className="flex items-center">
            <Code className="h-6 w-6 mr-3 text-primary" />
            <span className="self-center text-xl font-semibold whitespace-nowrap bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              TS React+Node
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
            <div className="hidden mr-4 sm:inline-block">
              <Link
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-md px-3 py-1.5 ring-1 ring-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                to="https://github.com/ankitarima/stater-template-nodejs-react"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Star on GitHub"
              >
                <Github className="h-4 w-4" />
                Star
              </Link>
            </div>

            <Link
              to="https://github.com/ankitarima/stater-template-nodejs-react"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-primary hover:bg-primary/90 focus:ring-4 focus:ring-primary/30 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 focus:outline-none"
            >
              Download
            </Link>

            <button
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-400 rounded-lg lg:hidden hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => {
                const mobileMenu = document.getElementById("mobile-menu");
                if (mobileMenu) {
                  mobileMenu.classList.toggle("hidden");
                }
              }}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <Link
                  to="#"
                  className="block py-2 pl-3 pr-4 text-gray-400 border-b border-gray-700 hover:bg-gray-800 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary lg:p-0 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="#features"
                  className="block py-2 pl-3 pr-4 text-gray-400 border-b border-gray-700 hover:bg-gray-800 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary lg:p-0 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="#why-use"
                  className="block py-2 pl-3 pr-4 text-gray-400 border-b border-gray-700 hover:bg-gray-800 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary lg:p-0 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Why Use
                </Link>
              </li>
              <li>
                <Link
                  to="#opensource"
                  className="block py-2 pl-3 pr-4 text-gray-400 border-b border-gray-700 hover:bg-gray-800 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary lg:p-0 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Open Source
                </Link>
              </li>
              <li>
                <Link
                  to="#get-started"
                  className="block py-2 pl-3 pr-4 text-gray-400 border-b border-gray-700 hover:bg-gray-800 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary lg:p-0 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
