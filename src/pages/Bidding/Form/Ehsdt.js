import React, { useContext } from 'react';
import { Timeline } from 'antd';
import BiddingContext from '../../../contexts/biddingContext';
import BiddingItem from '../Component/BiddingItem';
import getStatus from '../../../helpers/getBiddingItemStatus';

const Ehsdt = () => {
  const { data } = useContext(BiddingContext);

  const items = [
    {
      title: 'Báo cáo đánh giá của tổ Chuyên gia Đấu thầu',
      dateField: 'ngayBcDanhGiaCuaToChuyenGia',
      documentField: 'taiLieuBcDanhGiaCuaToChuyenGia',
    },
    {
      title: 'Biên bản thương thảo với các nhà thầu',
      dateField: 'ngayThuongThaoVoiCacNhaThau',
      documentField: 'taiLieuBienBanThuongThaoVoiCacNhaThau',
    },
    {
      title: 'Báo cáo thẩm định kết quả LCNT',
      dateField: 'taiLieuBcThamDinhKetQuaLcnt',
      documentField: 'taiLieuBcDanhGiaCuaToChuyenGia',
    },
    {
      title: 'Tờ trình xin phê duyệt kết quả LCNT',
      dateField: 'ngayXinPheDuyetKetQuaLcnt',
      documentField: 'taiLieuToTrinhXinPheDuyetKetQuaLcnt',
    },
    {
      title: 'Quyết định phê duyệt kết quả LCNT',
      dateField: 'ngayPheDuyetKetQuaLcnt',
      documentField: 'taiLieuQuyetDinhPheDuyetKetQuaLcnt',
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

export default Ehsdt;
