import { useState } from 'react';
import { useAppContext } from '../contexts/appContext';
import { convertBase64 } from '../helpers/uploadFile';

export default function useUploadFile() {
  const { setToast } = useAppContext();
  const [uploading, setUploading] = useState(false);
  const [fileBase64, setFileBase64] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const uploadFile = async (file) => {
    console.log(file);
    setUploading(true);
    try {
      const fileUrl = URL.createObjectURL(file);
      const fileBase64 = await convertBase64(file);
      setFileBase64(fileBase64);
      setFileUrl(fileUrl);
      setToast('Upload ảnh thành công!');
      return { fileUrl, fileBase64 };
    } catch (error) {
      console.log(error);
      setToast('Upload ảnh thất bại!');
    } finally {
      setUploading(false);
    }
  };

  return {
    uploading,
    fileBase64,
    fileUrl,
    uploadFile,
  };
}
