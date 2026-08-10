import image from "../../assets/images/landingPage/image 10.svg";

const Hero = () => {
  return (
    <div>
      <div className="flex justify-center items-center mt-10 px-4 sm:px-6 lg:px-0">
        <div className="w-full max-w-[494px] h-auto border-0 text-center ">
          <h1 className="text-[36px] sm:text-[48px] lg:text-[60px] font-normal font-Instrument Serif text-[#CECECE]">
            Your Next Great Time Starts Here.
          </h1>
          <p className="text-[#CECECE]">
            Discover events that match your vibe from concerts and parties to
            experiences you didn’t even know you needed.
          </p>
          <button className="bg-[#995DFF] text-[#FFFFFF] rounded-full px-5 py-3 mt-5">
            Discover
          </button>
        </div>
      </div>
      <div className="mt-7 px-4 sm:px-6 lg:px-0">
        <img src={image} alt="" className="w-full max-w-[1200px] h-auto mx-auto" />
      </div>
    </div>
  );
};

export default Hero;
