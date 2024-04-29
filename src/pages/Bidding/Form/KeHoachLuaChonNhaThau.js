import React, { useContext } from 'react';
import { Timeline } from 'antd';
import BiddingContext from '../../../contexts/biddingContext';
import getStatus from '../../../helpers/getBiddingItemStatus';
import BiddingItem from '../Component/BiddingItem';

const KeHoachLuaChonNhaThau = () => {
  const { data } = useContext(BiddingContext);
  const items = [
    {
      title: 'Tờ trình tổ chuyên gia đấu thầu về lập KHLCNT',
      dateField: 'ngayLapKhlcnt',
      documentField: 'taiLieuLapKhlcnt',
    },
    {
      title: 'Báo cáo thẩm định KHLCNT',
      dateField: 'ngayBaoCaoThamDinhKhclnt',
      documentField: 'taiLieuBaoCaoThamDinhKhclnt',
    },
    {
      title: 'Tờ trình tổ thẩm định về phê duyệt KHLCNT',
      dateField: 'ngayPheDuyetKhclnt',
      documentField: 'taiLieuPheDuyetKhclnt',
    },
    {
      title: 'Quyết định phê duyệt KHLCNT',
      dateField: 'ngayQuyetDinhPheDuyetKhlcnt',
      documentField: 'taiLieuQuyetDinhPheDuyetKhlcnt',
    },
    {
      title: 'Đăng tải kế hoạch lên mạng đấu thầu',
      dateField: 'ngayDangTaiKeHoachLenMangDauThau',
    },
  ];

  const itemsWithStatus = items.map((val) => {
    return {
      ...val,
      status: getStatus(data, val.dateField, val.documentField),
    };
  });
  return (
    <Timeline
      mode="left"
      style={{ marginLeft: '-500px' }}
      items={itemsWithStatus.map((val) => {
        return {
          color: val.status.dotColor,
          label: data[val.dateField] || ' ',
          children: (
            <BiddingItem
              title={val.title}
              tagStatus={val.status}
              dateField={val.dateField}
              documentField={val.documentField}
            />
          ),
        };
      })}
    />
  );
};

export default KeHoachLuaChonNhaThau;
