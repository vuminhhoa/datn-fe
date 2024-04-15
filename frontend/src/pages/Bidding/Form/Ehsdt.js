import React, { useContext } from 'react';
import { Timeline } from 'antd';
import BiddingContext from '../../../contexts/biddingContext';
import BiddingItem from '../Component/BiddingItem';

const Ehsdt = () => {
  const { data } = useContext(BiddingContext);

  const items = [
    {
      title: 'Báo cáo đánh giá của tổ Chuyên gia Đấu thầu',
      field: 'ngayBcDanhGiaCuaToChuyenGia',
    },
    {
      title: 'Biên bản thương thảo với các nhà thầu',
      field: 'ngayThuongThaoVoiCacNhaThau',
    },
    {
      title: 'Báo cáo thẩm định kết quả LCNT',
      field: 'ngayThamDinhKetQuaLcnt',
    },
    {
      title: 'Tờ trình xin phê duyệt kết quả LCNT',
      field: 'ngayXinPheDuyetKetQuaLcnt',
    },
    {
      title: 'Quyết định phê duyệt kết quả LCNT',
      field: 'ngayPheDuyetKetQuaLcnt',
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

export default Ehsdt;
