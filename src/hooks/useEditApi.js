import { useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../contexts/appContext';

export default function useEditApi({
  url,
  successCallback = async () => {},
  successMsg = 'Cập nhật thành công',
  errorMsg = 'Cập nhật thất bại',
}) {
  const { setToast } = useAppContext();
  const [editing, setEditing] = useState(false);

  async function editApi({ id = null, body }) {
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    try {
      setEditing(true);
      const resp = await axios({
        method: 'PUT',
        url: `${process.env.REACT_APP_BASE_API_URL}${url}${id ? `/${id}` : ''}`,
        data: body,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (resp.data.success) {
        setToast(resp.data.message || successMsg);
        return await successCallback(resp);
      }
      if (!resp.data.success) {
        return setToast(resp.data.message || errorMsg, 'error');
      }
    } catch (e) {
      console.log(e);
    } finally {
      setEditing(false);
    }
  }

  return {
    editApi,
    editing,
  };
}
