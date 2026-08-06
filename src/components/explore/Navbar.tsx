// TODO: once you export images from Figma, uncomment and fix these paths:
import fotlogo from "../assets/images/fotlogo.png";
import sideicon from "../assets/images/sideicon.png";

function Navbar() {
  return (
    <nav className="relative bg-black text-white px-6 py-4 flex items-center justify-between">
      {/* LEFT GROUP: nav links + search bar */}
      <div className="flex items-center gap-6">
        <div className="flex gap-6 text-sm whitespace-nowrap">
          <p>Explore</p>
          <p>Cinema</p>
        </div>

        <div className="flex items-center gap-2 bg-[#1a1a1a] px-3 py-2 rounded-full">
          <div>🔍</div>
          <input
            type="text"
            placeholder="Search event"
            className="bg-transparent text-white text-sm outline-none placeholder-gray-400 w-32"
          />
          <div className="text-sm border-l border-gray-600 pl-2 whitespace-nowrap">
            Lagos
          </div>
          <div>⚙️</div>
        </div>
      </div>

      {/* CENTER: Logo — perfectly centered regardless of side widths */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
        {/* TODO: replace the line below with:
        <img src={logo} alt="Tix Arena logo" className="w-6 h-6" /> */}
        <div className="text-purple-500 text-xl">
          <img src={fotlogo} alt="" className="w-6 h-6" />{" "}
        </div>
        <h1 className="font-bold text-lg whitespace-nowrap"></h1>
      </div>

      {/* RIGHT GROUP: icon button + Switch to Creator + avatar */}
      <div className="flex items-center gap-3">
        <button className="bg-[#1a1a1a] p-2 rounded-full">
          {/* TODO: replace the line below with:
              <img src={menuIcon} alt="menu icon" className="w-5 h-5" /> */}
          <span>
            <img src={sideicon} alt="" className="w-5 h-5" />
          </span>
        </button>

        <button className="bg-[#1a1a1a] text-white text-sm px-4 py-2 rounded-full whitespace-nowrap">
          Switch to Creator
        </button>

        {/* TODO: replace the line below with:
            <img src={avatar} alt="profile" className="w-8 h-8 rounded-full object-cover" /> */}
        <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
      </div>
    </nav>
  );
}

export default Navbar;
