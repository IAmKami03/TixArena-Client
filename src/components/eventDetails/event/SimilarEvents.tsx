import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import locationIcon from "../../../assets/images/eventsImages/location-06.svg";
import fallbackImage from "../../../assets/images/vendorImages/eventimg2.svg";
import { getPublicEvents } from "../../../services/eventService";
import type { Event } from "../../../types/event";

interface SimilarEventsProps {
  currentEventId?: string;
}

const SimilarEvents = ({ currentEventId }: SimilarEventsProps) => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    getPublicEvents()
      .then((all) =>
        setEvents(all.filter((event) => event._id !== currentEventId).slice(0, 8)),
      )
      .catch(() => undefined);
  }, [currentEventId]);

  if (events.length === 0) return null;

  const renderCard = (event: Event, keyPrefix: string) => (
    <Link
      to={`/event/${event._id}`}
      key={`${keyPrefix}-${event._id}`}
      className="min-w-[280px] mr-4 bg-[#0C0C0C] rounded-[30px] overflow-hidden border border-[#2A2A2A] flex-shrink-0 block"
    >
      <div className="relative">
        <img
          src={event.image || fallbackImage}
          alt={event.name}
          className="w-full h-48 object-cover bg-[#2A2A2A]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        <span className="absolute top-3 left-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
          {event.category}
        </span>
      </div>
      <div className="p-4 space-y-2">
        <p className="text-gray-400 text-xs">
          {format(new Date(event.date), "d MMM yyyy")}
          {event.time ? ` • ${event.time}` : ""}
        </p>
        <p className="text-white font-semibold">{event.name}</p>
        <div className="flex items-center gap-1">
          <img src={locationIcon} alt="" className="w-3 h-3" />
          <p className="text-gray-400 text-xs">
            {event.location || "Location not set"}
          </p>
        </div>
        <div className="flex justify-between items-center pt-2">
          <div>
            <p className="text-gray-400 text-xs">From</p>
            <p className="text-white font-bold">Free</p>
          </div>
          <span className="text-[#995DFF] text-sm cursor-pointer">
            View details ›
          </span>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="space-y-4">
      <h2 className="text-white text-xl font-semibold">Similar Events</h2>

      {/* Carousel wrapper — clips overflow */}
      <div className="overflow-hidden">
        {/* Moving track */}
        <div className="flex animate-marquee">
          {events.map((event) => renderCard(event, "first"))}
          {events.map((event) => renderCard(event, "dup"))}
        </div>
      </div>
    </div>
  );
};

export default SimilarEvents;
