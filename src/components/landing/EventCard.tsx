import { Link } from "react-router-dom";
import type { EventType } from "../../types/eventType";

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
      className="relative block w-full max-w-[330px] h-[420px] rounded-2xl overflow-hidden shrink-0"
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

      <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
        {tag}
      </span>

      <div className="absolute bottom-24 left-4 right-4">
        <p className="text-gray-200 text-xs">
          {date} · {time}
        </p>
        <h3 className="text-white font-semibold text-lg mt-1">{title}</h3>
        <p className="text-gray-300 text-xs mt-1"> {location}</p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-4 border-t border-white/10">
        <div>
          <p className="text-gray-300 text-xs">From</p>
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
