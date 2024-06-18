export const API_PATHS = {
  POST_REGISTER: "/api/auth/register",
  POST_LOGIN: "/api/auth/login",
  POST_LOGOUT :`/api/auth/logout`,

  GET_PRODUCTS: "/api/product/products",
  GET_PRODUCT_BY_ID:(prodId)=> `/api/product/product/${prodId}`,
  
  GET_ORDERS_USER:(userId)=> `api/order/order-user/${userId}` ,

  ADD_ORDER: "/api/order/create",
  UPDATE_ORDER: (orderId) => `/api/order/${orderId}`,
};
