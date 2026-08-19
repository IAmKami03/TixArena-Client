import { useState } from "react";
import { LuChevronDown, LuMail, LuTicket, LuUserCog, LuShieldCheck } from "react-icons/lu";
import whatsappIcon from "../assets/images/eventsImages/whatsapp.svg";

interface FaqItem {
  q: string;
  a: string;
}

interface FaqSection {
  title: string;
  icon: typeof LuTicket;
  items: FaqItem[];
}

const FAQ_SECTIONS: FaqSection[] = [
  {
    title: "Tickets & Bookings",
    icon: LuTicket,
    items: [
      {
        q: "How do I book a ticket?",
        a: "Open any event's details page, choose a ticket tier and quantity, and confirm your booking. Your ticket — including its QR code — is saved to your profile right away.",
      },
      {
        q: "Where do I find my ticket after booking?",
        a: "Go to your Profile page — every ticket you've booked is listed there with its QR code, ready to show at check-in.",
      },
      {
        q: "What happens if a ticket tier sells out?",
        a: "Sold-out tiers are disabled the moment stock hits zero, so you'll never be sold a ticket that isn't available. Try another tier if one exists.",
      },
    ],
  },
  {
    title: "Hosting Events",
    icon: LuUserCog,
    items: [
      {
        q: "How do I become an organizer?",
        a: "From your profile, request creator access. Once an admin approves your request, a Create Event option appears and you can start listing events.",
      },
      {
        q: "How long does event approval take?",
        a: "New events and edits are reviewed by an admin before they go live, which usually happens quickly. You'll see the event's status update on your dashboard.",
      },
      {
        q: "Can I edit an event after publishing it?",
        a: "Yes. Editing sends the event back for a quick re-approval to keep listings accurate, but your existing ticket sales and attendees are never affected.",
      },
    ],
  },
  {
    title: "Account & Security",
    icon: LuShieldCheck,
    items: [
      {
        q: "How do I reset my password?",
        a: "Use the \"Forgot password?\" link on the sign-in page to receive a reset link by email.",
      },
      {
        q: "Is my payment or personal information safe?",
        a: "We only collect what's needed to run your bookings and account. See our Privacy page for the full details.",
      },
    ],
  },
];

const HelpPage = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="bg-[#0B0B0B] min-h-screen px-4 sm:px-8 lg:px-20 pt-12 sm:pt-16 pb-20">
      <div className="max-w-[760px] mx-auto">
        <div className="text-center">
          <p className="text-[#A485D9] text-[13px] font-manrope uppercase tracking-[0.15em] font-semibold">
            Help Center
          </p>
          <h1 className="fnt text-[32px] sm:text-[44px] text-white mt-3">
            How can we help?
          </h1>
          <p className="text-[#CECECE] text-[14px] sm:text-[16px] mt-3">
            Answers to the questions we get asked most, plus how to reach us
            directly.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-9">
          {FAQ_SECTIONS.map((section) => (
            <div key={section.title}>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-9 h-9 rounded-full bg-[#1A1A1A] border border-[#262525] flex items-center justify-center shrink-0">
                  <section.icon size={16} className="text-[#995DFF]" />
                </span>
                <h2 className="text-white text-[17px] font-semibold">
                  {section.title}
                </h2>
              </div>

              <div className="flex flex-col gap-2.5">
                {section.items.map((item) => {
                  const id = `${section.title}-${item.q}`;
                  const isOpen = openId === id;
                  return (
                    <div
                      key={id}
                      className="bg-[#0F0F0F] border border-[#262525] rounded-[20px] overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenId(isOpen ? null : id)}
                        aria-expanded={isOpen}
                        className="w-full flex items-center justify-between gap-3 text-left px-5 py-4 text-[#ECECEC] text-[15px]"
                      >
                        {item.q}
                        <LuChevronDown
                          size={16}
                          className={`shrink-0 transition-transform ${
                            isOpen ? "rotate-180 text-[#995DFF]" : "text-[#7A7A7A]"
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <p className="px-5 pb-4 text-[#ABABAB] text-[14px] leading-relaxed">
                          {item.a}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-16 bg-[#0F0F0F] border border-[#262525] rounded-[30px] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-white text-[19px] font-semibold">
              Still stuck?
            </h2>
            <p className="text-[#ABABAB] text-[14px] mt-1">
              Reach our team directly and we'll get back to you.
            </p>
          </div>
          <div className="flex flex-col gap-2.5 text-[14px]">
            <a
              href="mailto:hello@logopsum.com"
              className="flex items-center gap-2 text-[#CECECE] hover:text-white transition-colors"
            >
              <LuMail size={16} /> hello@logopsum.com
            </a>
            <span className="flex items-center gap-2 text-[#CECECE]">
              <img src={whatsappIcon} alt="" className="w-4 h-4" />
              +1 891 989-11-91
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
