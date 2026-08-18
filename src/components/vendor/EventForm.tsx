import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { LuImage } from "react-icons/lu";
import arrowDown from "../../assets/images/vendorImages/arrow-down.svg";
import camera from "../../assets/images/vendorImages/Camera.svg";
import DatePickerField from "./DatePickerField";
import { EVENT_CATEGORIES } from "../../types/event";
import { useImageUpload } from "../../hooks/useImageUpload";

export interface EventFormData {
  name: string;
  overview: string;
  location: string;
  date: Date | null;
  category: string;
  image: string | null;
}

interface EventFormProps {
  onChange?: (data: EventFormData) => void;
  onUploadingChange?: (isUploading: boolean) => void;
}

const inputBase =
  "w-full bg-[#1A1A1A] text-[#ABABAB] text-[16px] rounded-[30px] border-2 border-[#262525] px-4.5 py-5 placeholder:text-[#6E6E6E] outline-none focus:border-[#995DFF] transition-colors";
const labelBase = "text-[#FFFFFF] text-[16px] font-normal";
const requiredMark = <span className="text-[#FF7466]">*</span>;

const EventForm = ({ onChange, onUploadingChange }: EventFormProps) => {
  const [form, setForm] = useState<EventFormData>({
    name: "",
    overview: "",
    location: "",
    date: null,
    category: "",
    image: null,
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { upload, isUploading, error: imageError } = useImageUpload();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isCategoryOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(e.target as Node)
      ) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCategoryOpen]);

  const update = (patch: Partial<EventFormData>) => {
    setForm((prev) => {
      const next = { ...prev, ...patch };
      onChange?.(next);
      return next;
    });
  };

  const handleImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreviewImage(URL.createObjectURL(file));
    onUploadingChange?.(true);
    const url = await upload(file);
    onUploadingChange?.(false);
    setPreviewImage(null);
    if (url) update({ image: url });
  };

  return (
    <div className="flex flex-col gap-3.5 text-start bg-[#0F0F0F] border border-[#262525] rounded-[30px] p-5.5">
      <h3 className="text-white text-[18px] font-semibold">Event Overview</h3>

      <div className="flex flex-col gap-1.5">
        <label className={labelBase}>Event Name {requiredMark}</label>
        <input
          value={form.name}
          onChange={(e) => update({ name: e.target.value })}
          placeholder="Enter event name"
          className={inputBase}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelBase}>Overview {requiredMark}</label>
        <textarea
          value={form.overview}
          onChange={(e) => update({ overview: e.target.value })}
          placeholder="Enter event details"
          rows={4}
          className={`${inputBase} rounded-[24px] resize-none leading-relaxed hide-scrollbar`}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelBase}>Location {requiredMark}</label>
        <div className="relative flex items-center">
          <input
            value={form.location}
            onChange={(e) => update({ location: e.target.value })}
            placeholder="Enter location address"
            className={`${inputBase} pr-12`}
          />
          {/* <img
            src={arrowDown}
            alt=""
            className="absolute right-5 pointer-events-none"
          /> */}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelBase}>Category {requiredMark}</label>
        <div className="relative" ref={categoryRef}>
          <button
            type="button"
            onClick={() => setIsCategoryOpen((prev) => !prev)}
            className={`${inputBase} pr-12 flex items-center justify-between text-left ${
              form.category ? "" : "text-[#6E6E6E]"
            }`}
          >
            <span>{form.category || "Select category"}</span>
            <img
              src={arrowDown}
              alt=""
              className={`absolute right-5 pointer-events-none transition-transform ${
                isCategoryOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isCategoryOpen && (
            <div className="absolute z-30 top-full left-0 right-0 mt-2 bg-[#1A1A1A] border-2 border-[#262525] rounded-2xl p-1.5 shadow-2xl max-h-64 overflow-y-auto hide-scrollbar">
              {EVENT_CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    update({ category });
                    setIsCategoryOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-[15px] transition-colors hover:bg-[#262525] hover:text-[#995DFF] ${
                    category === form.category ? "text-[#995DFF]" : "text-[#ABABAB]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelBase}>Date {requiredMark}</label>
        <DatePickerField
          value={form.date ?? undefined}
          onChange={(date) => update({ date: date ?? null })}
          placeholder="Select date"
          className={inputBase}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelBase}>Image {requiredMark}</label>
        <div className="flex items-center gap-3">
          <span className="w-13 h-13 rounded-2xl bg-[#1A1A1A] border-2 border-[#262525] overflow-hidden flex items-center justify-center shrink-0">
            {previewImage || form.image ? (
              <img
                src={previewImage || form.image || undefined}
                alt=""
                className={`w-full h-full object-cover ${isUploading ? "opacity-50" : ""}`}
              />
            ) : (
              <LuImage size={20} className="text-[#7A7A7A]" />
            )}
          </span>
          <label className="flex items-center gap-2.5 bg-[#1A1A1A] border-2 border-[#262525] rounded-full pl-4 pr-1.5 py-1.5 cursor-pointer">
            <span className="text-[#ABABAB] text-[15px]">
              {isUploading ? "Uploading..." : "Upload Photo"}
            </span>
            <span className="w-7 h-7 rounded-full bg-[#262525] flex items-center justify-center">
              <img src={camera} alt="" className="w-4 h-4" />
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              disabled={isUploading}
              className="hidden"
            />
          </label>
        </div>
        {imageError && (
          <p className="text-[#FF7466] text-[14px]">{imageError}</p>
        )}
      </div>
    </div>
  );
};

export default EventForm;
