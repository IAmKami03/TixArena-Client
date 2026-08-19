import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { LuHeart, LuLayoutGrid, LuUser } from "react-icons/lu";
import add from "../../assets/images/vendorImages/Add.svg";
import eveimg from "../../assets/images/vendorImages/eventimg2.svg";
import EachEventList from "./EachEventList";
import type { EventDetails } from "./EachEventList";
import { getAllEvents, updateEventStatus } from "../../services/eventService";
import { getGenderStats } from "../../services/userService";
import { getErrorMessage } from "../../lib/api";
import { usePagination } from "../../hooks/usePagination";
import Pagination from "../common/Pagination";
import FilterDropdown from "../common/FilterDropdown";
import { EVENT_CATEGORIES } from "../../types/event";
import type { Event, EventStatus } from "../../types/event";

const PAGE_SIZE = 9;
const STATUS_OPTIONS: ("All" | EventStatus)[] = [
  "All",
  "Pending",
  "Approved",
  "Rejected",
];

interface Slice {
  label: string;
  color: string;
  value: number;
}

const CATEGORY_COLORS: Record<string, string> = {
  Entertainment: "#8B5CF6",
  Tech: "#22C55E",
  Corporate: "#1E1B4B",
  Sport: "#22D3EE",
  Education: "#F97316",
  Charity: "#EC4899",
  Comedy: "#EF4444",
  Concert: "#FACC15",
};

const tooltipStyle = {
  background: "#1A1A1A",
  border: "1px solid #262525",
  borderRadius: 12,
  padding: "8px 12px",
};

const STATUS_STYLES: Record<EventStatus, string> = {
  Pending: "bg-[#3B2F14] text-[#F5A623]",
  Approved: "bg-[#1F3B24] text-[#5FD787]",
  Rejected: "bg-[#3B1F1F] text-[#FF6B6B]",
};


const vendorName = (vendor: Event["vendor"]): string => {
  if (typeof vendor === "string") return "Vendor";
  return `${vendor.firstName} ${vendor.lastName}`;
};

const toEventDetails = (event: Event): EventDetails => ({
  name: event.name,
  overview: event.overview || "No overview provided.",
  location: event.location || "Location not set",
  dateTime: `${format(new Date(event.date), "EEEE, MMM d, yyyy")}${
    event.time ? ` · ${event.time}` : ""
  }`,
  image: event.image || eveimg,
  tickets: event.tickets.map((t) => ({ name: t.name, quantity: t.quantity })),
  speakers: event.speakers,
});

