import React, { useState } from 'react';
import {
  Card,
  Flex,
  Tag,
  Space,
  Table,
  Breadcrumb,
  Modal,
  Input,
  Button,
  Select,
  Form,
  Popover,
  Typography,
} from 'antd';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';
import { useAppContext } from '../../contexts/appContext';
import { Link, useNavigate } from 'react-router-dom';
import hasPermission from '../../helpers/hasPermission';
import {
  BIDDING_CREATE,
  BIDDING_DELETE,
  BIDDING_READ,
} from '../../const/permission';
import useDeleteApi from '../../hooks/useDeleteApi';
import useCreateApi from '../../hooks/useCreateApi';
import { useBreadcrumb } from '../../hooks/useBreadcrumb';
import Page from '../../components/Page';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { useAuthContext } from '../../contexts/authContext';

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline'],
    [{ color: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ align: [] }],
    ['link'],
  ],
};
const Bidding = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const {
    biddings: data,
    fetchBiddings: fetchApi,
    setBiddings: setData,
    loadingBiddings: loading,
    departments,
    loadingDepartments,
  } = useAppContext();
  const { deleting, deleteApi } = useDeleteApi({
    url: `/bidding`,
    successCallback: () => {
      setData(data.filter((item) => item.id !== deleteId));
      fetchApi();
      setShowDeleteConfirm(false);
    },
  });
  const { creating, createApi } = useCreateApi({
    url: `/bidding`,
    successCallback: () => {
      setIsShowCreateForm(false);
      fetchApi();
    },
  });

  const [isShowCreateForm, setIsShowCreateForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [form] = Form.useForm();

  const breadcrumbItems = useBreadcrumb([
    {
      href: '/shopping/bidding',
      title: 'Hoạt động mua sắm qua đấu thầu',
    },
  ]);
  const defaultCreateFormData = {
    trangThaiHoatDong: 'pendingProcess',
    NguoiTaoHoatDongId: user.id,
    khoaPhongDeXuat: '',
    noiDungDeXuat: '',
    tenDeXuat: '',
    isProposal: false,
    ngayTaoHoatDong: new Date(),
  };
  const [createFormData, setCreateFormData] = useState(defaultCreateFormData);
  const handleCreateFormChange = (e) => {
    setCreateFormData({
      ...createFormData,
      [e.target.name]: e.target.value,
    });
  };

  const columns = [
    {
      title: 'Tên hoạt động',
      dataIndex: 'tenDeXuat',
      key: 'tenDeXuat',
      render: (text, record) => (
        <Link to={`/shopping/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: 'Khoa phòng đề xuất',
      dataIndex: 'khoaPhongDeXuat',
      key: 'khoaPhongDeXuat',
      render: (_, record) => record.Department?.tenKhoaPhong,
    },

    {
      title: 'Trạng thái',
      key: 'trangThaiHoatDong',
      dataIndex: 'trangThaiHoatDong',
      render: (_, record) => {
        const { color, content } = (() => {
          switch (record.trangThaiHoatDong) {
            case 'approved':
              return { color: 'success', content: 'Hoàn thành' };
            case 'pendingProcess':
              return { color: 'gold', content: 'Chờ xử lý' };

            case 'pendingApprove':
              return { color: 'blue', content: 'Chờ duyệt' };

            case 'rejected':
              return { color: 'error', content: 'Đã hủy' };

            case 'processing':
              return { color: 'purple', content: 'Đang xử lý' };
            default:
              break;
          }
        })();

        return <Tag color={color}>{content}</Tag>;
      },
    },

    {
      title: 'Hành động',
      align: 'end',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          {hasPermission(BIDDING_READ) && (
            <Popover content="Xem chi tiết" trigger="hover">
              <Button
                type="link"
                icon={<EyeOutlined />}
                onClick={() => navigate(`/shopping/${record.id}`)}
              />
            </Popover>
          )}

          {hasPermission(BIDDING_DELETE) && (
            <Popover content="Xóa hoạt động" trigger="hover">
              <Button
                type="link"
                danger
                icon={<DeleteOutlined />}
                onClick={() => {
                  setDeleteId(record.id);
                  setShowDeleteConfirm(true);
                }}
              />
            </Popover>
          )}
        </Space>
      ),
    },
  ];

  if (loading)
    return (
      <Page>
        <Breadcrumb items={breadcrumbItems} />
        <Card
          title="Danh sách hoạt động mua sắm qua đấu thầu"
          extra={
            hasPermission(BIDDING_CREATE) && (
              <Button type="primary" icon={<PlusOutlined />} disabled>
                Tạo hoạt động
              </Button>
            )
          }
        >
          <Table loading columns={columns} bordered />
        </Card>
      </Page>
    );

  return (
    <Page>
      <Breadcrumb items={breadcrumbItems} />
      <Card
        title="Danh sách hoạt động mua sắm qua đấu thầu"
        extra={
          hasPermission(BIDDING_CREATE) && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsShowCreateForm(true)}
              disabled={deleting}
            >
              Tạo hoạt động
            </Button>
          )
        }
      >
        <Flex gap={16} vertical>
          <Modal
            title="Xác nhận xóa hoạt động"
            open={showDeleteConfirm}
            onCancel={() => setShowDeleteConfirm(false)}
            footer={null}
          >
            <Flex gap={8} vertical>
              <Typography.Text>
                Hành động này sẽ xóa toàn bộ dữ liệu của hoạt động trong cơ sở
                dữ liệu và không thể khôi phục. Bạn có chắc chắn muốn xóa?
              </Typography.Text>
              <Flex gap={8} justify="flex-end">
                <Button key="back" onClick={() => setIsShowCreateForm(false)}>
                  Hủy
                </Button>
                <Button
                  type="primary"
                  danger={true}
                  loading={deleting}
                  onClick={() => deleteApi(deleteId)}
                >
                  Xóa
                </Button>
              </Flex>
            </Flex>
          </Modal>
          <Modal
            title="Tạo mới hoạt động mua sắm"
            open={isShowCreateForm}
            onCancel={() => setIsShowCreateForm(false)}
            footer={null}
            width={800}
          >
            <Form
              autoComplete="off"
              onFinish={() => createApi({ body: createFormData })}
              form={form}
              layout="vertical"
            >
              <Form.Item
                name="tenDeXuat"
                label="Tên hoạt động mua sắm"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tên hoạt động mua sắm!',
                  },
                ]}
              >
                <Input
                  allowClear
                  name="tenDeXuat"
                  placeholder="Nhập tên hoạt động mua sắm"
                  onChange={handleCreateFormChange}
                  autoComplete="off"
                />
              </Form.Item>
              <Form.Item
                name="khoaPhongDeXuat"
                label="Khoa phòng đề xuất"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn khoa phòng đề xuất!',
                  },
                ]}
              >
                <Select
                  allowClear
                  disabled={loadingDepartments}
                  placeholder="Chọn khoa phòng đề xuất"
                  onChange={(value) =>
                    setCreateFormData({
                      ...createFormData,
                      DepartmentId: value,
                    })
                  }
                  options={departments.map((item) => ({
                    label: item.tenKhoaPhong,
                    value: item.id,
                  }))}
                />
              </Form.Item>
              <Form.Item
                name="noiDungDeXuat"
                label="Nội dung hoạt động mua sắm"
              >
                <ReactQuill
                  style={{
                    borderRadius: '12px',
                    height: '220px',
                    paddingBottom: '44px',
                  }}
                  value={createFormData.noiDungDeXuat}
                  onChange={(val) =>
                    setCreateFormData({
                      ...createFormData,
                      noiDungDeXuat: val,
                    })
                  }
                  modules={modules}
                  theme="snow"
                  placeholder="Nhập nội dung hoạt động mua sắm"
                />
              </Form.Item>

              <Flex gap={8} justify="flex-end">
                <Button key="back" onClick={() => setIsShowCreateForm(false)}>
                  Hủy
                </Button>
                <Button type="primary" htmlType="submit" loading={creating}>
                  Lưu
                </Button>
              </Flex>
            </Form>
          </Modal>

          <Table
            columns={columns}
            dataSource={data}
            bordered
            disabled={deleting}
          />
        </Flex>
      </Card>
    </Page>
  );
};

export default Bidding;
