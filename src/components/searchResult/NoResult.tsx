import ticketImage from "../../assets/images/searchResult/Ticket.svg";
import EventCard from "./EventCard";
import { toEventCardData } from "./eventCardMapper";
import { useEvents } from "../../contexts/EventContext";

const NoResult = () => {
  const { events, activeFilters, clearFilters } = useEvents();
  const suggestions = events.slice(0, 6);

  return (
    <div>
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
          <span className="pt-5 text-[#838383]">Results: 0</span>
        </div>
      </div>
      <div className="flex flex-col justify-between items-center text-center  gap-4 border border-[#262525] rounded-[30px] mb-17.5">
        <div className="max-w-sm mx-auto py-25">
          <img src={ticketImage} alt="" className="max-w-sm mx-auto" />
          <h1 className="text-[45px] text-[#CECECE]">No Result Found</h1>
          <p className="text-[#CECECE]">
            Complete the final steps to get your personalized account up and
            running.
          </p>
        </div>
      </div>
      {suggestions.length > 0 && (
        <div className="text-start">
          <h1 className="text-[35px] pb-2.75 text-[#CECECE]">You may like</h1>
          {suggestions.map((event) => (
            <EventCard key={event._id} event={toEventCardData(event)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NoResult;
