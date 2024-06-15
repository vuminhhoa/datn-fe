import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  Descriptions,
  Flex,
  Breadcrumb,
  Button,
  Skeleton,
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
import { formatVNCurrency } from '../../helpers/formatVNCurrency.js';

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

  const items = [
    {
      label: 'Tên thiết bị',
      children: data?.tenThietBi,
    },
    {
      label: 'Đơn vị tính',
      children: data?.donVi,
    },
    {
      label: 'Ký mã hiệu',
      children: data?.kyMaHieu,
    },
    {
      label: 'Serial',
      children: data?.serial,
    },
    {
      label: 'Khoa phòng',
      children: data?.Department?.tenKhoaPhong,
    },
    {
      label: 'Xuất xứ',
      children: data?.xuatXu,
    },
    {
      label: 'Số lượng',
      children: data?.soLuong,
    },
    {
      label: 'Đơn giá',
      children: formatVNCurrency(data?.donGia),
    },
    {
      label: 'Thành tiền',
      children: formatVNCurrency(data.soLuong * data.donGia) || '',
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
                  src={data.hinhAnh}
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