const AdminOverview = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<"All" | EventStatus>("All");
  const [genderStats, setGenderStats] = useState({ female: 0, male: 0 });
  const selectedEvent = events.find((event) => event._id === selectedEventId);

  useEffect(() => {
    getAllEvents()
      .then(setEvents)
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setIsLoading(false));

    getGenderStats()
      .then(setGenderStats)
      .catch(() => {
        /* non-critical, chart just falls back to zeros */
      });
  }, []);

  const eventCategoryData = useMemo<Slice[]>(
    () =>
      EVENT_CATEGORIES.map((label) => ({
        label,
        color: CATEGORY_COLORS[label] ?? "#8B5CF6",
        value: events.filter((event) => event.category === label).length,
      })),
    [events],
  );

  const userRatioData = useMemo<Slice[]>(
    () => [
      { label: "Female", color: "#A78BFA", value: genderStats.female },
      { label: "Male", color: "#4F46E5", value: genderStats.male },
    ],
    [genderStats],
  );

  const filteredEvents =
    statusFilter === "All"
      ? events
      : events.filter((event) => event.status === statusFilter);

  const { page, setPage, totalPages, pageItems } = usePagination(
    filteredEvents,
    PAGE_SIZE,
  );

  const updateStatus = async (status: EventStatus, reason?: string) => {
    if (!selectedEventId) return;
    try {
      const updated = await updateEventStatus(selectedEventId, status, reason);
      setEvents((prev) =>
        prev.map((event) => (event._id === updated._id ? updated : event)),
      );
      setSelectedEventId(null);
      toast.success(
        status === "Approved" ? "Event approved." : "Event rejected.",
      );
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen border-l-0 lg:border-l border-[#262525] p-4 sm:p-6 gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
        <div className="flex flex-col gap-0.5 items-start">
          <h2 className="text-[23px] font-semibold text-white">My Event</h2>
          <div className="flex gap-2 items-center text-[14px] font-normal">
            <p className="text-[#CECECE]">Event</p>
            <span className="text-[#4B4B4B]">•</span>
            <p className="text-[#A485D9]">Overview</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/create-event")}
          className="flex items-center gap-2.5 rounded-[30px] bg-white px-4.5 py-3.5"
        >
          <img src={add} alt="" />
          <p className="text-[16px] font-normal text-[#0C0C0C]">
            Create New Event
          </p>
        </button>
      </div>

      {/* Ticket Overview banner */}
      <div className="flex flex-col gap-5 rounded-[30px] p-6 bg-linear-to-br from-[#4C1D95] via-[#241040] to-[#0F0F0F] border border-[#262525]">
        <h3 className="text-[16px] font-medium text-white">Ticket Overview</h3>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-0">
          <div className="flex-1 flex items-center justify-between sm:pr-6">
            <div className="flex flex-col gap-1 items-start">
              <p className="text-[#CECECE] text-[15px]">Total Event</p>
              <p className="text-[26px] font-semibold text-white">
                {events.length.toLocaleString()}
              </p>
            </div>
            <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <LuHeart className="text-white" size={18} />
            </span>
          </div>
          <div className="hidden sm:block w-px self-stretch bg-white/15" />
          <div className="flex-1 flex items-center justify-between sm:pl-6">
            <div className="flex flex-col gap-1 items-start">
              <p className="text-[#CECECE] text-[15px]">Total Vendor</p>
              <p className="text-[26px] font-semibold text-white">
                {new Set(
                  events.map((event) =>
                    typeof event.vendor === "string"
                      ? event.vendor
                      : event.vendor._id,
                  ),
                ).size.toLocaleString()}
              </p>
            </div>
            <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <LuLayoutGrid className="text-white" size={18} />
            </span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="flex flex-col lg:flex-row gap-2.5 w-full">
        <div className="w-full lg:w-1/2 flex flex-col gap-5 bg-[#0F0F0F] border border-[#262525] rounded-[30px] p-5.5">
          <h3 className="text-white text-[16px] font-medium">
            Most Created Event
          </h3>
          <div className="flex items-center gap-8">
            <div className="w-38 h-38 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={eventCategoryData}
                    dataKey="value"
                    nameKey="label"
                    cx="50%"
                    cy="50%"
                    innerRadius={38}
                    outerRadius={76}
                    stroke="none"
                    isAnimationActive={false}
                  >
                    {eventCategoryData.map((c) => (
                      <Cell key={c.label} fill={c.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={tooltipStyle}
                    itemStyle={{ color: "#ECECEC" }}
                    labelStyle={{ color: "#ECECEC" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-x-5 gap-y-2.5">
              {eventCategoryData.map((c) => (
                <div
                  key={c.label}
                  className="flex items-center gap-2 text-[14px] text-[#CECECE] whitespace-nowrap"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ background: c.color }}
                  />
                  {c.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col gap-5 bg-[#0F0F0F] border border-[#262525] rounded-[30px] p-5.5">
          <h3 className="text-white text-[16px] font-medium">User Ratio</h3>
          <div className="flex items-center gap-8">
            <div className="w-38 h-38 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userRatioData}
                    dataKey="value"
                    nameKey="label"
                    cx="50%"
                    cy="50%"
                    outerRadius={76}
                    stroke="none"
                    isAnimationActive={false}
                  >
                    {userRatioData.map((u) => (
                      <Cell key={u.label} fill={u.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={tooltipStyle}
                    itemStyle={{ color: "#ECECEC" }}
                    labelStyle={{ color: "#ECECEC" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-3">
              {userRatioData.map((u) => (
                <div
                  key={u.label}
                  className="flex items-center gap-2 text-[14px] text-[#CECECE]"
                >
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ background: u.color }}
                  />
                  {u.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Events Listing */}
      <div className="flex flex-col gap-3.5 p-3.5 rounded-[25px] bg-[#0F0F0F]">
        <div className="w-full flex justify-between items-center">
          <h3 className="text-[18px] font-medium text-[#FFFFFF]">
            Events Listing
          </h3>
          <FilterDropdown
            value={statusFilter}
            options={STATUS_OPTIONS}
            onChange={(value) => setStatusFilter(value as "All" | EventStatus)}
          />
        </div>

        <div className="w-full overflow-x-auto scrollbar-none rounded-[20px] bg-[#0B0B0B]">
          {isLoading ? (
            <p className="text-[#ABABAB] text-[16px] p-4">
              Loading events...
            </p>
          ) : error ? (
            <p className="text-[#FF7466] text-[16px] p-4">{error}</p>
          ) : filteredEvents.length === 0 ? (
            <p className="text-[#ABABAB] text-[16px] p-4">
              {events.length === 0
                ? "No events have been submitted yet."
                : `No ${statusFilter.toLowerCase()} events.`}
            </p>
          ) : (
            <>
            <table className="hidden lg:table w-full text-left border-collapse">
              <thead>
                <tr className="text-[#838383] text-[14px] font-normal">
                  <th className="py-4 px-4 font-normal whitespace-nowrap">
                    Event name
                  </th>
                  <th className="py-4 px-4 font-normal whitespace-nowrap">
                    Created by
                  </th>
                  <th className="py-4 px-4 font-normal whitespace-nowrap">
                    Category
                  </th>
                  <th className="py-4 px-4 font-normal whitespace-nowrap">
                    Status
                  </th>
                  <th className="py-4 px-4 font-normal whitespace-nowrap">
                    Date
                  </th>
                  <th className="py-4 px-4 font-normal whitespace-nowrap">
                    Total Ticket
                  </th>
                  <th className="py-4 px-4 font-normal whitespace-nowrap">
                    Date created
                  </th>
                  <th className="py-4 px-4 font-normal whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((event) => (
                  <tr
                    key={event._id}
                    className="border-t border-[#262525] text-[#ECECEC] text-[16px]"
                  >
                    <td className="py-4 px-4 whitespace-nowrap">
                      {event.name}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#262525] flex items-center justify-center shrink-0">
                          <LuUser className="text-[#ABABAB]" size={13} />
                        </span>
                        <span className="text-[#ABABAB]">
                          {vendorName(event.vendor)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      {event.category}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span
                        className={`text-[14px] font-medium px-3 py-1 rounded-[30px] ${STATUS_STYLES[event.status]}`}
                      >
                        {event.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-[#ABABAB] whitespace-nowrap">
                      {format(new Date(event.date), "d MMM, yyyy")}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      {event.tickets.reduce((sum, t) => sum + t.quantity, 0)}
                    </td>
                    <td className="py-4 px-4 text-[#ABABAB] whitespace-nowrap">
                      {format(new Date(event.createdAt), "d MMM, yyyy")}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedEventId(event._id)}
                        className="flex items-center gap-2   bg-[#0B0B0B] px-3 py-1.5"
                      >
                        <p className="text-[14px] font-normal text-[#CECECE]">
                          View
                        </p>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile/tablet: card list instead of a horizontally-scrolling table */}
            <div className="lg:hidden flex flex-col gap-3 p-3">
              {pageItems.map((event) => {
                const totalTickets = event.tickets.reduce(
                  (sum, t) => sum + t.quantity,
                  0,
                );
                return (
                  <div
                    key={event._id}
                    className="rounded-[20px] border border-[#262525] p-4 flex flex-col gap-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[#ECECEC] text-[16px] font-medium truncate">
                          {event.name}
                        </p>
                        <div className="flex items-center gap-1.5 text-[#ABABAB] text-[13px] mt-1">
                          <span className="w-5 h-5 rounded-full bg-[#262525] flex items-center justify-center shrink-0">
                            <LuUser className="text-[#ABABAB]" size={11} />
                          </span>
                          <span className="truncate">
                            {vendorName(event.vendor)}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`shrink-0 text-[12px] font-medium px-3 py-1 rounded-[30px] ${STATUS_STYLES[event.status]}`}
                      >
                        {event.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 text-[13px]">
                      <div>
                        <p className="text-[#838383]">Category</p>
                        <p className="text-[#ECECEC]">{event.category}</p>
                      </div>
                      <div>
                        <p className="text-[#838383]">Date</p>
                        <p className="text-[#ECECEC]">
                          {format(new Date(event.date), "d MMM, yyyy")}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#838383]">Total Ticket</p>
                        <p className="text-[#ECECEC]">{totalTickets}</p>
                      </div>
                      <div>
                        <p className="text-[#838383]">Date created</p>
                        <p className="text-[#ECECEC]">
                          {format(new Date(event.createdAt), "d MMM, yyyy")}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedEventId(event._id)}
                      className="self-start flex items-center gap-2 bg-[#161616] rounded-full px-3.5 py-1.5"
                    >
                      <p className="text-[13px] font-normal text-[#CECECE]">
                        View
                      </p>
                    </button>
                  </div>
                );
              })}
            </div>
            </>
          )}
        </div>

        {/* Pagination */}
        {filteredEvents.length > 0 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            pageSize={PAGE_SIZE}
          />
        )}
      </div>

      {selectedEvent && (
        <EachEventList
          isOpen
          event={toEventDetails(selectedEvent)}
          onClose={() => setSelectedEventId(null)}
          onApprove={() => updateStatus("Approved")}
          onReject={(reason) => updateStatus("Rejected", reason)}
        />
      )}
    </div>
  );
};

export default AdminOverview;
