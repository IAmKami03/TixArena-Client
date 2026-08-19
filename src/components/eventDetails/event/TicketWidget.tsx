import { useEffect, useRef, useState } from "react";
import type React from "react";
import arrowDown from "../../../assets/images/eventsImages/Alt Arrow Down.svg";
import type { EventTicket } from "../../../types/event";

interface TicketWidgetProps {
  ticketCount: number;
  setTicketCount: React.Dispatch<React.SetStateAction<number>>;
  onRegister: () => void;
  tickets?: EventTicket[];
  selectedTicketName?: string;
  onSelectTicket: (ticketName: string) => void;
}

const TicketWidget = ({
  ticketCount,
  setTicketCount,
  onRegister,
  tickets = [],
  selectedTicketName,
  onSelectTicket,
}: TicketWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const selectedTicket = tickets.find((t) => t.name === selectedTicketName);
  const available = selectedTicket
    ? selectedTicket.quantity - selectedTicket.sold
    : 0;
  const soldOut = !!selectedTicket && available <= 0;

  return (
    <div className="bg-[#0B0B0B] w-full max-w-[446px] h-auto rounded-2xl p-6 border border-[#262525]">
      <p className="text-manrope font-medium text-[22px] border-b border-[#262525] pb-[20px]">
        Ticket
      </p>

      <div className="relative mt-[18px]" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          disabled={tickets.length <= 1}
          className="flex items-center justify-between w-full bg-[#0D0D0D] border border-[#2A2A2A] rounded-[30px] px-6 py-4 text-white disabled:cursor-default"
        >
          <span className="text-white">
            Ticket Type ({selectedTicketName ?? "—"})
          </span>
          {tickets.length > 1 && (
            <img
              src={arrowDown}
              alt=""
              className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          )}
        </button>

        {isOpen && tickets.length > 1 && (
          <div className="absolute z-30 top-full left-0 right-0 mt-2 bg-[#161616] border border-[#262525] rounded-2xl p-1.5 shadow-2xl">
            {tickets.map((t) => {
              const remaining = t.quantity - t.sold;
              const disabled = remaining <= 0;
              return (
                <button
                  key={t.name}
                  type="button"
                  disabled={disabled}
                  onClick={() => {
                    onSelectTicket(t.name);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between text-left px-4 py-2.5 rounded-xl text-[15px] transition-colors hover:bg-[#262525] ${
                    t.name === selectedTicketName
                      ? "text-[#995DFF]"
                      : "text-[#ABABAB]"
                  } ${disabled ? "opacity-40 cursor-not-allowed hover:bg-transparent" : ""}`}
                >
                  <span>{t.name}</span>
                  <span className="text-[12px]">
                    {disabled ? "Sold out" : `${remaining} left`}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="w-full h-[92px] flex justify-between items-center mb-4">
        <div className="flex flex-col items-start ">
          <p className="text-white font-medium">
            {selectedTicketName ?? "—"}
          </p>
          <p className="text-gray-400 text-sm">
            {soldOut ? "Sold out" : "Free"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setTicketCount((c) => Math.max(1, c - 1))}
            disabled={soldOut}
            className="w-8 h-8 rounded-full bg-[#2A2A2A] text-white cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            −
          </button>
          <span className="text-white">{ticketCount}</span>
          <button
            onClick={() =>
              setTicketCount((c) => Math.min(available || 1, c + 1))
            }
            disabled={soldOut}
            className="w-8 h-8 rounded-full bg-[#2A2A2A] text-white cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
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
            disabled={soldOut || !selectedTicketName}
            className="w-full h-[55px] bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-[17px] py-[14px] rounded-[30px] font-medium transition-colors mt-[15px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {soldOut ? "Sold Out" : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketWidget;
