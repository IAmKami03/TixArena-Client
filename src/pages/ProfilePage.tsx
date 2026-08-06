import React, { useEffect, useState } from "react";

import type { UserProfile } from "../types/profile";
import ProfileCard from "../components/profile/ProfileCard";
import VendorRequestCard from "../components/profile/VendorRequestCard";
import TicketsSection from "../components/profile/TicketsSection";
import EditProfileModal from "../components/profile/EditProfileModal";
import { useAuth } from "../contexts/AuthContext";

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile>({
    name: "Ahmed Farid",
    email: "olafarid12@gmail.com",
    avatar: "https://i.pravatar.cc/100?img=12",
    interests: ["Concert", "Entertainment", "Corporate", "Sport", "Tech", "Education"],
  });

  useEffect(() => {
    if (!user) return;
    setProfile((prev) => ({
      ...prev,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      interests: user.interests.length ? user.interests : prev.interests,
    }));
  }, [user]);

  const [showModal, setShowModal] = useState(false);

  const handleSave = (updated: UserProfile) => {
    setProfile(updated);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-[#060612] text-white font-sans">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-9">
        <div className="mb-10">
          <ProfileCard profile={profile} onEditClick={() => setShowModal(true)} />
        </div>
        <VendorRequestCard />
        <TicketsSection />
      </div>

      {showModal && (
        <EditProfileModal
          onClose={() => setShowModal(false)}
          initialName={profile.name}
          initialEmail={profile.email}
          initialInterests={profile.interests}
        />
      )}
    </div>
  );
};

export default ProfilePage;
