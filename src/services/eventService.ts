import api from "../lib/api";
import type { Event, EventStatus } from "../types/event";

export interface EventTicketInput {
  name: string;
  quantity: number;
}

export interface EventSpeakerInput {
  name: string;
  photo: string;
  role: string;
}

export interface EventPayload {
  name?: string;
  overview?: string;
  location?: string;
  date?: string;
  time?: string;
  image?: string;
  category?: string;
  tickets?: EventTicketInput[];
  speakers?: EventSpeakerInput[];
}

export const createEvent = async (data: EventPayload): Promise<Event> => {
  const res = await api.post("/events", data);
  return res.data.event;
};

export const getMyEvents = async (): Promise<Event[]> => {
  const res = await api.get("/events/mine");
  return res.data.events;
};

export const getAllEvents = async (): Promise<Event[]> => {
  const res = await api.get("/events");
  return res.data.events;
};

export const getEvent = async (id: string): Promise<Event> => {
  const res = await api.get(`/events/${id}`);
  return res.data.event;
};

export const getPublicEvents = async (): Promise<Event[]> => {
  const res = await api.get("/events/public");
  return res.data.events;
};

export const getPublicEvent = async (id: string): Promise<Event> => {
  const res = await api.get(`/events/public/${id}`);
  return res.data.event;
};

export const updateEvent = async (
  id: string,
  data: EventPayload,
): Promise<Event> => {
  const res = await api.patch(`/events/${id}`, data);
  return res.data.event;
};

export const deleteEvent = async (id: string): Promise<void> => {
  await api.delete(`/events/${id}`);
};

export const closeEvent = async (id: string): Promise<Event> => {
  const res = await api.patch(`/events/${id}/close`);
  return res.data.event;
};

export const updateEventStatus = async (
  id: string,
  status: EventStatus,
  reason?: string,
): Promise<Event> => {
  const res = await api.patch(`/events/${id}/status`, { status, reason });
  return res.data.event;
};
