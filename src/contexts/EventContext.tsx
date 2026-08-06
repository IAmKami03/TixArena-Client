import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { format } from "date-fns";

import { useSearch } from "./SearchContext";
import { getPublicEvents } from "../services/eventService";
import { getErrorMessage } from "../lib/api";
import type { Event } from "../types/event";

interface EventProviderProps {
  children: ReactNode;
}

interface ActiveFilter {
  key: string;
  label: string;
  onClear: () => void;
}

interface EventContextType {
  events: Event[];
  filteredEvents: Event[];
  isLoading: boolean;
  loadError: string;

  selectedCategory: string;
  setSelectedCategory: (value: string) => void;

  selectedDate: string;
  setSelectedDate: (value: string) => void;

  selectedHappening: string;
  setSelectedHappening: (value: string) => void;

  activeFilters: ActiveFilter[];
  clearFilters: () => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

const isSameDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const startOfDay = (d: Date): Date =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate());

const matchesDateFilter = (eventDateIso: string, selectedDate: string): boolean => {
  if (!selectedDate) return true;

  const eventDate = new Date(eventDateIso);
  const today = startOfDay(new Date());

  if (selectedDate === "Today") {
    return isSameDay(eventDate, today);
  }
  if (selectedDate === "Tomorrow") {
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return isSameDay(eventDate, tomorrow);
  }
  if (selectedDate === "This weekend") {
    const day = today.getDay();
    const daysUntilSaturday = (6 - day + 7) % 7;
    const saturday = new Date(today);
    saturday.setDate(saturday.getDate() + daysUntilSaturday);
    const sunday = new Date(saturday);
    sunday.setDate(sunday.getDate() + 1);
    return isSameDay(eventDate, saturday) || isSameDay(eventDate, sunday);
  }

  // Exact ISO date string (YYYY-MM-DD) from the date picker
  return eventDateIso.slice(0, 10) === selectedDate;
};

const getHappeningBucket = (time?: string): string | null => {
  if (!time) return null;
  const match = time.match(/(\d{1,2})(?::\d{2})?\s*(AM|PM)/i);
  if (!match) return null;

  let hour = parseInt(match[1], 10);
  const meridiem = match[2].toUpperCase();
  if (meridiem === "PM" && hour !== 12) hour += 12;
  if (meridiem === "AM" && hour === 12) hour = 0;

  if (hour < 12) return "Morning Event";
  if (hour < 17) return "Midday Event";
  return "Night Event";
};

const formatDateLabel = (selectedDate: string): string => {
  if (["Today", "Tomorrow", "This weekend"].includes(selectedDate)) {
    return selectedDate;
  }
  const parsed = new Date(selectedDate);
  return Number.isNaN(parsed.getTime())
    ? selectedDate
    : format(parsed, "d MMM yyyy");
};

export const EventProvider = ({ children }: EventProviderProps) => {
  const { searchQuery } = useSearch();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedHappening, setSelectedHappening] = useState("");

  useEffect(() => {
    getPublicEvents()
      .then(setEvents)
      .catch((err) => setLoadError(getErrorMessage(err)))
      .finally(() => setIsLoading(false));
  }, []);

  const query = searchQuery.trim().toLowerCase();

  const filteredEvents = events.filter((event) => {
    const categoryMatch =
      selectedCategory === "All" || event.category === selectedCategory;

    const dateMatch = matchesDateFilter(event.date, selectedDate);

    const happeningMatch =
      !selectedHappening || getHappeningBucket(event.time) === selectedHappening;

    const searchMatch =
      query === "" ||
      event.name.toLowerCase().includes(query) ||
      (event.location ?? "").toLowerCase().includes(query) ||
      event.category.toLowerCase().includes(query);

    return categoryMatch && dateMatch && happeningMatch && searchMatch;
  });

  const activeFilters: ActiveFilter[] = [];
  if (selectedCategory !== "All") {
    activeFilters.push({
      key: "category",
      label: selectedCategory,
      onClear: () => setSelectedCategory("All"),
    });
  }
  if (selectedDate) {
    activeFilters.push({
      key: "date",
      label: formatDateLabel(selectedDate),
      onClear: () => setSelectedDate(""),
    });
  }
  if (selectedHappening) {
    activeFilters.push({
      key: "happening",
      label: selectedHappening,
      onClear: () => setSelectedHappening(""),
    });
  }

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedDate("");
    setSelectedHappening("");
  };

  return (
    <EventContext.Provider
      value={{
        events,
        filteredEvents,
        isLoading,
        loadError,

        selectedCategory,
        setSelectedCategory,

        selectedDate,
        setSelectedDate,

        selectedHappening,
        setSelectedHappening,

        activeFilters,
        clearFilters,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);

  if (!context) {
    throw new Error("useEvents must be used within an EventProvider");
  }

  return context;
};
