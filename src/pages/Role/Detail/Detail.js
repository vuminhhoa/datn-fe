import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Descriptions, Flex, Breadcrumb, Button, Skeleton } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { ADMIN, USER } from '../../../const/role.js';
import { ROLE_DELETE, ROLE_UPDATE } from '../../../const/permission.js';
import useFetchApi from '../../../hooks/useFetchApi.js';
import hasPermission from '../../../helpers/hasPermission.js';
import { useApp } from '../../../contexts/appProvider.js';
import useDeleteApi from '../../../hooks/useDeleteApi.js';
import NotFound from '../../NotFound/NotFound.js';
import { useBreadcrumb } from '../../../hooks/useBreadcrumb.js';
import Page from '../../../components/Page/Page.js';

function checkUserInArray(arr, email) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].email === email) {
      return true;
    }
  }
  return false;
}
const DetailRole = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setToast, fetchAppUser, user } = useApp();
  const { deleting, deleteApi } = useDeleteApi(`/role/${id}`);
  const { data, loading } = useFetchApi({
    url: `/role/${id}`,
  });
  const breadcrumbItems = useBreadcrumb([
    {
      href: '/',
      title: <HomeOutlined />,
    },
    {
      href: '/roles',
      title: 'Cài đặt phân quyền',
    },
    {
      title: loading ? `---------------` : data.roles?.name,
    },
  ]);
  const borderedItems = [
    {
      key: '1',
      label: 'Quyền hạn',
      children: data.roles?.Permissions.map(
        (permission) => permission?.name
      ).join(', '),
    },
    {
      key: '2',
      labelStyle: { width: '300px' },
      label: `Users có vai trò ${data.roles?.name}`,
      children:
        data.name === ADMIN
          ? 'Tất cả quyền hạn'
          : data.roles?.Users.map((user, index) => {
              return (
                <Button
                  type="link"
                  onClick={() => navigate(`/user/${user.id}`)}
                  size="small"
                  key={index}
                >
                  {user.name || user.email}
                </Button>
              );
            }),
    },
    {
      key: '3',
      label: `Ngày tạo`,
      children: new Date(data.roles?.createdAt).toLocaleString(),
    },
    {
      key: '4',
      label: `Ngày sửa đổi gần nhất`,
      children: new Date(data.roles?.updatedAt).toLocaleString(),
    },
  ];
  const handleDeleteRole = async () => {
    try {
      const res = await deleteApi();
      if (res.data.success) {
        setToast('Xóa thành công');
        const isUserHasRole = checkUserInArray(data.roles.Users, user.email);
        if (isUserHasRole) {
          fetchAppUser();
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      navigate('/roles');
    }
  };
  if (data.message === 'Vai trò không tồn tại') {
    return <NotFound />;
  }
  if (loading) {
    return (
      <Page>
        <Breadcrumb items={breadcrumbItems} />
        <Card
          title={`Thông tin vai trò: -------------`}
          extra={
            <Flex gap={8}>
              {hasPermission(ROLE_DELETE) && (
                <Button danger disabled>
                  Xóa
                </Button>
              )}
              {hasPermission(ROLE_UPDATE) && (
                <Button type="primary" disabled>
                  Chỉnh sửa
                </Button>
              )}
            </Flex>
          }
        >
          <Skeleton />
        </Card>
      </Page>
    );
  }
  return (
    <Page>
      <Breadcrumb items={breadcrumbItems} />
      <Card
        title={`Thông tin vai trò: ${data.roles?.name}`}
        extra={
          <Flex gap={8}>
            {data.roles.name !== ADMIN &&
              data.roles.name !== USER &&
              hasPermission(ROLE_DELETE) && (
                <Button danger disabled={deleting} onClick={handleDeleteRole}>
                  Xóa
                </Button>
              )}
            {data.roles.name !== ADMIN && hasPermission(ROLE_UPDATE) && (
              <Button
                disabled={deleting}
                type="primary"
                onClick={() => navigate(`/role/edit/${data.roles.id}`)}
              >
                Chỉnh sửa
              </Button>
            )}
          </Flex>
        }
      >
        <Flex vertical gap={16}>
          <Descriptions bordered items={borderedItems} column={1} />
        </Flex>
      </Card>
    </Page>
  );
};

export default DetailRole;
