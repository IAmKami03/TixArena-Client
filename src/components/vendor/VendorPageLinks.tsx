import { Link, useLocation } from "react-router-dom";
import dash from "../../assets/images/vendorImages/dashboardimg.svg";
import eve from "../../assets/images/vendorImages/eventimg.svg";
import userCheck from "../../assets/images/vendorImages/User Check.svg";
import { useAuth } from "../../contexts/AuthContext";

const VENDOR_NAV_ITEMS = [{ label: "My Event", icon: eve, path: "/vendor" }];

const ADMIN_NAV_ITEMS = [
  { label: "Dashboard", icon: dash, path: "/admin-dashboard" },
  { label: "My Event", icon: eve, path: "/vendor" },
  { label: "Vendor Requests", icon: userCheck, path: "/vendor-requests" },
];

interface VendorPageLinksProps {
  className?: string;
  onNavigate?: () => void;
}

const VendorPageLinks = ({ className = "", onNavigate }: VendorPageLinksProps) => {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const navItems = user?.role === "admin" ? ADMIN_NAV_ITEMS : VENDOR_NAV_ITEMS;

  return (
    <div
      className={`flex flex-col bg-[#0C0C0C] pt-5.5 items-center px-6 ${className}`}
    >
      {navItems.map((item) => {
        const isActive = pathname === item.path;
        return (
          <Link
            key={item.label}
            to={item.path}
            onClick={onNavigate}
            className={`w-full flex items-center gap-2.5 rounded-[30px] px-4.25 py-3.5 ${
              isActive ? "bg-[#262525]" : ""
            }`}
          >
            <img src={item.icon} alt="" />
            <p
              className={`font-medium text-[16px] ${
                isActive ? "text-[#FFFFFF]" : "text-[#838383]"
              }`}
            >
              {item.label}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default VendorPageLinks;
