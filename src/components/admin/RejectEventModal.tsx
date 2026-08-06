import { useState } from "react";

interface RejectEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: (reason: string) => void;
}

const RejectEventModal = ({
  isOpen,
  onClose,
  onConfirm,
}: RejectEventModalProps) => {
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  const handleReject = () => {
    onConfirm?.(reason);
    setReason("");
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-[380px] bg-[#141414] border border-[#262525] rounded-[24px] p-5 flex flex-col gap-4 text-start">
        <h2 className="text-white text-[18px] font-semibold">
          Are you Sure You Want to Reject this Event
        </h2>

        <div className="flex flex-col gap-1.5">
          <label className="text-[#838383] text-[13px]">
            Add reason for rejection (optional)
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason for rejection"
            rows={4}
            className="w-full bg-[#1F1F1F] border border-[#262525] rounded-2xl px-4 py-3 text-[#ECECEC] text-[14px] placeholder:text-[#6E6E6E] outline-none focus:border-[#995DFF] resize-none transition-colors"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-[#262525] hover:bg-[#333] text-white text-[15px] font-medium py-3 rounded-full transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleReject}
            className="flex-1 bg-[#995DFF] hover:bg-[#8a4ff0] text-white text-[15px] font-medium py-3 rounded-full transition-colors"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectEventModal;
