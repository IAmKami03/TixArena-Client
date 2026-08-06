import { CiSearch } from "react-icons/ci";
import { FiSliders } from "react-icons/fi";
import { useSearch } from "../../contexts/SearchContext";

function Hero() {
  const { searchQuery, setSearchQuery } = useSearch();

  return (
    <div className="text-center py-10 px-4">
      <h1 className="text-white text-5xl font-serif">Top Event Near You</h1>

      <div className="max-w-2xl mx-auto mt-6 flex items-center bg-[#1a1a1a] rounded-full px-4 py-3">
        <CiSearch className="text-gray-400 text-lg shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search event"
          className="flex-1 bg-transparent text-white px-3 outline-none placeholder-gray-400"
        />
        <span className="text-white text-sm border-l border-gray-600 pl-3">
          Lagos
        </span>
        <FiSliders className="text-gray-400 ml-2 shrink-0" size={16} />
      </div>
    </div>
  );
}

export default Hero;
