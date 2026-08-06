import { useEffect, useState } from "react";
import { format } from "date-fns";
import add from "../../assets/images/vendorImages/Add.svg";
import right from "../../assets/images/vendorImages/Arrow-Right.svg";
import dots from "../../assets/images/vendorImages/dots.svg";
import store from "../../assets/images/vendorImages/store.svg";
import tic1 from "../../assets/images/vendorImages/ticket-02.svg";
import tic2 from "../../assets/images/vendorImages/Ticket-01.svg";
import fallbackImage from "../../assets/images/vendorImages/social.svg";
import { Link, useNavigate } from "react-router-dom";
import { getMyEvents } from "../../services/eventService";
import { getErrorMessage } from "../../lib/api";
import { usePagination } from "../../hooks/usePagination";
import Pagination from "../common/Pagination";
import type { Event } from "../../types/event";

const PAGE_SIZE = 6;

const EventsList = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { page, setPage, totalPages, pageItems } = usePagination(
    events,
    PAGE_SIZE,
  );

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getMyEvents();
        setEvents(data);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="flex flex-col w-full h-screen border-l-0 lg:border-l border-[#262525] p-4 sm:p-6 gap-6">
      {/* ================= Header ================= */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5 items-start">
          <h2 className="text-[23px] font-semibold text-white">My Events</h2>

          <div className="flex gap-2">
            <p className="text-[16px] font-normal text-[#CECECE]">Event</p>
            <p className="text-[16px] font-normal text-[#A485D9]">Overview</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/create-event")}
          className="flex items-center gap-2.5 rounded-[30px] bg-white px-4.5 py-3.5"
        >
          <img src={add} alt="Add event" />
          <p className="text-[16px] font-normal text-[#0C0C0C]">
            Create New Event
          </p>
        </button>
      </div>

      {/* ================= Scrollable Event List ================= */}
      <div className="flex-1 overflow-y-auto pr-2 hide-scrollbar">
        {isLoading ? (
          <p className="text-[#ABABAB] text-[16px]">Loading events...</p>
        ) : error ? (
          <p className="text-[#FF7466] text-[16px]">{error}</p>
        ) : events.length === 0 ? (
          <p className="text-[#ABABAB] text-[16px]">
            You haven&apos;t created any events yet.
          </p>
        ) : (
          <div className="flex flex-col gap-5">
            {pageItems.map((event) => {
              const totalTickets = event.tickets.reduce(
                (sum, t) => sum + t.quantity,
                0,
              );
              const soldTickets = event.tickets.reduce(
                (sum, t) => sum + t.sold,
                0,
              );
              const remainingTickets = totalTickets - soldTickets;

              return (
                <div
                  key={event._id}
                  className="bg-[#262525] w-full rounded-[25px] p-3.5 flex flex-col gap-2.5"
                >
                  {/* ================= Card Header ================= */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={event.image || fallbackImage}
                        alt={event.name}
                        className="h-11 w-11 rounded-[5px] border border-[#262525] object-cover"
                      />

                      <div className="flex flex-col gap-0.5 items-start">
                        <p className="text-[20px] font-semibold text-white">
                          {event.name}
                        </p>

                        <p className="text-[14px] font-medium text-white">
                          <span className="font-normal text-[#838383]">
                            Created:{" "}
                          </span>
                          {format(new Date(event.createdAt), "MMM d, yyyy")}
                        </p>
                      </div>
                    </div>

                    <Link
                      to={`/event-details/${event._id}`}
                      className="flex items-center gap-3"
                    >
                      <img
                        src={dots}
                        alt="More options"
                        className="h-8 w-8 rounded-full border border-[#262525] bg-[#0B0B0B] p-1.5 cursor-pointer"
                      />

                      <button className="flex items-center gap-2.5 rounded-full border border-[#262525] bg-[#0B0B0B] px-3.5 py-1.5">
                        <p className="text-[16px] font-normal text-[#CECECE]">
                          View
                        </p>

                        <img src={right} alt="View event" />
                      </button>
                    </Link>
                  </div>

                  {/* ================= Ticket Summary ================= */}
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <div className="flex w-full sm:w-1/3 items-center justify-between rounded-[20px] border border-[#141414] bg-[#0B0B0B] px-6 py-7">
                      <div className="flex flex-col items-start">
                        <p className="text-[16px] font-normal text-[#CECECE]">
                          Total Tickets Created
                        </p>

                        <p className="text-[23px] font-semibold text-white">
                          {totalTickets}
                        </p>
                      </div>

                      <img src={store} alt="" />
                    </div>

                    <div className="flex w-full sm:w-1/3 items-center justify-between rounded-[20px] border border-[#141414] bg-[#0B0B0B] px-6 py-7">
                      <div className="flex flex-col items-start">
                        <p className="text-[16px] font-normal text-[#CECECE]">
                          Tickets Sold
                        </p>

                        <p className="text-[23px] font-semibold text-white">
                          {soldTickets}
                        </p>
                      </div>

                      <img src={tic1} alt="" />
                    </div>

                    <div className="flex w-full sm:w-1/3 items-center justify-between rounded-[20px] border border-[#141414] bg-[#0B0B0B] px-6 py-7">
                      <div className="flex flex-col items-start">
                        <p className="text-[16px] font-normal text-[#CECECE]">
                          Tickets Remaining
                        </p>

                        <p className="text-[23px] font-semibold text-white">
                          {remainingTickets}
                        </p>
                      </div>

                      <img src={tic2} alt="" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {/* ================= Page Navigation Buttons ================== */}
      {events.length > 0 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          pageSize={PAGE_SIZE}
        />
      )}
    </div>
  );
};

export default EventsList;
