// Commented out: unused — the live /signup route renders pages/auth/SignUp.tsx instead.
// Kept here (rather than deleted) per project convention.
/*
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const googleIcon = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.64 9.2045C17.64 8.5663 17.5827 7.9527 17.4764 7.3636H9V10.845H13.8436C13.635 11.97 13.0009 12.9231 12.0477 13.5613V15.8195H14.9564C16.6582 14.2527 17.64 11.9454 17.64 9.2045Z"
      fill="#4285F4"
    />
    <path
      d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5613C11.2418 14.1013 10.2109 14.4204 9 14.4204C6.65591 14.4204 4.67182 12.8372 3.96409 10.71H0.957275V13.0418C2.43818 15.9831 5.48182 18 9 18Z"
      fill="#34A853"
    />
    <path
      d="M3.96409 10.71C3.78409 10.17 3.68182 9.5931 3.68182 9C3.68182 8.4068 3.78409 7.83 3.96409 7.29V4.9581H0.957275C0.347727 6.1731 0 7.5477 0 9C0 10.4522 0.347727 11.8268 0.957275 13.0418L3.96409 10.71Z"
      fill="#FBBC05"
    />
    <path
      d="M9 3.5795C10.3214 3.5795 11.5077 4.0336 12.4405 4.9254L15.0218 2.344C13.4632 0.8918 11.4259 0 9 0C5.48182 0 2.43818 2.0168 0.957275 4.9581L3.96409 7.29C4.67182 5.1627 6.65591 3.5795 9 3.5795Z"
      fill="#EA4335"
    />
  </svg>
);

const EyeIcon: React.FC<{ open: boolean }> = ({ open }) =>
  open ? (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

const LockIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

const MailIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm = () => {
     const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    // TODO: connect to auth API
    console.log("Sign up submitted", formData);
  };

  const inputBase =
    "w-full h-13 bg-[#1A1A1A] text-white text-sm rounded-[10px] px-4 placeholder:text-[#888] outline-none border border-transparent focus:border-[#995DFF] transition-colors";

  return (
     <div className="flex flex-col justify-center w-full md:w-1/2 px-6 sm:px-12 lg:px-20 py-10 overflow-y-auto">
        <h1 className="text-white text-3xl font-bold mb-2">
          Create Your Account
        </h1>
        <p className="text-[#888] text-sm mb-8 max-w-sm">
          Create an account to explore events, manage your bookings, and stay
          updated on what's happening next.
        </p>

        <button
          type="button"
          className="w-full h-13 flex items-center justify-center gap-3 bg-[#1A1A1A] border border-[#2E2E2E] text-white text-sm rounded-[10px] hover:bg-[#222] transition-colors mb-4"
        >
          {googleIcon}
          Continue with Google
        </button>

        <div className="flex items-center gap-3 my-4">
          <span className="flex-1 h-px bg-[#2E2E2E]" />
          <span className="text-[#888] text-xs">or</span>
          <span className="flex-1 h-px bg-[#2E2E2E]" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex gap-3">
            <input
              name="firstName"
              type="text"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
              className={inputBase}
              required
            />
            <input
              name="lastName"
              type="text"
              placeholder="Enter your surname/Lastname"
              value={formData.lastName}
              onChange={handleChange}
              className={inputBase}
              required
            />
          </div>

          <div className="relative flex items-center">
            <span className="absolute left-4 text-[#888]">
              <MailIcon />
            </span>
            <input
              name="email"
              type="email"
              placeholder="Enter your mail"
              value={formData.email}
              onChange={handleChange}
              className={`${inputBase} pl-10`}
              required
            />
          </div>

          <div className="relative flex items-center">
            <span className="absolute left-4 text-[#888]">
              <LockIcon />
            </span>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your New Password"
              value={formData.password}
              onChange={handleChange}
              className={`${inputBase} pl-10 pr-10`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-4 text-[#888] hover:text-white transition-colors"
              aria-label="Toggle password visibility"
            >
              <EyeIcon open={showPassword} />
            </button>
          </div>

          <div className="relative flex items-center">
            <span className="absolute left-4 text-[#888]">
              <LockIcon />
            </span>
            <input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter your New Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`${inputBase} pl-10 pr-10`}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((v) => !v)}
              className="absolute right-4 text-[#888] hover:text-white transition-colors"
              aria-label="Toggle confirm password visibility"
            >
              <EyeIcon open={showConfirmPassword} />
            </button>
          </div>

          <button
            type="submit"
            className="w-full h-13 bg-[#995DFF] hover:bg-[#8a4ff0] text-white text-sm font-semibold rounded-[10px] transition-colors mt-2"
          >
            Create Your Account
          </button>
        </form>

        <p className="text-[#888] text-sm mt-6">
          Do you have an account?{" "}
          <Link to="/login" className="text-[#995DFF] hover:underline">
            Login
          </Link>
        </p>
      </div>
  )
}

export default SignUpForm
*/
