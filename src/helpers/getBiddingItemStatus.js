const getStatus = (data, dateField, documentField = null) => {
  if (documentField) {
    if (!data[dateField] && !data[documentField]) {
      return {
        dotColor: 'grey',
        tagColor: 'default',
        text: 'Chưa cập nhật',
      };
    }
    if (data[dateField] === '' || !data[dateField]) {
      return {
        dotColor: 'orange',
        tagColor: 'warning',
        text: 'Chưa cập nhật ngày',
      };
    }

    if (data[documentField] === null) {
      return {
        dotColor: 'orange',
        tagColor: 'warning',
        text: 'Chưa có tài liệu',
      };
    }
  }

  if (!documentField) {
    if (!data[dateField]) {
      return {
        dotColor: 'grey',
        tagColor: 'default',
        text: 'Chưa cập nhật',
      };
    }
    if (data[dateField] === '') {
      return {
        dotColor: 'orange',
        tagColor: 'warning',
        text: 'Chưa cập nhật ngày',
      };
    }
  }
  return {
    dotColor: 'green',
    tagColor: 'success',
    text: 'Đã hoàn thành',
  };
};
export default getStatus;
