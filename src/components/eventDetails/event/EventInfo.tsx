import heart from "../../../assets/images/eventsImages/Heart.svg";
import share from "../../../assets/images/eventsImages/Share.svg";
import date from "../../../assets/images/eventsImages/date.svg";
import location from "../../../assets/images/eventsImages/location.svg";

interface EventInfoProps {
  name?: string;
  location?: string;
  dateTime?: string;
  onShare?: () => void;
}

const EventInfo = ({
  name = "Accessing the App & Google Play Store",
  location: locationText = "34, Ejunbe Street, Ikorodu, Lagos State.",
  dateTime = "Friday, May 29 • 6 PM - 7 PM WAT",
  onShare,
}: EventInfoProps) => {
  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-col sm:flex-row text-start sm:items-center justify-between gap-4 sm:gap-0">
        <p className="text-[28px] sm:text-[36px] lg:text-[45px] font-instrument mb-0 sm:mb-[25px]">
          {name}
        </p>
        <div className="flex gap-8 items-center shrink-0">
          <img
            src={share}
            alt="Share"
            onClick={onShare}
            className={onShare ? "cursor-pointer" : undefined}
          />
          <img src={heart} alt="" />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
        <div className="flex items-center gap-3.5">
          <img src={location} alt="" />
          <div className="text-start">
            <p className="font-medium text-[16px] text-manrope text-[#ABABAB]">
              Location
            </p>
            <p className="font-medium text-[18px] text-manrope">
              {locationText}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3.5">
          <img src={date} alt="" />
          <div className="text-start">
            <p className="font-medium text-[16px] text-manrope text-[#ABABAB]">
              Date
            </p>
            <p className="font-medium text-[17px] text-manrope">{dateTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventInfo;
