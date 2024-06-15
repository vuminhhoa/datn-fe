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
} from '../../const/permission.js';
import useFetchApi from '../../hooks/useFetchApi.js';
import useEditApi from '../../hooks/useEditApi.js';
import { useAppContext } from '../../contexts/appContext.js';
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

const EditRole = () => {
  const { id } = useParams();
  const { setToast } = useAppContext();
  const { user } = useAuthContext();
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
      title: loading ? `---------------` : data?.name,
    },
  ]);
  const [selected, setSelected] = useState([]);
  const { editing, editApi } = useEditApi({ url: `/role/${id}` });
  const handleSave = async () => {
    try {
      const perpareData = { roleId: data.id, permissions: selected };
      const res = await editApi(perpareData);
      if (res.data.success) {
        setToast('Cập nhật thành công');
        const isUserHasRole = checkUserInArray(data.Users, user.email);
        if (isUserHasRole) {
          window.location.reload();
        }
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
    if (!fetched || !data) return;
    setSelected(data.Permissions.map((permission) => permission.name));
  }, [fetched]);

  if (data.message === 'Vai trò không tồn tại') {
    return <NotFound />;
  }

  if (loading || !fetched) {
    return (
      <Page>
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
      </Page>
    );
  }
  return (
    <Page>
      <Breadcrumb items={breadcrumbItems} />
      <Card
        title={`Cập nhật vai trò: ${data?.name}`}
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
    </Page>
  );
};

export default EditRole;
