import React, { useContext } from 'react';
import { Timeline } from 'antd';
import BiddingContext from '../../../contexts/biddingContext';
import BiddingItem from '../Component/BiddingItem';

const KyKetThucHienHopDong = () => {
  const { data } = useContext(BiddingContext);

  const items = [
    {
      title: 'Thông báo kết quả LCNT đến các nhà thầu',
      field: 'ngayThongBaoKqLcntDenCacNhaThau',
    },
    {
      title: 'Đăng kết quả LCNT lên mạng đấu thầu',
      field: 'ngayDangKqLcntLenMangDauThau',
    },
    {
      title: 'Nhà thầu nộp bảo lãnh thực hiện hợp đồng',
      field: 'ngayNhaThauNopBaoLanhThucHienHopDong',
    },
    {
      title: 'Ký kết hợp đồng mua bán',
      field: 'ngayKyKetHopDongMuaBan',
    },
    {
      title: 'Bàn giao và đưa vào sử dụng',
      field: 'ngayBanGiaoDuaVaoSuDung',
    },
    {
      title: 'Nộp bảo lãnh bảo hành',
      field: 'ngayNopBaoLanhBaoHanh',
    },
  ];

  return (
    <Timeline
      mode="left"
      style={{ marginLeft: '-300px' }}
      items={items.map((val) => {
        return {
          color: data[val.field]
            ? 'green'
            : data[val.field] === null
              ? 'gray'
              : 'orange',
          label: data[val.field] || ' ',
          children: <BiddingItem title={val.title} field={val.field} />,
        };
      })}
    />
  );
};

export default KyKetThucHienHopDong;
