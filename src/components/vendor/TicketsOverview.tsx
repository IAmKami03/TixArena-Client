import dots from "../../assets/images/vendorImages/dots.svg";
import backArr from "../../assets/images/vendorImages/arrow-left.svg";
import edit from "../../assets/images/vendorImages/Pen.svg";
import userCheck from "../../assets/images/vendorImages/User Check.svg";
import { useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import EditModal from "./EditModal";
import EventActionsMenu from "./EventActionsMenu";
import CloseEventModal from "./CloseEventModal";
import DeleteEventModal from "./DeleteEventModal";
import {
  closeEvent,
  deleteEvent,
  updateEvent,
} from "../../services/eventService";
import type { EventPayload } from "../../services/eventService";
import { getErrorMessage } from "../../lib/api";
import type { Event } from "../../types/event";

interface TicketsOverviewProps {
  event: Event;
  onEventChange: (event: Event) => void;
}

const TicketsOverview = ({ event, onEventChange }: TicketsOverviewProps) => {
  const navigate = useNavigate();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCloseOpen, setIsCloseOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [actionError, setActionError] = useState("");

  const totalTickets = event.tickets.reduce((sum, t) => sum + t.quantity, 0);
  const soldTickets = event.tickets.reduce((sum, t) => sum + t.sold, 0);
  const remainingTickets = totalTickets - soldTickets;

  const handleSaveEdit = async (payload: EventPayload) => {
    try {
      const updated = await updateEvent(event._id, payload);
      onEventChange(updated);
      setIsEditOpen(false);
    } catch (err) {
      setActionError(getErrorMessage(err));
    }
  };

  const handleCloseEvent = async () => {
    try {
      const updated = await closeEvent(event._id);
      onEventChange(updated);
      setIsCloseOpen(false);
    } catch (err) {
      setActionError(getErrorMessage(err));
    }
  };

  const handleDeleteEvent = async () => {
    try {
      await deleteEvent(event._id);
      navigate("/vendor");
    } catch (err) {
      setActionError(getErrorMessage(err));
      setIsDeleteOpen(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {actionError && (
        <p className="text-[#FF7466] text-[14px]">{actionError}</p>
      )}
      <div className="w-full flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-0">
        <div className="flex flex-col gap-1 items-start ">
          <div className="flex gap-2.5 items-center">
            <img
              src={backArr}
              alt=""
              onClick={() => navigate("/vendor")}
              className="cursor-pointer"
            />
            <h2 className="font-semibold text-[28px] text-[#FFFFFF] ">
              {event.name}
            </h2>
          </div>
          <p className="font-medium text-[14px] text-[#ECECEC] ">
            <span className="text-[#838383] font-normal ">Created:</span>{" "}
            {format(new Date(event.createdAt), "MMM d, yyyy")}
          </p>
        </div>

        <div className="flex gap-4 items-center">
          <div
            onClick={() => setIsEditOpen(true)}
            className="flex gap-2.5 py-3.5 px-4.25 items-center bg-[#262525] rounded-[30px] cursor-pointer "
          >
            <img src={edit} alt="" />
            <p className="text-[#ECECEC] text-[16px]  ">Edit event</p>
          </div>
          <div className="relative">
            <img
              src={dots}
              alt="More options"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="h-8 w-8 rounded-full border border-[#262525] bg-[#262525] p-1.5 cursor-pointer"
            />
            <EventActionsMenu
              isOpen={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
              onEdit={() => {
                setIsMenuOpen(false);
                setIsEditOpen(true);
              }}
              onViewDetails={() => {
                setIsMenuOpen(false);
                navigate("/event");
              }}
              onCloseEvent={() => {
                setIsMenuOpen(false);
                setIsCloseOpen(true);
              }}
              onDelete={() => {
                setIsMenuOpen(false);
                setIsDeleteOpen(true);
              }}
            />
          </div>
        </div>
      </div>
      {/* OVERVIEW */}
      <div className="flex items-start flex-col gap-2.5 p-3.5 rounded-[25px] bg-[#0F0F0F]">
        <h3 className="text-[18px] font-medium text-[#FFFFFF] ">
          Ticket Overview
        </h3>
        {/* ===================== */}
        <div className="w-full flex flex-wrap gap-3 bg-[#0B0B0B] px-4 py-5 justify-between items-center rounded-[20px] ">
          <div className="flex flex-col gap-px items-start">
            <p className="text-[#ABABAB] text-[16px] font-normal ">
              Total Check-Ins
            </p>
            <p className="text-[23px] text-[#FFFFFF] font-semibold">0</p>
          </div>
          <div
            onClick={() => navigate(`/check-in/${event._id}`)}
            className="flex items-center gap-2.5 bg-[#262525] py-2 px-2.5 text-[#ECECEC] text-[16px] rounded-[30px] cursor-pointer hover:bg-[#333] transition-colors"
          >
            <p>Check-in Attendants</p>
            <img src={userCheck} alt="" />
          </div>
        </div>
        {/* ===================== */}
        <div className="flex flex-col sm:flex-row gap-2.5 w-full ">
          <div className="w-full sm:w-1/3 bg-[#0B0B0B] rounded-[25px] flex flex-col gap-2.5 p-3.5 items-start">
            <p className="text-[#ABABAB] text-[16px] font-normal ">
              Total Tickets Created
            </p>
            <p className="text-[23px] font-semibold text-[#FFFFFF] ">
              {totalTickets}
            </p>
          </div>
          <div className="w-full sm:w-1/3 bg-[#0B0B0B] rounded-[25px] flex flex-col gap-2.5 p-3.5 items-start">
            <p className="text-[#ABABAB] text-[16px] font-normal ">
              Tickets Sold
            </p>
            <p className="text-[23px] text-[#FFFFFF] font-semibold">
              {soldTickets}
            </p>
          </div>
          <div className="w-full sm:w-1/3 bg-[#0B0B0B] rounded-[25px] flex flex-col gap-2.5 p-3.5 items-start">
            <p className="text-[#ABABAB] text-[16px] font-normal ">
              Tickets Remaining
            </p>
            <p className="text-[23px] text-[#FFFFFF] font-semibold">
              {remainingTickets}
            </p>
          </div>
        </div>
        {/* ===================== */}
        <div className="flex gap-2.5 w-full flex-wrap">
          {event.tickets.length === 0 ? (
            <p className="text-[#838383] text-[16px]">
              No ticket types added yet.
            </p>
          ) : (
            event.tickets.map((ticket) => (
              <div
                key={ticket.name}
                className="w-full sm:w-[calc(33.333%-0.4667rem)] bg-[#0B0B0B] rounded-[25px] flex flex-col gap-2.5 p-3.5 items-start"
              >
                <p className="text-[#ABABAB] text-[16px] font-normal ">
                  {ticket.name}
                </p>
                <p className="text-[23px] text-[#FFFFFF] font-semibold">
                  {ticket.sold}
                  <span className="text-[#838383] text-[18px]">
                    /{ticket.quantity}
                  </span>
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      <EditModal
        isOpen={isEditOpen}
        event={event}
        onClose={() => setIsEditOpen(false)}
        onSave={handleSaveEdit}
      />

      <CloseEventModal
        isOpen={isCloseOpen}
        onClose={() => setIsCloseOpen(false)}
        onConfirm={handleCloseEvent}
        eventName={event.name}
        eventDateTime={`${format(new Date(event.date), "d MMM yyyy")}${
          event.time ? ` · ${event.time}` : ""
        }`}
        eventLocation={event.location || "Location not set"}
      />

      <DeleteEventModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteEvent}
        eventName={event.name}
        eventDateTime={`${format(new Date(event.date), "d MMM yyyy")}${
          event.time ? ` · ${event.time}` : ""
        }`}
        eventLocation={event.location || "Location not set"}
      />
    </div>
  );
};

export default TicketsOverview;
