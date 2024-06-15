import { useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../contexts/appContext';
export default function useDeleteApi({
  url,
  successCallback = async () => {},
  successMsg = 'Xóa thành công',
  errorMsg = 'Xóa thất bại',
}) {
  const { setToast } = useAppContext();
  const [deleting, setDeleting] = useState(false);

  async function deleteApi(id = null) {
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    setDeleting(true);
    try {
      const resp = await axios({
        method: 'DELETE',
        url: `${process.env.REACT_APP_BASE_API_URL}${url}${id ? `/${id}` : ''}`,
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
      setDeleting(false);
    }
  }

  return {
    deleteApi,
    deleting,
  };
}
