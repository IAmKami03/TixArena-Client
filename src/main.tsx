import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { SearchProvider } from "./contexts/SearchContext.tsx";
import { EventProvider } from "./contexts/EventContext.tsx";
import AppToaster from "./components/common/AppToaster.tsx";
// Commented out: vendor events now come from the real Event API (eventService),
// not this in-memory mock context.
// import { CreatedEventsProvider } from "./contexts/CreatedEventsContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <AuthProvider>
          <SearchProvider>
            <EventProvider>
              <AppToaster />
              <App />
            </EventProvider>
          </SearchProvider>
        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
);
