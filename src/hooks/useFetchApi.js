import { useState, useEffect } from 'react';
import axios from 'axios';
import useErrors from './useErrors';

/**
 *
 * @param {*} param0
 * @returns
 */
export default function useFetchApi({
  url,
  defaultData = [],
  deps = [],
  depIndex = 0,
  initLoad = true,
  fullResp = false,
  initLoading = true,
  withPagination = false,
}) {
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(initLoading);
  const [data, setData] = useState(defaultData);
  const [pageInfo, setPageInfo] = useState({});
  const { errors, addErrors, clearErrors } = useErrors();

  async function fetchApi(
    fetchUrl = url,
    isSilent = false,
    isResetDataOnFetchError = true,
    fullResp = true
  ) {
    !isSilent && setLoading(true);
    const accessToken = localStorage.getItem('ACCESS_TOKEN');

    try {
      const resp = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_BASE_API_URL}${fetchUrl || url}`,
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        withCredentials: false,
      });

      setData(resp.data.data);
      setPageInfo(resp.data.pageInfo);
    } catch (e) {
      console.log(e);
      if (isResetDataOnFetchError) {
        setData(defaultData);
        setPageInfo({});
      }
      return fullResp ? { success: false, data: {} } : false;
    } finally {
      !isSilent && setLoading(false);
      !isSilent && setFetched(true);
    }
  }

  const handleChangeInput = (key, val) => {
    setData((prev) => ({ ...prev, [key]: val }));
  };

  useEffect(() => {
    if ((!deps.length || deps[depIndex]) && initLoad && !fetched) {
      fetchApi(url).then(() => {});
    }
  }, deps);

  return {
    fetchApi,
    pageInfo,
    setPageInfo,
    loading,
    setLoading,
    data,
    setData,
    fetched,
    handleChangeInput,
    errors,
    clearErrors,
    addErrors,
  };
}
