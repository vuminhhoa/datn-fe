import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  Descriptions,
  Flex,
  Row,
  Col,
  Avatar,
  Typography,
  Breadcrumb,
  Button,
  Table,
  Checkbox,
  Select,
  Divider,
  Empty,
  Alert,
} from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { EditOutlined } from '@ant-design/icons';
import { useAuth } from '../../../contexts/authProvider.js';
import useFetchApi from '../../../hooks/useFetchApi.js';

const PermissionSetting = () => {
  const { user } = useAuth();
  const [permissions, setPermissions] = useState([]);
  const { fetchApi, data, setData, loading, handleChangeInput } = useFetchApi({
    url: '/settings?type=getRole',
  });
  const [options, setOptions] = useState([]);

  const [selected, setSelected] = useState();

  const onChange = async (value) => {
    setSelected(value);
    const permissionsData = await fetchApi(
      `/settings?type=getPermissions&alias=${value}`
    );
    console.log(permissionsData);
  };
  const onSearch = (value) => {
    console.log('search:', value);
  };

  useEffect(() => {
    if (data.roles) {
      const newOptions = data.roles.map((role) => ({
        value: role.alias,
        label: role.name,
      }));
      setOptions(newOptions);
    }
  }, [data.roles]);

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  return (
    <Flex vertical gap={16}>
      <Breadcrumb
        items={[
          {
            href: '/',
            title: <HomeOutlined />,
          },
          {
            href: '/settings/permissions-settings',
            title: 'Cài đặt phân quyền',
          },
        ]}
      />
      <Card title="Phân quyền hệ thống" loading={loading}>
        <Flex vertical gap={16}>
          {!selected && (
            <Alert
              closable
              message="Chọn một vai trò để phân quyền!"
              type="info"
              showIcon
            />
          )}
          <Row justify="space-around" align="middle">
            <Col span={6}>
              <Typography>Chọn vai trò:</Typography>
            </Col>
            <Col span={18}>
              {' '}
              <Select
                style={{ width: '100%' }}
                showSearch
                placeholder="Chọn một vai trò"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={filterOption}
                options={options}
              />
            </Col>
          </Row>
        </Flex>

        <Divider />
        <Row justify="space-around" align="middle">
          <Col span={6}>
            <Typography>Phân quyền:</Typography>
          </Col>
          <Col span={18}>
            {!selected && <Empty description=""></Empty>}
            {selected && (
              <Row>
                <Col span={6}>col-6</Col>
                <Col span={6}>col-6</Col>
                <Col span={6}>col-6</Col>
                <Col span={6}>col-6</Col>
              </Row>
            )}
          </Col>
        </Row>
      </Card>
    </Flex>
  );
};

export default PermissionSetting;
