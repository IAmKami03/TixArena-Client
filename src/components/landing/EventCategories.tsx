import entertainment from "../../assets/images/landingPage/Group.svg";
import tech from "../../assets/images/landingPage/Hack--Streamline-Manila.svg";
import corporate from "../../assets/images/landingPage/Group (1).svg";
import sport from "../../assets/images/landingPage/Women-Led--Streamline-Manila.svg";
import education from "../../assets/images/landingPage/Online-Learning--Streamline-Manila.svg";
import charity from "../../assets/images/landingPage/Investing-3--Streamline-Manila.svg";

const CATEGORIES = [
  { label: "Entertainment", icon: entertainment },
  { label: "Tech", icon: tech },
  { label: "Corporate", icon: corporate },
  { label: "Sport", icon: sport },
  { label: "Education", icon: education },
  { label: "Charity", icon: charity },
];

const EventCategories = () => {
  return (
    <div className="flex justify-center text-[#CECECE]">
      <div className="w-full max-w-[1020px] text-start h-auto px-4 sm:px-6 lg:px-0">
        <h2 className="text-[28px] fnt sm:text-[40px] lg:text-[76px]  font-normal leading-[1.15] lg:leading-[normal]">
          Discover Event Category.
        </h2>
        <p className="text-[#CECECE] text-[14px] sm:text-[16px] font-inter font-normal">
          Discover events that match your vibe from concerts{" "}
          <br className="hidden lg:block" />
          and parties to experiences you didn’t even know you needed.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
          {CATEGORIES.map(({ label, icon }) => (
            <div
              key={label}
              className="flex flex-col lg:flex-row-reverse justify-center items-center border text-center border-[#1E1E1E] bg-white/[0.02] lg:bg-transparent rounded-3xl gap-2 w-full h-auto min-h-[92px] lg:min-h-[100px] py-4 lg:py-0"
            >
              <img src={icon} alt="" className="w-8 lg:w-10" />
              <div className="text-[16px] lg:text-[36px] fnt font-normal text-[#FFFFFF]">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventCategories;
