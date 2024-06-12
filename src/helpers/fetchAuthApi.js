import axios from 'axios';

/**
 *
 * @param {*} param0
 * @returns
 */
export default async function fetchAuthApi({ url, body }) {
  const accessToken = localStorage.getItem('ACCESS_TOKEN');
  const resp = await axios({
    method: 'GET',
    url: `${process.env.REACT_APP_BASE_API_URL}${url}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: body,
  });

  return resp;
}
