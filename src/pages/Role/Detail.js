import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Descriptions, Flex, Breadcrumb, Button, Skeleton } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { ADMIN, STAFF } from '../../const/role.js';
import { ROLE_DELETE, ROLE_UPDATE } from '../../const/permission.js';
import useFetchApi from '../../hooks/useFetchApi.js';
import hasPermission from '../../helpers/hasPermission.js';
import { useAppContext } from '../../contexts/appContext.js';
import useDeleteApi from '../../hooks/useDeleteApi.js';
import NotFound from '../NotFound/NotFound.js';
import { useBreadcrumb } from '../../hooks/useBreadcrumb.js';
import Page from '../../components/Page/Page.js';
import { useAuthContext } from '../../contexts/authContext.js';

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
  const { fetchRoles } = useAppContext();
  const { user } = useAuthContext();
  const { deleting, deleteApi } = useDeleteApi({
    url: `/role/${id}`,
    successCallback: () => {
      const isUserHasRole = checkUserInArray(data.Users, user.email);
      if (isUserHasRole) {
        window.location.reload();
      }
      fetchRoles();
      navigate('/roles');
    },
  });
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
      title: loading ? `---------------` : data?.name,
    },
  ]);

  if (!data) {
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

  const borderedItems = [
    {
      key: '1',
      label: 'Quyền hạn',
      children: data?.Permissions?.map((permission) => permission?.name).join(
        ', '
      ),
    },
    {
      key: '2',
      labelStyle: { width: '300px' },
      label: `Thành viên có vai trò ${data?.name}`,
      children:
        data.name === ADMIN
          ? 'Tất cả quyền hạn'
          : data?.Users?.map((user, index) => {
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
      children: new Date(data?.createdAt).toLocaleString(),
    },
    {
      key: '4',
      label: `Ngày sửa đổi gần nhất`,
      children: new Date(data?.updatedAt).toLocaleString(),
    },
  ];

  return (
    <Page>
      <Breadcrumb items={breadcrumbItems} />
      <Card
        title={`Thông tin vai trò: ${data?.name}`}
        extra={
          <Flex gap={8}>
            {data?.name !== ADMIN &&
              data?.name !== STAFF &&
              hasPermission(ROLE_DELETE) && (
                <Button danger loading={deleting} onClick={() => deleteApi()}>
                  Xóa
                </Button>
              )}
            {data.name !== ADMIN && hasPermission(ROLE_UPDATE) && (
              <Button
                disabled={deleting}
                type="primary"
                onClick={() => navigate(`/role/edit/${data?.id}`)}
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
