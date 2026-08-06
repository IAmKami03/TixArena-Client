import type { Event } from "./event";

export interface Booking {
  _id: string;
  event:
    | string
    | Pick<
        Event,
        "_id" | "name" | "date" | "time" | "location" | "image" | "status" | "category"
      >;
  user: string;
  ticketName: string;
  quantity: number;
  fullName: string;
  email: string;
  phone?: string;
  code: string;
  qrCode: string;
  checkedIn: boolean;
  checkedInAt?: string;
  createdAt: string;
  updatedAt: string;
}
