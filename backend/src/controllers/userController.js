import jwt from 'jsonwebtoken';

export async function getUserWithAccessToken(req, res) {
  try {
    const { accessToken } = req.body;
    const data = jwt.verify(accessToken, 'secretkey', (error, decoded) => {
      if (error) return res.send({ success: false, error: error });
      return decoded;
    });
    console.log(data.user);
    return;
    // const accessToken = req.body;
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: 'Lấy dữ liệu user thất bại',
      error: error,
    });
  }
}
