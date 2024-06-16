import { ADMIN } from '../const/role';

export default function hasPermission(reqPermission) {
  const userDataString = localStorage.getItem('CURRENT_USER');
  const userData = JSON.parse(userDataString);
  if (userData.Role.name === ADMIN) return true;

  const userPermissions = userData.Role.Permissions;
  if (!userPermissions) return false;

  return userPermissions.find(
    (userPermisson) => userPermisson.name === reqPermission
  );
}
