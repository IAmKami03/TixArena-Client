const SECTIONS = [
  {
    title: "What we collect",
    body: "Just what's needed to run your account and bookings: your name, email, and the events, tickets, and vendor requests tied to your account. We don't collect anything beyond that.",
  },
  {
    title: "How it's used",
    body: "Your details are used to manage your bookings, check you into events, and let organizers reach attendees about the events they've booked. We don't sell your data to anyone.",
  },
  {
    title: "Cover images & uploads",
    body: "Photos you upload for events, speakers, or your profile are stored to display within the app and are only visible where that content is normally shown.",
  },
  {
    title: "Your choices",
    body: "You can update your profile details at any time, and can reach us at the email below to ask about or remove your data.",
  },
];

const PrivacyPage = () => {
  return (
    <div className="bg-[#0B0B0B] min-h-screen px-4 sm:px-8 lg:px-20 pt-12 sm:pt-16 pb-20">
      <div className="max-w-[720px] mx-auto">
        <p className="text-[#A485D9] text-[13px] font-manrope uppercase tracking-[0.15em] font-semibold">
          Privacy
        </p>
        <h1 className="fnt text-[30px] sm:text-[40px] text-white mt-3">
          Privacy Policy
        </h1>
        <p className="text-[#CECECE] text-[14px] sm:text-[15px] mt-4 leading-relaxed">
          This page is a short, plain-language summary of how Tix Arena
          handles your information — no legal jargon, just the essentials.
        </p>

        <div className="mt-10 flex flex-col gap-6">
          {SECTIONS.map((section) => (
            <div
              key={section.title}
              className="bg-[#0F0F0F] border border-[#262525] rounded-[24px] p-5.5"
            >
              <h2 className="text-white text-[16px] font-semibold">
                {section.title}
              </h2>
              <p className="text-[#ABABAB] text-[14px] mt-2 leading-relaxed">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        <p className="text-[#7A7A7A] text-[13px] mt-10">
          Questions about your data? Reach us at{" "}
          <a
            href="mailto:hello@logopsum.com"
            className="text-[#CECECE] hover:text-white transition-colors"
          >
            hello@logopsum.com
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default PrivacyPage;
