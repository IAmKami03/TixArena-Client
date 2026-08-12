import image from "../../assets/images/landingPage/image 10.svg";

const Hero = () => {
  return (
    <div>
      <div className="flex justify-center items-center mt-8 sm:mt-10 px-4 sm:px-6 lg:px-0">
        <div className="w-full max-w-[494px] h-auto border-0 text-center ">
          <h1 className="text-[30px] sm:text-[42px] lg:text-[60px] leading-[1.15] lg:leading-[normal] font-normal font-Instrument Serif text-[#CECECE]">
            Your Next Great Time Starts Here.
          </h1>
          <p className="text-[#CECECE] text-[14px] sm:text-[16px] mt-2 lg:mt-0 max-w-[300px] sm:max-w-none mx-auto">
            Discover events that match your vibe from concerts and parties to
            experiences you didn’t even know you needed.
          </p>
          <button className="w-full max-w-[240px] sm:w-auto sm:max-w-none bg-[#995DFF] text-[#FFFFFF] rounded-full px-5 py-3 mt-5 font-medium">
            Discover
          </button>
        </div>
      </div>
      <div className="mt-6 sm:mt-7 px-4 sm:px-6 lg:px-0">
        <img
          src={image}
          alt=""
          className="w-full max-w-[1200px] h-auto mx-auto rounded-2xl lg:rounded-none"
        />
      </div>
    </div>
  );
};

export default Hero;
