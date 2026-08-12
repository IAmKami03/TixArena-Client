import { useState } from "react";
import { Outlet } from "react-router-dom";
import VendorNav from "../components/vendor/VendorNav";
import VendorPageLinks from "../components/vendor/VendorPageLinks";
import ScrollToTopButton from "../components/ScrollToTopButton";

const VendorLayout = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div>
      <VendorNav
        isMobileNavOpen={isMobileNavOpen}
        onToggleMobileNav={() => setIsMobileNavOpen((prev) => !prev)}
      />

      {isMobileNavOpen && (
        <VendorPageLinks
          className="lg:hidden w-full border-b border-[#262525] pb-3"
          onNavigate={() => setIsMobileNavOpen(false)}
        />
      )}

      <div className="flex w-full">
        <VendorPageLinks className="hidden lg:flex w-[22%] min-h-screen border-r border-[#262525]" />
        <div className="flex-1 w-full min-w-0">
          <Outlet />
        </div>
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default VendorLayout;
