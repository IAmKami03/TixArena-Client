import React from "react";
import { LuPencil } from "react-icons/lu";
import type { UserProfile } from "./types";

interface ProfileCardProps {
  profile: UserProfile;
  onEditClick: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onEditClick }) => {
  return (
    <section className="relative border border-white/15 rounded-3xl bg-white/[0.02] p-6 sm:p-8 w-full max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
        <img
          src={profile.avatar}
          alt={profile.name}
          className="w-20 h-20 rounded-full object-cover ring-2 ring-white/80 shrink-0"
        />

        <div>
          <h1 className="text-2xl font-serif text-slate-50">{profile.name}</h1>
          <p className="text-slate-400 text-sm mt-1">{profile.email}</p>

          <div className="flex flex-wrap justify-center sm:justify-start gap-2.5 mt-4 max-w-md">
            {profile.interests.map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 rounded-full bg-white/[0.06] text-xs text-slate-300 border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={onEditClick}
        className="static sm:absolute sm:bottom-8 sm:right-8 mt-6 sm:mt-0 mx-auto sm:mx-0 flex items-center gap-1.5 text-sm text-indigo-300 bg-white/[0.06] rounded-full px-4 py-2 hover:bg-white/10"
      >
        <LuPencil size={13} />
        Edit Profile
      </button>
    </section>
  );
};

export default ProfileCard;