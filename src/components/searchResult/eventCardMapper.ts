import { format } from "date-fns";
import fallbackImage from "../../assets/images/vendorImages/eventimg2.svg";
import type { Event } from "../../types/event";

export interface EventCardData {
  id: string;
  title: string;
  image: string;
  date: string;
  time: string;
  price: string;
  location: string;
  category: string;
}

export const toEventCardData = (event: Event): EventCardData => ({
  id: event._id,
  title: event.name,
  image: event.image || fallbackImage,
  date: format(new Date(event.date), "d MMM yyyy"),
  time: event.time ?? "",
  price: "Free",
  location: event.location ?? "Location not set",
  category: event.category,
});
