import { Permission, Role } from '../models/index.js';

export async function getSettings(req, res) {
  try {
    const { type, alias } = req.query;
    if (type === 'getRole') {
      const roles = await Role.findAll();
      console.log(roles);
      return res.send({ roles, success: true });
    }
    if (type === 'getPermissions') {
      const permissions = await Role.findOne({
        where: { alias: alias },
        include: Permission,
      });
      return res.send({ permissions, success: true });
    }
    return res.send({ alias, success: true });
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
