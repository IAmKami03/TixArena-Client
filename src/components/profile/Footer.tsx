import React from "react";
import logo from "../assets/Frame 21.svg";

const Footer: React.FC = () => {
    return (
        <footer className="relative overflow-hidden bg-[#0a0c12] pt-10 pb-6 px-8">
            {/* Background image, faded */}
            <div
                className="absolute inset-0 opacity-20 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200&q=80')",
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c12] via-[#0a0c12]/80 to-[#0a0c12]" />

            <div className="relative max-w-6xl mx-auto">
                {/* Top row */}
                <div className="flex flex-wrap justify-between gap-10">
                    {/* Brand + contact */}
                    <div className="flex flex-col gap-2">
                        <img src={logo} alt="TIX ARENA" className="h-6 w-auto mb-2" />
                        <span className="text-slate-400 text-sm">hello@tixarena.com</span>
                        <span className="text-slate-100 text-base font-medium">
                            <div className="ml-auto">
                            </div>
                            +1 891 989-11-91
                        </span>
                        <div className="flex items-center gap-1.5 mt-1">
                            <span className="w-2 h-2 rounded-full bg-green-400" />
                            <span className="text-slate-400 text-sm">WhatsApp</span>
                        </div>
                    </div>


                    <div className="flex flex-col gap-2 text-sm text-slate-300">
                        <a href="#" className="hover:text-white">Home</a>
                        <a href="#" className="hover:text-white">Explore</a>
                        <a href="#" className="hover:text-white">Cinema</a>
                        <a href="#" className="hover:text-white">Contacts</a>
                        <a href="#" className="hover:text-white">About</a>
                    </div>


                    <div className="flex flex-col gap-2 text-sm text-slate-400">
                        <a href="#" className="hover:text-white">FAQ</a>
                        <a href="#" className="hover:text-white">Delivery</a>
                    </div>

                    <div>
                        <button className="border border-indigo-400 text-indigo-300 text-sm rounded px-5 py-2.5 hover:bg-indigo-400/10 transition whitespace-nowrap">
                            Calculate the cost
                        </button>
                    </div>
                </div>


                <div className="mt-16 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-500">
                    <span>© 2023 — Copyright</span>
                    <a href="#" className="hover:text-white">Privacy</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;