export type UserRole = "admin" | "vendor" | "user";
export type VendorRequestStatus = "Pending" | "Approved" | "Rejected";

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  role: UserRole;
  gender?: string;
  interests: string[];
  isVerified: boolean;
  vendorRequestStatus?: VendorRequestStatus;
  createdAt?: string;
  updatedAt?: string;
}
