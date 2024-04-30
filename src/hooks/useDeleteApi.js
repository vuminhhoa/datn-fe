import { useState } from 'react';
import axios from 'axios';

export default function useDeleteApi(url) {
  const [deleting, setDeleting] = useState(false);

  async function deleteApi(id = null) {
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    try {
      setDeleting(true);
      return await axios({
        method: 'DELETE',
        url: `${process.env.REACT_APP_BASE_API_URL}${url}${id ? `/${id}` : ''}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
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
