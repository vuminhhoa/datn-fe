export const permissionsConsts = {
  DASHBOARD_READ: 'dashboardRead',

  DEPARTMENT_READ: 'departmentRead',
  DEPARTMENT_CREATE: 'departmentCreate',
  DEPARTMENT_UPDATE: 'departmentUpdate',
  DEPARTMENT_DELETE: 'departmentDelete',

  PROFILE_SETTING: 'profileSetting',
  SYSTEM_SETTING: 'systemSetting',

  USER_CREATE: 'userCreate',
  USER_READ: 'userRead',
  USER_UPDATE: 'userUpdate',
  USER_DELETE: 'userDelete',

  TENDER_CREATE: 'tenderCreate',
  TENDER_READ: 'tenderRead',
  TENDER_UPDATE: 'tenderUpdate',
  TENDER_DELETE: 'tenderDelete',

  EQUIPMENT_CREATE: 'equipmentCreate',
  EQUIPMENT_READ: 'equipmentRead',
  EQUIPMENT_UPDATE: 'equipmentUpdate',
  EQUIPMENT_DELETE: 'equipmentDelete',
  EQUIPMENT_IMPORT: 'equipmentImport',

  // GROUP_EQUIPMENT_CREATE: 'groupEquipmentCreate',
  // GROUP_EQUIPMENT_READ: 'groupEquipmentRead',
  // GROUP_EQUIPMENT_UPDATE: 'groupEquipmentUpdate',
  // GROUP_EQUIPMENT_DELETE: 'groupEquipmentDelete',

  // TYPE_EQUIPMENT_CREATE: 'typeEquipmentCreate',
  // TYPE_EQUIPMENT_READ: 'typeEquipmentRead',
  // TYPE_EQUIPMENT_UPDATE: 'typeEquipmentUpdate',
  // TYPE_EQUIPMENT_DELETE: 'typeEquipmentDelete',

  // UNIT_EQUIPMENT_CREATE: 'unitEquipmentCreate',
  // UNIT_EQUIPMENT_READ: 'unitEquipmentRead',
  // UNIT_EQUIPMENT_UPDATE: 'unitEquipmentUpdate',
  // UNIT_EQUIPMENT_DELETE: 'unitEquipmentDelete',

  // STATISTIC_EQUIPMENT: 'statisticEquipment',

  // REPAIR_EQUIPMENT_CREATE: 'repairEquipmentCreate',
  // REPAIR_EQUIPMENT_READ: 'repairEquipmentRead',
  // REPAIR_EQUIPMENT_UPDATE: 'repairEquipmentUpdate',
  // REPAIR_EQUIPMENT_DELETE: 'repairEquipmentDelete',
  // REPAIR_EQUIPMENT_APPROVE: 'repairEquipmentApprove',
  // REPAIR_EQUIPMENT_PRINT: 'repairEquipmentPrint',

  // REPORT_EQUIPMENT_CREATE: 'reportEquipmentCreate',
  // REPORT_EQUIPMENT_READ: 'reportEquipmentRead',
  // REPORT_EQUIPMENT_APPROVE: 'reportEquipmentApprove',
  // REPORT_EQUIPMENT_PRINT: 'reportEquipmentPrint',
  // REPORT_EQUIPMENT_UPDATE: 'reportEquipmentUpdate',
  // REPORT_EQUIPMENT_DELETE: 'reportEquipmentDelete',

  // MAINTAINANCE_EQUIPMENT_CREATE: 'maintainanceEquipmentCreate',
  // MAINTAINANCE_EQUIPMENT_READ: 'maintainanceEquipmentRead',
  // MAINTAINANCE_EQUIPMENT_PRINT: 'maintainanceEquipmentPrint',
  // MAINTAINANCE_EQUIPMENT_UPDATE: 'maintainanceEquipmentUpdate',
  // MAINTAINANCE_EQUIPMENT_APPROVE: 'maintainanceEquipmentApprove',
  // MAINTAINANCE_EQUIPMENT_DELETE: 'maintainanceEquipmentDelete',

  // INSURANCE_EQUIPMENT_CREATE: 'insuranceEquipmentCreate',
  // INSURANCE_EQUIPMENT_READ: 'insuranceEquipmentRead',
  // INSURANCE_EQUIPMENT_UPDATE: 'insuranceEquipmentUpdate',
  // INSURANCE_EQUIPMENT_PRINT: 'insuranceEquipmentPrint',
  // INSURANCE_EQUIPMENT_APPROVE: 'insuranceEquipmentApprove',
  // INSURANCE_EQUIPMENT_DELETE: 'insuranceEquipmentDelete',

  // ACCREDITATION_EQUIPMENT_CREATE: 'accreditationEquipmentCreate',
  // ACCREDITATION_EQUIPMENT_READ: 'accreditationEquipmentRead',
  // ACCREDITATION_EQUIPMENT_UPDATE: 'accreditationEquipmentUpdate',
  // ACCREDITATION_EQUIPMENT_PRINT: 'accreditationEquipmentPrint',
  // ACCREDITATION_EQUIPMENT_APPROVE: 'accreditationEquipmentApprove',
  // ACCREDITATION_EQUIPMENT_DELETE: 'accreditationEquipmentDelete',

  // TRANFER_EQUIPMENT_CREATE: 'tranferEquipmentCreate',
  // TRANFER_EQUIPMENT_READ: 'tranferEquipmentRead',
  // TRANFER_EQUIPMENT_UPDATE: 'tranferEquipmentUpdate',
  // TRANFER_EQUIPMENT_PRINT: 'tranferEquipmentPrint',
  // TRANFER_EQUIPMENT_APPROVE: 'tranferEquipmentApprove',
  // TRANFER_EQUIPMENT_DELETE: 'tranferEquipmentDelete',

  // DISPOSAL_EQUIPMENT_CREATE: 'disposalEquipmentCreate',
  // DISPOSAL_EQUIPMENT_READ: 'disposalEquipmentRead',
  // DISPOSAL_EQUIPMENT_UPDATE: 'disposalEquipmentUpdate',
  // DISPOSAL_EQUIPMENT_PRINT: 'disposalEquipmentPrint',
  // DISPOSAL_EQUIPMENT_APPROVE: 'disposalEquipmentApprove',
  // DISPOSAL_EQUIPMENT_DELETE: 'disposalEquipmentDelete',

  // INVENTORY_EQUIPMENT_CREATE: 'inventoryEquipmentCreate',
  // INVENTORY_EQUIPMENT_READ: 'inventoryEquipmentRead',
  // INVENTORY_EQUIPMENT_UPDATE: 'inventoryEquipmentUpdate',
  // INVENTORY_EQUIPMENT_PRINT: 'inventoryEquipmentPrint',
  // INVENTORY_EQUIPMENT_APPROVE: 'inventoryEquipmentApprove',
  // INVENTORY_EQUIPMENT_DELETE: 'inventoryEquipmentDelete',

  // RADIATION_EQUIPMENT_CREATE: 'radiationEquipmentCreate',
  // RADIATION_EQUIPMENT_READ: 'radiationEquipmentRead',
  // RADIATION_EQUIPMENT_UPDATE: 'radiationEquipmentUpdate',
  // RADIATION_EQUIPMENT_PRINT: 'radiationEquipmentPrint',
  // RADIATION_EQUIPMENT_APPROVE: 'radiationEquipmentApprove',
  // RADIATION_EQUIPMENT_DELETE: 'radiationEquipmentDelete',

  // EXTERNAL_INSPECTION_EQUIPMENT_CREATE: 'externalInspectionEquipmentCreate',
  // EXTERNAL_INSPECTION_EQUIPMENT_READ: 'externalInspectionEquipmentRead',
  // EXTERNAL_INSPECTION_EQUIPMENT_UPDATE: 'externalInspectionEquipmentUpdate',
  // EXTERNAL_INSPECTION_EQUIPMENT_PRINT: 'externalInspectionEquipmentPrint',
  // EXTERNAL_INSPECTION_EQUIPMENT_APPROVE: 'externalInspectionEquipmentApprove',
  // EXTERNAL_INSPECTION_EQUIPMENT_DELETE: 'externalInspectionEquipmentDelete',
};

