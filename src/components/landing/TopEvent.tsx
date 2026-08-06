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
  const [current, setCurrent] = useState(0);
  const cardsPerView = 3;
  const cardWidth = 346;

  useEffect(() => {
    getPublicEvents()
      .then((all) => setEvents(all.slice(0, 9)))
      .catch(() => undefined);
  }, []);

  const nextSlide = () => {
    if (current < events.length - cardsPerView) {
      setCurrent(current + 1);
    }
  };
  const prevSlide = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  if (events.length === 0) return null;

  return (
    <div className="flex justify-center mt-7 px-4 sm:px-6 lg:px-0">
      <div className="w-full max-w-[1020px] border-0">
       <div className="mb-7"> <h2 className="text-[36px] sm:text-[48px] lg:text-[60px] text-start text-[#FFFFFF] font-Instrument Serif font-normal">
          Top Event
        </h2>
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-0">
          <p className="text-[#CECECE] text-[16px] font-inter font-normal">
            Discover the hottest events people are talking about <br /> and
            secure your spot before tickets sell out.
          </p>
          <button
            onClick={() => navigate("/explore")}
            className="bg-[#995DFF] text-[#FFFFFF] rounded-full px-10 py-2 items-center self-start"
          >
            Explore More
          </button>
        </div></div>

        {/* {events.length > cardsPerView && (
          <div className="flex justify-end gap-4 mt-6 mb-4">
            <button
              onClick={prevSlide}
              disabled={current === 0}
              className="w-10 h-10 rounded-full border text-white disabled:opacity-40"
            >
              ←
            </button>

            <button
              onClick={nextSlide}
              disabled={current >= events.length - cardsPerView}
              className="w-10 h-10 rounded-full border text-white disabled:opacity-40"
            >
              →
            </button>
          </div>
        )} */}

        {/* Mobile/tablet: plain horizontal scroll strip (no transform math tied to a fixed card width) */}
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide lg:hidden">
          {events.map((event) => (
            <div key={event._id} className="w-[280px] sm:w-[330px] shrink-0">
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
