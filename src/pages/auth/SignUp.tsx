import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineMail } from "react-icons/hi";
import { IoLockClosedOutline } from "react-icons/io5";
import { PiEyeClosedLight, PiEyeLight } from "react-icons/pi";
import VerifyEmailModal from "../../components/auth/VerifyEmailModal";
import AuthLayout from "../../layouts/AuthLayout";
import { useAuth } from "../../contexts/AuthContext";
import * as authService from "../../services/authService";
import { getErrorMessage } from "../../lib/api";
import { GOOGLE_REDIRECT_URI } from "../../lib/googleAuth";

const SignUp = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async () => {
    setError("");

    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Please fill in every field.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsSubmitting(true);
    try {
      await authService.signup({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      });
      setVerifyEmail(form.email);
      setShowModal(true);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const googleSignUp = useGoogleLogin({
    flow: "auth-code",
    ux_mode: "redirect",
    redirect_uri: GOOGLE_REDIRECT_URI,
    state: encodeURIComponent("/"),
  });

  return (
    <AuthLayout>
      <div className="flex flex-col gap-[22px] w-full max-w-[540px]">
        <div className="flex flex-col gap-[2px]">
          <h1 className="w-full max-w-72.5 h-auto text-[#FFFFFF] font-['Instrument_Serif'] font-normal text-[36px] sm:text-[45px] leading-[100%] tracking-[-0.02em]">
            Create Your Account
          </h1>
          <p className="w-full h-auto text-[#CECECE] font-[Manrope] font-normal text-[16px] leading-[140%] tracking-[-0.01em]">
            Create an account to explore events, manage your bookings, and stay
            <br />
            updated on what's happening next.
          </p>
        </div>

        <button
          type="button"
          onClick={() => googleSignUp()}
          className="flex items-center cursor-pointer justify-center gap-[12px] w-full h-[62px] rounded-[30px] px-[18px] py-[20px] border border-[#333333] bg-[#0C0C0C] text-[#FFFFFF] font-[Manrope] font-[500] text-[16px] leading-[140%] tracking-[-0.01em]"
        >
          <FcGoogle size={24} />
          Continue with Google
        </button>

        <div className="flex items-center gap-2 w-full h-5.5 rounded-[30px]">
          <div className="flex-1 border-2 border-[#262525]" />
          <span className="text-[#ABABAB] font-[Manrope] font-medium text-[16px] leading-[100%] tracking-[-0.01em] w-[17px] h-[22px] shrink-0">
            or
          </span>
          <div className="flex-1 border-2 border-[#262525]" />
        </div>

        <div className="flex flex-col gap-[14px]">
          <div className="flex flex-col sm:flex-row gap-[14px] sm:gap-5">
            <input
              type="text"
              placeholder="Enter your first name"
              value={form.firstName}
              onChange={handleChange("firstName")}
              className="w-full sm:w-[262px] h-[62px] rounded-[30px] border-2 border-[#262525] bg-[#191919] px-4.5 py-5 text-[#ABABAB] font-[Manrope] font-medium text-[16px] leading-[140%] tracking-[-0.01em] outline-none"
            />
            <input
              type="text"
              placeholder="Enter your surname/Lastname"
              value={form.lastName}
              onChange={handleChange("lastName")}
              className="w-full sm:w-[262px] h-[62px] rounded-[30px] border-2 border-[#262525] bg-[#191919] px-4.5 py-5 text-[#ABABAB] font-[Manrope] font-medium text-[16px] leading-[140%] tracking-[-0.01em] outline-none"
            />
          </div>

          <div className="flex items-center gap-[7px] w-full h-[62px] rounded-[30px] border-2 border-[#262525] bg-[#191919] px-4.5 py-5">
            <HiOutlineMail
              size={20}
              className="text-[#838383]"
              style={{ strokeWidth: 1.5 }}
            />
            <input
              type="email"
              placeholder="Enter your mail"
              value={form.email}
              onChange={handleChange("email")}
              className="flex-1 bg-transparent outline-none text-[#ABABAB] font-[Manrope] font-medium text-[16px] leading-[140%] tracking-[-0.01em]"
            />
          </div>

          <div className="flex items-center justify-between gap-[12px] w-full h-[62px] rounded-[30px] border-2 border-[#262525] bg-[#191919] px-4.5 py-5">
            <div className="flex flex-1 items-center gap-[12px] h-[24px] min-w-0">
              <IoLockClosedOutline
                size={24}
                className="text-[#838383] shrink-0"
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your New Password"
                value={form.password}
                onChange={handleChange("password")}
                className="flex-1 min-w-0 bg-transparent outline-none text-[#ABABAB] font-[Manrope] font-medium text-[16px] leading-[140%] tracking-[-0.01em]"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
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
                placeholder="Re-enter your New Password"
                value={form.confirmPassword}
                onChange={handleChange("confirmPassword")}
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
          <p className="text-[#FF7466] font-[Manrope] text-[14px]">{error}</p>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full h-[62px] rounded-[30px] px-[17px] py-[14px] bg-[#995DFF] text-[#FFFFFF] font-[Manrope] font-medium text-[16px] leading-[100%] tracking-[-0.01em] text-center disabled:opacity-60"
        >
          {isSubmitting ? "Creating Account..." : "Create Your Account"}
        </button>

        <p className="font-[Manrope] font-medium text-[16px] leading-[140%] tracking-[-0.01em]">
          <span className="text-[#CECECE]">Do you have an account? </span>
          <span
            onClick={() => navigate("/signin")}
            className="text-[#995DFF] cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>

      {showModal && (
        <VerifyEmailModal
          email={verifyEmail}
          onSuccess={(user, token) => {
            login(user, token);
            navigate("/onboarding/step1");
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </AuthLayout>
  );
};

export default SignUp;
