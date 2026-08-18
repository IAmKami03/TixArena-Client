import { Link } from "react-router-dom";
import type { CSSProperties } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { LuArrowRight } from "react-icons/lu";

type EventCardProps = {
  id: string;
  image: string;
  title: string;
  date: string;
  time: string;
  location: string;
  price: string;
  category: string;
};

function EventCard({
  id,
  image,
  title,
  date,
  time,
  location: venue,
  price,
  category,
}: EventCardProps) {
  return (
    <Link
      to={`/event/${id}`}
      className="ticket-card block w-[285px] bg-[#111111] border border-[#262525] rounded-[22px] overflow-hidden transition-colors duration-200 hover:border-[#995DFF]"
      style={{ "--ticket-notch-offset": "74px" } as CSSProperties}
    >
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-[180px] object-cover"
        />

        <span className="absolute top-3 left-3 bg-[#262626] text-white text-[10px] px-3 py-1 rounded-full">
          {category}
        </span>
      </div>

      <div className="px-4 py-3">
        <p className="text-[#8E8E8E] text-[10px] mb-2">
          {date} • {time}
        </p>

        <h3 className="text-white text-[18px] font-semibold mb-3">{title}</h3>

        <div className="inline-flex items-center gap-2 bg-[#242424] rounded-full px-3 py-2">
          <FaLocationDot className="text-[#995DFF] w-3 h-3 shrink-0" />

          <span className="text-[11px] text-[#D1D1D1]">{venue}</span>
        </div>
      </div>

      <div className="h-[74px] bg-black px-4 flex justify-between items-center">
        <div>
          <p className="text-[#8A8A8A] text-[10px]">From</p>

          <p className="text-white text-[24px] font-bold">{price}</p>
        </div>

        <span className="flex items-center gap-1 text-[#8B5CF6] text-[11px] font-medium">
          View details <LuArrowRight size={11} />
        </span>
      </div>
    </Link>
  );
}

export default EventCard;
