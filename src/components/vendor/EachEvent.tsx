import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AttendeeManagement from "./AttendeeManagement";
import TicketsOverview from "./TicketsOverview";
import { getEvent } from "../../services/eventService";
import { getErrorMessage } from "../../lib/api";
import type { Event } from "../../types/event";

const EachEvent = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    getEvent(id)
      .then(setEvent)
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setIsLoading(false));
  }, [id]);

  return (
    <div className="flex flex-col w-full border-l-0 lg:border-l border-[#262525] p-4 sm:p-6 gap-6">
      <div className="flex flex-col gap-0.5 items-start">
        <h2 className="text-[23px] font-semibold text-white">My Events</h2>

        <div className="flex gap-2">
          <p className="text-[16px] font-normal text-[#CECECE]">Event</p>
          <p className="text-[16px] font-normal text-[#CECECE]">Overview</p>
          <p className="text-[16px] font-normal text-[#A485D9]">
            {event?.name ?? ""}
          </p>
        </div>
      </div>

      {isLoading ? (
        <p className="text-[#ABABAB] text-[16px]">Loading event...</p>
      ) : error ? (
        <p className="text-[#FF7466] text-[16px]">{error}</p>
      ) : !event ? (
        <p className="text-[#ABABAB] text-[16px]">Event not found.</p>
      ) : (
        <>
          {/* TICKET OVERVIEW */}
          <TicketsOverview event={event} onEventChange={setEvent} />

          <AttendeeManagement eventId={event._id} />
        </>
      )}
    </div>
  );
};

export default EachEvent;
