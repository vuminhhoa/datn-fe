// @ts-nocheck
import React, { useEffect, useState } from 'react';
import {
  Card,
  Flex,
  Tag,
  Breadcrumb,
  Descriptions,
  Typography,
  Button,
  Skeleton,
} from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import BiddingContext from '../../../contexts/biddingContext';
import BiddingRequest from '../Form/BiddingRequest';
import LenDuToanThanhLapCacTo from '../Form/LenDuToanThanhLapCacTo';
import KeHoachLuaChonNhaThau from '../Form/KeHoachLuaChonNhaThau';
import Ehsmt from '../Form/Ehsmt';
import useFetchApi from '../../../hooks/useFetchApi';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useApp } from '../../../contexts/appProvider';
import CollapsibleForm from '../Component/CollapsibleForm';
import Ehsdt from '../Form/Ehsdt';
import KyKetThucHienHopDong from '../Form/KyKetThucHienHopDong';
import { useBreadcrumb } from '../../../hooks/useBreadcrumb';

const Edit = () => {
  const { id } = useParams();
  const { setToast } = useApp();
  const { data, setData, loading, fetchApi } = useFetchApi({
    url: `/bidding/${id}`,
  });
  const breadcrumbItems = useBreadcrumb([
    { href: '/', title: <HomeOutlined /> },
    { href: '/shopping/bidding', title: 'Hoạt động mua sắm qua đấu thầu' },
    {
      href: `/shopping/bidding/${data.id}`,
      title: loading ? '----------' : data.tenDeXuat,
    },
  ]);
  const [saving, setSaving] = useState(false);
  const [initData, setInitData] = useState(null);
  const [deletedFields, setDeletedFields] = useState([]);

  useEffect(() => {
    if (loading || initData) return;
    setInitData(data);
  }, [data, loading, initData]);

  const items = [
    {
      key: 'decs1',
      label: 'Tên khoa phòng',
      children: data.khoaPhongDeXuat,
    },
    data.ngayDeXuat !== null && {
      key: 'decs2',
      label: 'Ngày đề xuất',
      children: data.ngayDeXuat,
    },
    {
      key: 'decs3',
      label: 'Trạng thái',
      children: (
        <>
          {data.trangThaiDeXuat === 'approved' && (
            <Tag color="success">Chấp thuận</Tag>
          )}
          {data.trangThaiDeXuat === 'reject' && (
            <Tag color="error">Từ chối</Tag>
          )}
          {data.trangThaiDeXuat === 'processing' && (
            <Tag color="processing">Chờ duyệt</Tag>
          )}
        </>
      ),
    },
    (data.trangThaiDeXuat === 'approved' ||
      data.trangThaiDeXuat === 'reject') && {
      key: 'decs4',
      label: 'Ngày phê duyệt',
      children: data.ngayPheDuyetDeXuat,
    },
    {
      key: 'decs5',
      label: 'Ngày tạo hoạt động',
      children: data.createdAt,
    },
    {
      key: 'decs6',
      label: 'Lần cập nhật cuối',
      children: data.updatedAt,
    },
    {
      key: 'decs7',
      label: 'Nội dung',
      children: data.noiDungDeXuat,
    },
  ];

  const handleSaveBidding = async () => {
    try {
      setSaving(true);
      await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_BASE_API_URL}/bidding/${id}`,
        data: { ...data, deletedFields: deletedFields },
      });
      setToast('Lưu thành công');
    } catch (error) {
      console.log(error);
      setToast('Lưu thất bại', 'error');
    } finally {
      setSaving(false);
      fetchApi();
    }
  };

  if (loading)
    return (
      <Flex vertical gap={16}>
        <Breadcrumb items={breadcrumbItems} />
        <Card
          title={
            <Flex align="center" gap={8}>
              <Typography.Title level={5} style={{ margin: '0' }}>
                Chi tiết hoạt động:
              </Typography.Title>
              <Skeleton.Input />
            </Flex>
          }
          extra={
            <Button type="primary" disabled={loading}>
              Lưu
            </Button>
          }
        >
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </Card>
      </Flex>
    );

  console.log(deletedFields);
  return (
    <BiddingContext.Provider
      value={{ data, setData, saving, initData, setDeletedFields }}
    >
      <Flex vertical gap={16}>
        <Breadcrumb items={breadcrumbItems} />
        <Card
          title={`Chi tiết hoạt động: ${data.tenDeXuat}`}
          extra={
            <Button type="primary" onClick={handleSaveBidding} loading={saving}>
              Lưu
            </Button>
          }
        >
          <Descriptions
            title="1. Khoa phòng đề xuất"
            items={items}
            column={2}
          />
          <Typography.Title level={5}>2. Lập kế hoạch</Typography.Title>

          <Flex vertical gap={8}>
            <CollapsibleForm
              title="2.1. Chào giá"
              children={<BiddingRequest />}
            />
            <CollapsibleForm
              title="2.2. Lên dự toán, thành lập tổ chuyên gia, tổ thẩm định"
              children={<LenDuToanThanhLapCacTo />}
            />
            <CollapsibleForm
              title="2.3. Kế hoạch lựa chọn nhà thầu"
              children={<KeHoachLuaChonNhaThau />}
            />
            <CollapsibleForm
              title="2.4. E - Hồ sơ mời thầu (E-HSMT)"
              children={<Ehsmt />}
            />
            <CollapsibleForm
              title="2.5. E - Hồ sơ dự thầu (E-HSDT)"
              children={<Ehsdt />}
            />
            <CollapsibleForm
              title="2.6. Ký kết thực hiện hợp đồng"
              children={<KyKetThucHienHopDong />}
            />
          </Flex>
        </Card>
      </Flex>
    </BiddingContext.Provider>
  );
};

export default Edit;
