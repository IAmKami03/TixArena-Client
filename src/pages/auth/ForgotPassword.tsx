import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { HiOutlineMail } from "react-icons/hi";
import { IoLockClosedOutline } from "react-icons/io5";
import { PiEyeClosedLight, PiEyeLight } from "react-icons/pi";
import AuthLayout from "../../layouts/AuthLayout";
import { useAuth } from "../../contexts/AuthContext";
import * as authService from "../../services/authService";
import { getErrorMessage } from "../../lib/api";

interface ResetFieldErrors {
  code?: string;
  password?: string;
  confirmPassword?: string;
}

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
  const [emailError, setEmailError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ResetFieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSendCode = async () => {
    if (!email.trim()) {
      setEmailError("Please enter your email.");
      return;
    }
    setEmailError("");

    setIsSubmitting(true);
    try {
      await authService.forgotPassword(email.trim());
      setStep("reset");
      toast.success("If that email is registered, a reset code has been sent.");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = async () => {
    const errors: ResetFieldErrors = {};
    if (code.length !== 4) errors.code = "Enter the 4 digit code.";
    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }
    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

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
      toast.error(getErrorMessage(err));
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
            <div>
              <div
                className={`flex items-center gap-[7px] w-full h-[62px] rounded-[30px] border-2 bg-[#191919] px-4.5 py-5 ${
                  emailError ? "border-[#FF7466]" : "border-[#262525]"
                }`}
              >
                <HiOutlineMail
                  size={20}
                  className="text-[#838383]"
                  style={{ strokeWidth: 1.5 }}
                />
                <input
                  type="email"
                  placeholder="Enter your mail"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError("");
                  }}
                  className="flex-1 bg-transparent outline-none text-[#ABABAB] font-[Manrope] font-medium text-[16px] leading-[140%] tracking-[-0.01em]"
                />
              </div>
              {emailError && (
                <p className="mt-1.5 text-[#FF7466] font-[Manrope] text-[13px]">
                  {emailError}
                </p>
              )}
            </div>

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
            <div>
              <div
                className={`flex items-center gap-[7px] w-full h-[62px] rounded-[30px] border-2 bg-[#191919] px-4.5 py-5 ${
                  fieldErrors.code ? "border-[#FF7466]" : "border-[#262525]"
                }`}
              >
                <IoLockClosedOutline size={20} className="text-[#838383]" />
                <input
                  type="text"
                  maxLength={4}
                  placeholder="Enter 4 digit code"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value.replace(/\D/g, ""));
                    if (fieldErrors.code)
                      setFieldErrors((prev) => ({ ...prev, code: undefined }));
                  }}
                  className="flex-1 bg-transparent outline-none text-[#ABABAB] font-[Manrope] font-medium text-[16px] leading-[140%] tracking-[-0.01em]"
                />
              </div>
              {fieldErrors.code && (
                <p className="mt-1.5 text-[#FF7466] font-[Manrope] text-[13px]">
                  {fieldErrors.code}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-[14px]">
              <div>
                <div
                  className={`flex items-center justify-between gap-[12px] w-full h-[62px] rounded-[30px] border-2 bg-[#191919] px-4.5 py-5 ${
                    fieldErrors.password
                      ? "border-[#FF7466]"
                      : "border-[#262525]"
                  }`}
                >
                  <div className="flex flex-1 items-center gap-[12px] h-[24px] min-w-0">
                    <IoLockClosedOutline
                      size={24}
                      className="text-[#838383] shrink-0"
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="New password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (fieldErrors.password)
                          setFieldErrors((prev) => ({
                            ...prev,
                            password: undefined,
                          }));
                      }}
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
                {fieldErrors.password && (
                  <p className="mt-1.5 text-[#FF7466] font-[Manrope] text-[13px]">
                    {fieldErrors.password}
                  </p>
                )}
              </div>

              <div>
                <div
                  className={`flex items-center justify-between gap-[12px] w-full h-[62px] rounded-[30px] border-2 bg-[#191919] px-4.5 py-5 ${
                    fieldErrors.confirmPassword
                      ? "border-[#FF7466]"
                      : "border-[#262525]"
                  }`}
                >
                  <div className="flex flex-1 items-center gap-[12px] h-[24px] min-w-0">
                    <IoLockClosedOutline
                      size={24}
                      className="text-[#838383] shrink-0"
                    />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (fieldErrors.confirmPassword)
                          setFieldErrors((prev) => ({
                            ...prev,
                            confirmPassword: undefined,
                          }));
                      }}
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
                {fieldErrors.confirmPassword && (
                  <p className="mt-1.5 text-[#FF7466] font-[Manrope] text-[13px]">
                    {fieldErrors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

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
                  setFieldErrors({});
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
