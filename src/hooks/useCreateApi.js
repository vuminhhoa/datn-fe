import { useState } from 'react';
import axios from 'axios';
import { useApp } from '../contexts/appProvider';

export default function useCreateApi({
  url,
  successMsg = 'Saved successfully',
  errorMsg = 'Failed to save',
  successCallback = async () => {},
  errorCallback = () => {},
  useToast = true,
  showErrors = true,
  addErrors = () => {},
}) {
  const { setToast } = useApp();
  const [creating, setCreating] = useState(false);

  async function createApi(body) {
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    try {
      setCreating(true);
      const fullResp = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_BASE_API_URL}${url}`,
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
      if (resp.error) {
        showErrors && addErrors([resp.error]);
        errorCallback(resp);
      }
      return resp;
    } catch (e) {
      console.error(e);
      addErrors([errorMsg ? errorMsg : e.message]);
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
