import { Link } from "react-router-dom";
import type { CSSProperties } from "react";
import type { EventType } from "../../types/eventType";
import locay from "../../assets/location-06.svg";

const EventCard = ({
  id,
  tag,
  image,
  date,
  time,
  title,
  location,
  price,
}: EventType) => {
  return (
    <Link
      to={`/event/${id}`}
      className="ticket-card relative block w-full max-w-[330px] h-[420px] rounded-2xl overflow-hidden shrink-0 border-2 border-transparent transition-colors duration-200 hover:border-[#995DFF]"
      style={{ "--ticket-notch-offset": "64px" } as CSSProperties}
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/95 from-0% to-transparent to-55%" />

      <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
        {tag}
      </span>

      <div className="flex flex-col gap-2 text-start absolute bottom-24 left-4 right-4">
        <p className="text-gray-200 text-xs">
          {date} · {time}
        </p>
        <h3 className="text-white font-semibold text-lg mt-1">{title}</h3>
        <div className=" w-[209px] flex bg-[#262525] gap-2.5 items-center rounded-[60px] px-3 py-2.25 ">
          <img src={locay} alt="" />
          <p className="text-[#ECECEC] text-[16px] mt-1 truncate"> {location}</p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 flex items-center justify-between px-4 bg-black">
        <div>
          <p className="text-white font-normal text-sm">{price}</p>
        </div>
        <span className="text-purple-400 text-sm hover:underline">
          View details
        </span>
      </div>
    </Link>
  );
};

export default EventCard;
