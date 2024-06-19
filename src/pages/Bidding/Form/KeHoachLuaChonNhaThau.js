import React, { useContext } from 'react';
import { Timeline } from 'antd';
import BiddingContext from '../../../contexts/biddingContext';
import getStatus from '../../../helpers/getBiddingItemStatus';
import BiddingItem from '../Component/BiddingItem';

const KeHoachLuaChonNhaThau = () => {
  const { data } = useContext(BiddingContext);
  const input = data.keHoachLuaChonNhaThau;
  const items = [
    {
      title: 'Tờ trình tổ chuyên gia đấu thầu về lập KHLCNT',
      dateField: 'ngayLap',
      documentField: 'taiLieuLap',
    },
    {
      title: 'Báo cáo thẩm định KHLCNT',
      dateField: 'ngayBaoCaoThamDinh',
      documentField: 'taiLieuBaoCaoThamDinh',
    },
    {
      title: 'Tờ trình tổ thẩm định về phê duyệt KHLCNT',
      dateField: 'ngayPheDuyet',
      documentField: 'taiLieuPheDuyet',
    },
    {
      title: 'Quyết định phê duyệt KHLCNT',
      dateField: 'ngayQuyetDinhPheDuyet',
      documentField: 'taiLieuQuyetDinhPheDuyet',
    },
    {
      title: 'Đăng tải kế hoạch lên mạng đấu thầu',
      dateField: 'ngayDangLenMangDauThau',
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
              obj={'keHoachLuaChonNhaThau'}
              input={input}
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
