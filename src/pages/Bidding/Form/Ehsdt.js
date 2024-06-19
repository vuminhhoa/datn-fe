import React, { useContext } from 'react';
import { Timeline } from 'antd';
import BiddingContext from '../../../contexts/biddingContext';
import BiddingItem from '../Component/BiddingItem';
import getStatus from '../../../helpers/getBiddingItemStatus';

const Ehsdt = () => {
  const { data } = useContext(BiddingContext);
  const input = data.eHsdt;
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
      dateField: 'taiLieuBcThamDinhKetQua',
      documentField: 'taiLieuBcDanhGiaCuaToChuyenGia',
    },
    {
      title: 'Tờ trình xin phê duyệt kết quả LCNT',
      dateField: 'ngayXinPheDuyetKetQua',
      documentField: 'taiLieuToTrinhXinPheDuyetKetQua',
    },
    {
      title: 'Quyết định phê duyệt kết quả LCNT',
      dateField: 'ngayPheDuyetKetQua',
      documentField: 'taiLieuQuyetDinhPheDuyetKetQua',
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
              obj={'eHsdt'}
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

export default Ehsdt;
