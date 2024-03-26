import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetchApi({
  url,
  defaultData = {},
  initLoad = true,
}) {
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [data, setData] = useState(defaultData);

  async function fetchApi(fetchUrl) {
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    try {
      setLoading(true);
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_BASE_API_URL}/${fetchUrl || url}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return setData((prev) => {
        return { ...defaultData, ...prev, ...res.data };
      });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      setFetched(true);
    }
  }

  const handleChangeInput = (key, value) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (initLoad && !fetched) {
      fetchApi(url).then(() => {});
    }
  }, []);

  return {
    fetchApi,
    data,
    setData,
    loading,
    handleChangeInput,
  };
}
