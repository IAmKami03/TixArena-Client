import { Route, Routes } from "react-router-dom";
import "./App.css";
import ScrollToTop from "./components/ScrollToTop";
import GeneralLayout from "./layouts/GeneralLayout";
// import AuthLayout from "./layouts/AuthLayout";
import LandingPage from "./pages/LandingPage";
import VendorDashboard from "./pages/vendor/VendorDashboard";
import VendorLayout from "./layouts/VendorLayout";
import EventDetails from "./pages/vendor/EventDetails";
import CreateNewEvent from "./pages/vendor/CreateNewEvent";
import CheckIn from "./pages/vendor/CheckIn";
import AdminDashboard from "./pages/admin/AdminDashboard";
import VendorRequestsPage from "./pages/admin/VendorRequestsPage";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import GoogleCallback from "./pages/auth/GoogleCallback";
import OnboardingStep1 from "./pages/auth/OnboardingStep1";
import OnboardingStep2 from "./pages/auth/OnboardingStep2";
import EventDetailPage from "./pages/EventDetailPage";
import Error404 from "./pages/Error404";
import Event from "./pages/Event";
import ProfilePage from "./pages/ProfilePage";
import Explore from "./pages/Explore";
import RequireRole from "./components/RequireRole";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<GeneralLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<Error404 />} />
          <Route path="/explore" element={<Explore />} />
          {/* <Route path="/event" element={<EventDetailPage />} /> */}
          <Route path="/event/:id" element={<EventDetailPage />} />
          <Route path="/search-result" element={<Event />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/auth/google/callback" element={<GoogleCallback />} />
        <Route path="/onboarding/step1" element={<OnboardingStep1 />} />
        <Route path="/onboarding/step2" element={<OnboardingStep2 />} />

        <Route element={<RequireRole roles={["vendor", "admin"]} />}>
          <Route element={<VendorLayout />}>
            <Route path="/vendor" element={<VendorDashboard />} />
            <Route path="/event-details/:id" element={<EventDetails />} />
            <Route path="/create-event" element={<CreateNewEvent />} />
            <Route path="/check-in/:id" element={<CheckIn />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Route>
        </Route>

        <Route element={<RequireRole roles={["admin"]} />}>
          <Route element={<VendorLayout />}>
            <Route path="/vendor-requests" element={<VendorRequestsPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
