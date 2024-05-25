export const API_PATHS = {
  POST_REGISTER: "/api/auth/register",
  POST_LOGIN: "/api/auth/login",
  POST_LOGOUT :`/api/auth/logout`,

  GET_PRODUCTS: "/api/product/products",
  POST_NEW_PRODUCT: "/api/product/create",
  PUT_UPDATE_PRODUCT : (prodId)=> `/api/product/update/${prodId}` ,
  DELETE_PRODUCT : (prodId)=> `/api/product/delete/${prodId}` ,
  
  GET_ANALYTICS: "api/admin/analytics",

  GET_ORDERS:`/api/order/orders`,
  GET_ORDER_BY_ID:(orderId) =>`/api/order/order/${orderId}`

};
