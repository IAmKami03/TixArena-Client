import { useState } from "react";
import cancleIcon from "../../../assets/images/eventsImages/name.svg";
import { createBooking } from "../../../services/bookingService";
import { getErrorMessage } from "../../../lib/api";
import { useAuth } from "../../../contexts/AuthContext";
import type { Booking } from "../../../types/booking";

interface CheckOutModalProps {
  isOpen: boolean;
  ticketCount: number;
  eventId: string;
  ticketName: string;
  onClose: () => void;
  onSuccess: (booking: Booking) => void;
}

const CheckoutModal = ({
  isOpen,
  ticketCount,
  eventId,
  ticketName,
  onClose,
  onSuccess,
}: CheckOutModalProps) => {
  const { user } = useAuth();
  const [fullName, setFullName] = useState(
    user ? `${user.firstName} ${user.lastName}` : "",
  );
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!fullName || !email) return;

    setError("");
    setIsSubmitting(true);
    try {
      const booking = await createBooking({
        eventId,
        ticketName,
        quantity: ticketCount,
        fullName,
        email,
        phone: phone || undefined,
      });
      onSuccess(booking);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // background
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-2xl border border-[#2A2A2A] bg-[#0B0B0B] p-8"
      >
        {/* cancle button */}
        <button className="absolute top-4 right-4" onClick={onClose}>
          <img src={cancleIcon} alt="" className="w-7 h-7" />
        </button>

        {/* title */}
        <h2 className="text-white font-bold text-[45px] mb-6">Checkout</h2>

        {/* order surmary */}
        <p className="text-white text-[22px]  mb-3">Order Summary</p>

        {/* free ticket */}
        <div className="mb-2 flex items-center justify-between text-white">
          <span>
            {ticketCount} ticket{ticketCount > 1 ? "s" : ""}
          </span>
          <span>Free</span>
        </div>

        <div className="mb-6 flex justify-between border-t border-[#262525] pt-3 font-semibold text-white">
          <span>
            Total ({ticketCount} ticket{ticketCount > 1 ? "s" : ""})
          </span>
          <span>Free</span>
        </div>

        {/* Full name */}
        <label className="text-white text-sm text-start block mb-1 ">
          Full Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          placeholder="John Doe"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full rounded-[30px] border border-[#2A2A2A] py-3 px-4 bg-[#191919] mb-4 text-white placeholder-gray-500"
        />
        {/* Email */}
        <label className="text-white text-start text-sm block mb-1">
          Email <span className="text-red-400">*</span>
        </label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-[30px] border border-[#2A2A2A] py-3 px-4 bg-[#191919] mb-4 text-white placeholder-gray-500"
        />
        {/* Phone */}
        <label className="text-white text-start text-sm block mb-1">
          Phone number
        </label>
        <input
          type="tel"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-[30px] border border-[#2A2A2A] py-3 px-4 bg-[#191919] mb-4 text-white placeholder-gray-500"
        />

        {error && <p className="mb-4 text-sm text-[#FF7466]">{error}</p>}

        {/* button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full rounded-[30px]  py-3 px-5 text-white font-medium bg-[#995DFF] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Registering..." : "Complete Registration"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutModal;
