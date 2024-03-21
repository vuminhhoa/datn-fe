import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);
export async function register(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email: email },
    });
    if (user) return res.send({ success: false, message: 'Already has user!' });
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
