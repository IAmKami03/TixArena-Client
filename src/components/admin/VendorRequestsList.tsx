import { useEffect, useState } from "react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import {
  getVendorRequests,
  resolveVendorRequest,
} from "../../services/userService";
import { getErrorMessage } from "../../lib/api";
import type { User } from "../../types/auth";

const VendorRequestsList = () => {
  const [requests, setRequests] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [resolvingId, setResolvingId] = useState<string | null>(null);

  useEffect(() => {
    getVendorRequests()
      .then(setRequests)
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setIsLoading(false));
  }, []);

  const handleResolve = async (userId: string, approve: boolean) => {
    setResolvingId(userId);
    try {
      await resolveVendorRequest(userId, approve);
      setRequests((prev) => prev.filter((u) => u._id !== userId));
      toast.success(approve ? "Vendor request approved." : "Vendor request rejected.");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setResolvingId(null);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen border-l-0 lg:border-l border-[#262525] p-4 sm:p-6 gap-6">
      <div className="flex flex-col gap-0.5 items-start">
        <h2 className="text-[23px] font-semibold text-white">
          Vendor Requests
        </h2>
        <div className="flex gap-2">
          <p className="text-[16px] font-normal text-[#CECECE]">Admin</p>
          <p className="text-[16px] font-normal text-[#A485D9]">
            Vendor Requests
          </p>
        </div>
      </div>

      <div className="w-full rounded-[20px] bg-[#0B0B0B]">
        {isLoading ? (
          <p className="text-[#ABABAB] text-[16px] p-4">Loading requests...</p>
        ) : error ? (
          <p className="text-[#FF7466] text-[16px] p-4">{error}</p>
        ) : requests.length === 0 ? (
          <p className="text-[#ABABAB] text-[16px] p-4">
            No pending creator requests.
          </p>
        ) : (
          <>
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
                  Requested
                </th>
                <th className="py-4 px-4 font-normal whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr
                  key={request._id}
                  className="border-t border-[#262525] text-[#ECECEC] text-[16px]"
                >
                  <td className="py-4 px-4 whitespace-nowrap">
                    {request.firstName} {request.lastName}
                  </td>
                  <td className="py-4 px-4 text-[#ABABAB] whitespace-nowrap">
                    {request.email}
                  </td>
                  <td className="py-4 px-4 text-[#ABABAB] whitespace-nowrap">
                    {request.updatedAt
                      ? format(new Date(request.updatedAt), "d MMM, yyyy")
                      : "—"}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => handleResolve(request._id, true)}
                        disabled={resolvingId === request._id}
                        className="bg-[#1F3B24] text-[#5FD787] text-[14px] font-medium px-4 py-1.5 rounded-[30px] disabled:opacity-60"
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => handleResolve(request._id, false)}
                        disabled={resolvingId === request._id}
                        className="bg-[#3B1F1F] text-[#FF6B6B] text-[14px] font-medium px-4 py-1.5 rounded-[30px] disabled:opacity-60"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile/tablet: card list instead of a horizontally-scrolling table */}
          <div className="lg:hidden flex flex-col gap-3 p-3">
            {requests.map((request) => (
              <div
                key={request._id}
                className="rounded-[20px] border border-[#262525] p-4 flex flex-col gap-3"
              >
                <div className="min-w-0">
                  <p className="text-[#ECECEC] text-[16px] font-medium truncate">
                    {request.firstName} {request.lastName}
                  </p>
                  <p className="text-[#ABABAB] text-[13px] mt-0.5 truncate">
                    {request.email}
                  </p>
                  <p className="text-[#838383] text-[12px] mt-0.5">
                    Requested{" "}
                    {request.updatedAt
                      ? format(new Date(request.updatedAt), "d MMM, yyyy")
                      : "—"}
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleResolve(request._id, true)}
                    disabled={resolvingId === request._id}
                    className="bg-[#1F3B24] text-[#5FD787] text-[14px] font-medium px-4 py-1.5 rounded-[30px] disabled:opacity-60"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => handleResolve(request._id, false)}
                    disabled={resolvingId === request._id}
                    className="bg-[#3B1F1F] text-[#FF6B6B] text-[14px] font-medium px-4 py-1.5 rounded-[30px] disabled:opacity-60"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VendorRequestsList;
