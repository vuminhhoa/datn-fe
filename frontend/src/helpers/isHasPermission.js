export default function isHasPermission(reqPermission) {
  const userDataString = localStorage.getItem('CURRENT_USER');
  const userData = JSON.parse(userDataString);
  const userPermissions = userData.Role.Permissions;

  if (!userPermissions) return false;

  return userPermissions.find(
    (userPermisson) => userPermisson.alias === reqPermission
  );
}
