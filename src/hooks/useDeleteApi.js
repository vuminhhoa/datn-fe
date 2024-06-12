import { useState } from 'react';
import axios from 'axios';
import { useApp } from '../contexts/appProvider';
export default function useDeleteApi({
  url,
  successCallback = async () => {},
  successMsg = 'Xóa thành công',
}) {
  const { setToast } = useApp();
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
        setToast(resp.message || successMsg);
        await successCallback(resp);
        return resp;
      }
      if (resp.data.error) {
        console.log(resp.data.error);
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
