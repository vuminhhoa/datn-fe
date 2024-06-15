import React, { useState } from 'react';
import { Card, Flex, Breadcrumb, Button, List, Avatar, Popover } from 'antd';
import {
  HomeOutlined,
  DeleteOutlined,
  EyeOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';
import useFetchApi from '../../hooks/useFetchApi';
import { Link, useNavigate } from 'react-router-dom';
import { ADMIN } from '../../const/role';
import useDeleteApi from '../../hooks/useDeleteApi';
import { useBreadcrumb } from '../../hooks/useBreadcrumb';
import Page from '../../components/Page';
import hasPermission from '../../helpers/hasPermission';
import { USER_DELETE } from '../../const/permission';
import CreateModal from './CreateModal';

const User = () => {
  const navigate = useNavigate();
  const [isShowCreateForm, setIsShowCreateForm] = useState(false);

  const { deleting, deleteApi } = useDeleteApi({
    url: `/user`,
    successCallback: () => fetchApi(),
  });
  const { data, fetchApi, loading } = useFetchApi({
    url: '/users',
    defaultData: [],
  });

  const breadcrumbItems = useBreadcrumb([
    {
      href: '/',
      title: <HomeOutlined />,
    },
    {
      href: '/users',
      title: 'Quản lý thành viên',
    },
  ]);

  if (loading)
    return (
      <Page>
        <Breadcrumb items={breadcrumbItems} />
        <Card
          title="Danh sách thành viên"
          extra={
            <Button type="primary" icon={<PlusOutlined />} disabled>
              Tạo mới
            </Button>
          }
        >
          <List bordered pagination loading itemLayout="horizontal" />
        </Card>
      </Page>
    );
  return (
    <Page>
      <Breadcrumb items={breadcrumbItems} />
      <Card
        title="Danh sách thành viên"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsShowCreateForm(true)}
            disabled={deleting}
          >
            Tạo mới
          </Button>
        }
      >
        <Flex gap={16} vertical>
          <CreateModal
            isShowCreateForm={isShowCreateForm}
            setIsShowCreateForm={setIsShowCreateForm}
            fetchApi={fetchApi}
          />

          <List
            bordered
            pagination
            loading={loading}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item
                extra={[
                  <Popover content="Xem chi tiết" trigger="hover">
                    <Button
                      type="link"
                      icon={<EyeOutlined />}
                      onClick={() => navigate(`/user/${item.id}`)}
                    />
                  </Popover>,

                  item.Role.name !== ADMIN && hasPermission(USER_DELETE) ? (
                    <Popover content="Xóa thành viên" trigger="hover">
                      <Button
                        type="link"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => deleteApi(item.id)}
                      />
                    </Popover>
                  ) : null,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.image} icon={<UserOutlined />} />}
                  title={
                    <Link to={`/user/${item.id}`}>
                      {item.name ? item.name : item.email}
                    </Link>
                  }
                  description={`${item.Role.name} ${
                    item?.Department?.tenKhoaPhong
                      ? ` - ${item.Department?.tenKhoaPhong}`
                      : ' '
                  }`}
                />
              </List.Item>
            )}
          />
        </Flex>
      </Card>
    </Page>
  );
};

export default User;
