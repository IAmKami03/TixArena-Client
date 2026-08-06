import { useEffect, useState } from "react";
import { format } from "date-fns";
import CategoryTabs from "../components/explore/CategoryTabs";
import EventSection from "../components/explore/EventSection";
import Hero from "../components/explore/Hero";
import fallbackImage from "../assets/images/vendorImages/eventimg2.svg";
import { useSearch } from "../contexts/SearchContext";
import { getPublicEvents } from "../services/eventService";
import { getErrorMessage } from "../lib/api";
import type { Event } from "../types/event";

function Explore() {
  const { searchQuery } = useSearch();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    getPublicEvents()
      .then(setEvents)
      .catch((err) => setLoadError(getErrorMessage(err)))
      .finally(() => setIsLoading(false));
  }, []);

  const query = searchQuery.trim().toLowerCase();
  const filteredEvents = events.filter((event) => {
    const categoryMatch =
      selectedCategory === "All" || event.category === selectedCategory;
    const searchMatch =
      !query ||
      event.name.toLowerCase().includes(query) ||
      event.category.toLowerCase().includes(query) ||
      (event.location ?? "").toLowerCase().includes(query);
    return categoryMatch && searchMatch;
  });

  const cardEvents = filteredEvents.map((event) => ({
    id: event._id,
    image: event.image || fallbackImage,
    title: event.name,
    date: format(new Date(event.date), "d MMM yyyy"),
    time: event.time ?? "",
    location: event.location ?? "Location not set",
    price: "Free",
    category: event.category,
  }));

  return (
    <div className="bg-[#0B0B0B] min-h-screen px-4 sm:px-8 lg:px-20">
      <Hero />
      <CategoryTabs selected={selectedCategory} onSelect={setSelectedCategory} />

      {isLoading ? (
        <p className="text-gray-400 text-center mt-14">Loading events...</p>
      ) : loadError ? (
        <p className="text-red-400 text-center mt-14">{loadError}</p>
      ) : filteredEvents.length === 0 ? (
        <p className="text-gray-400 text-center mt-14">
          {query
            ? `No events found for "${searchQuery}"`
            : "No events found for this category."}
        </p>
      ) : (
        <EventSection title="Upcoming Events" events={cardEvents} />
      )}
    </div>
  );
}

export default Explore;
