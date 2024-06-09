import { useState } from 'react';
import axios from 'axios';

export default function useCreateApi(url) {
  const [creating, setCreating] = useState(false);

  async function createApi(body) {
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    try {
      console.log(body, 'body');
      setCreating(true);
      return await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_BASE_API_URL}${url}`,
        data: body,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (e) {
      console.log(e);
    } finally {
      setCreating(false);
    }
  }

  return {
    createApi,
    creating,
  };
}
