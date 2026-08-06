import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { requestVendorRole } from "../../services/userService";
import { getErrorMessage } from "../../lib/api";

const VendorRequestCard = () => {
  const { user, login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!user || user.role !== "user") return null;

  const handleRequest = async () => {
    setError("");
    setIsSubmitting(true);
    try {
      const updatedUser = await requestVendorRole();
      const token = localStorage.getItem("tix_token");
      if (token) login(updatedUser, token);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="border border-white/15 rounded-3xl bg-white/[0.02] p-6 w-full max-w-4xl mx-auto mb-10 flex items-center justify-between gap-4">
      <div>
        <h2 className="text-white text-[18px] font-semibold">
          Want to host your own events?
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          {user.vendorRequestStatus === "Pending"
            ? "Your request is under review. We'll email you once an admin responds."
            : user.vendorRequestStatus === "Rejected"
              ? "Your last request was declined. You can request again."
              : "Request creator access to start creating and managing your own events."}
        </p>
        {error && <p className="text-[#FF7466] text-sm mt-2">{error}</p>}
      </div>

      {user.vendorRequestStatus !== "Pending" && (
        <button
          type="button"
          onClick={handleRequest}
          disabled={isSubmitting}
          className="shrink-0 bg-[#995DFF] hover:bg-[#8a4ff0] text-white text-sm font-medium rounded-full px-5 py-2.5 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting
            ? "Submitting..."
            : user.vendorRequestStatus === "Rejected"
              ? "Request Again"
              : "Request Creator Access"}
        </button>
      )}
    </section>
  );
};

export default VendorRequestCard;
