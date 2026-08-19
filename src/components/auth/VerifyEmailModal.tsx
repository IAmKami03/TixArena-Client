import { useState } from "react";
import toast from "react-hot-toast";
import { IoLockClosedOutline } from "react-icons/io5";
import verificationBg from "../../assets/images/authImages/verificationBg.png";
import * as authService from "../../services/authService";
import { getErrorMessage } from "../../lib/api";
import type { User } from "../../types/auth";

interface VerifyEmailModalProps {
  email: string;
  onSuccess: (user: User, token: string) => void;
  onClose: () => void;
}

const VerifyEmailModal = ({
  email,
  onSuccess,
  onClose,
}: VerifyEmailModalProps) => {
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleSubmit = async () => {
    if (code.length !== 4) {
      setCodeError("Enter the 4 digit code.");
      return;
    }
    setCodeError("");
    setIsSubmitting(true);
    try {
      const { user, token } = await authService.verifyEmail(email, code);
      onSuccess(user, token);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      await authService.resendCode(email);
      toast.success("A new code has been sent.");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-start justify-center px-4 pt-16 sm:pt-[100px] z-50 overflow-y-auto">
      <div className="w-full max-w-[580px] rounded-[30px] overflow-hidden bg-[#0C0C0C] flex flex-col gap-[22px] p-[20px] my-4">
        <div
          className="relative rounded-t-[20px] overflow-hidden"
          style={{
            backgroundImage: `url(${verificationBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "140px",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(0deg, #0C0C0C 0%, rgba(12,12,12,0.3) 100%)",
            }}
          ></div>
          <div className="relative z-10 p-[20px]">
            <h2 className="text-[#FFFFFF] font-['Instrument_Serif'] font-normal text-[32px] sm:text-[45px] leading-[100%] tracking-[-0.02em] mb-[8px]">
              Check your Email for a Code
            </h2>
            <p className="text-[#CECECE] font-[Manrope] font-normal text-[16px] leading-[140%] tracking-[-0.01em]">
              We sent a code to {email}.
            </p>
          </div>
        </div>

        <div
          className={`flex items-center justify-between w-full h-[62px] rounded-[30px] border-2 bg-[#191919] px-4.5 py-5 ${
            codeError ? "border-[#FF7466]" : "border-[#262525]"
          }`}
        >
          <div className="flex items-center gap-[12px]">
            <IoLockClosedOutline size={24} className="text-[#838383]" />
            <input
              type="text"
              maxLength={4}
              placeholder="Enter 4 digit code"
              value={code}
              onChange={(e) => {
                setCode(e.target.value.replace(/\D/g, ""));
                if (codeError) setCodeError("");
              }}
              className="bg-transparent outline-none font-[Manrope] font-medium text-[16px] tracking-[-0.01em]"
              style={{ color: "#ABABAB" }}
            />
          </div>
          <span
            onClick={onClose}
            className="text-[#995DFF] font-[Manrope] font-medium text-[16px] cursor-pointer"
          >
            Change Email
          </span>
        </div>

        {codeError && (
          <p className="text-[#FF7466] font-[Manrope] text-[14px] -mt-[10px]">
            {codeError}
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full h-[62px] rounded-[30px] bg-[#995DFF] text-[#FFFFFF] font-[Manrope] font-medium text-[16px] leading-[100%] tracking-[-0.01em] text-center disabled:opacity-60"
        >
          {isSubmitting ? "Verifying..." : "Submit"}
        </button>

        <p className="font-[Manrope] font-medium text-[16px] leading-[140%] tracking-[-0.01em]">
          <span className="text-[#CECECE]">Didn't get any code? </span>
          <span
            onClick={handleResend}
            className="text-[#995DFF] cursor-pointer"
          >
            {isResending ? "Resending..." : "Resend"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmailModal;
