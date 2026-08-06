import { useEvents } from "../contexts/EventContext";
import Filter from "../components/searchResult/Filter";
import EventList from "../components/searchResult/EventList";
import NoResult from "../components/searchResult/NoResult";



const Event = () => {
  const { filteredEvents, isLoading, loadError } = useEvents();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 lg:gap-7.5 px-4 sm:px-8 lg:px-25 pt-6 lg:pt-12.5 pb-12 lg:pb-25">
      <Filter />
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
    </div>
  );
};

export default Event;