export const defaultPermissions = [
  {
    alias: 'dashboardRead',
    name: 'Xem bảng điều khiển',
  },
  {
    alias: 'departmentRead',
    name: 'Xem phòng ban',
  },
  {
    alias: 'userRead',
    name: 'Xem người dùng',
  },
  {
    alias: 'tenderRead',
    name: 'Xem thầu',
  },
  {
    alias: 'equipmentRead',
    name: 'Xem thiết bị',
  },
  {
    alias: 'departmentCreate',
    name: 'Tạo phòng ban',
  },
  {
    alias: 'departmentUpdate',
    name: 'Cập nhật phòng ban',
  },
  {
    alias: 'departmentDelete',
    name: 'Xóa phòng ban',
  },
  {
    alias: 'profileSetting',
    name: 'Cài đặt hồ sơ',
  },
  {
    alias: 'systemSetting',
    name: 'Cài đặt hệ thống',
  },
  {
    alias: 'userCreate',
    name: 'Tạo người dùng',
  },

  {
    alias: 'userUpdate',
    name: 'Cập nhật người dùng',
  },
  {
    alias: 'userDelete',
    name: 'Xóa người dùng',
  },
  {
    alias: 'tenderCreate',
    name: 'Tạo thầu',
  },

  {
    alias: 'tenderUpdate',
    name: 'Cập nhật thầu',
  },
  {
    alias: 'tenderDelete',
    name: 'Xóa thầu',
  },
  {
    alias: 'equipmentCreate',
    name: 'Tạo thiết bị',
  },

  {
    alias: 'equipmentUpdate',
    name: 'Cập nhật thiết bị',
  },
  {
    alias: 'equipmentDelete',
    name: 'Xóa thiết bị',
  },
  {
    alias: 'equipmentImport',
    name: 'Nhập thiết bị',
  },
];
