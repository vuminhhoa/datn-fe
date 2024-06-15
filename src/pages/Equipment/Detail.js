import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  Descriptions,
  Flex,
  Breadcrumb,
  Button,
  Skeleton,
  Tag,
  Col,
  Row,
  Avatar,
  Typography,
} from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useBreadcrumb } from '../../hooks/useBreadcrumb.js';
import useFetchApi from '../../hooks/useFetchApi.js';
import hasPermission from '../../helpers/hasPermission.js';
import { EQUIPMENT_UPDATE } from '../../const/permission.js';
import { PictureOutlined } from '@ant-design/icons';
import UpdateEquipmentForm from './Form/Update.js';
import NotFound from '../NotFound/NotFound.js';
import Page from '../../components/Page/Page.js';

const Detail = () => {
  const { id } = useParams();
  const [openEditForm, setOpenEditForm] = useState(false);
  const { data, loading, setData, fetchApi } = useFetchApi({
    url: `/equipment/${id}`,
  });
  const breadcrumbItems = useBreadcrumb([
    {
      href: '/',
      title: <HomeOutlined />,
    },
    {
      href: '/equipments',
      title: 'Quản lý thiết bị',
    },
    {
      title: loading ? <Skeleton.Input size="small" /> : data?.tenThietBi,
    },
  ]);

  const getTagColor = (status) => {
    let color = '';
    switch (status) {
      case 'Mới nhập':
        color = 'processing';
        break;
      case 'Đang sử dụng':
        color = 'success';
        break;
      case 'Đang sửa chữa':
        color = 'warning';
        break;
      case 'Đã hỏng':
        color = 'error';
        break;
      default:
        color = 'default';
    }
    return {
      color: color,
      title: status,
    };
  };
  const equipmentTag = getTagColor(data?.trangThai);
  const items = [
    {
      label: 'Mã thiết bị',
      children: data?.maThietBi,
    },
    {
      label: 'Model',
      children: data?.model,
    },
    {
      label: 'Serial',
      children: data?.serial,
    },
    {
      label: 'Khoa phòng',
      children: data?.khoaPhong,
    },
    {
      label: 'Năm sản xuất',
      children: data?.namSanXuat,
    },
    {
      label: 'Trạng thái',
      children: <Tag color={equipmentTag.color}>{equipmentTag.title}</Tag>,
    },
    {
      label: `Ngày tạo`,
      children: new Date(data?.createdAt).toLocaleString(),
    },
    {
      label: `Ngày sửa đổi gần nhất`,
      children: new Date(data?.updatedAt).toLocaleString(),
    },
  ];

  if (loading) {
    return (
      <Page>
        <Breadcrumb items={breadcrumbItems} />
        <Card
          title={`Thông tin thiết bị: -------------`}
          extra={
            hasPermission(EQUIPMENT_UPDATE) && (
              <Button type="primary" disabled>
                Cập nhật
              </Button>
            )
          }
        >
          <Skeleton />
        </Card>
      </Page>
    );
  }
  if (!data) return <NotFound />;
  return (
    <Page>
      <Breadcrumb items={breadcrumbItems} />
      <Card
        title={`Thông tin thiết bị: ${data.tenThietBi}`}
        extra={
          hasPermission(EQUIPMENT_UPDATE) && (
            <Button
              type="primary"
              onClick={() => setOpenEditForm(true)}
              disabled={openEditForm}
            >
              Cập nhật
            </Button>
          )
        }
      >
        <UpdateEquipmentForm
          open={openEditForm}
          setOpen={setOpenEditForm}
          equipment={data}
          setEquipment={setData}
          fetchApi={fetchApi}
        />
        <Flex vertical gap={16}>
          <Row>
            <Col span={16}>
              <Descriptions items={items} column={2} />
            </Col>
            <Col span={8}>
              <Flex justify="center" vertical align="center" gap={8}>
                <Avatar
                  src={data.image}
                  icon={<PictureOutlined />}
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

export default Detail;
