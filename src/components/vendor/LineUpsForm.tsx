import { useState } from "react";
import type { ChangeEvent } from "react";
import { LuUser, LuX, LuCheck } from "react-icons/lu";
import camera from "../../assets/images/vendorImages/Camera.svg";
import { uploadImage } from "../../services/uploadService";
import { getErrorMessage } from "../../lib/api";

export interface SpeakerEntry {
  id: number;
  name: string;
  photo: string | null;
  isHeadliner: boolean;
}

interface LineUpsFormProps {
  onChange?: (speakers: SpeakerEntry[]) => void;
  onUploadingChange?: (isUploading: boolean) => void;
}

let idCounter = 0;
const nextId = () => ++idCounter;

const LineUpsForm = ({ onChange, onUploadingChange }: LineUpsFormProps) => {
  const [speakers, setSpeakers] = useState<SpeakerEntry[]>([
    { id: nextId(), name: "Sam Smith", photo: null, isHeadliner: true },
    { id: nextId(), name: "", photo: null, isHeadliner: false },
  ]);
  const [previews, setPreviews] = useState<Record<number, string>>({});
  const [uploadingIds, setUploadingIds] = useState<Set<number>>(new Set());
  const [photoError, setPhotoError] = useState("");

  const emit = (next: SpeakerEntry[]) => {
    setSpeakers(next);
    onChange?.(next);
  };

  const handleName = (id: number, value: string) => {
    emit(speakers.map((s) => (s.id === id ? { ...s, name: value } : s)));
  };

  const handlePhoto = async (id: number, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreviews((prev) => ({ ...prev, [id]: URL.createObjectURL(file) }));
    setUploadingIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      onUploadingChange?.(next.size > 0);
      return next;
    });
    setPhotoError("");

    try {
      const url = await uploadImage(file);
      emit(speakers.map((s) => (s.id === id ? { ...s, photo: url } : s)));
    } catch (err) {
      setPhotoError(getErrorMessage(err));
    } finally {
      setPreviews((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      setUploadingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        onUploadingChange?.(next.size > 0);
        return next;
      });
    }
  };

  const removePhoto = (id: number) => {
    emit(speakers.map((s) => (s.id === id ? { ...s, photo: null } : s)));
  };

  const toggleHeadliner = (id: number) => {
    emit(
      speakers.map((s) =>
        s.id === id ? { ...s, isHeadliner: !s.isHeadliner } : s
      )
    );
  };

  const addSpeaker = () => {
    emit([
      ...speakers,
      { id: nextId(), name: "", photo: null, isHeadliner: false },
    ]);
  };

  return (
    <div className="flex flex-col gap-3.5 text-start bg-[#0F0F0F] border border-[#262525] rounded-[30px] p-5.5">
      <h3 className="text-white text-[18px] font-semibold">
        Speakers/Line up
      </h3>

      {speakers.map((speaker) => {
        const isUploading = uploadingIds.has(speaker.id);
        const displayPhoto = previews[speaker.id] || speaker.photo;

        return (
          <div key={speaker.id} className="flex flex-col gap-[3px]">
            <div className="flex items-center justify-between bg-[#1A1A1A] rounded-t-[20px] p-3.5">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <span className="w-10 h-10 rounded-full bg-[#262525] overflow-hidden flex items-center justify-center shrink-0">
                  {displayPhoto ? (
                    <img
                      src={displayPhoto}
                      alt=""
                      className={`w-full h-full object-cover ${isUploading ? "opacity-50" : ""}`}
                    />
                  ) : (
                    <LuUser size={18} className="text-[#7A7A7A]" />
                  )}
                </span>
                <span className="text-[#ECECEC] text-[15px] flex items-center gap-1.5">
                  {isUploading ? "Uploading..." : "Upload Photo"}
                  <span className="w-6 h-6 rounded-full bg-[#262525] flex items-center justify-center">
                    <img src={camera} alt="" className="w-3.5 h-3.5" />
                  </span>
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePhoto(speaker.id, e)}
                  disabled={isUploading}
                  className="hidden"
                />
              </label>

              {speaker.photo && (
                <button
                  type="button"
                  onClick={() => removePhoto(speaker.id)}
                  className="flex items-center gap-1.5 bg-[#262525] rounded-full px-3 py-1.5 text-[#ECECEC] text-[14px] hover:bg-[#333] transition-colors"
                >
                  Remove <LuX size={10} className="text-[#ECECEC]" />
                </button>
              )}
            </div>

            <div className="flex items-center justify-between bg-[#1A1A1A] rounded-b-[20px] p-3.5">
              <input
                value={speaker.name}
                onChange={(e) => handleName(speaker.id, e.target.value)}
                placeholder="Enter Name"
                className="bg-transparent text-[#ECECEC] text-[15px] placeholder:text-[#7A7A7A] outline-none flex-1"
              />

              <button
                type="button"
                onClick={() => toggleHeadliner(speaker.id)}
                className="flex items-center gap-2.5 text-[#ECECEC] text-[14px] shrink-0"
              >
                Mark as Headliner
                <span
                  className={`w-5 h-5 rounded-[5px] border flex items-center justify-center transition-colors ${
                    speaker.isHeadliner
                      ? "bg-[#995DFF] border-[#995DFF]"
                      : "bg-transparent border-[#4D4D4D]"
                  }`}
                >
                  {speaker.isHeadliner && (
                    <LuCheck size={12} className="text-white" />
                  )}
                </span>
              </button>
            </div>
          </div>
        );
      })}

      {photoError && (
        <p className="text-[#FF7466] text-[14px]">{photoError}</p>
      )}

      <button
        type="button"
        onClick={addSpeaker}
        className="text-[#A485D9] text-[16px] font-medium flex items-center gap-1 w-fit"
      >
        Add New Member <span className="text-[18px]">+</span>
      </button>
    </div>
  );
};

export default LineUpsForm;
