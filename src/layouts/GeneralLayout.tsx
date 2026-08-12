import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import ScrollToTopButton from "../components/ScrollToTopButton";

const GeneralLayout: React.FC = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default GeneralLayout;
