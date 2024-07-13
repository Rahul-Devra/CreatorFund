import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-950 text-white h-20">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex w-full justify-around">
            <div className="px-4 text-center">
              <h3 className="text-sm font-semibold mb-1">Contact Us</h3>
              
              <p className="text-xs">Email: contact@CrowdLaunch.com</p>
            </div>
            <div className="px-4 text-center">
              <h3 className="text-sm font-semibold mb-1">Stay Connected</h3>
              
              <p className="text-xs">
                Follow us on&nbsp;
                <a
                  href="https://github.com/Rahul-Devra"
                  className="text-blue-400 hover:text-blue-600"
                >
                GitHub&nbsp;
                </a>
                and&nbsp;
                <a
                  href="https://www.linkedin.com/in/rahul-devra/"
                  className="text-blue-400 hover:text-blue-600"
                >
                LinkedIn
                </a>
              </p>
              
            </div>
            <div className="px-4 text-center">
              <h3 className="text-sm font-semibold mb-1">Legal</h3>

              <p className="text-xs">
                &copy; {new Date().getFullYear()} . All rights reserved.
              </p>
              
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
