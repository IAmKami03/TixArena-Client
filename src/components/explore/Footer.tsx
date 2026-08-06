import logo7 from "../assets/images/logo7.png"; // your background image
import fotlogo from "../assets/images/fotlogo.png"; // your logo

function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-[#202020]">
      {/* Background */}
      <img
        src={logo7}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/75"></div>

      {/* Content */}
      <div className="relative z-10 max-w-360 mx-auto px-25 pt-6 pb-4">
        <div className="flex justify-between">
          {/* Left */}
          <div className="space-y-6">
            <img src={fotlogo} className="w-42.5" />

            <div className="space-y-3">
              <p className="text-[#9F9F9F] text-sm">hello@logoipsum.com</p>

              <p className="text-white text-[36px]">+1 891 989-11-91</p>

              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>

                <p className="text-[#9F9F9F] text-sm">WhatsApp</p>
              </div>
            </div>
          </div>

          {/* Middle */}
          <div className="flex gap-40">
            <div className="space-y-3">
              <p className="text-white text-3xl">Home</p>
              <p className="text-white text-3xl">Explore</p>
              <p className="text-white text-3xl">Cinema</p>
              <p className="text-white text-3xl">Contacts</p>
              <p className="text-white text-3xl">About</p>
            </div>

            <div className="space-y-2">
              <p className="text-white">FAQ</p>
              <p className="text-[#A5A5A5]">Delivery</p>
            </div>
          </div>

          {/* Right */}
          <div>
            <button className="border border-[#7C3AED] rounded-xl px-8 py-3 text-white hover:bg-[#7C3AED] transition">
              Calculate the cost
            </button>
          </div>
        </div>

        {/* Divider */}

        <div className="border-t border-[#2B2B2B] mt-28 pt-4 flex justify-between">
          <p className="text-[#707070] text-sm">© 2023 — Copyright</p>

          <p className="text-[#707070] text-sm">Privacy</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
