import api from "../lib/api";
import type { User } from "../types/auth";

export const requestVendorRole = async (): Promise<User> => {
  const res = await api.post("/users/request-vendor");
  return res.data.user;
};

export const getVendorRequests = async (): Promise<User[]> => {
  const res = await api.get("/users/vendor-requests");
  return res.data.users;
};

export const resolveVendorRequest = async (
  userId: string,
  approve: boolean,
): Promise<User> => {
  const res = await api.patch(`/users/vendor-requests/${userId}`, { approve });
  return res.data.user;
};

export const getGenderStats = async (): Promise<{
  female: number;
  male: number;
}> => {
  const res = await api.get("/users/gender-stats");
  return res.data;
};
