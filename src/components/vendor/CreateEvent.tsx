import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { LuArrowRight } from "react-icons/lu";
import long from "../../assets/images/vendorImages/longdots.svg";
import arrowLeft from "../../assets/images/vendorImages/arrow-left.svg";
import fallbackImage from "../../assets/images/vendorImages/social.svg";
import fallbackSpeakerPhoto from "../../assets/images/vendorImages/idris.svg";
import EventForm from "./EventForm";
import type { EventFormData, EventFormErrors } from "./EventForm";
import TicketForm from "./TicketForm";
import type { TicketEntry, TicketFormErrors } from "./TicketForm";
import LineUpsForm from "./LineUpsForm";
import type { SpeakerEntry, LineUpsFormErrors } from "./LineUpsForm";
import EventListedModal from "./EventListedModal";
import { createEvent } from "../../services/eventService";
import { getErrorMessage } from "../../lib/api";

const STEPS = [
  {
    title: "Event Overview",
    description: "Event Name, Overview, Location, Date, Cover image.",
  },
  {
    title: "Ticket Overview",
    description: "Ticket name and quantity for each ticket type.",
  },
  {
    title: "Speakers/Line up",
    description: "Speaker photos, names and headliners.",
  },
];

const EMPTY_EVENT: EventFormData = {
  name: "",
  overview: "",
  location: "",
  date: null,
  category: "",
  image: null,
};

