import flower from "../../assets/images/landingPage/flower.svg";
import girl from "../../assets/images/landingPage/image 15 (1).png";
import people from "../../assets/images/landingPage/030b723a3d9c5bf6714ea159f717b57b0729cd48.png";
import { IoIosStar } from "react-icons/io";
import fineboy from "../../assets/images/landingPage/Ellipse 4.svg";
import red from "../../assets/images/landingPage/Frame 45.png";

const HostingGap = () => {
  return (
    <div className="flex justify-center mt-7 text-white px-4 sm:px-6 lg:px-0">
      <div className=" border-0 w-full max-w-[1020px]">
        <div className="mx-auto flex justify-center items-center">
          <div className="border-0 text-center">
            <h1 className="text-[36px] sm:text-[48px] lg:text-[60px] font-Instrument Serif font-normal">
              Loved by Event Lovers Everywhere
            </h1>
            <p className="text-[#CECECE] text-[20px] font-inter font-normal">
              From unforgettable concerts to seamless bookings, people <br />{" "}
              are discovering and enjoying events like never before.
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-7 border-0 mt-10">
          <div className="w-full lg:w-[200px]">
            <div className="relative w-full lg:w-[200px] h-[150px] rounded-3xl overflow-hidden border border-[#1E1E1E]">
              <div
                className="absolute inset-0 bg-center bg-cover"
                style={{
                  backgroundImage: `url("${flower}")`,
                }}
              >
                <div className="absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center leading-8">
                  <p className="text-[#CECECE] ">winner</p>
                  <h3 className="text-[#FFFFFF] font-medium text-[30px]">
                    Most Innovative Company
                  </h3>
                </div>
              </div>
            </div>
            <div className="relative w-full lg:w-[200px] h-[320px] mt-7 border border-[#1E1E1E] rounded-3xl overflow-hidden">
              <div
                className="absolute inset-0 bg-center bg-cover"
                style={{ backgroundImage: `url("${girl}")` }}
              >
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
                  <p className="text-[#FFFFFF] font-medium text-[20px] whitespace-nowrap">
                    Vibe City Live 2.0
                  </p>
                  <p className="text-[#CECECE] text-sm font-semibold">
                    18 June 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[250px]">
            <div className="relative w-full lg:w-[250px] h-[350px] rounded-3xl overflow-hidden border border-[#1E1E1E]">
              <div
                className="absolute inset-0 bg-center bg-cover"
                style={{ backgroundImage: `url("${people}")` }}
              >
                <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-black/100  via-black/80 to-transparent">
                  <div className="absolute bottom-4 text-center text-[20px] ">
                    <p className="text-4xl ">“</p>
                    <div className="font-Manrope font-semibold text-[#FFFFFF]">
                      The event reminders and updates were really helpful.
                      Everything felt organized from start to finish.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="border border-[#1E1E1E] w-full lg:w-[250px] h-[110px] text-center rounded-3xl mt-7 flex flex-col justify-center text-center">
              <p className="text-[30px] font-bold">4.80</p>
              <p className="text-[18px] font-medium font-serif">
                2,146 Reviews
              </p>
              <div className="flex text-amber-300 items-center justify-center">
                <IoIosStar />
                <IoIosStar />
                <IoIosStar />
                <IoIosStar />
                <IoIosStar />
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[550px] border-0">
            <div className="border border-[#1E1E1E] rounded-3xl p-4">
              <div className="flex items-center gap-2">
                <img src={fineboy} alt="" />
                <p>Amanda K</p>
              </div>
              <p>
                “The interface is clean, fun, and super easy to use. Definitely
                my new go-to platform for nightlife events and discovering
                exciting experiences happening around the city every single
                weekend.”
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <div className="border-0 w-full sm:w-[250px]">
                <div className="border border-[#1E1E1E] rounded-tr-3xl rounded-tl-3xl h-[110px] text-center flex flex-col justify-center">
                  <p>50k</p>
                  <p>Tickets Successfully Booked</p>
                </div>
                <div className="border border-[#1E1E1E] h-[110px] text-center flex flex-col justify-center">
                  <p>50k</p>
                  <p>Tickets Successfully Booked</p>
                </div>
                <div className="border border-[#1E1E1E] rounded-bl-3xl rounded-br-3xl h-[110px] text-center flex flex-col justify-center">
                  <p>50k</p>
                  <p>Tickets Successfully Booked</p>
                </div>
              </div>
              <div className="relative w-full sm:w-[250px] h-[330px] rounded-3xl border border-[#1E1E1E] overflow-hidden">
                <div
                  className="absolute inset-0 bg-center bg-cover"
                  style={{ backgroundImage: `url("${red}")` }}
                >
                  <div className="absolute bottom-4">
                    <p className="text-4xl text-center font-bold text-white">
                      “
                    </p>
                    <p className="text-center font-semibold text-[18px]">
                      I discovered so many exciting events I wouldn’t have known
                      about otherwise. The experience feels modern and exciting.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostingGap;
