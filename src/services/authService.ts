import api from "../lib/api";
import type { User, UserRole } from "../types/auth";

interface AuthResponse {
  token: string;
  user: User;
}

export const signup = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): Promise<{ email: string }> => {
  const res = await api.post("/auth/signup", data);
  return res.data;
};

export const verifyEmail = async (
  email: string,
  code: string,
): Promise<AuthResponse> => {
  const res = await api.post("/auth/verify-email", { email, code });
  return res.data;
};

export const resendCode = async (email: string): Promise<void> => {
  await api.post("/auth/resend-code", { email });
};

export const login = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

export const googleAuth = async (
  code: string,
  redirectUri: string,
): Promise<AuthResponse | { email: string }> => {
  const res = await api.post("/auth/google", { code, redirectUri });
  return res.data;
};

export const getMe = async (): Promise<User> => {
  const res = await api.get("/auth/me");
  return res.data.user;
};

export const updateOnboarding = async (data: {
  role?: UserRole;
  gender?: string;
  interests?: string[];
}): Promise<User> => {
  const res = await api.patch("/auth/onboarding", data);
  return res.data.user;
};

export const updateProfile = async (data: {
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: string;
  interests?: string[];
}): Promise<User> => {
  const res = await api.patch("/auth/profile", data);
  return res.data.user;
};
