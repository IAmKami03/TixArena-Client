import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import EventCard from "./EventCard";
import fallbackImage from "../../assets/images/vendorImages/eventimg2.svg";
import { getPublicEvents } from "../../services/eventService";
import type { Event } from "../../types/event";

const TopEvent = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [current] = useState(0);
  const cardWidth = 346;

  useEffect(() => {
    getPublicEvents()
      .then((all) => setEvents(all.slice(0, 9)))
      .catch(() => undefined);
  }, []);

  if (events.length === 0) return null;

  return (
    <div className="flex justify-center mt-7 px-4 sm:px-6 lg:px-0">
      <div className="w-full max-w-[1020px] border-0">
        <div className="mb-7">
          <h2 className="text-[26px] sm:text-[38px] lg:text-[76px] leading-[1.15] lg:leading-[normal] text-start text-[#FFFFFF] fnt font-normal">
            Top Event
          </h2>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-0">
            <p className="text-[#CECECE] text-start text-[14px] sm:text-[16px] font-inter font-normal">
              Discover the hottest events people are talking about{" "}
              <br className="hidden sm:block" /> and secure your spot before
              tickets sell out.
            </p>
            <button
              onClick={() => navigate("/explore")}
              className="w-full sm:w-auto bg-[#995DFF] text-[#FFFFFF] rounded-full px-10 py-2 items-center self-start"
            >
              Explore More
            </button>
          </div>
        </div>

        {/* Mobile/tablet: plain horizontal scroll strip (no transform math tied to a fixed card width) */}
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide lg:hidden snap-x snap-mandatory -mx-4 px-4 sm:-mx-6 sm:px-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="w-[260px] sm:w-[300px] shrink-0 snap-start"
            >
              <EventCard
                id={event._id}
                tag={event.category}
                image={event.image || fallbackImage}
                date={format(new Date(event.date), "d MMM yyyy")}
                time={event.time ?? ""}
                title={event.name}
                location={event.location ?? "Location not set"}
                price="Free"
              />
            </div>
          ))}
        </div>

        {/* Desktop: original transform-driven carousel */}
        <div className="hidden lg:block overflow-hidden">
          <div
            className="flex gap-4 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${current * cardWidth}px)`,
            }}
          >
            {events.map((event) => (
              <div key={event._id} className="w-[330px] flex-shrink-0">
                <EventCard
                  id={event._id}
                  tag={event.category.toLowerCase()}
                  image={event.image || fallbackImage}
                  date={format(new Date(event.date), "d MMM yyyy")}
                  time={event.time ?? ""}
                  title={event.name}
                  location={event.location ?? "Location not set"}
                  price="Free"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopEvent;
