interface EventOverviewProps {
  overview?: string;
}

const DEFAULT_OVERVIEW =
  "Learn how to safely find, download, and manage apps from the App Store and Google Play without unexpected charges. Join Senior Tech Connect for a free, one-hour webinar. Join Senior Tech Connect for a free, one-hour webinar. What You’ll Learn How to search for apps in the App Store and Google Play Store How to understand app categories and recommendations How to identify safe";

const EventOverview = ({ overview }: EventOverviewProps) => {
  return (
    <div className="text-manrope font-medium leading-[1.45] text-start">
      <p className="text-[22px] ">Overview</p>

      <p className="text-[18px] text-[#ABABAB]">
        {overview || DEFAULT_OVERVIEW}{" "}
        <span className="text-[#995DFF] cursor-pointer">Read More</span>
      </p>
    </div>
  );
};

export default EventOverview;
