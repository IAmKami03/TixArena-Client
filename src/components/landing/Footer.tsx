import React from "react";
import footer from "../../assets/images/landingPage/7bd6d90153a3b6c152303792c3b444c1ab9cf992.png";
import logo from "../../assets/images/landingPage/Frame 21.svg";
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="flex justify-center">
      <div className="relative w-full h-[300px] mt-12">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url("${footer}")` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/100 via-black/80 to-transparent">
            <div className="flex justify-between p-10">
              <div className="">
                <img src={logo} alt="" />
                <p>hello@logoipsum.com</p>
                <p>+1 891 989-11-91</p>
                <div className="flex items-center gap-2">
                  <FaWhatsapp className="text-green-800 text-2xl" />
                  <p>WhatsApp</p>
                </div>
              </div>
              <div className="flex flex-col">
                <a href="#">Home</a>
                <a href="#">Explore</a>
                <a href="#">Cineme</a>
                <a href="#">Contacts</a>
                <a href="#">About</a>
              </div>
              <div>
                <p>FAQ</p>
                <p>Delivery</p>
              </div>
              <div>
                <button className="border border-2 border-purple-600 rounded-xl px-4 py-2">
                  Calculate this post
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 flex justify-between p-10">
                <div>© 2023 — Copyright</div>
                <div>Privacy</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
