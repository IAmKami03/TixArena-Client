import React from "react";
import entertainment from "../../assets/images/landingPage/Group.svg";
import tech from "../../assets/images/landingPage/Hack--Streamline-Manila.svg";
import corporate from "../../assets/images/landingPage/Group (1).svg";
import sport from "../../assets/images/landingPage/Women-Led--Streamline-Manila.svg";
import education from "../../assets/images/landingPage/Online-Learning--Streamline-Manila.svg";
import charity from "../../assets/images/landingPage/Investing-3--Streamline-Manila.svg";

const EventCategories = () => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[1020px] h-auto px-4 sm:px-6 lg:px-0">
        <h2 className="text-[36px] sm:text-[48px] lg:text-[60px] font-Instrument Serif font-normal">
          Discover Event Category.
        </h2>
        <p className="text-[#CECECE] text-[16px] font-inter font-normal">
          Discover events that match your vibe from concerts <br />
          and parties to experiences you didn’t even know you needed.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
          <div className="flex items-center justify-center border text-center border-[#1E1E1E] rounded-3xl  gap-2 w-full h-auto min-h-[100px] items-center">
            <div className="text-[36px] font-normal text-[#FFFFFF]">
              Entertainment
            </div>
            <img src={entertainment} alt="" className="w-10" />
          </div>
          <div className="flex items-center justify-center border border-[#1E1E1E] rounded-3xl gap-2 w-full h-auto min-h-[100px] items-center">
            <div className="text-[36px] font-normal text-[#FFFFFF]">Tech</div>
            <img src={tech} alt="" className="w-10" />
          </div>
          <div className="flex  items-center justify-center border border-[#1E1E1E] rounded-3xl  gap-2 w-full h-auto min-h-[100px] items-center">
            <div className="text-[36px] font-normal text-[#FFFFFF]">
              Corporate
            </div>
            <img src={corporate} alt="" className="w-10" />
          </div>
          <div className="flex  items-center justify-center border border-[#1E1E1E] rounded-3xl  gap-2 w-full h-auto min-h-[100px] items-center">
            <div className="text-[36px] font-normal text-[#FFFFFF]">Sport</div>
            <img src={sport} alt="" className="w-10" />
          </div>
          <div className="flex  items-center justify-center border border-[#1E1E1E] rounded-3xl  gap-2 w-full h-auto min-h-[100px] items-center">
            <div className="text-[36px] font-normal text-[#FFFFFF]">
              Education
            </div>
            <img src={education} alt="" className="w-10" />
          </div>
          <div className="flex  items-center justify-center border border-[#1E1E1E] rounded-3xl  gap-2 w-full h-auto min-h-[100px] items-center">
            <div className="text-[36px] font-normal text-[#FFFFFF]">
              Charity
            </div>
            <img src={charity} alt="" className="w-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCategories;
