import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";

import arrowLeft from "../assets/images/eventsImages/arrow-down-01.svg";
import EventHero from "../components/eventDetails/event/EventHero";
import TicketWidget from "../components/eventDetails/event/TicketWidget";
import EventInfo from "../components/eventDetails/event/EventInfo";
import EventOverview from "../components/eventDetails/event/EventOverview";
import LineupSection from "../components/eventDetails/event/LineupSection";
import SimilarEvents from "../components/eventDetails/event/SimilarEvents";
import CheckoutModal from "../components/eventDetails/modals/CheckoutModal";
import SuccessModal from "../components/eventDetails/modals/SuccessModal";
import { getPublicEvent } from "../services/eventService";
import { getErrorMessage } from "../lib/api";
import type { Event } from "../types/event";
import type { Booking } from "../types/booking";
import { useAuth } from "../contexts/AuthContext";

const EventDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [ticketCount, setTicketCount] = useState<number>(1);
  const [selectedTicketName, setSelectedTicketName] = useState<string>();
  const [showCheckout, setShowCheckout] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [booking, setBooking] = useState<Booking | undefined>();
  const [event, setEvent] = useState<Event | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!id) return;
    getPublicEvent(id)
      .then((fetched) => {
        setEvent(fetched);
        // Default to the first ticket tier that still has availability,
        // falling back to the first tier if every tier is sold out.
        const firstAvailable = fetched.tickets.find(
          (t) => t.quantity - t.sold > 0,
        );
        setSelectedTicketName((firstAvailable ?? fetched.tickets[0])?.name);
      })
      .catch((err) => setError(getErrorMessage(err)));
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegister = () => {
    if (!user) {
      navigate("/signin", { state: { from: window.location.pathname } });
      return;
    }
    setShowCheckout(true);
  };

  if (id && error) {
    return (
      <div className="bg-[#0D0D0D] text-white min-h-screen flex items-center justify-center">
        <p className="text-[#ABABAB] text-[18px]">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0D0D0D] text-white min-h-screen">

      <div className=" mx-auto flex flex-col gap-8 lg:gap-12.5 px-4 sm:px-8 lg:px-25">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 py-4 text-sm cursor-pointer">
          <span className="text-gray-400">Events</span>
          <img src={arrowLeft} alt="" className="w-3 h-3" />
          <span className="text-white">
            {event?.name ?? "Accessing the App & Google Play Store"}
          </span>
        </div>

        {copied && (
          <p className="text-[#A485D9] text-[14px] -mt-8">
            Link copied to clipboard!
          </p>
        )}

        {/* Hero + Ticket Widget — two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
          <EventHero image={event?.image} alt={event?.name} />
          <TicketWidget
            ticketCount={ticketCount}
            setTicketCount={setTicketCount}
            onRegister={handleRegister}
            tickets={event?.tickets}
            selectedTicketName={selectedTicketName}
            onSelectTicket={(name) => {
              setSelectedTicketName(name);
              setTicketCount(1);
            }}
          />
        </div>

        {/* Event Info & Overview */}
        <div className="space-y-8 w-full lg:w-[53%] h-auto mb-[50px]">
          <EventInfo
            name={event?.name}
            location={event?.location}
            dateTime={
              event
                ? `${format(new Date(event.date), "EEEE, MMM d")}${
                    event.time ? ` • ${event.time}` : ""
                  }`
                : undefined
            }
            onShare={id ? handleShare : undefined}
          />
          <EventOverview overview={event?.overview} />
        </div>

        {/* Lineup */}
        <div className="space-y-8 py-8">
          <LineupSection speakers={event?.speakers} />
        </div>
      </div>

      {/* Similar Events */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-25 pb-8">
        <SimilarEvents currentEventId={event?._id} />
      </div>

      {/* Modals */}
      {showCheckout && event && selectedTicketName && (
        <CheckoutModal
          isOpen={showCheckout}
          ticketCount={ticketCount}
          eventId={event._id}
          ticketName={selectedTicketName}
          onClose={() => setShowCheckout(false)}
          onSuccess={(newBooking) => {
            setShowCheckout(false);
            setBooking(newBooking);
            setShowSuccess(true);
          }}
        />
      )}

      {showSuccess && (
        <SuccessModal
          isOpen={showSuccess}
          booking={booking}
          onClose={() => setShowSuccess(false)}
        />
      )}
    </div>
  );
};

export default EventDetailPage;
