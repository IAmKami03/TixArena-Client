import free from "../../assets/images/landingPage/Layer_1.svg";
import speaker from "../../assets/images/landingPage/Frame.svg";
import booking from "../../assets/images/landingPage/Layer_1 (1).svg";
import backgroundImg from "../../assets/images/landingPage/50c3949d293f5b3f71bdb0102c53d413a83d949e (1).png";
const WhyChooseUs = () => {
  return (
    <div>
      <div className="flex justify-center mt-12 px-4 sm:px-6 lg:px-0 text-[#CECECE]">
        <div className="w-full max-w-[1020px] h-auto border-0">
          <h2 className="text-[26px] text-start sm:text-[40px] lg:text-[60px] leading-[1.15] lg:leading-[normal] font-Instrument Serif font-normal">
            Why Choose Us
          </h2>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-0 sm:justify-between mt-5">
            <div className="border border-[#262525] bg-white/[0.02] lg:bg-transparent rounded-3xl px-4 py-3 lg:py-2 w-full sm:w-[300px] h-auto min-h-[92px] lg:min-h-[100px]">
              <div className="flex gap-3 items-center justify-center">
                <div>
                  <img src={free} alt="" />
                </div>
                <div>
                  <p className="font-bold text-[15px] lg:text-lg">Register for Free</p>
                  <p className="text-[#CECECE] text-[13px] lg:text-sm">
                    Sign up with email or Google and create events in minutes.
                  </p>
                </div>
              </div>
            </div>
            <div className="border border-[#262525] bg-white/[0.02] lg:bg-transparent rounded-3xl px-4 py-3 lg:py-2 w-full sm:w-[300px] h-auto min-h-[92px] lg:min-h-[100px]">
              <div className="flex gap-3 items-center">
                <div>
                  <img src={speaker} alt="" />
                </div>
                <div>
                  <p className="font-bold text-[15px] lg:text-lg">Promote Your Event</p>
                  <p className="text-[#CECECE] text-[13px] lg:text-sm">
                    Share on social media & email in a few clicks.
                  </p>
                </div>
              </div>
            </div>
            <div className="border border-[#262525] bg-white/[0.02] lg:bg-transparent rounded-3xl px-4 py-3 lg:py-2 w-full sm:w-[300px] h-auto min-h-[92px] lg:min-h-[100px]">
              <div className="flex gap-3 items-center">
                <div>
                  <img src={booking} alt="" />
                </div>
                <div>
                  <p className="font-bold text-[15px] lg:text-lg">Fast Booking</p>
                  <p className="text-[#CECECE] text-[13px] lg:text-sm">
                    Swift payments with top-notch security.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-0">
        <div className="relative w-full max-w-[1020px] h-[280px] sm:h-[320px] lg:h-[350px] mt-10">
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage: `url("${backgroundImg}")`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-black/70 to-transparent">
            <div className="relative px-6 sm:px-10 lg:px-20 mt-8 sm:mt-10 lg:mt-15 flex flex-col items-start text-white">
              <h2 className="text-[32px] sm:text-[44px] lg:text-[60px] font-Instrument Serif font-normal">
                Hosting an event?
              </h2>
              <p className="text-[#CECECE] text-sm">
                Create, manage, and sell tickets effortlessly <br /> while
                reaching the right audience.
              </p>
              <button className="bg-[#995DFF] text-[#FFFFFF] px-4 py-2 rounded-full mt-5">
                List Your Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
