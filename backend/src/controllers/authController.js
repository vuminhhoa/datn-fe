import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);
export async function register(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email: email },
    });
    if (user)
      return res.send({
        success: false,
        message: 'Tài khoản đã tồn tại trên hệ thống!',
      });
    let hashPassword = bcrypt.hashSync(password, salt);
    const createdUser = await User.create({
      email,
      password: hashPassword,
    });
    await createdUser.save();
    return res.send({ success: true, data: createdUser });
  } catch (error) {
    console.log(error);
    return res.send({ success: false, error });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
      raw: false,
    });
    if (!user)
      return res.send({
        success: false,
        message: 'Địa chỉ email không tồn tại!',
      });
    let isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword)
      return res.send({
        success: false,
        message: 'Tài khoản hoặc mật khẩu không chính xác',
      });
    return res.send({
      success: true,
      message: 'Đăng nhập thành công',
    });
  } catch (error) {
    return res.send({
      success: true,
      message: 'Đăng nhập thất bại',
      error: error,
    });
  }
}
