import logo from "../../assets/images/searchResult/Frame 21.svg";
import whatsappIcon from "../../assets/images/searchResult/Ellipse 3.svg";

const Footer = () => {
  return (
    <div className=" px-25 py-6 flex flex-col gap-40 border-2 border-t border-[#262525]">
      <div className="flex items-start justify-between">
        <div>
          <img src={logo} alt="" className="pb-8" />
          <p className="text-[#DCC7BC] text-[12px] font-medium pb-4 ">
            hello@logoipsum.com
          </p>
          <span className="text-[20px] pb-2">+ 891 989-11-91</span>
          <div className="flex items-center gap-2 text-[12px]">
            <img src={whatsappIcon} alt="" />
            <p>WhatsApp</p>
          </div>
        </div>
        <div>
          <p className="text-[#DCC7BC] text-[20px]">Home</p>
          <p className="text-[#DCC7BC] text-[20px]">Explore</p>
          <p className="text-[#DCC7BC] text-[20px]">Cinema</p>
          <p className="text-[#DCC7BC] text-[20px]">Contacts</p>
          <p className="text-[#DCC7BC] text-[20px]">About</p>
        </div>
        <div>
          <p className="text-[#DCC7BC] text-[14px]">FAQ</p>
          <p className="text-[#DCC7BC] text-[14px]">Delivery</p>
        </div>
        <div className="px-6 py-2.5 border-2 border-[#995DFF] font-semibold text-[#DCC7BC] text-[14px] rounded-[8px]">
          <button>Calculate the cost</button>
        </div>
      </div>
      <div className="flex justify-between items between text-[12px]">
        <p>© 2023 — Copyright</p>
        <p>Privacy</p>
      </div>
    </div>
  );
};

export default Footer;
