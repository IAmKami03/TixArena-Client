import { FaLocationDot } from "react-icons/fa6";
import eveimg from "../../assets/images/vendorImages/eventimg2.svg";

interface DeleteEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  eventName?: string;
  eventDateTime?: string;
  eventLocation?: string;
}

const DeleteEventModal = ({
  isOpen,
  onClose,
  onConfirm,
  eventName = "Midnight Pulse",
  eventDateTime = "28 May 2026 · 3PM - 5PM",
  eventLocation = "Victoria Island Rooftop Lounge",
}: DeleteEventModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-[360px] bg-[#141414] border border-[#262525] rounded-[24px] p-4 flex flex-col gap-5 text-start">
        {/* Event preview */}
        <div className="flex items-center gap-3 bg-[#1F1F1F] rounded-2xl p-2.5">
          <img
            src={eveimg}
            alt=""
            className="w-14 h-14 rounded-xl object-cover shrink-0"
          />
          <div className="flex flex-col gap-0.5 min-w-0">
            <p className="text-white text-[14px] font-semibold truncate">
              {eventName}
            </p>
            <p className="text-[#ABABAB] text-[12px] truncate">
              {eventDateTime}
            </p>
            <div className="flex items-center gap-1 min-w-0">
              <FaLocationDot className="text-[#A485D9] shrink-0" size={11} />
              <p className="text-[#A485D9] text-[12px] truncate">
                {eventLocation}
              </p>
            </div>
          </div>
        </div>

        {/* Confirmation */}
        <div className="flex flex-col items-center text-center gap-2 px-2">
          <h2 className="text-white text-[20px] font-semibold">
            Do you Want to Delete Event?
          </h2>
          <p className="text-[#ABABAB] text-[14px]">
            By deleting this event, you won't be able to undo this.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-[#262525] hover:bg-[#333] text-white text-[15px] font-medium py-3.5 rounded-full transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 bg-[#F04438] hover:bg-[#d93c31] text-white text-[15px] font-medium py-3.5 rounded-full transition-colors"
          >
            Delete Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteEventModal;
