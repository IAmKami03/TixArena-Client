import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { getMyBookings } from "../../services/bookingService";
import { getErrorMessage } from "../../lib/api";
import type { Booking } from "../../types/booking";
import placeholderImage from "../../assets/images/vendorImages/eventimg2.svg";

const CATEGORY_COLORS: Record<string, string> = {
  Concert: "#a855f7",
  Entertainment: "#f97316",
  Tech: "#22c55e",
  Corporate: "#1e3a8a",
  Sport: "#22d3ee",
  Charity: "#ec4899",
  Education: "#f97316",
  Comedy: "#ef4444",
};

const TicketCard: React.FC<{ booking: Booking }> = ({ booking }) => {
  const event = typeof booking.event === "string" ? null : booking.event;
  const categoryColor = event ? CATEGORY_COLORS[event.category] ?? "#a855f7" : "#a855f7";

  return (
    <div className="flex flex-col w-full overflow-hidden rounded-xl border border-[#1e1e30] bg-[#0d0c1e]">
      <div className="relative">
        <img
          src={event?.image || placeholderImage}
          alt={event?.name ?? "Event"}
          className="block w-full h-40 object-cover"
        />
        {event && (
          <div className="absolute top-2.5 left-2.5">
            <span
              className="rounded-md px-2.5 py-0.5 text-[11px] font-semibold text-white"
              style={{ backgroundColor: `${categoryColor}33` }}
            >
              {event.category}
            </span>
          </div>
        )}
      </div>
      <div className="p-3.5 pb-4">
        <p className="text-[11px] text-gray-500 mb-1">
          {event
            ? `${format(new Date(event.date), "d MMM yyyy")}${event.time ? ` · ${event.time}` : ""}`
            : ""}
        </p>
        <h3 className="text-[15px] font-bold text-white mb-1">
          {event?.name ?? "Event"}
        </h3>
        <p className="text-[11px] text-gray-500 mb-3">
          📍 {event?.location || "Location not set"}
        </p>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[10px] text-gray-600 m-0">
              {booking.ticketName} × {booking.quantity}
            </p>
            <p className="text-sm font-bold text-white tracking-widest m-0">
              {booking.code}
            </p>
          </div>
          <span
            className={`text-xs font-semibold ${
              booking.checkedIn ? "text-[#22c55e]" : "text-[#a78bfa]"
            }`}
          >
            {booking.checkedIn ? "Checked in" : "Not checked in"}
          </span>
        </div>
        {booking.qrCode && (
          <div className="flex justify-center mt-3">
            <img
              src={booking.qrCode}
              alt="Ticket QR code"
              className="w-22 h-22 rounded-lg bg-white p-1.5"
            />
          </div>
        )}
      </div>
    </div>
  );
};

const TicketsSection: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMyBookings()
      .then(setBookings)
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold m-0 text-white">My Tickets</h2>
      </div>

      {isLoading ? (
        <p className="text-gray-500 text-sm">Loading your tickets...</p>
      ) : error ? (
        <p className="text-red-400 text-sm">{error}</p>
      ) : bookings.length === 0 ? (
        <p className="text-gray-500 text-sm">
          You haven&apos;t registered for any events yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {bookings.map((booking) => (
            <TicketCard key={booking._id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TicketsSection;
