import { useState } from "react";
import close from "../../assets/images/vendorImages/close.svg";
import RejectEventModal from "./RejectEventModal";
import ApproveEventModal from "./ApproveEventModal";

export interface EventTicket {
  name: string;
  quantity: number;
}

export interface EventSpeaker {
  name: string;
  photo: string;
  role: string;
}

export interface EventDetails {
  name: string;
  overview: string;
  location: string;
  dateTime: string;
  image: string;
  tickets: EventTicket[];
  speakers: EventSpeaker[];
}

interface EachEventListProps {
  isOpen: boolean;
  event: EventDetails;
  onClose: () => void;
  onApprove?: () => void;
  onReject?: (reason?: string) => void;
}

const Field = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-1.5 py-3 border-b border-[#262525] text-start">
    <p className="text-[#838383] text-[13px]">{label}</p>
    <p className="text-[#ECECEC] text-[15px] leading-relaxed">{value}</p>
  </div>
);

const EachEventList = ({
  isOpen,
  event,
  onClose,
  onApprove,
  onReject,
}: EachEventListProps) => {
  const [rejectOpen, setRejectOpen] = useState(false);
  const [approveOpen, setApproveOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-end bg-black/70">
      <div className="w-full sm:w-1/2 h-full overflow-y-auto hide-scrollbar bg-[#0F0F0F] border-l border-[#262525] rounded-l-3xl p-5 flex flex-col gap-5 text-start">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-white text-[20px] font-semibold">
            Event Details
          </h2>
          <img
            src={close}
            alt="Close"
            onClick={onClose}
            className="w-9 h-9 cursor-pointer"
          />
        </div>

        {/* Event Overview */}
        <div className="flex flex-col gap-1 text-start">
          <h3 className="text-white text-[16px] font-semibold mb-1">
            Event Overview
          </h3>

          <Field label="Event Name" value={event.name} />
          <Field label="Overview" value={event.overview} />
          <Field label="Location" value={event.location} />
          <Field label="Date" value={event.dateTime} />

          <div className="flex flex-col gap-1.5 py-3 text-start">
            <p className="text-[#838383] text-[13px]">Image</p>
            <img
              src={event.image}
              alt=""
              className="w-full h-32 object-cover rounded-[16px]"
            />
          </div>
        </div>

        {/* Ticket Overview */}
        <div className="flex flex-col gap-1 text-start">
          <h3 className="text-white text-[16px] font-semibold mb-1">
            Ticket Overview
          </h3>
          {event.tickets.map((ticket) => (
            <div
              key={ticket.name}
              className="flex items-center justify-between py-3 border-b border-[#262525]"
            >
              <p className="text-[#838383] text-[15px]">{ticket.name}</p>
              <p className="text-[#ECECEC] text-[16px] font-semibold">
                {ticket.quantity}
              </p>
            </div>
          ))}
        </div>

        {/* Speakers / Line up */}
        <div className="flex flex-col gap-3 text-start">
          <h3 className="text-white text-[16px] font-semibold">
            Speakers/Line up
          </h3>
          <div className="grid grid-cols-2 gap-2.5">
            {event.speakers.map((speaker, index) => (
              <div
                key={`${speaker.name}-${index}`}
                className="flex items-center gap-2.5 bg-[#1A1A1A] rounded-2xl p-3"
              >
                <span className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-[#262525]">
                  <img
                    src={speaker.photo}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </span>
                <div className="flex flex-col gap-0.5 min-w-0 text-start">
                  <p className="text-[#ECECEC] text-[14px] font-medium truncate">
                    {speaker.name}
                  </p>
                  <p
                    className={`text-[12px] truncate ${
                      speaker.role === "Mark as Headliner"
                        ? "text-[#A485D9]"
                        : "text-[#838383]"
                    }`}
                  >
                    {speaker.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => setRejectOpen(true)}
            className="flex-1 bg-[#1A1A1A] border border-[#3B1F1F] text-[#FF6B6B] text-[15px] font-medium py-3.5 rounded-full hover:bg-[#2A1414] transition-colors"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => setApproveOpen(true)}
            className="flex-1 bg-[#995DFF] hover:bg-[#8a4ff0] text-white text-[15px] font-medium py-3.5 rounded-full transition-colors"
          >
            Approve
          </button>
        </div>
      </div>

      <RejectEventModal
        isOpen={rejectOpen}
        onClose={() => setRejectOpen(false)}
        onConfirm={(reason) => {
          setRejectOpen(false);
          onReject?.(reason);
        }}
      />

      <ApproveEventModal
        isOpen={approveOpen}
        onClose={() => setApproveOpen(false)}
        onConfirm={() => {
          setApproveOpen(false);
          onApprove?.();
        }}
      />
    </div>
  );
};

export default EachEventList;
