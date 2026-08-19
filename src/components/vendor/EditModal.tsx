import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import toast from "react-hot-toast";
import { LuCheck } from "react-icons/lu";
import DatePickerField from "./DatePickerField";
import camera from "../../assets/images/vendorImages/Camera.svg";
import close from "../../assets/images/vendorImages/close.svg";
import type { Event as EventData } from "../../types/event";
import type { EventPayload } from "../../services/eventService";
import { uploadImage } from "../../services/uploadService";
import { getErrorMessage } from "../../lib/api";

interface TicketOverview {
  id: number;
  name: string;
  quantity: number;
}

interface Speaker {
  id: number;
  name: string;
  photo: string | null;
  isHeadliner: boolean;
}

interface EventOverview {
  name: string;
  overview: string;
  location: string;
  date: Date | null;
  time: string;
  image: string | null;
}

interface EditModalProps {
  isOpen: boolean;
  event: EventData;
  onClose: () => void;
  onSave?: (data: EventPayload) => void;
}

let idCounter = 100;
const nextId = () => idCounter++;

const toFormState = (event: EventData) => ({
  event: {
    name: event.name,
    overview: event.overview ?? "",
    location: event.location ?? "",
    date: event.date ? new Date(event.date) : null,
    time: event.time ?? "",
    image: event.image || null,
  } satisfies EventOverview,
  tickets: event.tickets.map((t) => ({
    id: nextId(),
    name: t.name,
    quantity: t.quantity,
  })),
  speakers: event.speakers.map((s) => ({
    id: nextId(),
    name: s.name,
    photo: s.photo || null,
    isHeadliner: s.role === "Mark as Headliner",
  })),
});

const CloseIcon = () => (
  <div>
    <img src={close} alt="" />
  </div>
);

const CameraIcon = () => (
  <div>
    <img src={camera} alt="" />
  </div>
);

const inputBase =
  "w-full  bg-[#1A1A1A] text-[#ABABAB] text-[16px] rounded-[30px] border-2 border-[#262525] px-4.5 py-5 placeholder:text-[#6E6E6E] outline-none border border-transparent focus:border-[#995DFF] transition-colors";
const labelBase = "text-[#FFFFFF] text-[16px] font-normal";

