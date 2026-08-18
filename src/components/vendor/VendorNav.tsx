import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import logo from "../../assets/images/vendorImages/Vendor-logo.svg";
import backArrow from "../../assets/images/vendorImages/backArrow.svg";
import refresh from "../../assets/images/vendorImages/Refresh.svg";
import prof from "../../assets/images/vendorImages/profile.svg";
import arrDwn from "../../assets/images/vendorImages/arrow-down.svg";
import { useAuth } from "../../contexts/AuthContext";
import NavUserMenu from "../NavUserMenu";

interface VendorNavProps {
  isMobileNavOpen: boolean;
  onToggleMobileNav: () => void;
}

const VendorNav = ({ isMobileNavOpen, onToggleMobileNav }: VendorNavProps) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile/tablet: condensed bar — back-to-explore, logo + role, avatar opens the nav drawer */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-[#262525] bg-[#0B0B0B]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/explore")}
            aria-label="Back to explore"
            className="w-8 h-8 rounded-full bg-[#262525] flex items-center justify-center shrink-0"
          >
            <img src={backArrow} alt="" className="w-4 h-4" />
          </button>
          <div className="flex flex-col items-start gap-0.5">
            <img src={logo} alt="Tix Arena" className="h-6 w-auto" />
            <p className="text-[11px] text-[#838383] capitalize">{user?.role}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onToggleMobileNav}
          aria-label="Toggle menu"
          aria-expanded={isMobileNavOpen}
          className="flex items-center gap-1.5"
        >
          <span className="w-9 h-9 rounded-full bg-[#262525] flex items-center justify-center overflow-hidden">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <img src={prof} alt="" className="w-5 h-5" />
            )}
          </span>
          <IoIosArrowDown className="text-[#ABABAB]" size={14} />
        </button>
      </div>

      {/* Desktop: original bar, unchanged */}
      <div className="hidden lg:flex w-full items-center border-b border-[#262525] bg-[#0B0B0B] ">
        <div className="w-[22%] flex justify-between items-center px-6 py-4.5 border-r border-[#262525]">
          <img src={logo} alt="" />
          <img
            src={backArrow}
            alt=""
            onClick={() => navigate("/explore")}
            className="cursor-pointer"
          />
        </div>
        <div className="py-[12.5px] px-6 flex items-center justify-between w-[78%] border-l border-[#262525] ">
          <h2 className="font-semibold text-[23px] text-[#ABABAB]">
            Welcome!, <span className="text-[#FFFFFF]">{user?.firstName}</span>
          </h2>
          <div className="flex items-center gap-3.5 ">
            <div
              onClick={() => navigate("/explore")}
              className="flex items-center gap-2.5 px-3.5 py-4.25 bg-[#262525] rounded-[30px] cursor-pointer hover:bg-[#333] transition-colors"
            >
              <img src={refresh} alt="" />
              <p className="font-normal text-[16px] text-[#FFFFFF]">
                Switch to Browser
              </p>
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                aria-label="Account menu"
                className="flex items-center gap-2 cursor-pointer"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt=""
                    className="w-9 h-9 rounded-full object-cover shrink-0"
                  />
                ) : (
                  <img src={prof} alt="" />
                )}
                <img src={arrDwn} alt="" />
              </button>

              <NavUserMenu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                onViewProfile={() => {
                  setIsMenuOpen(false);
                  navigate("/profile");
                }}
                onSwitchToCreate={() => setIsMenuOpen(false)}
                onLogout={() => {
                  setIsMenuOpen(false);
                  logout();
                  navigate("/");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorNav;
