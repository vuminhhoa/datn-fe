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
import { useAppContext } from '../../../contexts/appContext';
import CollapsibleForm from '../Component/CollapsibleForm';
import Ehsdt from '../Form/Ehsdt';
import KyKetThucHienHopDong from '../Form/KyKetThucHienHopDong';
import { useBreadcrumb } from '../../../hooks/useBreadcrumb';
import useEditApi from '../../../hooks/useEditApi';
import NotFound from '../../NotFound/NotFound';
import Page from '../../../components/Page';

const Edit = () => {
  const { id } = useParams();
  const { setToast } = useAppContext();
  const { editing, editApi } = useEditApi({ url: `/bidding/${id}` });
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
  const [initData, setInitData] = useState(null);
  const [deletedFields, setDeletedFields] = useState([]);

  useEffect(() => {
    if (loading || initData) return;
    setInitData(data);
  }, [data, loading, initData]);

  const items = [
    {
      label: 'Tên khoa phòng',
      children: data.khoaPhongDeXuat,
    },
    data.ngayDeXuat !== null && {
      label: 'Ngày đề xuất',
      children: data.ngayDeXuat,
    },
    {
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
      label: 'Ngày phê duyệt',
      children: data.ngayPheDuyetDeXuat,
    },
    {
      label: 'Ngày tạo hoạt động',
      children: data.createdAt,
    },
    {
      label: 'Lần cập nhật cuối',
      children: data.updatedAt,
    },
    {
      label: 'Nội dung',
      children: data.noiDungDeXuat,
    },
  ];

  const handleSaveBidding = async () => {
    try {
      const res = await editApi({ ...data, deletedFields: deletedFields });
      if (res.data.success) {
        setToast('Lưu thành công');
      }
    } catch (error) {
      console.log(error);
      setToast('Lưu thất bại', 'error');
    } finally {
      fetchApi();
    }
  };

  if (loading)
    return (
      <Page>
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
      </Page>
    );

  if (!data.id) return <NotFound />;

  return (
    <BiddingContext.Provider
      value={{ data, setData, editing, initData, setDeletedFields }}
    >
      <Page>
        <Breadcrumb items={breadcrumbItems} />
        <Card
          title={`Chi tiết hoạt động: ${data.tenDeXuat}`}
          extra={
            <Button
              type="primary"
              onClick={handleSaveBidding}
              loading={editing}
            >
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
      </Page>
    </BiddingContext.Provider>
  );
};

export default Edit;
