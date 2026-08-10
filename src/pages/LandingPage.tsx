import EventCategories from "../components/landing/EventCategories";
import ExploreEvents from "../components/landing/ExploreEvents";
import Hero from "../components/landing/Hero";
import HostingGap from "../components/landing/HostingGap";
import TopEvent from "../components/landing/TopEvent";
import WhyChooseUs from "../components/landing/WhyChooseUs";

const LandingPage = () => {
  return (
    <div>
      <Hero />
      <EventCategories />
      <TopEvent />
      <ExploreEvents />
      <WhyChooseUs />
      <HostingGap />
    </div>
  );
};

export default LandingPage;
