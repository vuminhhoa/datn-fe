import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  Flex,
  Breadcrumb,
  Button,
  Checkbox,
  Skeleton,
  Typography,
} from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import {
  DASHBOARD_READ,
  ALL_PERMISSION,
  PERMISSION_GROUP,
} from '../../../const/permission.js';
import useFetchApi from '../../../hooks/useFetchApi.js';
import useEditApi from '../../../hooks/useEditApi.js';
import { useApp } from '../../../contexts/appProvider.js';
import NotFound from '../../NotFound/NotFound.js';
import { useBreadcrumb } from '../../../hooks/useBreadcrumb.js';
const EditRole = () => {
  const { id } = useParams();
  const { setToast } = useApp();
  const { data, loading, fetched, fetchApi } = useFetchApi({
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
  const [selected, setSelected] = useState([]);
  const { editing, editApi } = useEditApi(`/role/${id}`);

  const handleSave = async () => {
    try {
      const perpareData = { roleId: data.roles.id, permissions: selected };
      const res = await editApi(perpareData);
      console.log(res);
      if (res.data.success) {
        setToast('Cập nhật thành công');
      }
    } catch (error) {
      console.log(error);
    } finally {
      fetchApi();
    }
  };

  const onChange = (e, item) => {
    const checked = e.target.checked;
    if (checked) {
      setSelected((prev) => [...prev, item]);
    }
    if (!checked) {
      setSelected((prev) => prev.filter((i) => i !== item));
    }
  };

  useEffect(() => {
    if (!fetched || !data.roles) return;
    setSelected(data.roles.Permissions.map((permission) => permission.name));
  }, [fetched]);

  if (data.message === 'Vai trò không tồn tại') {
    return <NotFound />;
  }

  if (loading || !fetched) {
    return (
      <Flex vertical gap={16}>
        <Breadcrumb items={breadcrumbItems} />
        <Card
          title={`Cập nhật vai trò: -------------`}
          extra={
            <Button type="primary" disabled>
              Lưu
            </Button>
          }
        >
          <Skeleton />
        </Card>
      </Flex>
    );
  }
  return (
    <Flex vertical gap={16}>
      <Breadcrumb items={breadcrumbItems} />
      <Card
        title={`Cập nhật vai trò: ${data.roles?.name}`}
        extra={
          <Button type="primary" onClick={handleSave} disabled={editing}>
            Lưu
          </Button>
        }
      >
        <Flex vertical gap={16}>
          Chọn quyền hạn:
          <Flex vertical gap={32}>
            <Flex justify="center" gap={48} style={{ paddingRight: '24px' }}>
              <Typography.Text>{DASHBOARD_READ}</Typography.Text>
              <Checkbox
                checked={selected.includes(DASHBOARD_READ)}
                disabled={editing}
                onChange={(e) => onChange(e, DASHBOARD_READ)}
              >
                {DASHBOARD_READ}
              </Checkbox>
            </Flex>
            {PERMISSION_GROUP.map((group) => (
              <Flex justify="center" gap={48}>
                <Typography.Text>Quản lý {group}</Typography.Text>
                <Flex vertical gap={16}>
                  {ALL_PERMISSION.filter((item) => item.includes(group)).map(
                    (item) => (
                      <Checkbox
                        checked={selected.includes(item)}
                        disabled={editing}
                        onChange={(e) => onChange(e, item)}
                      >
                        {item}
                      </Checkbox>
                    )
                  )}
                </Flex>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
};

export default EditRole;
