import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi, trang bạn đang vào không tồn tại hoặc không được phép truy cập."
      extra={
        <Button type="primary">
          <Link to="/">Quay lại Trang chủ</Link>
        </Button>
      }
    />
  );
};

export default NotFound;
