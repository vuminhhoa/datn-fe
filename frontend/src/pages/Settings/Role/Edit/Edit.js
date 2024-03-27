import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Flex, Breadcrumb, Button, Spin, Alert, Checkbox } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { defaultPermissions } from '../../../../const/permissionConsts.js';
import useFetchApi from '../../../../hooks/useFetchApi.js';
import useEditApi from '../../../../hooks/useEditApi.js';

const EditRole = () => {
  const { id } = useParams();
  const { data, loading, fetched } = useFetchApi({
    url: `/settings/role/${id}`,
  });
  const [selected, setSelected] = useState([]);
  const { editing, editApi } = useEditApi('/role/edit');

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const perpareData = { roleId: data.roles.id, permissions: selected };
      console.log(perpareData);
      const res = await editApi(perpareData);
      console.log(res);
      // if (res.data.success) {
      //   setUser({ ...user, ...val });
      //   setToast('Cập nhật thành công');
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (val) => {
    console.log(val);
    setSelected(val);
  };

  const plainOptions = defaultPermissions.map((permission) => permission.name);

  useEffect(() => {
    if (!fetched) return;
    setSelected(data.roles.Permissions.map((permission) => permission.name));
  }, [fetched]);

  if (loading || !fetched) {
    return <Spin />;
  }
  return (
    <Flex vertical gap={16}>
      <Breadcrumb
        items={[
          {
            href: '/',
            title: <HomeOutlined />,
          },
          {
            href: '/settings/roles-settings',
            title: 'Cài đặt phân quyền',
          },
          {
            title: `Role: ${data.roles?.name}`,
          },
        ]}
      />
      <Card
        title={`Cập nhật vai trò: ${data.roles?.name}`}
        extra={
          <Button
            type="primary"
            href={`/settings/roles/edit/${data.roles.id}`}
            onClick={handleSave}
          >
            Lưu
          </Button>
        }
      >
        <Flex vertical gap={16}>
          {data.roles.alias === 'admin' && (
            <Alert
              message="Quản trị viên cần có tất cả các quyền!"
              type="info"
            />
          )}
          Chọn quyền hạn:
          <Checkbox.Group
            options={plainOptions}
            value={selected}
            onChange={onChange}
            disabled={data.roles.alias === 'admin' || editing}
          />
        </Flex>
      </Card>
    </Flex>
  );
};

export default EditRole;
