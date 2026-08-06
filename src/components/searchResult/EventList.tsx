import EventCard from "./EventCard";
import { toEventCardData } from "./eventCardMapper";
import Pagination from "../common/Pagination";
import { useEvents } from "../../contexts/EventContext";
import { usePagination } from "../../hooks/usePagination";

const PAGE_SIZE = 6;

const EventList = () => {
  const { filteredEvents, activeFilters, clearFilters } = useEvents();
  const { page, setPage, totalPages, pageItems } = usePagination(
    filteredEvents,
    PAGE_SIZE,
  );

  return (
    <div className="flex flex-col gap-3.75">
      <div className="flex flex-wrap items-center justify-between gap-y-3">
        <div className="flex flex-wrap items-center gap-2.5">
          {activeFilters.map((filter) => (
            <div
              key={filter.key}
              className="flex items-center px-3 py-2 rounded-[60px] gap-2 border border-[#2D2D2D] text-[#ABABAB]"
            >
              <p>{filter.label}</p>
              <button type="button" onClick={filter.onClear}>
                x
              </button>
            </div>
          ))}
          {activeFilters.length > 0 && (
            <button
              type="button"
              onClick={clearFilters}
              className="pt-5 text-[#838383]"
            >
              Clear Filter
            </button>
          )}
        </div>
        <div className="flex justify-between">
          <span className="pt-5 text-[#838383]">
            Results: {filteredEvents.length}
          </span>
        </div>
      </div>

      {pageItems.map((event) => (
        <EventCard key={event._id} event={toEventCardData(event)} />
      ))}

      <div className="flex justify-center pt-4">
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
};

export default EventList;
