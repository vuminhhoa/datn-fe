import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const readExcelFile = async (file, excelColumns) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const binaryStr = e.target.result;
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        const formattedData = jsonData.map((item, index) => {
          const formattedItem = {};
          for (const column of excelColumns) {
            formattedItem[column.value] = item[column.label];
          }
          return { key: index, ...formattedItem };
        });
        resolve({
          success: true,
          data: formattedData,
          message: 'Tải file thành công!',
        });
      } catch (err) {
        reject({ success: false, message: 'Có lỗi xảy ra khi đọc file' });
      }
    };
    reader.onerror = () => {
      reject({ success: false, message: 'Có lỗi xảy ra khi đọc file' });
    };
    reader.readAsBinaryString(file);
  });
};

export const findDuplicateRow = (data, field) => {
  const duplicateRowsMap = new Map();
  data.forEach((row) => {
    if (!duplicateRowsMap.has(row[field])) {
      duplicateRowsMap.set(row[field], [row]);
    } else {
      duplicateRowsMap.get(row[field]).push(row);
    }
  });
  const duplicateRows = [];
  duplicateRowsMap.forEach((value) => {
    if (value.length > 1) {
      duplicateRows.push(...value);
    }
  });
  return duplicateRows;
};

export const downloadExcelTemplate = () => {
  const ws = XLSX.utils.aoa_to_sheet([
    [
      'Tên thiết bị',
      'Đơn vị',
      'Số lượng',
      'Ký mã hiệu',
      'Hãng sản xuất',
      'Xuất xứ',
      'Đơn giá',
      'Phân khoa',
    ],
  ]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Template');
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(blob, '[iBME Lab] Mẫu file excel nhập thiết bị.xlsx');
};
