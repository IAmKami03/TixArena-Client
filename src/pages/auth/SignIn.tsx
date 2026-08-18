import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineMail } from "react-icons/hi";
import { IoLockClosedOutline } from "react-icons/io5";
import { PiEyeClosedLight, PiEyeLight } from "react-icons/pi";
import AuthLayout from "../../layouts/AuthLayout";
import { useAuth } from "../../contexts/AuthContext";
import * as authService from "../../services/authService";
import { getErrorMessage } from "../../lib/api";
import { GOOGLE_REDIRECT_URI } from "../../lib/googleAuth";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = (location.state as { from?: string } | null)?.from ?? "/";
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setError("");
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { user, token } = await authService.login(email, password);
      login(user, token);
      navigate(redirectTo);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const googleSignIn = useGoogleLogin({
    flow: "auth-code",
    ux_mode: "redirect",
    redirect_uri: GOOGLE_REDIRECT_URI,
    state: encodeURIComponent(redirectTo),
  });

  return (
    <AuthLayout>
      <div className="flex flex-col gap-[22px] w-full max-w-[540px]">
        <div className="flex flex-col gap-[2px]">
          <h1 className="w-full max-w-72.5 h-auto text-[#FFFFFF] font-['Instrument_Serif'] font-normal text-[36px] sm:text-[45px] leading-[100%] tracking-[-0.02em]">
            Welcome Back
          </h1>
          <p className="w-full text-start h-auto text-[#CECECE] font-[Manrope] font-normal text-[16px] leading-[140%] tracking-[-0.01em]">
            Log in to explore events, manage your bookings, and pick up
            <br />
            right where you left off.
          </p>
        </div>

        <button
          type="button"
          onClick={() => googleSignIn()}
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

          <div className="flex items-center justify-between gap-[12px] w-full h-[62px] rounded-[30px] border-2 border-[#262525] bg-[#191919] px-4.5 py-5">
            <div className="flex flex-1 items-center gap-[12px] h-[24px] min-w-0">
              <IoLockClosedOutline
                size={24}
                className="text-[#838383] shrink-0"
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
        </div>

        <Link
          to="/forgot-password"
          className="self-end font-[Manrope] font-medium text-[14px] text-[#995DFF] leading-[140%] tracking-[-0.01em]"
        >
          Forgot password?
        </Link>

        {error && (
          <p className="text-[#FF7466] font-[Manrope] text-[14px]">{error}</p>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full h-[62px] rounded-[30px] px-[17px] py-[14px] bg-[#995DFF] text-[#FFFFFF] font-[Manrope] font-medium text-[16px] leading-[100%] tracking-[-0.01em] text-center disabled:opacity-60"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        <Link
          to={"/signup"}
          className="font-[Manrope] font-medium text-[16px] leading-[140%] tracking-[-0.01em]"
        >
          <span className="text-[#CECECE]">Don't you have an account? </span>
          <span className="text-[#995DFF] cursor-pointer">Sign Up</span>
        </Link>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
