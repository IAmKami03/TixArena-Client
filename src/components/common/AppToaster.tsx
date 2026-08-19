import { Toaster } from "react-hot-toast";

// Single themed <Toaster/> instance, mounted once at the app root. Import
// `toast` from "react-hot-toast" anywhere and call toast.success/toast.error/
// toast(...) — this component only supplies the shared look.
const AppToaster = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 4000,
        style: {
          background: "#1A1A1A",
          color: "#FFFFFF",
          border: "1px solid #262525",
          borderRadius: "16px",
          padding: "14px 18px",
          fontFamily: "Manrope, sans-serif",
          fontSize: "14px",
          fontWeight: 500,
          maxWidth: "420px",
          boxShadow: "0 12px 32px rgba(0, 0, 0, 0.45)",
        },
        success: {
          iconTheme: { primary: "#5FD787", secondary: "#0F0F0F" },
          style: { border: "1px solid #1F3B24" },
        },
        error: {
          iconTheme: { primary: "#FF7466", secondary: "#0F0F0F" },
          style: { border: "1px solid #3B1F1F" },
        },
        loading: {
          iconTheme: { primary: "#995DFF", secondary: "#0F0F0F" },
        },
      }}
    />
  );
};

export default AppToaster;
