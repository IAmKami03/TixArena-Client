import { useState } from "react";
import { LuSlidersHorizontal } from "react-icons/lu";
import { useEvents } from "../contexts/EventContext";
import Filter from "../components/searchResult/Filter";
import EventList from "../components/searchResult/EventList";
import NoResult from "../components/searchResult/NoResult";

const Event = () => {
  const { filteredEvents, isLoading, loadError, activeFilters } = useEvents();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 lg:gap-7.5 px-4 sm:px-8 lg:px-25 pt-6 lg:pt-12.5 pb-12 lg:pb-25">
      {/* Desktop: filter sidebar inline */}
      <div className="hidden lg:block">
        <Filter />
      </div>

      {/* Mobile/tablet: trigger that opens the filters as a popup */}
      <button
        type="button"
        onClick={() => setIsFilterOpen(true)}
        className="lg:hidden flex items-center justify-between gap-2 rounded-[20px] border border-[#2D2D2D] px-5 py-3.5 text-[#ECECEC]"
      >
        <span className="flex items-center gap-2">
          <LuSlidersHorizontal size={18} />
          Filters
        </span>
        {activeFilters.length > 0 && (
          <span className="flex items-center justify-center min-w-6 h-6 px-1.5 rounded-full bg-[#995DFF] text-white text-[13px] font-medium">
            {activeFilters.length}
          </span>
        )}
      </button>

      <div className="flex-1 min-w-0">
        {isLoading ? (
          <p className="text-gray-400 text-center mt-14">Loading events...</p>
        ) : loadError ? (
          <p className="text-red-400 text-center mt-14">{loadError}</p>
        ) : filteredEvents.length > 0 ? (
          <EventList />
        ) : (
          <NoResult />
        )}
      </div>

      {/* Mobile/tablet: filters popup */}
      {isFilterOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/60"
          onClick={() => setIsFilterOpen(false)}
        >
          <div
            className="bg-[#0B0B0B] rounded-t-[30px] max-h-[85vh] overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <Filter onClose={() => setIsFilterOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Event;