const EditModal = ({ isOpen, event: sourceEvent, onClose, onSave }: EditModalProps) => {
  const [event, setEvent] = useState<EventOverview>(
    () => toFormState(sourceEvent).event,
  );
  const [tickets, setTickets] = useState<TicketOverview[]>(
    () => toFormState(sourceEvent).tickets,
  );
  const [speakers, setSpeakers] = useState<Speaker[]>(
    () => toFormState(sourceEvent).speakers,
  );
  const [eventImagePreview, setEventImagePreview] = useState<string | null>(
    null,
  );
  const [isEventImageUploading, setIsEventImageUploading] = useState(false);
  const [speakerPreviews, setSpeakerPreviews] = useState<
    Record<number, string>
  >({});
  const [uploadingSpeakerIds, setUploadingSpeakerIds] = useState<Set<number>>(
    new Set(),
  );
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    overview?: string;
    location?: string;
    date?: string;
  }>({});
  const [ticketErrors, setTicketErrors] = useState<
    Record<number, { name?: string; quantity?: string }>
  >({});

  useEffect(() => {
    if (!isOpen) return;
    const initial = toFormState(sourceEvent);
    // Resetting the modal's local form state to match whichever event it
    // was opened for, each time it (re)opens.
    /* eslint-disable react-hooks/set-state-in-effect */
    setEvent(initial.event);
    setTickets(initial.tickets);
    setSpeakers(initial.speakers);
    setFieldErrors({});
    setTicketErrors({});
    /* eslint-enable react-hooks/set-state-in-effect */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, sourceEvent._id]);

  if (!isOpen) return null;

  const isUploading =
    isEventImageUploading || uploadingSpeakerIds.size > 0;

  const handleEventImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setEventImagePreview(URL.createObjectURL(file));
    setIsEventImageUploading(true);
    try {
      const url = await uploadImage(file);
      setEvent((prev) => ({ ...prev, image: url }));
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setEventImagePreview(null);
      setIsEventImageUploading(false);
    }
  };

  const handleTicketChange = (
    id: number,
    field: "name" | "quantity",
    value: string,
  ) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              [field]:
                field === "quantity" ? Math.max(0, Number(value) || 0) : value,
            }
          : t,
      ),
    );
  };

  const adjustQuantity = (id: number, delta: number) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, quantity: Math.max(0, t.quantity + delta) } : t,
      ),
    );
  };

  const addTicket = () => {
    setTickets((prev) => [...prev, { id: nextId(), name: "", quantity: 0 }]);
  };

  const handleSpeakerName = (id: number, value: string) => {
    setSpeakers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, name: value } : s)),
    );
  };

  const handleSpeakerPhoto = async (
    id: number,
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSpeakerPreviews((prev) => ({ ...prev, [id]: URL.createObjectURL(file) }));
    setUploadingSpeakerIds((prev) => new Set(prev).add(id));

    try {
      const url = await uploadImage(file);
      setSpeakers((prev) =>
        prev.map((s) => (s.id === id ? { ...s, photo: url } : s)),
      );
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSpeakerPreviews((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      setUploadingSpeakerIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const toggleHeadliner = (id: number) => {
    setSpeakers((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, isHeadliner: !s.isHeadliner } : s,
      ),
    );
  };

  const addSpeaker = () => {
    setSpeakers((prev) => [
      ...prev,
      { id: nextId(), name: "", photo: null, isHeadliner: false },
    ]);
  };

  const handleSave = () => {
    const errors: typeof fieldErrors = {};
    if (!event.name.trim()) errors.name = "Event name is required.";
    if (!event.overview.trim()) errors.overview = "Overview is required.";
    if (!event.location.trim()) errors.location = "Location is required.";
    if (!event.date) errors.date = "Please pick a date.";
    setFieldErrors(errors);

    const rowErrors: typeof ticketErrors = {};
    for (const t of tickets) {
      const hasName = t.name.trim().length > 0;
      const hasQuantity = t.quantity > 0;
      const row: { name?: string; quantity?: string } = {};
      if (hasName && !hasQuantity) {
        row.quantity = "Enter how many of this ticket are available.";
      }
      if (!hasName && hasQuantity) {
        row.name = "This ticket needs a name.";
      }
      if (Object.keys(row).length > 0) rowErrors[t.id] = row;
    }
    setTicketErrors(rowErrors);

    if (Object.keys(errors).length > 0 || Object.keys(rowErrors).length > 0) {
      return;
    }

    onSave?.({
      name: event.name,
      overview: event.overview,
      location: event.location,
      date: (event.date ?? new Date()).toISOString(),
      time: event.time,
      image: event.image ?? "",
      tickets: tickets
        .filter((t) => t.name.trim())
        .map((t) => ({ name: t.name.trim(), quantity: t.quantity })),
      speakers: speakers
        .filter((s) => s.name.trim())
        .map((s) => ({
          name: s.name,
          photo: s.photo ?? "",
          role: s.isHeadliner ? "Mark as Headliner" : "Speaker",
        })),
    });
  };

  return (
    <div className=" fixed inset-0 z-50 flex items-center justify-end bg-black/70 px-4">
      <div className="w-full max-w-md max-h-[95vh] overflow-y-auto hide-scrollbar bg-[#0F0F0F] border border-[#262525] rounded-3xl p-5 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-white text-[20px] font-semibold">Edit Event</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1A1A1A] hover:bg-[#262525] transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Event Overview */}
        <div className="flex flex-col gap-3.5 text-start bg-[#0F0F0F] border border-[#262525] rounded-[30px] p-5.5">
          <h3 className="text-white text-[15px] font-semibold">
            Event Overview
          </h3>

          <div className="flex flex-col gap-1.5">
            <label className={labelBase}>
              Event Name <span className="text-[#FF7466]">*</span>
            </label>
            <input
              value={event.name}
              onChange={(e) =>
                setEvent((prev) => ({ ...prev, name: e.target.value }))
              }
              className={`${inputBase} ${fieldErrors.name ? "border-[#FF7466]" : ""}`}
            />
            {fieldErrors.name && (
              <p className="text-[#FF7466] text-[13px]">{fieldErrors.name}</p>
            )}
          </div>

          <div className="flex flex-col items-start gap-1.5">
            <label className={labelBase}>Overview</label>
            <textarea
              value={event.overview}
              onChange={(e) =>
                setEvent((prev) => ({ ...prev, overview: e.target.value }))
              }
              rows={5}
              className={`${inputBase} h-auto py-3 resize-none leading-relaxed hide-scrollbar ${
                fieldErrors.overview ? "border-[#FF7466]" : ""
              }`}
            />
            {fieldErrors.overview && (
              <p className="text-[#FF7466] text-[13px]">
                {fieldErrors.overview}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelBase}>
              Location <span className="text-[#FF7466]">*</span>
            </label>
            <input
              value={event.location}
              onChange={(e) =>
                setEvent((prev) => ({ ...prev, location: e.target.value }))
              }
              className={`${inputBase} ${fieldErrors.location ? "border-[#FF7466]" : ""}`}
            />
            {fieldErrors.location && (
              <p className="text-[#FF7466] text-[13px]">
                {fieldErrors.location}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelBase}>
              Date <span className="text-[#FF7466]">*</span>
            </label>
            <div className="flex gap-2.5">
              <DatePickerField
                value={event.date ?? undefined}
                onChange={(date) =>
                  setEvent((prev) => ({ ...prev, date: date ?? null }))
                }
                placeholder="Select date"
                className={`${inputBase} flex-1 ${fieldErrors.date ? "border-[#FF7466]" : ""}`}
              />
              <input
                value={event.time}
                onChange={(e) =>
                  setEvent((prev) => ({ ...prev, time: e.target.value }))
                }
                placeholder="e.g. 6PM - 7PM WAT"
                className={`${inputBase} w-44`}
              />
            </div>
            {fieldErrors.date && (
              <p className="text-[#FF7466] text-[13px]">{fieldErrors.date}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelBase}>Image</label>
            <label className="flex items-center gap-2.5 cursor-pointer w-fit">
              <span className="w-9 h-9 rounded-full bg-[#262525] overflow-hidden flex items-center justify-center">
                {eventImagePreview || event.image ? (
                  <img
                    src={eventImagePreview || event.image || undefined}
                    alt=""
                    className={`w-full h-full object-cover ${isEventImageUploading ? "opacity-50" : ""}`}
                  />
                ) : (
                  <CameraIcon />
                )}
              </span>
              <span className="text-[#ECECEC] text-[14px] flex items-center gap-1.5">
                {isEventImageUploading ? "Uploading..." : "Change Photo"}{" "}
                <CameraIcon />
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleEventImage}
                disabled={isEventImageUploading}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="h-px bg-[#262525]" />

        {/* Ticket Overview */}
        <div className="flex flex-col gap-3.5 text-start bg-[#0F0F0F] border border-[#262525] rounded-[30px] p-5.5">
          <h3 className="text-white text-[15px] font-semibold">
            Ticket Overview
          </h3>

          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="flex flex-col gap-3 bg-[#161616] rounded-[16px] p-3.5"
            >
              <div className="flex flex-col gap-1.5">
                <label className={labelBase}>
                  Ticket Name <span className="text-[#FF7466]">*</span>
                </label>
                <input
                  value={ticket.name}
                  onChange={(e) =>
                    handleTicketChange(ticket.id, "name", e.target.value)
                  }
                  placeholder="e.g. Regular"
                  className={`${inputBase} ${
                    ticketErrors[ticket.id]?.name ? "border-[#FF7466]" : ""
                  }`}
                />
                {ticketErrors[ticket.id]?.name && (
                  <p className="text-[#FF7466] text-[13px]">
                    {ticketErrors[ticket.id]?.name}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={labelBase}>
                  Ticket Quantity <span className="text-[#FF7466]">*</span>
                </label>
                <div
                  className={`w-full h-13 bg-[#1A1A1A] rounded-xl px-2 flex items-center justify-between border-2 ${
                    ticketErrors[ticket.id]?.quantity
                      ? "border-[#FF7466]"
                      : "border-transparent"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => adjustQuantity(ticket.id, -1)}
                    className="w-9 h-9 rounded-full bg-[#262525] text-white text-lg flex items-center justify-center hover:bg-[#333]"
                  >
                    −
                  </button>
                  <input
                    value={ticket.quantity}
                    onChange={(e) =>
                      handleTicketChange(ticket.id, "quantity", e.target.value)
                    }
                    className="w-16 bg-transparent text-white text-center outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => adjustQuantity(ticket.id, 1)}
                    className="w-9 h-9 rounded-full bg-[#262525] text-white text-lg flex items-center justify-center hover:bg-[#333]"
                  >
                    +
                  </button>
                </div>
                {ticketErrors[ticket.id]?.quantity && (
                  <p className="text-[#FF7466] text-[13px]">
                    {ticketErrors[ticket.id]?.quantity}
                  </p>
                )}
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addTicket}
            className="text-[#A485D9] text-[14px] font-medium flex items-center gap-1 w-fit"
          >
            Add <span className="text-[16px]">+</span>
          </button>
        </div>

        <div className="h-px bg-[#262525]" />

        {/* Speakers / Line up */}
        <div className="flex flex-col gap-3.5 text-start bg-[#0F0F0F] border border-[#262525] rounded-[30px] p-5.5">
          <h3 className="text-white text-[15px] font-semibold">
            Speakers/Line up
          </h3>

          {speakers.map((speaker) => {
            const isSpeakerUploading = uploadingSpeakerIds.has(speaker.id);
            const speakerDisplayPhoto =
              speakerPreviews[speaker.id] || speaker.photo;

            return (
            <div
              key={speaker.id}
              className="flex flex-col gap-3 bg-[#161616] rounded-2xl p-3.5"
            >
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <span className="w-9 h-9 rounded-full bg-[#262525] overflow-hidden flex items-center justify-center">
                    {speakerDisplayPhoto ? (
                      <img
                        src={speakerDisplayPhoto}
                        alt=""
                        className={`w-full h-full object-cover ${isSpeakerUploading ? "opacity-50" : ""}`}
                      />
                    ) : (
                      <CameraIcon />
                    )}
                  </span>
                  <span className="text-[#ECECEC] text-[14px] flex items-center gap-1.5">
                    {isSpeakerUploading ? "Uploading..." : "Upload Photo"}{" "}
                    <CameraIcon />
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleSpeakerPhoto(speaker.id, e)}
                    disabled={isSpeakerUploading}
                    className="hidden"
                  />
                </label>

                <button
                  type="button"
                  onClick={() => toggleHeadliner(speaker.id)}
                  className="flex items-center gap-2 text-[#ECECEC] text-[14px]"
                >
                  Mark as Headliner
                  <span
                    className={`w-5 h-5 rounded-[5px] border flex items-center justify-center transition-colors ${
                      speaker.isHeadliner
                        ? "bg-[#995DFF] border-[#995DFF]"
                        : "bg-transparent border-[#4D4D4D]"
                    }`}
                  >
                    {speaker.isHeadliner && (
                      <LuCheck size={12} className="text-white" />
                    )}
                  </span>
                </button>
              </div>

              <input
                value={speaker.name}
                onChange={(e) => handleSpeakerName(speaker.id, e.target.value)}
                placeholder="Speaker name"
                className={inputBase}
              />
            </div>
            );
          })}

          <button
            type="button"
            onClick={addSpeaker}
            className="text-[#A485D9] text-[14px] font-medium flex items-center gap-1 w-fit"
          >
            Add New Member <span className="text-[16px]">+</span>
          </button>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={isUploading}
          className="w-full bg-[#995DFF] hover:bg-[#8a4ff0] text-white text-[16px] py-3.5 px-4.25 font-medium rounded-[30px] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isUploading ? "Uploading..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default EditModal;
