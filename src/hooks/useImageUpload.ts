import { useState } from "react";
import toast from "react-hot-toast";
import { uploadImage } from "../services/uploadService";
import { getErrorMessage } from "../lib/api";

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const upload = async (file: File): Promise<string | null> => {
    setIsUploading(true);
    try {
      return await uploadImage(file);
    } catch (err) {
      toast.error(getErrorMessage(err));
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return { upload, isUploading };
};
