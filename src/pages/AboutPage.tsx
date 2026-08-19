import { useNavigate } from "react-router-dom";
import { LuCalendarDays, LuTicket, LuShieldCheck, LuUsers } from "react-icons/lu";

const VALUES = [
  {
    icon: LuCalendarDays,
    title: "Built for organizers",
    body: "List an event in minutes — name, date, tickets, and lineup, no spreadsheets required.",
  },
  {
    icon: LuTicket,
    title: "Real-time ticketing",
    body: "Stock updates the instant a ticket is booked, so nobody ever gets sold a seat that's gone.",
  },
  {
    icon: LuShieldCheck,
    title: "Verified check-in",
    body: "Every ticket becomes a scannable QR code — check attendees in at the door in seconds.",
  },
  {
    icon: LuUsers,
    title: "A place for community",
    body: "From club nights to conferences, Tix Arena is where organizers and audiences find each other.",
  },
];

const STATS = [
  { value: "12K+", label: "Tickets issued" },
  { value: "800+", label: "Events hosted" },
  { value: "50+", label: "Cities" },
  { value: "300+", label: "Organizers" },
];

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#0B0B0B] min-h-screen">
      <div className="px-4 sm:px-8 lg:px-20 pt-12 sm:pt-16 pb-20">
        <div className="max-w-[1020px] mx-auto">
          {/* Hero */}
          <div className="text-center max-w-[640px] mx-auto">
            <p className="text-[#A485D9] text-[13px] font-manrope uppercase tracking-[0.15em] font-semibold">
              About Us
            </p>
            <h1 className="fnt text-[32px] sm:text-[44px] lg:text-[56px] leading-[1.15] text-[#FFFFFF] mt-3">
              Every great night out starts with one click.
            </h1>
            <p className="text-[#CECECE] text-[14px] sm:text-[16px] mt-4">
              Tix Arena is where organizers list events in minutes, and where
              audiences discover, book, and check into the moments worth
              showing up for.
            </p>
          </div>

          {/* Story + stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-16 lg:mt-20 items-stretch">
            <div className="flex flex-col justify-center">
              <h2 className="fnt text-[24px] sm:text-[30px] text-white">
                Our story
              </h2>
              <p className="text-[#CECECE] text-[14px] sm:text-[15px] mt-3 leading-relaxed">
                Tix Arena started as a simple frustration: organizers stuck
                juggling spreadsheets and DMs to sell tickets, and attendees
                stuck screenshotting confirmation emails hoping the door staff
                would take their word for it. We built the platform we
                wished existed — one place to publish an event, sell every
                ticket tier, and check people in without the chaos.
              </p>
              <p className="text-[#CECECE] text-[14px] sm:text-[15px] mt-3 leading-relaxed">
                Today that same idea powers everything from campus meetups
                to full-scale concerts — built by a small team that still
                believes ticketing shouldn't get in the way of the event.
              </p>
            </div>

            <div className="bg-[#0F0F0F] border border-[#262525] rounded-[30px] p-6 sm:p-8 grid grid-cols-2 gap-6">
              {STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span className="fnt text-[28px] sm:text-[34px] text-white">
                    {stat.value}
                  </span>
                  <span className="text-[#ABABAB] text-[13px] sm:text-[14px]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Values */}
          <div className="mt-20 lg:mt-24">
            <h2 className="fnt text-center text-[24px] sm:text-[30px] text-white">
              What we care about
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
              {VALUES.map((value) => (
                <div
                  key={value.title}
                  className="bg-[#0F0F0F] border border-[#262525] rounded-[24px] p-5.5 flex flex-col gap-3"
                >
                  <span className="w-11 h-11 rounded-full bg-[#1A1A1A] border border-[#262525] flex items-center justify-center shrink-0">
                    <value.icon size={18} className="text-[#995DFF]" />
                  </span>
                  <h3 className="text-white text-[16px] font-semibold">
                    {value.title}
                  </h3>
                  <p className="text-[#ABABAB] text-[13.5px] leading-relaxed">
                    {value.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-20 lg:mt-24 bg-[#0F0F0F] border border-[#262525] rounded-[30px] p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="fnt text-[22px] sm:text-[28px] text-white">
                Ready to find your next night out?
              </h3>
              <p className="text-[#CECECE] text-[14px] mt-2">
                Browse live events, or start hosting your own in minutes.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => navigate("/explore")}
                className="bg-[#995DFF] text-white text-[15px] font-medium rounded-full px-6 py-3 hover:bg-[#8a4ff0] transition-colors"
              >
                Explore Events
              </button>
              <button
                type="button"
                onClick={() => navigate("/help")}
                className="border border-[#262525] text-[#ECECEC] text-[15px] font-medium rounded-full px-6 py-3 hover:bg-[#1A1A1A] transition-colors"
              >
                Visit Help Center
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
