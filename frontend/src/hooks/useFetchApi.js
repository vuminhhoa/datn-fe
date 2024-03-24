import { useState } from 'react';
import axios from 'axios';

export default function useFetchApi({ url, defaultData = {} }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(defaultData);

  async function fetchApi() {
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    try {
      setLoading(true);
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_BASE_API_URL}/${url}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return setData({ ...defaultData, ...res.data.data });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  const handleChangeInput = (key, value) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return {
    fetchApi,
    data,
    setData,
    loading,
    handleChangeInput,
  };
}
