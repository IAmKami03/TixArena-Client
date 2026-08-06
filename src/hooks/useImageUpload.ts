import { useState } from "react";
import { uploadImage } from "../services/uploadService";
import { getErrorMessage } from "../lib/api";

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const upload = async (file: File): Promise<string | null> => {
    setIsUploading(true);
    setError("");
    try {
      return await uploadImage(file);
    } catch (err) {
      setError(getErrorMessage(err));
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return { upload, isUploading, error };
};
