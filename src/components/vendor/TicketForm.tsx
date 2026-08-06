import { useState } from "react";

export interface TicketEntry {
  id: number;
  name: string;
  quantity: number;
}

interface TicketFormProps {
  onChange?: (tickets: TicketEntry[]) => void;
}

const inputBase =
  "w-full bg-[#1A1A1A] text-[#ABABAB] text-[16px] rounded-[30px] border-2 border-[#262525] px-4.5 py-5 placeholder:text-[#6E6E6E] outline-none focus:border-[#995DFF] transition-colors";
const labelBase = "text-[#FFFFFF] text-[16px] font-normal";
const requiredMark = <span className="text-[#FF7466]">*</span>;

let idCounter = 0;
const nextId = () => ++idCounter;

const TicketForm = ({ onChange }: TicketFormProps) => {
  const [tickets, setTickets] = useState<TicketEntry[]>([
    { id: nextId(), name: "", quantity: 0 },
    { id: nextId(), name: "", quantity: 0 },
  ]);

  const emit = (next: TicketEntry[]) => {
    setTickets(next);
    onChange?.(next);
  };

  const handleName = (id: number, value: string) => {
    emit(tickets.map((t) => (t.id === id ? { ...t, name: value } : t)));
  };

  const handleQuantity = (id: number, value: string) => {
    const parsed = Math.max(0, Number(value) || 0);
    emit(tickets.map((t) => (t.id === id ? { ...t, quantity: parsed } : t)));
  };

  const adjustQuantity = (id: number, delta: number) => {
    emit(
      tickets.map((t) =>
        t.id === id ? { ...t, quantity: Math.max(0, t.quantity + delta) } : t
      )
    );
  };

  const addTicket = () => {
    emit([...tickets, { id: nextId(), name: "", quantity: 0 }]);
  };

  return (
    <div className="flex flex-col gap-3.5 text-start bg-[#0F0F0F] border border-[#262525] rounded-[30px] p-5.5">
      <h3 className="text-white text-[18px] font-semibold">
        Ticket Overview
      </h3>

      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          className="flex flex-col gap-3.5 bg-[#161616] rounded-[24px] p-4.5"
        >
          <div className="flex flex-col gap-1.5">
            <label className={labelBase}>Ticket Name {requiredMark}</label>
            <input
              value={ticket.name}
              onChange={(e) => handleName(ticket.id, e.target.value)}
              placeholder="Enter ticket name"
              className={inputBase}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelBase}>Ticket Quantity {requiredMark}</label>
            <div className="relative flex items-center">
              <input
                value={ticket.quantity || ""}
                onChange={(e) => handleQuantity(ticket.id, e.target.value)}
                placeholder="Enter quantity"
                className={`${inputBase} pr-24`}
              />
              <div className="absolute right-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => adjustQuantity(ticket.id, -1)}
                  aria-label="Decrease quantity"
                  className="w-9 h-9 rounded-full bg-[#262525] text-white text-lg flex items-center justify-center hover:bg-[#333] transition-colors"
                >
                  −
                </button>
                <button
                  type="button"
                  onClick={() => adjustQuantity(ticket.id, 1)}
                  aria-label="Increase quantity"
                  className="w-9 h-9 rounded-full bg-[#262525] text-white text-lg flex items-center justify-center hover:bg-[#333] transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addTicket}
        className="text-[#A485D9] text-[16px] font-medium flex items-center gap-1 w-fit"
      >
        Add <span className="text-[18px]">+</span>
      </button>
    </div>
  );
};

export default TicketForm;
