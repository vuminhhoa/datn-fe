import React, { useState, useEffect } from 'react';
import {
  Flex,
  Space,
  Select,
  Input,
  Button,
  Radio,
  Popover,
  Divider,
  Checkbox,
} from 'antd';
import {
  FilterOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  SelectOutlined,
} from '@ant-design/icons';
import {} from '@ant-design/icons';
import { useAppContext } from '../../contexts/appContext';
import {
  defaultDonViTinh,
  defaultPhanLoaiNhap,
  defaultXuatXu,
} from '../../const/default';

const Filter = ({
  allColumns,
  data,
  fetchApi,
  loading,
  selectedColumns,
  setSelectedColumns,
  query,
  setQuery,
}) => {
  const { departments, biddings, loadingBiddings } = useAppContext();
  const [showFilter, setShowFilter] = useState('');

  const {
    page,
    limit,
    search,
    sortKey,
    direction,
    donVi,
    xuatXu,
    phanLoaiNhap,
    departmentIds,
    biddingIds,
  } = query;

  const [inputTimeout, setInputTimeout] = useState();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    if (!isFirstLoad || loading) return;
    setIsFirstLoad(false);
  }, [data, isFirstLoad, loading]);

  useEffect(() => {
    if (loading) return;
    clearTimeout(inputTimeout);
    const newTimeout = setTimeout(() => {
      fetchApi();
    }, 700);
    setInputTimeout(newTimeout);
    return () => clearTimeout(newTimeout);
  }, [donVi, xuatXu, phanLoaiNhap, search, departmentIds, biddingIds]);

  useEffect(() => {
    if (loading) return;
    fetchApi();
  }, [page, limit, sortKey, direction]);

  const handleColumnChange = (checkedValues) => {
    setSelectedColumns(checkedValues);
  };

  return (
    <>
      <Flex gap={16} align="center">
        <Input
          placeholder="Nhập từ khóa để tìm kiếm"
          value={search}
          onChange={(e) => setQuery({ ...query, search: e.target.value })}
          allowClear
        />
        {!showFilter ? (
          <Button
            icon={<FilterOutlined />}
            onClick={() => setShowFilter(!showFilter)}
          >
            Lọc
          </Button>
        ) : (
          <Button onClick={() => setShowFilter(!showFilter)} type="text">
            Hủy
          </Button>
        )}
        <Popover
          content={
            <>
              <Radio.Group
                onChange={(e) => {
                  const val = e.target.value;
                  setQuery({ ...query, sortKey: val });
                }}
                value={sortKey}
              >
                <Space direction="vertical">
                  <Radio value={'updatedAt'}>Ngày cập nhật</Radio>
                  <Radio value={'createdAt'}>Ngày tạo</Radio>
                  <Radio value={'tenThietBi'}>Tên thiết bị</Radio>
                  <Radio value={'soLuong'}>Số lượng</Radio>
                  <Radio value={'donGia'}>Đơn giá</Radio>
                  <Radio value={'kyMaHieu'}>Ký mã hiệu</Radio>
                </Space>
              </Radio.Group>
              <Divider style={{ margin: '8px 0px 8px 0px' }} />
              <Radio.Group
                onChange={(e) => {
                  const val = e.target.value;
                  setQuery({ ...query, direction: val });
                }}
                value={direction}
              >
                <Space direction="vertical">
                  <Radio value={'ASC'}>
                    <Flex gap={'8px'}>
                      Tăng dần
                      <SortDescendingOutlined />
                    </Flex>
                  </Radio>
                  <Radio value={'DESC'}>
                    <Flex gap={'8px'}>
                      Giảm dầm
                      <SortAscendingOutlined />
                    </Flex>
                  </Radio>
                </Space>
              </Radio.Group>
            </>
          }
          title="Sắp xếp theo"
          trigger="click"
          placement="bottom"
        >
          <Button icon={<SortAscendingOutlined />}>Sắp xếp</Button>
        </Popover>
        <Popover
          content={
            <Checkbox.Group
              value={selectedColumns}
              onChange={handleColumnChange}
            >
              <Space direction="vertical">
                {allColumns.map((col) => (
                  <Checkbox key={col.key} value={col.key}>
                    {col.title}
                  </Checkbox>
                ))}
              </Space>
            </Checkbox.Group>
          }
          title="Chọn các cột muốn hiển thị"
          trigger="click"
          placement="bottom"
        >
          <Button icon={<SelectOutlined />}>Chọn cột hiển thị</Button>
        </Popover>
      </Flex>
      {showFilter && (
        <Flex gap={16}>
          <Select
            placeholder="Lọc theo phân khoa"
            defaultValue={departmentIds}
            allowClear
            onChange={(val) => setQuery({ ...query, departmentIds: [val] })}
            style={{
              width: '100%',
            }}
            options={[
              ...departments.map((item) => ({
                label: item.tenKhoaPhong,
                value: item.id,
              })),
              {
                label: 'Chưa có phân khoa',
                value: 'none',
              },
            ]}
          />
          <Select
            // mode="multiple"
            placeholder="Lọc theo dự án"
            defaultValue={biddingIds}
            allowClear
            disabled={loadingBiddings}
            onChange={(val) => setQuery({ ...query, biddingIds: [val] })}
            style={{
              width: '100%',
            }}
            options={[
              ...biddings.map((item) => ({
                label: item.tenDeXuat,
                value: item.id,
              })),
              {
                label: 'Không thuộc dự án',
                value: 'none',
              },
            ]}
          />
          <Select
            mode="multiple"
            placeholder="Lọc theo xuất xứ"
            defaultValue={xuatXu}
            onChange={(val) => setQuery({ ...query, xuatXu: val })}
            style={{
              width: '100%',
            }}
            allowClear
            options={defaultXuatXu}
          />
          <Select
            mode="multiple"
            placeholder="Lọc theo phân loại nhập"
            defaultValue={phanLoaiNhap}
            onChange={(val) => setQuery({ ...query, phanLoaiNhap: val })}
            style={{
              width: '100%',
            }}
            allowClear
            options={defaultPhanLoaiNhap}
          />
          <Select
            mode="multiple"
            placeholder="Lọc theo đơn vị tính"
            defaultValue={donVi}
            onChange={(val) => setQuery({ ...query, donVi: val })}
            style={{
              width: '100%',
            }}
            allowClear
            options={defaultDonViTinh}
          />
        </Flex>
      )}
    </>
  );
};

export default Filter;
