// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  Descriptions,
  Flex,
  Avatar,
  Typography,
  Breadcrumb,
  Button,
  Row,
  Col,
  Skeleton,
} from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { EditOutlined, ApartmentOutlined } from '@ant-design/icons';
import useFetchApi from '../../hooks/useFetchApi';
import hasPermission from '../../helpers/hasPermission';
import { DEPARTMENT_UPDATE } from '../../const/permission';
import { useBreadcrumb } from '../../hooks/useBreadcrumb';
import NotFound from '../NotFound';
import Page from '../../components/Page';
import EditModal from './EditModal';

const DetailDepartment = () => {
  const { id } = useParams();
  const { data, loading, fetchApi, setData } = useFetchApi({
    url: `/department/${id}`,
  });
  const [isShowEditForm, setIsShowEditForm] = useState(false);

  const breadcrumbItems = useBreadcrumb([
    {
      href: '/',
      title: <HomeOutlined />,
    },
    {
      href: '/departments',
      title: 'Quản lý khoa phòng',
    },
    {
      href: `/department/${id}`,
      title: loading ? (
        <Skeleton.Input size="small" />
      ) : (
        data.department?.tenKhoaPhong
      ),
    },
  ]);

  const items = [
    {
      key: '1',
      label: 'Tên khoa phòng',
      children: data.department?.tenKhoaPhong,
    },
    {
      key: '2',
      label: 'Số điện thoại',
      children: data.department?.soDienThoai,
    },
    {
      key: '3',
      label: 'Địa chỉ',
      children: data.department?.diaChi,
    },
  ];

  if (loading) {
    return (
      <Page>
        <Breadcrumb items={breadcrumbItems} />
        <Card
          title="Thông tin khoa phòng"
          extra={
            hasPermission(DEPARTMENT_UPDATE) && (
              <Button type="primary" icon={<EditOutlined />} disabled>
                Cập nhật
              </Button>
            )
          }
        >
          <Skeleton
            paragraph={{
              rows: 4,
            }}
          />
        </Card>
      </Page>
    );
  }
  if (!data.department) return <NotFound />;
  return (
    <Page>
      <Breadcrumb items={breadcrumbItems} />
      <EditModal
        open={isShowEditForm}
        input={data}
        setInput={setData}
        fetchApi={() => fetchApi()}
        setOpen={() => setIsShowEditForm()}
      />

      <Card
        title="Thông tin khoa phòng"
        extra={
          hasPermission(DEPARTMENT_UPDATE) && (
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => setIsShowEditForm(true)}
            >
              Cập nhật
            </Button>
          )
        }
      >
        <Flex vertical gap={16}>
          <Row>
            <Col span={16}>
              <Descriptions items={items} column={2} />
            </Col>
            <Col span={8}>
              <Flex justify="center" vertical align="center" gap={8}>
                <Avatar
                  src={data.department.hinhAnh}
                  icon={<ApartmentOutlined />}
                  shape="square"
                  size={164}
                />
                <Typography.Text>Hình ảnh</Typography.Text>
              </Flex>
            </Col>
          </Row>
        </Flex>
      </Card>
    </Page>
  );
};

export default DetailDepartment;
