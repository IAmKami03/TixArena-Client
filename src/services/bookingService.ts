import api from "../lib/api";
import type { Booking } from "../types/booking";

export interface CreateBookingPayload {
  eventId: string;
  ticketName: string;
  quantity: number;
  fullName: string;
  email: string;
  phone?: string;
}

export const createBooking = async (
  data: CreateBookingPayload,
): Promise<Booking> => {
  const res = await api.post("/bookings", data);
  return res.data.booking;
};

export const getMyBookings = async (): Promise<Booking[]> => {
  const res = await api.get("/bookings/mine");
  return res.data.bookings;
};

export const getEventAttendees = async (
  eventId: string,
): Promise<Booking[]> => {
  const res = await api.get(`/bookings/event/${eventId}`);
  return res.data.bookings;
};

export const checkInByCode = async (
  eventId: string,
  code: string,
): Promise<Booking> => {
  const res = await api.patch("/bookings/check-in", { eventId, code });
  return res.data.booking;
};
