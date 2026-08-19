import { LuArrowRight } from "react-icons/lu";
import EventCard from "./EventCard";

type Event = {
  id: string;
  image: string;
  title: string;
  date: string;
  time: string;
  location: string;
  price: string;
  category: string;
};

type EventSectionProps = {
  title: string;
  events: Event[];
};

function EventSection({ title, events }: EventSectionProps) {
  return (
    <section className="max-w-310 mx-auto mt-14">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-white text-[20px] sm:text-[34px] font-serif">{title}</h2>

        <button className="flex items-center gap-1.5 text-[#8B5CF6] text-xs hover:underline">
          View details <LuArrowRight size={12} />
        </button>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
        {events.map((event) => (
          <div key={event.id} className="shrink-0">
            <EventCard {...event} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default EventSection;
