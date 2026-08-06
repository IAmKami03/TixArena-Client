import { LuX } from "react-icons/lu";
import eveimg from "../../assets/images/vendorImages/eventimg2.svg";

interface EventListedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EventListedModal = ({ isOpen, onClose }: EventListedModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="relative w-full max-w-[400px] overflow-hidden rounded-[24px] border border-[#262525] bg-[#141414]">
        {/* Decorative glow */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={eveimg}
            alt=""
            className="absolute -top-10 -right-10 w-56 h-56 object-cover rounded-full opacity-30 blur-md"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#141414]/70 to-[#141414]" />
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#262525] flex items-center justify-center hover:bg-[#333] transition-colors"
        >
          <LuX className="text-white" size={16} />
        </button>

        <div className="relative z-10 p-6 flex flex-col gap-5 text-start">
          <div className="flex flex-col gap-2 pr-10">
            <h2 className="font-instrument text-[30px] text-white leading-tight">
              Event Listed Successfully
            </h2>
            <p className="text-[#ABABAB] text-[14px] leading-relaxed">
              Everything is set and your event is ready for attendees.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full bg-[#995DFF] hover:bg-[#8a4ff0] text-white text-[15px] font-medium py-3.5 rounded-full transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventListedModal;
