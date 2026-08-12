// Commented out: replaced by the unified src/components/NavBar.tsx (logged-out branch).
// Kept here (rather than deleted) at the user's request.
/*
import React from "react";
import { CiSearch } from "react-icons/ci";
import logo from "../../assets/images/landingPage/Frame 21.svg";
import { CiCircleQuestion } from "react-icons/ci";
import { useSearch } from "../../contexts/SearchContext";
const NavBar = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  return (
    <nav className="flex items-center justify-between px-15 py-10 border-b border-[#1E1E1E]">
      <div className="flex gap-4">
        <div className="flex gap-[30px] items-center">
          <p>Explore</p>
          <p>Cinema</p>
        </div>
        <div className="flex items-center px-4 py-2 gap-2  w-[250px] rounded-full bg-[#262525]">
          {<CiSearch className="text-[#FFFFFF] text-lg shrink-0" />}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="search event"
            className="flex-1 outline-none text-[#FFFFFF] bg-[#262525] placeholder:text-[#FFFFFF] text-sm h-8.5"
          />
        </div>
      </div>
      <div>
        <img src={logo} alt="" />
      </div>

      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-[#262525] border-0 flex items-center justify-center">
          <CiCircleQuestion className="text-lg" />
        </div>

        <Link
          to="/signup"
          className="bg-[#995DFF] text-[#FFFFFF] rounded-full px-6 py-3 items-center"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
*/
