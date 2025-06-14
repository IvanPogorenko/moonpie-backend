export enum AdminPathsEnum {
  ADMIN_PREFIX = '/admin',
  //category
  CREATE_CATEGORY = ADMIN_PREFIX + '/create-category',
  UPDATE_CATEGORY = ADMIN_PREFIX + '/update-category',
  DELETE_CATEGORY = ADMIN_PREFIX + '/delete-category',
  //colors
  GET_COLORS = ADMIN_PREFIX + '/get-colors',
  CREATE_COLOR = ADMIN_PREFIX + '/create-color',
  UPDATE_COLOR = ADMIN_PREFIX + '/update-color',
  DELETE_COLOR = ADMIN_PREFIX + '/delete-color',
  //sizes
  GET_SIZES = ADMIN_PREFIX + '/get-sizes',
  CREATE_SIZE = ADMIN_PREFIX + '/create-size',
  UPDATE_SIZE = ADMIN_PREFIX + '/update-size',
  DELETE_SIZE = ADMIN_PREFIX + '/delete-size',
  //items
  GET_ITEMS = ADMIN_PREFIX + '/get-items',
  GET_DATA_FOR_ITEM = ADMIN_PREFIX + '/get-data-for-item',
  CREATE_ITEM = ADMIN_PREFIX + '/create-item',
  UPDATE_ITEM = ADMIN_PREFIX + '/update-item',
  DELETE_ITEM = ADMIN_PREFIX + '/delete-item',
  //orders
  GET_ORDERS = ADMIN_PREFIX + '/get-orders',
  GET_USER_ORDERS = ADMIN_PREFIX + '/get-user-orders',
  UPDATE_ORDERS = ADMIN_PREFIX + '/update-orders',
  //employees
  CREATE_EMPLOYEE = ADMIN_PREFIX + '/create-employee',
}
