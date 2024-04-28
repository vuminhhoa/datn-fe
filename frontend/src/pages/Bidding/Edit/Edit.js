// @ts-nocheck
import React, { useState } from 'react';
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
import { useAuth } from '../../../contexts/authProvider';
import CollapsibleForm from '../Component/CollapsibleForm';
import Ehsdt from '../Form/Ehsdt';
import KyKetThucHienHopDong from '../Form/KyKetThucHienHopDong';

const defaultData = {
  id: 12,
  tenDeXuat: 'Mua may sieu vi tinh',
  khoaPhongDeXuat: 'Marketing Department',
  ngayDeXuat: '2024-04-05',
  noiDungDeXuat: '01 máy siêu âm 100 máy đẹp trai',
  trangThaiDeXuat: 'approved',
  ngayPheDuyetDeXuat: '2024-04-07',

  ngayDangYeuCauChaoGia: null,
  ngayHetHanYeuCauChaoGia: null,

  ngayHopHoiDongMuaSam: '2024-04-15',
  ngayPheDuyetDuToan: '2024-04-15',
  taiLieuPheDuyetDuToan: 'ProcurementCouncilMinutes.pdf',
  taiLieuHopHoiDongMuaSam: 'ProcurementCouncilMinutes.pdf',
  ngayThanhLapToChuyenGia: '2024-04-18',
  taiLieuThanhLapToChuyenGia: 'ExpertTeamEstablishment.pdf',
  ngayThanhLapToThamDinh: '2024-04-19',
  taiLieuThanhLapToThamDinh: 'AppraisalTeamEstablishment.pdf',

  ngayLapKhlcnt: null,
  taiLieuLapKhlcnt: 'khlcntDocument.pdf',
  ngayBaoCaoThamDinhKhclnt: '2024-04-19',
  taiLieuBaoCaoThamDinhKhclnt: 'taiLieuBaoCaoThamDinhKhclnt.pdf',
  ngayPheDuyetKhclnt: '2024-04-19',
  taiLieuPheDuyetKhclnt: 'taiLieuPheDuyetKhclnt.pdf',
  ngayQuyetDinhPheDuyetKhlcnt: '2024-04-19',
  taiLieuQuyetDinhPheDuyetKhlcnt: 'khlcntApprovalDecision.pdf',
  ngayDangTaiKeHoachLenMangDauThau: '2024-04-25',

  taiLieuDuThaoEhsmt: 'taiLieuDuThaoEhsmt.pdf',
  ngayDuThaoEhsmt: '2024-04-19',
  taiLieuBcXayDungEhsmt: 'ehsmtConstructionReport.pdf',
  ngayTaiLieuBcXayDungEhsmt: '2024-04-19',
  taiLieuPheDuyetEhsmtToChuyenGia: 'ehsmtExpertTeamApproval.pdf',
  ngayPheDuyetEhsmtToChuyenGia: '2024-04-19',
  taiLieuBcThamDinhEhsmt: 'ehsmtAppraisalReport.pdf',
  ngayBcThamDinhEhsmt: '2024-04-19',
  taiLieuPheDuyetEhsmtToThamDinh: 'ehsmtAppraisalApproval.pdf',
  ngayPheDuyetEhsmtToThamDinh: '2024-04-19',
  taiLieuQuyetDinhPheDuyetEhsmt: 'ehsmtApprovalDecision.pdf',
  ngayPheDuyetEhsmt: '2024-04-19',
  ngayDangThongBaoMoiThauLenMangDauThau: '2024-04-28',

  taiLieuBcDanhGiaCuaToChuyenGia: 'ehsmtApprovalDecision.pdf',
  ngayBcDanhGiaCuaToChuyenGia: '2024-04-28',
  taiLieuBienBanThuongThaoVoiCacNhaThau: 'ehsmtApprovalDecision.pdf',
  ngayThuongThaoVoiCacNhaThau: '2024-04-28',
  taiLieuBcThamDinhKetQuaLcnt: 'ehsmtApprovalDecision.pdf',
  ngayThamDinhKetQuaLcnt: '2024-04-28',
  taiLieuToTrinhXinPheDuyetKetQuaLcnt: 'ehsmtApprovalDecision.pdf',
  ngayXinPheDuyetKetQuaLcnt: '2024-04-28',
  taiLieuQuyetDinhPheDuyetKetQuaLcnt: 'ehsmtApprovalDecision.pdf',
  ngayPheDuyetKetQuaLcnt: '2024-04-28',

  taiLieuThongBaoKqLcntDenCacNhaThau: 'ehsmtApprovalDecision.pdf',
  ngayThongBaoKqLcntDenCacNhaThau: '2024-04-28',
  taiLieuDangKqLcntLenMangDauThau: 'ehsmtApprovalDecision.pdf',
  ngayDangKqLcntLenMangDauThau: '2024-04-28',
  taiLieuBaoLanhThucHienHopDong: 'ehsmtApprovalDecision.pdf',
  ngayNhaThauNopBaoLanhThucHienHopDong: '2024-04-28',
  taiLieuKyKetHopDongMuaBan: 'ehsmtApprovalDecision.pdf',
  ngayKyKetHopDongMuaBan: '2024-04-28',
  taiLieuBanGiaoDuaVaoSuDung: 'ehsmtApprovalDecision.pdf',
  ngayBanGiaoDuaVaoSuDung: '2024-04-28',
  taiLieuBaoLanhBaoHanh: 'ehsmtApprovalDecision.pdf',
  ngayNopBaoLanhBaoHanh: '2024-04-28',
};

const Edit = () => {
  const { id } = useParams();
  const { setToast } = useAuth();
  const { data, setData, loading } = useFetchApi({
    url: `/bidding/${id}`,
    defaultData: defaultData,
  });
  const [saving, setSaving] = useState(false);

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
        url: `http://localhost:5000/api/bidding/${id}`,
        data: {
          ...data,
          createdAt: new Date(data.createdAt),
          updatedAt: new Date(data.updatedAt),
        },
      });
      setToast('Lưu thành công');
    } catch (error) {
      console.log(error);
      setToast('Lưu thất bại', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <Flex vertical gap={16}>
        <Breadcrumb
          items={[
            {
              href: '/',
              title: <HomeOutlined />,
            },
            {
              href: '/shopping/bidding',
              title: 'Hoạt động mua sắm qua đấu thầu',
            },
            {
              href: `/shopping/bidding/${data.id}`,
              title: '-----------------',
            },
          ]}
        />
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

  console.log(data);
  return (
    <BiddingContext.Provider value={{ data, setData }}>
      <Flex vertical gap={16}>
        <Breadcrumb
          items={[
            {
              href: '/',
              title: <HomeOutlined />,
            },
            {
              href: '/shopping/bidding',
              title: 'Hoạt động mua sắm qua đấu thầu',
            },
            {
              href: `/shopping/bidding/${data.id}`,
              title: data.tenDeXuat,
            },
          ]}
        />
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
