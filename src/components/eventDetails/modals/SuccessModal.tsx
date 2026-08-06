import { Link } from "react-router-dom";
import cancelIcon from "../../../assets/images/eventsImages/name.svg";
import bgImage from "../../../assets/images/eventsImages/62cae83f02e515ccbf643ad394caae5f42aa7121.png";
import bgText from "../../../assets/images/eventsImages/Subtract.svg";
import type { Booking } from "../../../types/booking";

interface SuccessModalProps {
  isOpen: boolean;
  booking?: Booking;
  onClose: () => void;
}

const SuccessModal = ({ isOpen, booking, onClose }: SuccessModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-[580px] max-w-lg overflow-hidden rounded-2xl border border-[#2A2A2A] bg-[#0B0B0B]"
      >
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-sm scale-110"
          style={{
            backgroundImage: `url("${bgImage}")`,
          }}
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

        <div className="relative p-8">
          <button
            className="absolute top-4 right-4"
            onClick={onClose}
            aria-label="Close"
          >
            <img src={cancelIcon} alt="" className="h-7 w-7" />
          </button>

          <h2 className="mb-4 pr-10 text-[35px] font-medium font-instrument leading-tight text-white">
            You&apos;re Registered!
          </h2>

          {/* Decorative pattern inside the box */}
          <img
            src={bgText}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />

          {/* Paragraph sits on top of the pattern */}
          <p className="relative text-sm leading-relaxed text-gray-300">
            We&apos;ve sent your ticket to your email for easy access.
            You&apos;ll also find it saved in your profile under{" "}
            <Link to="/profile" className="text-[#995DFF] hover:underline">
              My Tickets
            </Link>
            .
          </p>

          {booking && (
            <div className="relative mt-4 flex items-center gap-4">
              {booking.qrCode && (
                <img
                  src={booking.qrCode}
                  alt="Ticket QR code"
                  className="h-24 w-24 rounded-lg bg-white p-1.5"
                />
              )}
              <div className="rounded-xl border-2 border-[#262525] bg-[#1A1A1A] px-5 py-3">
                <p className="text-[11px] text-[#838383]">Ticket ID</p>
                <p className="text-[18px] font-semibold tracking-[2px] text-white">
                  {booking.code}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
