import NavBar from "../components/auth/NavBar";
import illustration from "../assets/images/authImages/illustration2.svg";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div
      className="w-full min-h-screen relative"
      style={{
        backgroundImage: `url(${illustration})`,
        backgroundSize: "cover",
        backgroundPosition: "right center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#0B0B0B",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, #0B0B0B 0%, #0B0B0B 45%, transparent 75%)",
        }}
      ></div>

      <div className="relative z-10">
        <NavBar />

        <div className="px-6 sm:px-10 lg:px-16 py-8 lg:py-12 w-full lg:w-1/2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
