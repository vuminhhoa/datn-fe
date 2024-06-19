import { useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../contexts/appContext';

export default function useCreateApi({
  url,
  successMsg = 'Tạo mới thành công',
  errorMsg = 'Tạo mới thất bại',
  successCallback = async () => {},
  errorCallback = () => {},
  useToast = true,
  showErrors = true,
  addErrors = () => {},
}) {
  const { setToast } = useAppContext();
  const [creating, setCreating] = useState(false);

  async function createApi({ id = null, body }) {
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    try {
      setCreating(true);
      const fullResp = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_BASE_API_URL}${url}${id ? `/${id}` : ''}`,
        data: body,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const resp = fullResp.data;
      if (resp.success) {
        useToast && setToast(resp.message || successMsg);
        await successCallback(resp);
      }
      if (!resp.success) {
        useToast && setToast(resp.message || errorMsg, 'error');
        errorCallback(resp);
      }
      return resp;
    } catch (e) {
      console.error(e);
      return { success: false, error: e.message };
    } finally {
      setCreating(false);
    }
  }

  return {
    createApi,
    creating,
  };
}
