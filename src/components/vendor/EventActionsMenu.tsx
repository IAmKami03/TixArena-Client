import type { ReactNode } from "react";
import { LuPencil, LuEye, LuTicketX, LuTrash2 } from "react-icons/lu";

interface EventActionsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onViewDetails: () => void;
  onCloseEvent: () => void;
  onDelete: () => void;
}

const MenuItem = ({
  icon,
  label,
  onClick,
  danger,
}: {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  danger?: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[14px] text-left transition-colors ${
      danger
        ? "text-[#FF6B6B] hover:bg-[#2A1414]"
        : "text-[#ECECEC] hover:bg-[#262525]"
    }`}
  >
    {icon}
    {label}
  </button>
);

const EventActionsMenu = ({
  isOpen,
  onClose,
  onEdit,
  onViewDetails,
  onCloseEvent,
  onDelete,
}: EventActionsMenuProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-10" onClick={onClose} />
      <div className="absolute right-0 top-full mt-2 z-20 w-56 bg-[#1A1A1A] border border-[#262525] rounded-2xl p-1.5 flex flex-col gap-0.5 shadow-2xl text-start">
        <MenuItem icon={<LuPencil size={16} />} label="Edit event" onClick={onEdit} />
        <MenuItem
          icon={<LuEye size={16} />}
          label="View event details"
          onClick={onViewDetails}
        />
        <MenuItem
          icon={<LuTicketX size={16} />}
          label="Close event"
          onClick={onCloseEvent}
        />
        <MenuItem
          icon={<LuTrash2 size={16} />}
          label="Delete event"
          onClick={onDelete}
          danger
        />
      </div>
    </>
  );
};

export default EventActionsMenu;
