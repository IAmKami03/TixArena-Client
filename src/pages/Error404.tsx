import image from "../assets/images/Group 12.svg";

const Error404 = () => {
  return (
    <div className="flex justify-center">
      <div className=" w-[540px] h-[300px] flex flex-col justify-center items-center p-4 border-[#1E1E1E] mt-10">
        <img src={image} alt="" className="w-[250px]" />
        <p className="font-normal text-[40px] text-[#FFFFFF]">
          Lost in the party?
        </p>
        <p className="text-[#ABABAB] font-normal text-[16px]">
          It looks like this page has wandered off. Try going back to the
          previous page, use the navigation menu, or head to the homepage to
          find what you need.
        </p>
      </div>
    </div>
  );
};

export default Error404;
