import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CiSearch, CiCircleQuestion } from "react-icons/ci";
import { LuUser, LuTicket, LuMenu, LuX } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import logo from "../assets/images/landingPage/Frame 21.svg";
import { useSearch } from "../contexts/SearchContext";
import { useAuth } from "../contexts/AuthContext";
import NavUserMenu from "./NavUserMenu";

const NavBar = () => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useSearch();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const goToSearchResults = () => {
    navigate("/search-result");
    setIsMobileNavOpen(false);
  };

  return (
    <nav className="px-4 sm:px-8 lg:px-15 py-6 lg:py-10 border-b border-[#1E1E1E]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setIsMobileNavOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="md:hidden text-white"
          >
            {isMobileNavOpen ? <LuX size={22} /> : <LuMenu size={22} />}
          </button>

          <div className="hidden md:flex gap-[30px] items-center">
            <Link to="/explore" className="text-[#FFFFFF]">
              Explore
            </Link>
            <p onClick={() => navigate("/cinema")} className="text-[#FFFFFF]">
              Cinema
            </p>
          </div>

          <div className="hidden md:flex items-center px-4 py-2 gap-2 w-[250px] rounded-full bg-[#262525]">
            <button
              type="button"
              onClick={() => navigate("/search-result")}
              aria-label="Search"
              className="shrink-0"
            >
              <CiSearch className="text-[#FFFFFF] text-lg" />
            </button>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") navigate("/search-result");
              }}
              placeholder="Search event"
              className="flex-1 outline-none text-[#FFFFFF] bg-[#262525] placeholder:text-[#FFFFFF] text-sm h-8.5"
            />
          </div>
        </div>

        <Link to="/">
          <img src={logo} alt="" />
        </Link>

        {user ? (
          <div className="relative flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#262525] flex items-center justify-center">
              <LuTicket className="text-white" size={15} />
            </div>
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="flex items-center gap-1.5"
            >
              <span className="w-8 h-8 rounded-full bg-[#262525] flex items-center justify-center overflow-hidden">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <LuUser size={16} className="text-white" />
                )}
              </span>
              <IoIosArrowDown className="text-[#ABABAB]" size={14} />
            </button>

            <NavUserMenu
              isOpen={isMenuOpen}
              canSwitchToCreate={
                user.role === "vendor" || user.role === "admin"
              }
              onClose={() => setIsMenuOpen(false)}
              onViewProfile={() => {
                setIsMenuOpen(false);
                navigate("/profile");
              }}
              onSwitchToCreate={() => {
                setIsMenuOpen(false);
                navigate("/vendor");
              }}
              onLogout={() => {
                setIsMenuOpen(false);
                logout();
                navigate("/");
              }}
            />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/help"
              aria-label="Help"
              className="w-8 h-8 rounded-full bg-[#262525] border-0 flex items-center justify-center hover:bg-[#333] transition-colors"
            >
              <CiCircleQuestion className="text-lg text-white" />
            </Link>

            <Link
              to="/signin"
              className="bg-[#995DFF] text-[#FFFFFF] text-[16px] sm:text-[18px] rounded-full sm:px-4.25 px-3 sm:py-3.5 py-2 items-center"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>

      {isMobileNavOpen && (
        <div className="md:hidden flex flex-col gap-4 pt-5">
          <div className="flex items-center gap-[30px]">
            <Link
              to="/explore"
              onClick={() => setIsMobileNavOpen(false)}
              className="text-[#FFFFFF]"
            >
              Explore
            </Link>
            <p className="text-[#FFFFFF]">Cinema</p>
          </div>

          <div className="flex items-center px-4 py-2 gap-2 w-full rounded-full bg-[#262525]">
            <button
              type="button"
              onClick={goToSearchResults}
              aria-label="Search"
              className="shrink-0"
            >
              <CiSearch className="text-[#FFFFFF] text-lg" />
            </button>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") goToSearchResults();
              }}
              placeholder="Search event"
              className="flex-1 outline-none text-[#FFFFFF] bg-[#262525] placeholder:text-[#FFFFFF] text-sm h-8.5"
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
