// Commented out: retired in favor of the real Event API (see services/eventService.ts
// and types/event.ts). This in-memory mock was used before the vendor event backend existed.
/*
import { createContext, useContext, useState, type ReactNode } from "react";

export interface CreatedEventTicket {
  name: string;
  quantity: number;
}

export interface CreatedEventSpeaker {
  name: string;
  photo: string;
  role: string;
}

export interface CreatedEvent {
  id: number;
  name: string;
  overview: string;
  location: string;
  image: string;
  dateDisplay: string;
  createdWhen: string;
  dateCreated: string;
  category: string;
  createdBy: string;
  status: "Pending" | "Approved" | "Rejected";
  tickets: CreatedEventTicket[];
  totalTickets: number;
  soldTickets: number;
  remainingTickets: number;
  speakers: CreatedEventSpeaker[];
}

interface CreatedEventsProviderProps {
  children: ReactNode;
}

interface CreatedEventsContextType {
  createdEvents: CreatedEvent[];
  addCreatedEvent: (event: Omit<CreatedEvent, "id">) => CreatedEvent;
  updateCreatedEventStatus: (
    id: number,
    status: CreatedEvent["status"]
  ) => void;
}

const CreatedEventsContext = createContext<
  CreatedEventsContextType | undefined
>(undefined);

let idCounter = 1;
const nextId = () => Date.now() + idCounter++;

export const CreatedEventsProvider = ({
  children,
}: CreatedEventsProviderProps) => {
  const [createdEvents, setCreatedEvents] = useState<CreatedEvent[]>([]);

  const addCreatedEvent = (event: Omit<CreatedEvent, "id">) => {
    const newEvent: CreatedEvent = { ...event, id: nextId() };
    setCreatedEvents((prev) => [newEvent, ...prev]);
    return newEvent;
  };

  const updateCreatedEventStatus = (
    id: number,
    status: CreatedEvent["status"]
  ) => {
    setCreatedEvents((prev) =>
      prev.map((event) => (event.id === id ? { ...event, status } : event))
    );
  };

  return (
    <CreatedEventsContext.Provider
      value={{ createdEvents, addCreatedEvent, updateCreatedEventStatus }}
    >
      {children}
    </CreatedEventsContext.Provider>
  );
};

export const useCreatedEvents = () => {
  const context = useContext(CreatedEventsContext);
  if (!context) {
    throw new Error(
      "useCreatedEvents must be used within a CreatedEventsProvider"
    );
  }
  return context;
};
*/
