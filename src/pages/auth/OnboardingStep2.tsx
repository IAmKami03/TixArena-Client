import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthLayout from "../../layouts/AuthLayout";
import { useAuth } from "../../contexts/AuthContext";
import * as authService from "../../services/authService";
import { getErrorMessage } from "../../lib/api";
import type { UserRole } from "../../types/auth";

const CATEGORIES = [
  "Entertainment",
  "Tech",
  "Corporate",
  "Sport",
  "Education",
  "Charity",
  "Comedy",
  "Concert",
];

const GENDERS = ["Male", "Female"];

const OnboardingStep2 = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [gender, setGender] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleCategory = (category: string) => {
    setSelected((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    try {
      const role = sessionStorage.getItem("onboarding_role") as UserRole | null;
      const updatedUser = await authService.updateOnboarding({
        ...(role ? { role } : {}),
        ...(gender ? { gender } : {}),
        interests: selected,
      });
      sessionStorage.removeItem("onboarding_role");
      const token = localStorage.getItem("tix_token");
      if (token) login(updatedUser, token);
      navigate("/explore");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-[540px] flex flex-col gap-[25px]">
        <div className="relative pr-14 sm:pr-0">
          <div className="flex flex-col gap-[8px] text-start">
            <h1 className="text-[#FFFFFF] font-['Instrument_Serif'] font-normal text-[36px] sm:text-[45px] leading-[100%] tracking-[-0.02em]">
              You're Almost There
            </h1>
            <p className="text-[#CECECE] font-[Manrope] font-normal text-[16px] leading-[140%] tracking-[-0.01em]">
              Complete the final steps to get your personalized account up and
              running.
            </p>
          </div>
          <span
            onClick={() => navigate("/explore")}
            className="absolute top-0 right-0 text-[#CECECE] font-[Manrope] font-normal text-[16px] cursor-pointer"
          >
            Skip
          </span>
        </div>

        <div className="flex gap-[8px]">
          <div className="flex-1 h-[6px] rounded-[30px] bg-[#995DFF]" />
          <div className="flex-1 h-[6px] rounded-[30px] bg-[#995DFF]" />
        </div>

        <div className="flex flex-col gap-[16px]">
          <h3 className="text-[#FFFFFF] font-[Manrope] font-medium text-[18px] leading-[100%] tracking-[-0.01em]">
            Gender
          </h3>

          <div className="flex flex-col sm:flex-row gap-[14px] sm:gap-[22px]">
            {GENDERS.map((g) => (
              <div
                key={g}
                onClick={() => setGender(g)}
                className="flex-1 flex items-center justify-between h-[61px] rounded-[30px] px-[20px] sm:px-[30px] py-[14px] cursor-pointer"
                style={{
                  backgroundColor: gender === g ? "#110B1A" : "#191919",
                  border: gender === g ? "2px solid #995DFF" : "2px solid #262525",
                }}
              >
                <span className="text-[#FFFFFF] font-['Instrument_Serif'] font-normal text-[25px] leading-[100%] tracking-[-0.02em]">
                  {g}
                </span>

                {gender === g && (
                  <div className="w-[18px] h-[18px] rounded-full bg-[#995DFF] flex items-center justify-center shrink-0">
                    <span className="text-white text-[10px] font-bold">✓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <h3 className="text-[#FFFFFF] font-[Manrope] font-medium text-[23px] leading-[100%] tracking-[-0.01em]">
          Select the kind of event that interest you?
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px] sm:gap-[22px]">
          {CATEGORIES.map((category) => (
            <div
              key={category}
              onClick={() => toggleCategory(category)}
              className="flex items-center justify-between h-[61px] w-full rounded-[30px] px-[20px] sm:px-[30px] py-[14px] cursor-pointer"
              style={{
                backgroundColor: selected.includes(category)
                  ? "#110B1A"
                  : "#191919",
                border: selected.includes(category)
                  ? "2px solid #995DFF"
                  : "2px solid #262525",
              }}
            >
              <span className="text-[#FFFFFF] font-['Instrument_Serif'] font-normal text-[25px] leading-[100%] tracking-[-0.02em]">
                {category}
              </span>

              {selected.includes(category) && (
                <div className="w-[18px] h-[18px] rounded-full bg-[#995DFF] flex items-center justify-center shrink-0">
                  <span className="text-white text-[10px] font-bold">✓</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handleComplete}
          disabled={isSubmitting}
          className="w-full h-[62px] rounded-[30px] px-[17px] py-[14px] bg-[#995DFF] text-[#FFFFFF] font-[Manrope] font-medium text-[16px] leading-[100%] tracking-[-0.01em] text-center disabled:opacity-60"
        >
          {isSubmitting ? "Saving..." : "Complete"}
        </button>
      </div>
    </AuthLayout>
  );
};

export default OnboardingStep2;
