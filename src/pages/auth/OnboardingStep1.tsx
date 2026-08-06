import { useState } from "react";
import { useNavigate } from "react-router-dom";
import eventLoverIcon from "../../assets/images/authImages/event-lover-icon.svg";
import createEventIcon from "../../assets/images/authImages/create-event-icon.svg";
import AuthLayout from "../../layouts/AuthLayout";

const OnboardingStep1 = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<"user" | "vendor" | null>(null);

  const choose = (role: "user" | "vendor") => {
    setSelected(role);
    sessionStorage.setItem("onboarding_role", role);
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-[540px] flex flex-col gap-[25px]">
        <div className="relative pr-14 sm:pr-0">
          <div className="flex flex-col gap-[8px]">
            <h1 className="text-[#FFFFFF] font-['Instrument_Serif'] font-normal text-[36px] sm:text-[45px] leading-[100%] tracking-[-0.02em]">
              You're Almost There
            </h1>
            <p className="text-[#CECECE] font-[Manrope] font-normal text-[16px] leading-[140%] tracking-[-0.01em]">
              Complete the final steps to get your personalized account up and
              running.
            </p>
          </div>
          <span
            onClick={() => navigate("/onboarding/step2")}
            className="absolute top-0 right-0 text-[#CECECE] font-[Manrope] font-normal text-[16px] cursor-pointer"
          >
            Skip
          </span>
        </div>

        <div className="flex gap-[8px]">
          <div className="flex-1 h-[6px] rounded-[30px] bg-[#995DFF]" />
          <div className="flex-1 h-[6px] rounded-[30px] bg-[#434343]" />
        </div>

        <h3 className="w-full h-auto text-[#FFFFFF] font-[Manrope] font-medium text-[23px] leading-[100%] tracking-[-0.01em]">
          What are you here for?
        </h3>

        <div
          onClick={() => choose("user")}
          className="flex items-center gap-[20px] w-full h-auto min-h-[104px] rounded-[30px] px-[20px] sm:px-[30px] py-[14px] cursor-pointer"
          style={{
            backgroundColor: selected === "user" ? "#110B1A" : "#191919",
            border:
              selected === "user" ? "2px solid #995DFF" : "2px solid #262525",
          }}
        >
          <img
            src={eventLoverIcon}
            alt=""
            className="w-[57px] h-[47px] shrink-0"
          />
          <div className="flex flex-col items-start gap-[4px]">
            <h4 className="text-[#FFFFFF] font-['Instrument_Serif'] font-normal text-[23px] leading-[100%] tracking-[-0.01em]">
              Event Lover
            </h4>
            <p className="text-[#CECECE] font-[Manrope] font-normal text-[16px] leading-[140%] tracking-[-0.01em]">
              I want to find events, buy tickets, and follow my favorite
              creators.
            </p>
          </div>
        </div>

        <div
          onClick={() => choose("vendor")}
          className="flex items-center gap-[20px] w-full h-auto min-h-[104px] rounded-[30px] px-[20px] sm:px-[30px] py-[14px] cursor-pointer"
          style={{
            backgroundColor: selected === "vendor" ? "#110B1A" : "#191919",
            border:
              selected === "vendor"
                ? "2px solid #995DFF"
                : "2px solid #262525",
          }}
        >
          <img
            src={createEventIcon}
            alt=""
            className="w-[56px] h-[57px] shrink-0"
          />
          <div className="flex flex-col items-start gap-[4px]">
            <h4 className="text-[#FFFFFF] font-['Instrument_Serif'] font-normal text-[23px] leading-[100%] tracking-[-0.01em]">
              Create Event
            </h4>
            <p className="text-[#CECECE] font-[Manrope] font-normal text-[16px] leading-[140%] tracking-[-0.01em]">
              I want to create events, sell tickets, and manage my attendees.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/onboarding/step2")}
          className="w-full h-[62px] rounded-[30px] px-[17px] py-[14px] bg-[#995DFF] text-[#FFFFFF] font-[Manrope] font-medium text-[16px] leading-[100%] tracking-[-0.01em] text-center"
        >
          Next
        </button>
      </div>
    </AuthLayout>
  );
};

export default OnboardingStep1;
