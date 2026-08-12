import { useEffect, useState } from "react";
import { format } from "date-fns";
import EventCard from "./EventCard";
import fallbackImage from "../../assets/images/vendorImages/eventimg2.svg";
import { useSearch } from "../../contexts/SearchContext";
import { getPublicEvents } from "../../services/eventService";
import { EVENT_CATEGORIES } from "../../types/event";
import type { Event } from "../../types/event";

const CATEGORIES = ["All", ...EVENT_CATEGORIES];
const PREVIEW_COUNT = 6;

const ExploreEvents = () => {
  const { searchQuery } = useSearch();
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    getPublicEvents()
      .then(setEvents)
      .catch(() => undefined);
  }, []);

  const query = searchQuery.trim().toLowerCase();
  const filteredEvents = events
    .filter((event) => {
      const categoryMatch =
        selectedCategory === "All" || event.category === selectedCategory;
      const searchMatch =
        !query || event.name.toLowerCase().includes(query);
      return categoryMatch && searchMatch;
    })
    .slice(0, PREVIEW_COUNT);

  return (
    <div className="flex justify-center px-4 sm:px-6 lg:px-0">
      <div className="w-full max-w-[1020px] text-start border-0 mt-4">
        <h2 className="text-[22px] sm:text-[30px] lg:text-[50px] text-white font-Instrument Serif font-normal">
          Explore Events
        </h2>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <p className="text-[#CECECE] text-[14px] font-inter font-normal">
              Browse events tailored to your interests, location, and <br />{" "}
              vibe—all in one seamless experience.
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`text-[13px] sm:text-[14px] lg:text-[16px] font-inter font-normal border rounded-full px-3 py-1.5 sm:px-4 sm:py-2 items-center cursor-pointer transition-colors ${
                  category === selectedCategory
                    ? "bg-[#995DFF] border-[#995DFF] text-white"
                    : "text-[#CECECE] border-[#1E1E1E] hover:bg-[#262525] hover:border-[#995DFF]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div>
          {filteredEvents.length === 0 ? (
            <p className="text-gray-400 mt-6">
              {query
                ? `No events found for "${searchQuery}"`
                : "No events found for this category."}
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-7">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event._id}
                  id={event._id}
                  tag={event.category.toLowerCase()}
                  image={event.image || fallbackImage}
                  date={format(new Date(event.date), "d MMM yyyy")}
                  time={event.time ?? ""}
                  title={event.name}
                  location={event.location ?? "Location not set"}
                  price="Free"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExploreEvents;
