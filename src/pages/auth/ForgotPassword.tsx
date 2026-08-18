import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { IoLockClosedOutline } from "react-icons/io5";
import { PiEyeClosedLight, PiEyeLight } from "react-icons/pi";
import AuthLayout from "../../layouts/AuthLayout";
import { useAuth } from "../../contexts/AuthContext";
import * as authService from "../../services/authService";
import { getErrorMessage } from "../../lib/api";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [step, setStep] = useState<"email" | "reset">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSendCode = async () => {
    setError("");
    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    setIsSubmitting(true);
    try {
      await authService.forgotPassword(email.trim());
      setStep("reset");
      setMessage("If that email is registered, a reset code has been sent.");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = async () => {
    setError("");
    if (code.length !== 4) {
      setError("Enter the 4 digit code.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { user, token } = await authService.resetPassword(
        email.trim(),
        code,
        password,
      );
      login(user, token);
      navigate("/");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col gap-[22px] w-full max-w-[540px]">
        <div className="flex flex-col gap-[2px]">
          <h1 className="w-full max-w-72.5 h-auto text-start text-[#FFFFFF] font-['Instrument_Serif'] font-normal text-[36px] sm:text-[45px] leading-[100%] tracking-[-0.02em]">
            Reset Password
          </h1>
          <p className="w-full h-auto text-start text-[#CECECE] font-[Manrope] font-normal text-[16px] leading-[140%] tracking-[-0.01em]">
            {step === "email"
              ? "Enter the email on your account and we'll send you a code to reset your password."
              : `Enter the code we sent to ${email} and choose a new password.`}
          </p>
        </div>

        {step === "email" ? (
          <>
            <div className="flex items-center gap-[7px] w-full h-[62px] rounded-[30px] border-2 border-[#262525] bg-[#191919] px-4.5 py-5">
              <HiOutlineMail
                size={20}
                className="text-[#838383]"
                style={{ strokeWidth: 1.5 }}
              />
              <input
                type="email"
                placeholder="Enter your mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent outline-none text-[#ABABAB] font-[Manrope] font-medium text-[16px] leading-[140%] tracking-[-0.01em]"
              />
            </div>

            {error && (
              <p className="text-[#FF7466] font-[Manrope] text-[14px]">
                {error}
              </p>
            )}

            <button
              type="button"
              onClick={handleSendCode}
              disabled={isSubmitting}
              className="w-full h-[62px] rounded-[30px] px-[17px] py-[14px] bg-[#995DFF] text-[#FFFFFF] font-[Manrope] font-medium text-[16px] leading-[100%] tracking-[-0.01em] text-center disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : "Send Reset Code"}
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center gap-[7px] w-full h-[62px] rounded-[30px] border-2 border-[#262525] bg-[#191919] px-4.5 py-5">
              <IoLockClosedOutline size={20} className="text-[#838383]" />
              <input
                type="text"
                maxLength={4}
                placeholder="Enter 4 digit code"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                className="flex-1 bg-transparent outline-none text-[#ABABAB] font-[Manrope] font-medium text-[16px] leading-[140%] tracking-[-0.01em]"
              />
            </div>

            <div className="flex flex-col gap-[14px]">
              <div className="flex items-center justify-between gap-[12px] w-full h-[62px] rounded-[30px] border-2 border-[#262525] bg-[#191919] px-4.5 py-5">
                <div className="flex flex-1 items-center gap-[12px] h-[24px] min-w-0">
                  <IoLockClosedOutline
                    size={24}
                    className="text-[#838383] shrink-0"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-1 min-w-0 bg-transparent outline-none text-[#ABABAB] font-[Manrope] font-medium text-[16px] leading-[140%] tracking-[-0.01em]"
                  />
                </div>
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <PiEyeLight size={20} className="text-[#838383]" />
                  ) : (
                    <PiEyeClosedLight size={20} className="text-[#838383]" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between gap-[12px] w-full h-[62px] rounded-[30px] border-2 border-[#262525] bg-[#191919] px-4.5 py-5">
                <div className="flex flex-1 items-center gap-[12px] h-[24px] min-w-0">
                  <IoLockClosedOutline
                    size={24}
                    className="text-[#838383] shrink-0"
                  />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="flex-1 min-w-0 bg-transparent outline-none text-[#ABABAB] font-[Manrope] font-medium text-[16px] leading-[140%] tracking-[-0.01em]"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <PiEyeLight size={20} className="text-[#838383]" />
                  ) : (
                    <PiEyeClosedLight size={20} className="text-[#838383]" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-[#FF7466] font-[Manrope] text-[14px]">
                {error}
              </p>
            )}
            {message && !error && (
              <p className="text-[#5FD787] font-[Manrope] text-[14px]">
                {message}
              </p>
            )}

            <button
              type="button"
              onClick={handleReset}
              disabled={isSubmitting}
              className="w-full h-[62px] rounded-[30px] px-[17px] py-[14px] bg-[#995DFF] text-[#FFFFFF] font-[Manrope] font-medium text-[16px] leading-[100%] tracking-[-0.01em] text-center disabled:opacity-60"
            >
              {isSubmitting ? "Resetting..." : "Reset Password"}
            </button>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setStep("email");
                  setError("");
                  setMessage("");
                }}
                className="font-[Manrope] font-medium text-[14px] text-[#CECECE]"
              >
                Change email
              </button>
              <button
                type="button"
                onClick={handleSendCode}
                disabled={isSubmitting}
                className="font-[Manrope] font-medium text-[14px] text-[#995DFF] disabled:opacity-60"
              >
                Resend code
              </button>
            </div>
          </>
        )}

        <Link
          to="/signin"
          className="font-[Manrope] font-medium text-[16px] leading-[140%] tracking-[-0.01em]"
        >
          <span className="text-[#CECECE]">Remembered your password? </span>
          <span className="text-[#995DFF] cursor-pointer">Login</span>
        </Link>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