const CreateEvent = () => {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [eventData, setEventData] = useState<EventFormData>(EMPTY_EVENT);
  const [tickets, setTickets] = useState<TicketEntry[]>([]);
  const [speakers, setSpeakers] = useState<SpeakerEntry[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eventErrors, setEventErrors] = useState<EventFormErrors>({});
  const [ticketErrors, setTicketErrors] = useState<TicketFormErrors>({});
  const [lineupErrors, setLineupErrors] = useState<LineUpsFormErrors>({});
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [isSpeakerPhotoUploading, setIsSpeakerPhotoUploading] = useState(false);
  const isUploading = isImageUploading || isSpeakerPhotoUploading;

  const isLastStep = activeStep === STEPS.length - 1;
  const isFirstStep = activeStep === 0;

  const handlePrevious = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const validateEventStep = (): boolean => {
    const errors: EventFormErrors = {};
    if (!eventData.name.trim()) errors.name = "Event name is required.";
    if (!eventData.overview.trim()) errors.overview = "Overview is required.";
    if (!eventData.location.trim()) errors.location = "Location is required.";
    if (!eventData.category) errors.category = "Please select a category.";
    if (!eventData.date) errors.date = "Please pick a date.";
    setEventErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateTicketStep = (): boolean => {
    const errors: TicketFormErrors = {};
    const named = tickets.filter((t) => t.name.trim());
    if (named.length === 0) {
      toast.error("Add at least one ticket type.");
      return false;
    }
    for (const t of tickets) {
      const rowErrors: { name?: string; quantity?: string } = {};
      const hasName = t.name.trim().length > 0;
      const hasQuantity = t.quantity > 0;
      if (hasName && !hasQuantity) {
        rowErrors.quantity = "Enter how many of this ticket are available.";
      }
      if (!hasName && hasQuantity) {
        rowErrors.name = "This ticket needs a name.";
      }
      if (Object.keys(rowErrors).length > 0) errors[t.id] = rowErrors;
    }
    setTicketErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateLineupStep = (): boolean => {
    const errors: LineUpsFormErrors = {};
    for (const s of speakers) {
      if (s.photo && !s.name.trim()) {
        errors[s.id] = "This speaker needs a name.";
      }
    }
    setLineupErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep = (step: number): boolean => {
    if (step === 0) return validateEventStep();
    if (step === 1) return validateTicketStep();
    return validateLineupStep();
  };

  const handleComplete = async () => {
    if (!validateEventStep()) {
      setActiveStep(0);
      return;
    }
    if (!validateTicketStep()) {
      setActiveStep(1);
      return;
    }
    if (!validateLineupStep()) {
      setActiveStep(2);
      return;
    }

    setIsSubmitting(true);
    try {
      const now = new Date();
      const eventDate = eventData.date ?? now;

      await createEvent({
        name: eventData.name.trim() || "Untitled Event",
        overview: eventData.overview,
        location: eventData.location,
        image: eventData.image ?? fallbackImage,
        date: eventDate.toISOString(),
        time: format(eventDate, "h:mm a"),
        category: eventData.category,
        tickets: tickets
          .filter((t) => t.name.trim())
          .map((t) => ({
            name: t.name.trim(),
            quantity: t.quantity,
          })),
        speakers: speakers
          .filter((s) => s.name.trim())
          .map((s) => ({
            name: s.name,
            photo: s.photo ?? fallbackSpeakerPhoto,
            role: s.isHeadliner ? "Mark as Headliner" : "Speaker",
          })),
      });

      setIsSuccessOpen(true);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (!validateStep(activeStep)) return;
    if (isLastStep) {
      handleComplete();
      return;
    }
    setActiveStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  };

  return (
    <div className="w-full flex flex-col items-start gap-6 p-4 sm:p-6">
      <div className="flex flex-col gap-0.5 items-start">
        <h2 className="text-[23px] font-semibold text-white">My Events</h2>

        <div className="flex gap-2">
          <p className="text-[16px] font-normal text-[#CECECE]">Event</p>
          <p className="text-[16px] font-normal text-[#CECECE]">Overview</p>
          <p className="text-[16px] font-normal text-[#A485D9]">
            Create New Event
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col lg:flex-row items-stretch lg:items-start gap-2.5">
        <div className="w-full lg:w-[31%] flex flex-col px-3.5 py-3.25 rounded-[30px] bg-[#0F0F0F] border border-[#262525] ">
          {STEPS.map((step, index) => (
            <div
              key={step.title}
              onClick={() => setActiveStep(index)}
              className={`w-full flex items-start p-2.5 gap-2.5 rounded-[20px] cursor-pointer transition-colors ${
                index === activeStep ? "bg-[#191919]" : "bg-transparent"
              }`}
            >
              <img src={long} alt="" />
              <div className="flex flex-col gap-2.5 items-start text-start text-[16px]">
                <p
                  className={
                    index === activeStep ? "text-[#FFFFFF]" : "text-[#7A7A7A]"
                  }
                >
                  {step.title}
                </p>
                <p className="text-[#ABABAB]">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        {/* FORMS — all three stay mounted for the whole wizard lifetime so
            navigating between steps never resets what the user already
            entered; only visibility toggles per step. */}
        <div className="flex-1">
          <div className={activeStep === 0 ? "" : "hidden"}>
            <EventForm
              onChange={setEventData}
              onUploadingChange={setIsImageUploading}
              errors={eventErrors}
            />
          </div>
          <div className={activeStep === 1 ? "" : "hidden"}>
            <TicketForm onChange={setTickets} errors={ticketErrors} />
          </div>
          <div className={activeStep === 2 ? "" : "hidden"}>
            <LineUpsForm
              onChange={setSpeakers}
              onUploadingChange={setIsSpeakerPhotoUploading}
              errors={lineupErrors}
            />
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-between p-6">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={isFirstStep}
          className="flex items-center gap-2.5 bg-[#262525] rounded-full pl-4 pr-5 py-3.5 text-[#ECECEC] text-[16px] disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
        >
          <img src={arrowLeft} alt="" />
          Previous
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={isSubmitting || isUploading}
          className="flex items-center gap-2.5 bg-white rounded-full pl-5 pr-4 py-3.5 text-[#0C0C0C] text-[16px] font-medium disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLastStep
            ? isSubmitting
              ? "Publishing..."
              : isUploading
                ? "Uploading image..."
                : "Complete"
            : "Next"}
          <LuArrowRight size={16} className="text-[#0C0C0C]" />
        </button>
      </div>

      <EventListedModal
        isOpen={isSuccessOpen}
        onClose={() => {
          setIsSuccessOpen(false);
          navigate("/vendor");
        }}
      />
    </div>
  );
};

export default CreateEvent;
