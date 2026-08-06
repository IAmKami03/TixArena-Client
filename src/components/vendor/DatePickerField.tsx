import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import type { ChevronProps } from "react-day-picker";
import { format } from "date-fns";
import { LuCalendar, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import "react-day-picker/style.css";

interface DatePickerFieldProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
}

const dayPickerClassNames = {
  months: "flex",
  month: "flex flex-col gap-3",
  month_caption: "flex items-center justify-center h-9 relative",
  caption_label: "text-[14px] font-semibold text-white",
  nav: "flex items-center justify-between absolute inset-x-0 top-0 h-9",
  button_previous:
    "w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#262525] text-[#ABABAB] transition-colors",
  button_next:
    "w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#262525] text-[#ABABAB] transition-colors",
  month_grid: "w-full border-collapse mt-2",
  weekdays: "flex",
  weekday:
    "text-[#6E6E6E] text-[12px] font-normal w-9 h-9 flex items-center justify-center",
  week: "flex w-full",
  day: "w-9 h-9 flex items-center justify-center text-[14px] text-[#ECECEC] p-0",
  day_button:
    "w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#262525] transition-colors",
  selected:
    "[&>button]:bg-[#995DFF] [&>button]:text-white [&>button]:hover:bg-[#995DFF]",
  today: "[&>button]:text-[#995DFF] [&>button]:font-semibold",
  outside: "[&>button]:text-[#3A3A3A]",
  disabled: "[&>button]:text-[#3A3A3A] [&>button]:opacity-40",
};

const CustomChevron = ({ orientation, className }: ChevronProps) =>
  orientation === "left" ? (
    <LuChevronLeft size={16} className={className} />
  ) : (
    <LuChevronRight size={16} className={className} />
  );

const DatePickerField = ({
  value,
  onChange,
  placeholder = "Select date",
  className = "",
}: DatePickerFieldProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`${className} flex items-center justify-between text-left`}
      >
        <span className={value ? "" : "text-[#6E6E6E]"}>
          {value ? format(value, "EEEE, MMM d, yyyy") : placeholder}
        </span>
        <LuCalendar size={18} className="text-[#ABABAB] shrink-0" />
      </button>

      {open && (
        <div className="absolute z-30 top-full left-0 mt-2 bg-[#161616] border border-[#262525] rounded-2xl p-3 shadow-2xl">
          <DayPicker
            mode="single"
            selected={value}
            defaultMonth={value}
            onSelect={(date) => {
              onChange(date);
              setOpen(false);
            }}
            components={{ Chevron: CustomChevron }}
            classNames={dayPickerClassNames}
          />
        </div>
      )}
    </div>
  );
};

export default DatePickerField;
