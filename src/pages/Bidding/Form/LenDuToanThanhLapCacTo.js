import React, { useContext } from 'react';
import { Timeline } from 'antd';
import BiddingContext from '../../../contexts/biddingContext';
import BiddingItem from '../Component/BiddingItem';
import getStatus from '../../../helpers/getBiddingItemStatus';

const LenDuToanThanhLapCacTo = () => {
  const { data } = useContext(BiddingContext);

  const items = [
    {
      title: 'Họp hội đồng mua sắm',
      dateField: 'ngayHopHoiDongMuaSam',
      documentField: 'taiLieuHopHoiDongMuaSam',
    },
    {
      title: 'Quyết định phê duyệt dự toán',
      dateField: 'ngayPheDuyetDuToan',
      documentField: 'taiLieuPheDuyetDuToan',
    },
    {
      title: 'Thành lập tổ chuyên gia',
      dateField: 'ngayThanhLapToChuyenGia',
      documentField: 'taiLieuThanhLapToChuyenGia',
    },
    {
      title: 'Thành lập tổ thẩm định',
      dateField: 'ngayThanhLapToThamDinh',
      documentField: 'taiLieuThanhLapToThamDinh',
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

export default LenDuToanThanhLapCacTo;
