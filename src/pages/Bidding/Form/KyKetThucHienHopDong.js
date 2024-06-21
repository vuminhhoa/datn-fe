import React, { useContext } from 'react';
import { Timeline } from 'antd';
import BiddingContext from '../../../contexts/biddingContext';
import BiddingItem from '../Component/BiddingItem';
import getStatus from '../../../helpers/getBiddingItemStatus';

const KyKetThucHienHopDong = () => {
  const { data } = useContext(BiddingContext);
  const input = data.kyKetThucHienHopDong;
  const items = [
    {
      title: 'Thông báo kết quả LCNT đến các nhà thầu',
      dateField: 'ngayThongBaoKqLcntDenCacNhaThau',
      documentField: 'taiLieuThongBaoKqLcntDenCacNhaThau',
    },
    {
      title: 'Đăng kết quả LCNT lên mạng đấu thầu',
      dateField: 'ngayDangKqLcntLenMangDauThau',
      documentField: 'taiLieuDangKqLcntLenMangDauThau',
    },
    {
      title: 'Nhà thầu nộp bảo lãnh thực hiện hợp đồng',
      dateField: 'ngayNhaThauNopBaoLanhThucHienHopDong',
      documentField: 'taiLieuBaoLanhThucHienHopDong',
    },
    {
      title: 'Ký kết hợp đồng mua bán',
      dateField: 'ngayKyKetHopDongMuaBan',
      documentField: 'taiLieuKyKetHopDongMuaBan',
    },
    {
      title: 'Bàn giao và đưa vào sử dụng',
      dateField: 'ngayBanGiaoDuaVaoSuDung',
      documentField: 'taiLieuBanGiaoDuaVaoSuDung',
    },
    {
      title: 'Nộp bảo lãnh bảo hành',
      dateField: 'ngayNopBaoLanhBaoHanh',
      documentField: 'taiLieuBaoLanhBaoHanh',
    },
  ];

  const itemsWithStatus = items.map((val) => {
    return {
      ...val,
      status: getStatus(input, val.dateField, val.documentField),
    };
  });

  return (
    <Timeline
      mode="left"
      style={{ marginLeft: '-500px' }}
      items={itemsWithStatus.map((val) => {
        return {
          color: val.status.dotColor,
          label: input[val.dateField] || ' ',
          children: (
            <BiddingItem
              obj={'kyKetThucHienHopDong'}
              input={input}
              title={val.title}
              dateField={val.dateField}
              tagStatus={val.status}
              documentField={val.documentField}
            />
          ),
        };
      })}
    />
  );
};

export default KyKetThucHienHopDong;
