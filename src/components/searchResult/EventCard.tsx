import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import type { EventCardData } from "./eventCardMapper";

interface EventCardProps {
  event: EventCardData;
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <Link
      to={`/event/${event.id}`}
      className="flex flex-col sm:flex-row text-white items-start sm:justify-between bg-[#121212] border border-[#2A2A2A] rounded-[28px] overflow-hidden p-4 sm:p-6.5 mb-7 gap-4 sm:gap-0 z ev"
    >
      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-7 w-full sm:w-auto">
        <div className="w-full sm:w-auto">
          <img
            src={event.image}
            alt={event.title}
            className="rounded-[20px] w-full sm:w-59.25 h-48.5 object-cover"
          />
        </div>
        <div>
          <h1 className="text-[23px] font-semibold ">{event.title}</h1>
          <div className="flex flex-col gap-7.25">
            <div className="flex items-center gap-5 text-[#CECECE]">
              <p>{event.date}</p>
              <p>{event.time}</p>
            </div>
            <h3 className="text-[23px]">{event.price}</h3>
            <div className="flex items-center gap-2.5 bg-[#262525] p-2.5 rounded-[60px] w-fit">
              <FaLocationDot className="text-[#995DFF]" />
              <p>{event.location}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#262525] px-3 py-2.5 text-[#ECECEC] rounded-[60px] w-fit">
        <p>{event.category}</p>
      </div>
    </Link>
  );
};

export default EventCard;
