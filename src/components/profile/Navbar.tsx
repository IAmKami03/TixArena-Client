// Commented out: ProfilePage now renders inside GeneralLayout, which already
// provides the shared, auth-aware NavBar (components/NavBar.tsx). This
// profile-specific navbar duplicated it with mostly-mock links.
/*
import React from "react";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FiChevronDown, FiSliders } from "react-icons/fi";
import { PiTicketBold } from "react-icons/pi";
import logo from "../../assets/Frame 21.svg";
import { useAuth } from "../../contexts/AuthContext";

interface NavbarProps {
  avatarUrl: string;
}

const Navbar: React.FC<NavbarProps> = ({ avatarUrl }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const canSwitchToCreate = user?.role === "vendor" || user?.role === "admin";

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "60px",
        padding: "0 24px",
        background: "#0B0B0B",
        borderBottom: "1px solid #1A1A1A",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* LEFT */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          flex: 1,
        }}
      >
        <a
          href="#"
          style={{
            color: "#E8E8E8",
            textDecoration: "none",
            fontSize: "11px",
            fontWeight: 500,
          }}
        >
          Explore
        </a>

        <a
          href="#"
          style={{
            color: "#E8E8E8",
            textDecoration: "none",
            fontSize: "11px",
            fontWeight: 500,
          }}
        >
          Cinema
        </a>

        {/* SEARCH BAR */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "215px",
            height: "36px",
            background: "#242424",
            borderRadius: "999px",
            padding: "3px",
          }}
        >
          {/* Search */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flex: 1,
              paddingLeft: "10px",
            }}
          >
            <CiSearch color="#8A8A8A" size={14} />

            <input
              type="text"
              placeholder="Search event"
              style={{
                flex: 1,
                marginLeft: "6px",
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#fff",
                fontSize: "10px",
              }}
            />
          </div>

          {/* Lagos (INSIDE SEARCH BAR) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              background: "#111111",
              borderRadius: "990px",
              height: "28px",
              padding: "0 7px",
              cursor: "pointer",
              flexShrink: 19,
            }}
          >
            <span
              style={{
                color: "#fff",
                fontSize: "10px",
                fontWeight: 500,
              }}
            >
              Lagos
            </span>

            <FiSliders color="#FFFFFF" size={11} />
          </div>
        </div>
      </div>

      {/* CENTER LOGO */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <img
          src={logo}
          alt="TIX Arena"
          style={{
            width: "105px",
            display: "block",
          }}
        />
      </div>

      {/* RIGHT */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        {/* Ticket */}
        <div
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            background: "#242424",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <PiTicketBold color="#FFFFFF" size={15} />
        </div>

        {/* Creator */}
        {canSwitchToCreate && (
          <button
            type="button"
            onClick={() => navigate("/vendor")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              height: "30px",
              padding: "0 14px",
              background: "#242424",
              border: "1px solid #353535",
              borderRadius: "999px",
              color: "#FFFFFF",
              fontSize: "10px",
              fontWeight: 500,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ fontSize: "13px" }}>+</span>
            Switch to Creator
          </button>
        )}

        {/* Avatar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            cursor: "pointer",
          }}
        >
          <img
            src={avatarUrl}
            alt="avatar"
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />

          <FiChevronDown color="#9CA3AF" size={12} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
*/
