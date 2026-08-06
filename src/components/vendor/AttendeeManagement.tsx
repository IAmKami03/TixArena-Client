import { useEffect, useState } from "react";
import { format } from "date-fns";
import { getEventAttendees } from "../../services/bookingService";
import { getErrorMessage } from "../../lib/api";
import { usePagination } from "../../hooks/usePagination";
import Pagination from "../common/Pagination";
import FilterDropdown from "../common/FilterDropdown";
import type { Booking } from "../../types/booking";

interface AttendeeManagementProps {
  eventId: string;
}

const STATUS_OPTIONS = ["All", "Checked In", "Not Checked In"] as const;
const PAGE_SIZE = 8;

const AttendeeManagement = ({ eventId }: AttendeeManagementProps) => {
  const [attendees, setAttendees] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<(typeof STATUS_OPTIONS)[number]>("All");

  useEffect(() => {
    getEventAttendees(eventId)
      .then(setAttendees)
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setIsLoading(false));
  }, [eventId]);

  const filtered = attendees.filter((attendee) => {
    if (statusFilter === "All") return true;
    return statusFilter === "Checked In"
      ? attendee.checkedIn
      : !attendee.checkedIn;
  });

  const { page, setPage, totalPages, pageItems } = usePagination(
    filtered,
    PAGE_SIZE,
  );

  return (
    <div className="flex flex-col gap-2.5 p-3.5 rounded-[25px] bg-[#0F0F0F]">
      <div className="w-full flex justify-between items-center">
        <h3 className="text-[18px] font-medium text-[#FFFFFF]">
          Attendee Management
        </h3>
        <FilterDropdown
          value={statusFilter}
          options={STATUS_OPTIONS}
          onChange={(value) =>
            setStatusFilter(value as (typeof STATUS_OPTIONS)[number])
          }
        />
      </div>

      <div className="w-full  rounded-[20px] bg-[#0B0B0B]">
        {isLoading ? (
          <p className="text-[#ABABAB] text-[16px] p-4">
            Loading attendees...
          </p>
        ) : error ? (
          <p className="text-[#FF7466] text-[16px] p-4">{error}</p>
        ) : filtered.length === 0 ? (
          <p className="text-[#ABABAB] text-[16px] p-4">
            {attendees.length === 0
              ? "No one has registered for this event yet."
              : `No ${statusFilter.toLowerCase()} attendees.`}
          </p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[#838383] text-[14px] font-normal">
                <th className="py-4 px-4 font-normal whitespace-nowrap">Name</th>
                <th className="py-4 px-4 font-normal whitespace-nowrap">Email</th>
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
                  Reg. date
                </th>
                <th className="py-4 px-4 font-normal whitespace-nowrap">
                  Check-in Status
                </th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((attendee) => (
                <tr
                  key={attendee._id}
                  className="border-t border-[#262525] text-[#ECECEC] text-[16px]"
                >
                  <td className="py-4 px-4 whitespace-nowrap">
                    {attendee.fullName}
                  </td>
                  <td className="py-4 px-4 text-[#ABABAB] whitespace-nowrap">
                    {attendee.email}
                  </td>
                  <td className="py-4 px-4 text-[#ABABAB] whitespace-nowrap">
                    {attendee.code}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    {attendee.ticketName}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    {attendee.quantity}
                  </td>
                  <td className="py-4 px-4 text-[#ABABAB] whitespace-nowrap">
                    {format(new Date(attendee.createdAt), "d MMM, yyyy")}
                  </td>
                  <td className=" py-4 px-4">
                    {attendee.checkedIn ? (
                      <span className=" bg-[#1F3B24] text-[#5FD787] text-[14px] font-medium px-1 py-1.5 rounded-[30px]">
                        Checked In
                      </span>
                    ) : (
                      <span className=" bg-[#1A1A1A] text-[#838383] text-[14px] font-medium px-6 py-1.5 rounded-[30px]">
                        ---
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

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

export default AttendeeManagement;
