// @ts-nocheck
import React, { useEffect, useState } from 'react';
import {
  Card,
  Flex,
  Form,
  Tag,
  Breadcrumb,
  Descriptions,
  Select,
  Typography,
  Input,
  Button,
  Skeleton,
} from 'antd';
import { PlusOutlined, SaveOutlined } from '@ant-design/icons';
import BiddingContext from '../../../contexts/biddingContext';
import BiddingRequest from '../Form/BiddingRequest';
import LenDuToanThanhLapCacTo from '../Form/LenDuToanThanhLapCacTo';
import KeHoachLuaChonNhaThau from '../Form/KeHoachLuaChonNhaThau';
import Ehsmt from '../Form/Ehsmt';
import useFetchApi from '../../../hooks/useFetchApi';
import { useParams, useNavigate } from 'react-router-dom';
import CollapsibleForm from '../Component/CollapsibleForm';
import Ehsdt from '../Form/Ehsdt';
import KyKetThucHienHopDong from '../Form/KyKetThucHienHopDong';
import { useBreadcrumb } from '../../../hooks/useBreadcrumb';
import useEditApi from '../../../hooks/useEditApi';
import NotFound from '../../NotFound/NotFound';
import Page from '../../../components/Page';
import { defaultBidding } from '../../../const/defaultBidding';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/vi'; // import locale Vietnamese
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { useAppContext } from '../../../contexts/appContext';

dayjs.extend(localizedFormat);
dayjs.locale('vi'); // set locale to Vietnamese

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline'],
    [{ color: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ align: [] }],
    [],
  ],
};

