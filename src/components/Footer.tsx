import { Link } from "react-router-dom";
import footerBg from "../assets/images/eventsImages/7bd6d90153a3b6c152303792c3b444c1ab9cf992.png";
import logo from "../assets/images/eventsImages/Frame 21.svg";
import whatsappIcon from "../assets/images/eventsImages/whatsapp.svg";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-[#2A2A2A]">
      {/* Background image layer */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${footerBg})` }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content — sits on top */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
        {/* Top section — three columns */}
        <div className="flex flex-col gap-10 sm:flex-row sm:flex-wrap sm:justify-between sm:items-start lg:flex-nowrap mb-12">
          {/* Left — logo + contact */}
          <div className="space-y-2">
            <img src={logo} alt="Tix Arena" className="mb-4" />
            <p className="font-manrope text-[12px] text-[#DCC7BC] font-medium">
              hello@logopsum.com
            </p>
            <p className="text-[#DCC7BC] font-bold text-[20px]">
              +1 891 989-11-91
            </p>
            <div className="flex items-center gap-2 mt-2">
              <img src={whatsappIcon} alt="WhatsApp" className="w-4 h-4" />
              <p className="font-manrope text-[12px] text-[#DCC7BC] font-medium cursor-pointer hover:text-white">
                WhatsApp
              </p>
            </div>
          </div>

          {/* Center — two link columns */}
          <div className="flex gap-12">
            <div className="space-y-3 font-manrope text-[#DCC7BC]">
              <Link to="/" className="block text-sm hover:text-white">
                Home
              </Link>
              <Link to="/explore" className="block text-sm hover:text-white">
                Explore
              </Link>
              <Link to="/help" className="block text-sm hover:text-white">
                Contacts
              </Link>
              <Link to="/about" className="block text-sm hover:text-white">
                About
              </Link>
            </div>
          </div>

          <div className="space-y-3 text-[14px] *:font-manrope text-[#DCC7BC]">
            <Link to="/help" className="block text-sm hover:text-white">
              FAQ
            </Link>
          </div>

          {/* Right — button */}
          <button className="border border-[#995DFF] text-white text-sm px-6 py-3 rounded-xl hover:bg-white/10 transition-colors self-start">
            Calculate the cost
          </button>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between border-t border-[#2A2A2A] pt-6">
          <p className="text-gray-400 text-sm">© 2023 — Copyright</p>
          <Link to="/privacy" className="text-gray-400 text-sm hover:text-white">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
