import { useEffect, useState } from "react";
import { LuArrowUp } from "react-icons/lu";

const SHOW_AFTER_PX = 400;

// Floating "back to top" button — only appears once the page has been
// scrolled past a threshold, so it naturally stays hidden on short pages.
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > SHOW_AFTER_PX);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[#995DFF] hover:bg-[#8a4ff0] text-white shadow-lg shadow-black/40 flex items-center justify-center transition-colors"
    >
      <LuArrowUp size={20} />
    </button>
  );
};

export default ScrollToTopButton;