const Edit = () => {
  const { departments, loadingDepartments } = useAppContext();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const { editing, editApi } = useEditApi({
    url: `/bidding/${id}`,
    successCallback: () => {
      setCreatedFields([]);
      setDeletedFields([]);
      setUpdatedFields([]);
      setInitData(data);
      fetchApi();
    },
  });
  const { data, setData, loading, fetchApi } = useFetchApi({
    url: `/bidding/${id}`,
    defaultData: {},
  });
  const breadcrumbItems = useBreadcrumb([
    { href: '/shopping/bidding', title: 'Hoạt động mua sắm qua đấu thầu' },
    {
      href: `/shopping/bidding/${id}`,
      title: loading ? '----------' : data?.tenDeXuat,
    },
  ]);
  const [initData, setInitData] = useState(defaultBidding);
  const [deletedFields, setDeletedFields] = useState([]);
  const [createdFields, setCreatedFields] = useState([]);
  const [updatedFields, setUpdatedFields] = useState([]);
  const [isEditItem, setIsEditItem] = useState(false);

  useEffect(() => {
    if (loading || JSON.stringify(initData) !== JSON.stringify(defaultBidding))
      return;
    setInitData(data);
  }, [data]);

  const items = [
    {
      label: 'Khoa phòng đề xuất',
      children: data?.Department?.tenKhoaPhong,
    },
    data?.ngayDeXuat !== null && {
      label: 'Ngày đề xuất',
      children: data?.ngayDeXuat,
    },
    {
      label: 'Trạng thái',
      children: (
        <>
          {data?.trangThaiDeXuat === 'approved' && (
            <Tag color="success">Chấp thuận</Tag>
          )}
          {data?.trangThaiDeXuat === 'reject' && (
            <Tag color="error">Từ chối</Tag>
          )}
          {data?.trangThaiDeXuat === 'processing' && (
            <Tag color="processing">Chờ duyệt</Tag>
          )}
        </>
      ),
    },
    (data?.trangThaiDeXuat === 'approved' ||
      data?.trangThaiDeXuat === 'reject') && {
      label: 'Ngày phê duyệt',
      children: dayjs(data?.ngayPheDuyetDeXuat).format('dd, D/MM/YYYY  h:mm A'),
    },
    {
      label: 'Ngày tạo hoạt động',
      children: dayjs(data?.createdAt).format('dd, D/MM/YYYY  h:mm A'),
    },
    {
      label: 'Lần cập nhật cuối',
      children: dayjs(data?.updatedAt).format('dd, D/MM/YYYY  h:mm A'),
    },
    {
      label: 'Nội dung',
      children: (
        <>
          <div dangerouslySetInnerHTML={{ __html: data?.noiDungDeXuat }} />

          {/* <ReactQuill
            style={{
              borderRadius: '12px',
              height: '220px',
              paddingBottom: '44px',
            }}
            value={data.noiDungDeXuat}
            onChange={(val) =>
              setData({
                ...data,
                noiDungDeXuat: val,
              })
            }
            modules={modules}
            theme="snow"
            placeholder="Nhập nội dung hoạt động mua sắm"
          /> */}
        </>
      ),
    },
  ];

  if (loading)
    return (
      <Page>
        <Breadcrumb items={breadcrumbItems} />
        <Card
          title={
            <Flex align="center" gap={8}>
              <Typography.Title level={5} style={{ margin: '0' }}>
                Chi tiết hoạt động mua sắm:
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
      </Page>
    );

  if (!data) return <NotFound />;

  return (
    <BiddingContext.Provider
      value={{
        data,
        setData,
        editing,
        initData,
        deletedFields,
        setDeletedFields,
        createdFields,
        setCreatedFields,
        updatedFields,
        setUpdatedFields,
      }}
    >
      <Page>
        <Breadcrumb items={breadcrumbItems} />
        <Card
          title={`Chi tiết hoạt động mua sắm: ${data?.tenDeXuat}`}
          extra={
            <Flex gap={8}>
              {data?.trangThaiDeXuat === 'approved' && (
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => {
                    navigate(
                      `/equipments/import_equipments_by_excel?biddingId=${id}&departmentId=${data?.DepartmentId}`
                    );
                  }}
                >
                  Nhập thiết bị
                </Button>
              )}
              {data.trangThaiDeXuat !== 'reject' && (
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  onClick={() =>
                    editApi({
                      body: {
                        ...data,
                        deletedFields,
                        createdFields,
                        updatedFields,
                      },
                    })
                  }
                  loading={editing}
                >
                  Lưu
                </Button>
              )}
            </Flex>
          }
        >
          <Flex justify="space-between">
            <Typography.Title level={5} style={{ margin: '0px' }}>
              1. Khoa phòng đề xuất
            </Typography.Title>

            <Button
              disabled={editing}
              type="link"
              onClick={() => setIsEditItem(!isEditItem)}
              style={{ margin: '0px' }}
            >
              {isEditItem ? 'Xác nhận' : 'Cập nhật'}
            </Button>
          </Flex>
          {!isEditItem && <Descriptions items={items} column={2} />}
          {isEditItem && (
            <Form autoComplete="off" form={form} layout="vertical">
              <Form.Item
                name="tenDeXuat"
                label="Tên hoạt động mua sắm"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tên hoạt động mua sắm!',
                  },
                ]}
                initialValue={data.tenDeXuat}
              >
                <Input
                  allowClear
                  name="tenDeXuat"
                  placeholder="Nhập tên hoạt động mua sắm"
                  onChange={(e) =>
                    setData({ ...data, tenDeXuat: e.target.value })
                  }
                  autoComplete="off"
                />
              </Form.Item>
              {data.trangThaiDeXuat !== 'approved' && (
                <Form.Item
                  name="khoaPhongDeXuat"
                  label="Khoa phòng đề xuất"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng chọn khoa phòng đề xuất!',
                    },
                  ]}
                  initialValue={data.Department.tenKhoaPhong}
                >
                  <Select
                    allowClear
                    disabled={loadingDepartments}
                    placeholder="Chọn khoa phòng đề xuất"
                    onChange={(value) =>
                      setData({
                        ...data,
                        DepartmentId: value,
                      })
                    }
                    options={departments.map((item) => ({
                      label: item.tenKhoaPhong,
                      value: item.id,
                    }))}
                  />
                </Form.Item>
              )}

              <Form.Item
                name="noiDungDeXuat"
                label="Nội dung hoạt động mua sắm"
                initialValue={data.noiDungDeXuat}
              >
                <ReactQuill
                  style={{
                    borderRadius: '12px',
                    height: '220px',
                    paddingBottom: '44px',
                  }}
                  value={data.noiDungDeXuat}
                  onChange={(val) =>
                    setData({
                      ...data,
                      noiDungDeXuat: val,
                    })
                  }
                  modules={modules}
                  theme="snow"
                  placeholder="Nhập nội dung hoạt động mua sắm"
                />
              </Form.Item>
            </Form>
          )}
          {data?.trangThaiDeXuat === 'approved' && (
            <>
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
            </>
          )}
        </Card>
      </Page>
    </BiddingContext.Provider>
  );
};

export default Edit;
