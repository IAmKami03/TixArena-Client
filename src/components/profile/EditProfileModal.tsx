import React, { useState } from "react";
import { LuX, LuCamera } from "react-icons/lu";

interface EditProfileModalProps {
  onClose: () => void;
  initialName?: string;
  initialEmail?: string;
  initialInterests?: string[];
}

const AVAILABLE_INTERESTS = ["Sport", "Tech", "Education", "Concert", "Entertainment", "Corporate"];

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  onClose,
  initialName = "",
  initialEmail = "",
  initialInterests = ["Concert", "Entertainment", "Corporate"],
}) => {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [interests, setInterests] = useState<string[]>(initialInterests);

  const removeInterest = (tag: string) => {
    setInterests((prev) => prev.filter((t) => t !== tag));
  };

  const addInterest = (tag: string) => {
    setInterests((prev) => (prev.includes(tag) ? prev : [...prev, tag]));
  };

  const remainingInterests = AVAILABLE_INTERESTS.filter((t) => !interests.includes(t));

  const handleSave = () => {
    // wire this up to your update/profile API call
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-[#12141c] border border-white/10 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-serif text-slate-50">Edit Profile</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-slate-300 hover:bg-white/10"
          >
            <LuX size={14} />
          </button>
        </div>

        {/* Avatar with upload overlay */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&q=80"
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
            <button className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-indigo-400 flex items-center justify-center border-2 border-[#12141c]">
              <LuCamera size={12} className="text-white" />
            </button>
          </div>
        </div>

        {/* Full Name */}
        <label className="block text-xs text-slate-400 mb-1.5">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 mb-4 focus:outline-none focus:ring-1 focus:ring-indigo-400"
        />

        {/* Email */}
        <label className="block text-xs text-slate-400 mb-1.5">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 mb-4 focus:outline-none focus:ring-1 focus:ring-indigo-400"
        />

        {/* Interests */}
        <label className="block text-xs text-slate-400 mb-1.5">Interest</label>
        <div className="rounded-xl bg-white/5 border border-white/10 p-3 mb-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {interests.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.08] text-xs text-slate-200 border border-white/10"
              >
                {tag}
                <button onClick={() => removeInterest(tag)} className="hover:text-red-300">
                  <LuX size={11} />
                </button>
              </span>
            ))}
          </div>

          {remainingInterests.length > 0 && (
            <>
              <p className="text-[11px] text-slate-500 mb-2">Add more interest</p>
              <div className="flex flex-wrap gap-2">
                {remainingInterests.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => addInterest(tag)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-transparent text-xs text-slate-300 border border-dashed border-white/20 hover:border-indigo-300 hover:text-indigo-200"
                  >
                    {tag} <span className="text-indigo-300">+</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          className="w-full rounded-xl py-3 text-sm font-medium text-white bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-300 hover:opacity-90 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfileModal;
