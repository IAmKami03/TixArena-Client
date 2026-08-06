import type { ReactNode } from "react";
import { LuUser, LuRefreshCw, LuLogOut } from "react-icons/lu";

interface NavUserMenuProps {
  isOpen: boolean;
  canSwitchToCreate?: boolean;
  onClose: () => void;
  onViewProfile: () => void;
  onSwitchToCreate: () => void;
  onLogout: () => void;
}

const MenuItem = ({
  icon,
  label,
  onClick,
  muted,
}: {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  muted?: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-left text-[16px] transition-colors hover:bg-[#262525] ${
      muted ? "text-[#6E6E6E]" : "text-white"
    }`}
  >
    {icon}
    {label}
  </button>
);

const NavUserMenu = ({
  isOpen,
  canSwitchToCreate,
  onClose,
  onViewProfile,
  onSwitchToCreate,
  onLogout,
}: NavUserMenuProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-10" onClick={onClose} />
      <div className="absolute right-0 top-full mt-3 z-20 w-64 bg-[#1A1A1A] border border-[#262525] rounded-[28px] p-2 shadow-2xl">
        <MenuItem
          icon={<LuUser size={20} />}
          label="View Profile"
          onClick={onViewProfile}
        />
        {canSwitchToCreate && (
          <MenuItem
            icon={<LuRefreshCw size={20} />}
            label="Switch to create event"
            onClick={onSwitchToCreate}
          />
        )}
        <MenuItem
          icon={<LuLogOut size={20} />}
          label="Log out"
          onClick={onLogout}
          muted
        />
      </div>
    </>
  );
};

export default NavUserMenu;
