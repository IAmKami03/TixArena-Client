import api from "../lib/api";

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await api.post("/uploads/image", formData);
  return res.data.url;
};
