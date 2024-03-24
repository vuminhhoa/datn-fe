import { User } from '../models/index.js';

export async function updateProfile(req, res) {
  try {
    const data = req.body;
    await User.update(data, {
      where: {
        email: data.email,
      },
    });
    return res.send({ data: req.body, success: true });
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
