import { useState } from 'react';
import axios from 'axios';

export default function useEditApi(url) {
  const [editing, setEditing] = useState(false);

  async function editApi(body) {
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    try {
      setEditing(true);
      return await axios({
        method: 'PUT',
        url: `${process.env.REACT_APP_BASE_API_URL}${url}`,
        data: body,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
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
