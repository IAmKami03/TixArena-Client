import type React from "react";
import arrowDown from "../../../assets/images/eventsImages/Alt Arrow Down.svg";

interface TicketWidgetProps {
  ticketCount: number;
  setTicketCount: React.Dispatch<React.SetStateAction<number>>;
  onRegister: () => void;
  ticketName?: string;
}

const TicketWidget = ({
  ticketCount,
  setTicketCount,
  onRegister,
  ticketName = "Regular",
}: TicketWidgetProps) => {
  return (
    <div className="bg-[#0B0B0B] w-full max-w-[446px] h-[491px] rounded-2xl p-6 border border-[#262525]">
      <p className="text-manrope font-medium text-[22px] border-b border-[#262525] pb-[20px]">
        Ticket
      </p>

      <div
        aria-label="Ticket Type"
        className="flex items-center justify-between w-full bg-[#0D0D0D] border border-[#2A2A2A] rounded-[30px] px-6 py-4 text-white mt-[18px]"
      >
        <span className="text-white">Ticket Type ({ticketName})</span>
        <img src={arrowDown} alt="Arrow Down" />
      </div>

      <div className="w-full h-[92px] flex justify-between items-center mb-4">
        <div className="flex flex-col items-start ">
          <p className="text-white font-medium">{ticketName}</p>
          <p className="text-gray-400 text-sm">Free</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setTicketCount((c) => Math.max(1, c - 1))}
            className="w-8 h-8 rounded-full bg-[#2A2A2A] text-white cursor-pointer"
          >
            −
          </button>
          <span className="text-white">{ticketCount}</span>
          <button
            onClick={() => setTicketCount((c) => c + 1)}
            className="w-8 h-8 rounded-full bg-[#2A2A2A] text-white cursor-pointer"
          >
            +
          </button>
        </div>
      </div>

      <div className="w-full h-[202px] bg-[#161616] rounded-[30px] p-[16px]">
        <div className="flex items-center justify-between w-full h-[48px] text-gray-400 border-b border-[#262525]">
          <span>
            {ticketCount} ticket{ticketCount > 1 ? "s" : ""}
          </span>
          <span>Free</span>
        </div>
        <div className="flex justify-between text-white w-full h-[28px] font-medium mt-[20px]">
          <span>Total</span>
          <span>Free</span>
        </div>

        <div className="mx-auto">
          <button
            onClick={onRegister}
            className="w-full h-[55px] bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-[17px] py-[14px] rounded-[30px] font-medium transition-colors mt-[15px] cursor-pointer"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketWidget;
