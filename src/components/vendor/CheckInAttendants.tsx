import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { LuQrCode, LuCamera, LuChevronDown, LuChevronUp } from "react-icons/lu";
import searchIcon from "../../assets/images/search-01.svg";
import nochechIn from "../../assets/images/vendorImages/Ticket-checkin.svg";
import { getEvent } from "../../services/eventService";
import {
  checkInByCode,
  getEventAttendees,
} from "../../services/bookingService";
import { getErrorMessage } from "../../lib/api";
import { usePagination } from "../../hooks/usePagination";
import Pagination from "../common/Pagination";
import FilterDropdown from "../common/FilterDropdown";
import QrCameraScanner from "./QrCameraScanner";
import type { Event } from "../../types/event";
import type { Booking } from "../../types/booking";

const inputBase =
  "w-full bg-[#161616] text-[#ABABAB] text-[15px] rounded-full border border-[#262525] pl-11 pr-4 py-3.5 placeholder:text-[#6E6E6E] outline-none focus:border-[#995DFF] transition-colors";

const STATUS_OPTIONS = ["All", "Checked In", "Not Checked In"] as const;
const PAGE_SIZE = 9;

const AttendeeMobileRow = ({ entry }: { entry: Booking }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t border-[#262525] first:border-t-0">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between gap-3 py-4 px-4 text-left"
      >
        <span className="text-[#ECECEC] text-[16px] truncate">
          {entry.fullName}
        </span>
        <span className="flex items-center gap-2 shrink-0">
          {entry.checkedIn ? (
            <span className="bg-[#1F3B24] text-[#5FD787] text-[13px] font-medium px-3 py-1 rounded-[30px]">
              Checked In
            </span>
          ) : (
            <span className="bg-[#1A1A1A] text-[#838383] text-[13px] font-medium px-3 py-1 rounded-[30px]">
              ---
            </span>
          )}
          {isOpen ? (
            <LuChevronUp className="text-[#838383]" size={16} />
          ) : (
            <LuChevronDown className="text-[#838383]" size={16} />
          )}
        </span>
      </button>

      {isOpen && (
        <div className="px-4 pb-4 flex flex-col gap-2 text-[14px]">
          <div className="flex justify-between gap-3">
            <span className="text-[#838383]">Email</span>
            <span className="text-[#ECECEC] truncate">{entry.email}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-[#838383]">Ticket ID</span>
            <span className="text-[#ECECEC]">{entry.code}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-[#838383]">Ticket Type</span>
            <span className="text-[#ECECEC]">{entry.ticketName}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-[#838383]">Check-in Time</span>
            <span className="text-[#ECECEC]">
              {entry.checkedInAt
                ? format(new Date(entry.checkedInAt), "d MMM, h:mm a")
                : "—"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

const CheckInAttendants = () => {
  const { id: eventId } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [code, setCode] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<(typeof STATUS_OPTIONS)[number]>("All");
  const [attendees, setAttendees] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [checkInError, setCheckInError] = useState("");
  const [checkInMessage, setCheckInMessage] = useState("");
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const loadAttendees = () => {
    if (!eventId) return;
    getEventAttendees(eventId)
      .then(setAttendees)
      .catch((err) => setLoadError(getErrorMessage(err)))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (!eventId) return;
    getEvent(eventId)
      .then(setEvent)
      .catch(() => undefined);
    loadAttendees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  const filtered = attendees.filter((entry) => {
    const searchMatch = entry.fullName
      .toLowerCase()
      .includes(search.toLowerCase());
    const statusMatch =
      statusFilter === "All" ||
      (statusFilter === "Checked In" ? entry.checkedIn : !entry.checkedIn);
    return searchMatch && statusMatch;
  });

  const { page, setPage, totalPages, pageItems } = usePagination(
    filtered,
    PAGE_SIZE,
  );

  const handleCheckIn = async (
    rawCode?: string,
  ): Promise<{ ok: boolean; message: string }> => {
    const codeToSubmit = (rawCode ?? code).trim();
    if (!eventId || !codeToSubmit || isCheckingIn) {
      return { ok: false, message: "" };
    }

    setCheckInError("");
    setCheckInMessage("");
    setIsCheckingIn(true);
    try {
      const booking = await checkInByCode(eventId, codeToSubmit);
      const message = `${booking.fullName} checked in successfully.`;
      setCheckInMessage(message);
      setCode("");
      loadAttendees();
      return { ok: true, message };
    } catch (err) {
      const message = getErrorMessage(err);
      setCheckInError(message);
      return { ok: false, message };
    } finally {
      setIsCheckingIn(false);
    }
  };

  const lookupBookingByCode = (rawCode: string): Booking | undefined =>
    attendees.find(
      (entry) =>
        entry.code.trim().toUpperCase() === rawCode.trim().toUpperCase(),
    );

  return (
    <div className="flex flex-col w-full min-h-screen border-l-0 lg:border-l border-[#262525] p-4 sm:p-6 gap-6">
      <div className="flex flex-col gap-0.5 items-start">
        <h2 className="text-[23px] font-semibold text-white">My Event</h2>
        <div className="flex gap-2 items-center text-[14px] font-normal">
          <p className="text-[#CECECE]">Event</p>
          <span className="text-[#4B4B4B]">•</span>
          <p className="text-[#CECECE]">Overview</p>
          <span className="text-[#4B4B4B]">•</span>
          <p className="text-[#CECECE]">{event?.name ?? ""}</p>
          <span className="text-[#4B4B4B]">•</span>
          <p className="text-[#A485D9]">Check-in Attendants</p>
        </div>
      </div>

      {/* CONNECT CAMERA */}
      <div className="flex flex-col items-center gap-5 max-w-md w-full mx-auto py-8">
        {/* Desktop: unchanged copy pointing users to mobile/external camera */}
        <div className="hidden lg:flex flex-col items-center gap-1.5 text-center">
          <h3 className="text-[22px] font-semibold text-white">
            Connect External Camera or Use Mobile
          </h3>
          <p className="text-[14px] text-[#ABABAB] max-w-sm">
            For better scan experience on PC,{" "}
            <span className="text-[#A485D9] cursor-pointer hover:underline">
              connect external camera
            </span>{" "}
            or use a mobile device
          </p>
        </div>

        {/* Mobile/tablet: real camera QR scanning */}
        <div className="flex lg:hidden flex-col items-center gap-4 text-center w-full">
          <div className="flex flex-col items-center gap-1.5">
            <h3 className="text-[26px] sm:text-[28px] font-['Instrument_Serif'] text-white">
              Enable Camera to Scan
            </h3>
            <p className="text-[14px] text-[#ABABAB]">
              Scan the QR code to check-in user
            </p>
          </div>

          {isCameraOpen ? (
            <QrCameraScanner
              onClose={() => setIsCameraOpen(false)}
              lookupBooking={lookupBookingByCode}
              onConfirmCheckIn={handleCheckIn}
            />
          ) : (
            <button
              type="button"
              onClick={() => setIsCameraOpen(true)}
              className="w-full flex items-center justify-center gap-2.5 bg-[#995DFF] hover:bg-[#8a4ff0] text-white text-[16px] font-medium py-3.5 rounded-full transition-colors"
            >
              <LuCamera size={18} />
              Enable Camera
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 w-full">
          <span className="flex-1 h-px bg-[#262525]" />
          <span className="text-[#6E6E6E] text-[14px]">or</span>
          <span className="flex-1 h-px bg-[#262525]" />
        </div>

        <div className="relative w-full flex items-center">
          <span className="absolute left-4">
            <LuQrCode size={18} className="text-[#ABABAB]" />
          </span>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter code here"
            className={inputBase}
          />
        </div>

        {checkInError && (
          <p className="text-[#FF7466] text-[14px]">{checkInError}</p>
        )}
        {checkInMessage && (
          <p className="text-[#5FD787] text-[14px]">{checkInMessage}</p>
        )}

        <button
          type="button"
          onClick={() => handleCheckIn()}
          disabled={isCheckingIn || !code.trim()}
          className="w-full bg-[#995DFF] hover:bg-[#8a4ff0] text-white text-[16px] font-medium py-3.5 rounded-full transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isCheckingIn ? "Checking in..." : "Check-in"}
        </button>
      </div>

      {/* ATTENDEE MANAGEMENT */}
      <div className="flex flex-col gap-3.5 p-3.5 rounded-[25px] bg-[#0F0F0F]">
        <div className="w-full flex flex-wrap gap-3 justify-between items-center">
          <h3 className="text-[18px] font-medium text-[#FFFFFF]">
            Attendee Management
          </h3>
          <div className="flex items-center gap-2.5">
            <div className="relative flex items-center">
              <img
                src={searchIcon}
                alt=""
                className="absolute left-3.5 w-4.5"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="bg-[#262525] text-[#ECECEC] text-[14px] rounded-[30px] pl-9.5 pr-4 py-2.5 outline-none placeholder:text-[#838383] w-28 sm:w-40"
              />
            </div>
            <FilterDropdown
              value={statusFilter}
              options={STATUS_OPTIONS}
              onChange={(value) =>
                setStatusFilter(value as (typeof STATUS_OPTIONS)[number])
              }
            />
          </div>
        </div>

        <div className="w-full overflow-x-auto hide-scrollbar rounded-[20px] bg-[#0B0B0B]">
          {isLoading ? (
            <p className="text-[#ABABAB] text-[16px] p-4">
              Loading attendees...
            </p>
          ) : loadError ? (
            <p className="text-[#FF7466] text-[16px] p-4">{loadError}</p>
          ) : (
            <>
              {/* Desktop table */}
              <table className="hidden lg:table w-full text-left border-collapse">
                <thead>
                  <tr className="text-[#838383] text-[14px] font-normal">
                    <th className="py-4 px-4 font-normal whitespace-nowrap">
                      Name
                    </th>
                    <th className="py-4 px-4 font-normal whitespace-nowrap">
                      Email
                    </th>
                    <th className="py-4 px-4 font-normal whitespace-nowrap">
                      Ticket Code
                    </th>
                    <th className="py-4 px-4 font-normal whitespace-nowrap">
                      Ticket Type
                    </th>
                    <th className="py-4 px-4 font-normal whitespace-nowrap">
                      Quantity
                    </th>
                    <th className="py-4 px-4 font-normal whitespace-nowrap">
                      Check-in Time
                    </th>
                    <th className="py-4 px-4 font-normal whitespace-nowrap">
                      Check-in Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pageItems.map((entry) => (
                    <tr
                      key={entry._id}
                      className="border-t border-[#262525] text-[#ECECEC] text-[16px]"
                    >
                      <td className="py-4 px-4 whitespace-nowrap">
                        {entry.fullName}
                      </td>
                      <td className="py-4 px-4 text-[#ABABAB] whitespace-nowrap">
                        {entry.email}
                      </td>
                      <td className="py-4 px-4 text-[#ABABAB] whitespace-nowrap">
                        {entry.code}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        {entry.ticketName}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        {entry.quantity}
                      </td>
                      <td className="py-4 px-4 text-[#ABABAB] whitespace-nowrap">
                        {entry.checkedInAt
                          ? format(new Date(entry.checkedInAt), "d MMM, h:mm a")
                          : "—"}
                      </td>
                      <td className="py-4 px-4">
                        {entry.checkedIn ? (
                          <span className="bg-[#1F3B24] text-[#5FD787] text-[13px] font-medium px-1.5 py-1 rounded-[30px]">
                            Checked In
                          </span>
                        ) : (
                          <span className="bg-[#1A1A1A] text-[#838383] text-[14px] font-medium px-6 py-1.5 rounded-[30px]">
                            ---
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile/tablet: expandable accordion list */}
              {filtered.length > 0 && (
                <div className="lg:hidden flex flex-col">
                  <div className="flex items-center justify-between px-4 py-3 text-[#838383] text-[13px]">
                    <span>Name</span>
                    <span>Check-in Status</span>
                  </div>
                  {pageItems.map((entry) => (
                    <AttendeeMobileRow key={entry._id} entry={entry} />
                  ))}
                </div>
              )}

              {filtered.length === 0 && (
                <div className="flex flex-col items-center justify-center gap-3 py-16">
                  <img src={nochechIn} alt="" />
                  <p className="text-white text-[18px] font-semibold">
                    No Check-in
                  </p>
                  <p className="text-[#838383] text-[14px] text-center max-w-xs">
                    You haven't check-in any users yet, when you do you will
                    find them here.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* PAGINATION */}
      {filtered.length > 0 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          pageSize={PAGE_SIZE}
        />
      )}
    </div>
  );
};

export default CheckInAttendants;
