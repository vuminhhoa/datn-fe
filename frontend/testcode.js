const array1 = [
  { alias: 'dashboardRead' },
  { alias: 'departmentRead' },
  { alias: 'departmentCreate' },
  { alias: 'departmentUpdate' },
  { alias: 'departmentDelete' },
  { alias: 'profileSetting' },
  { alias: 'systemSetting' },
  { alias: 'userCreate' },
  { alias: 'userRead' },
  { alias: 'userUpdate' },
  { alias: 'userDelete' },
  { alias: 'tenderCreate' },
  { alias: 'tenderRead' },
  { alias: 'tenderUpdate' },
  { alias: 'tenderDelete' },
  { alias: 'equipmentCreate' },
  { alias: 'equipmentRead' },
  { alias: 'equipmentUpdate' },
  { alias: 'equipmentDelete' },
  { alias: 'equipmentImport' },
];

const array2 = [
  {
    id: 1,
    alias: 'dashboardRead',
    name: 'Xem bảng điều khiển',
    createdAt: '2024-03-24T07:34:50.000Z',
    updatedAt: '2024-03-24T07:34:50.000Z',
    Role_Permissions: {
      createdAt: '2024-03-24T07:34:51.000Z',
      updatedAt: '2024-03-24T07:34:51.000Z',
      RoleId: 2,
      PermissionId: 1,
    },
  },
  {
    id: 2,
    alias: 'departmentRead',
    name: 'Xem phòng ban',
    createdAt: '2024-03-24T07:34:50.000Z',
    updatedAt: '2024-03-24T07:34:50.000Z',
    Role_Permissions: {
      createdAt: '2024-03-24T07:34:51.000Z',
      updatedAt: '2024-03-24T07:34:51.000Z',
      RoleId: 2,
      PermissionId: 2,
    },
  },
  {
    id: 3,
    alias: 'userRead',
    name: 'Xem người dùng',
    createdAt: '2024-03-24T07:34:50.000Z',
    updatedAt: '2024-03-24T07:34:50.000Z',
    Role_Permissions: {
      createdAt: '2024-03-24T07:34:51.000Z',
      updatedAt: '2024-03-24T07:34:51.000Z',
      RoleId: 2,
      PermissionId: 3,
    },
  },
  {
    id: 4,
    alias: 'tenderRead',
    name: 'Xem thầu',
    createdAt: '2024-03-24T07:34:50.000Z',
    updatedAt: '2024-03-24T07:34:50.000Z',
    Role_Permissions: {
      createdAt: '2024-03-24T07:34:51.000Z',
      updatedAt: '2024-03-24T07:34:51.000Z',
      RoleId: 2,
      PermissionId: 4,
    },
  },
  {
    id: 5,
    alias: 'equipmentRead',
    name: 'Xem thiết bị',
    createdAt: '2024-03-24T07:34:50.000Z',
    updatedAt: '2024-03-24T07:34:50.000Z',
    Role_Permissions: {
      createdAt: '2024-03-24T07:34:51.000Z',
      updatedAt: '2024-03-24T07:34:51.000Z',
      RoleId: 2,
      PermissionId: 5,
    },
  },
];

const newArray1 = array1.map((item) => {
  const gettedPermission = array2.find(
    (permission) => permission.alias === item.alias
  );
  if (!!gettedPermission) {
    return { ...item, enabled: true, name: gettedPermission.name };
  }
  return { ...item, enabled: false, name: gettedPermission.name };
});

console.log(newArray1);
