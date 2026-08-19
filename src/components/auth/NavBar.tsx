import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/authImages/Tixlogo.svg";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <nav className="flex items-center justify-between px-4 sm:px-8 py-4 border-b border-[#1E1E1E] bg-[#0B0B0B]">
      <button
        onClick={() => navigate("/")}
        className="text-[#FFFFFF] text-[14px] font-[Manrope] shrink-0 cursor-pointer"
      >
        <span className="sm:hidden">← Back</span>
        <span className="hidden sm:inline">← Back to Exploring</span>
      </button>

      <img className="h-8 sm:h-10.5 shrink-0" src={logo} alt="" />

      <button
        type="button"
        onClick={() => navigate("/help")}
        className="flex items-center justify-center gap-[10px] w-[102px] h-[45px] rounded-[30px] bg-[#262525] text-[#FFFFFF] text-[16px] font-[Manrope] font-[300] tracking-[-0.03em] shrink-0 hover:bg-[#333] transition-colors"
      >
        <span className="flex items-center justify-center w-4 h-4 rounded-full border border-[#ABABAB] text-[#ABABAB] text-[10px] font-[300]">
          ?
        </span>
        Help
      </button>
    </nav>
  );
};

export default NavBar;
