import axios from 'axios';

/**
 *
 * @param {*} param0
 * @returns
 */
export default async function fetchAuthApi({ url, body }) {
  try {
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    console.log({
      method: 'GET',
      url: `${process.env.REACT_APP_BASE_API_URL}${url}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: body,
    });
    const resp = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_BASE_API_URL}${url}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      withCredentials: false,
      data: body,
    });

    return resp;
  } catch (error) {
    console.log(error);
  }
}
