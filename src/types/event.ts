export const EVENT_CATEGORIES = [
  "Entertainment",
  "Tech",
  "Corporate",
  "Sport",
  "Education",
  "Charity",
  "Comedy",
  "Concert",
] as const;

export type EventCategory = (typeof EVENT_CATEGORIES)[number];

export type EventStatus = "Pending" | "Approved" | "Rejected";

export interface EventTicket {
  name: string;
  quantity: number;
  sold: number;
}

export interface EventSpeaker {
  name: string;
  photo: string;
  role: string;
}

export interface EventVendor {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Event {
  _id: string;
  name: string;
  overview?: string;
  location?: string;
  date: string;
  time?: string;
  image?: string;
  category: string;
  vendor: string | EventVendor;
  status: EventStatus;
  rejectionReason?: string;
  isClosed: boolean;
  tickets: EventTicket[];
  speakers: EventSpeaker[];
  createdAt: string;
  updatedAt: string;
}
