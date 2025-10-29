const backendDomain = "http://localhost:5000";

const SummaryApi = {
  register: {
    url: `${backendDomain}/api/v1/auth/register`,
    method: "POST",
  },
  login: {
    url: `${backendDomain}/api/v1/auth/login`,
    method: "POST",
  },
  logout: {
    url: `${backendDomain}/api/v1/auth/logout`,
    method: "GET",
  },
  forgotpassword: {
    url: `${backendDomain}/api/v1/auth/forgot-password`,
    method: "POST",
  },
  resetPassword:{
    url: `${backendDomain}/api/v1/auth/reset-password`,
    method: "POST",
  },


  showme: {
    url: `${backendDomain}/api/v1/users/showMe`,
    method: "GET",
  },
  getUser: {
    url: `${backendDomain}/api/v1/users/:id`,
    method: "GET",
  },
  editUser: {
    url: `${backendDomain}/api/v1/users/updateUser`,
    method: "PATCH",
  },
  deleteUser: {
    url: `${backendDomain}/api/v1/users/deleteUser/:id`,
    method: "DELETE",
  },

  changePassword: {
    url: `${backendDomain}/api/v1/users/updateUserPassword`,
    method: "PATCH",
  },

  getAllCategories: {
    url: `${backendDomain}/api/v1/categories`,
    method: "GET",
  },

  getCategoriesById: {
    url: `${backendDomain}/api/v1/categories/:id`,
    method: "GET",
  },
  addCategory: {
    url: `${backendDomain}/api/v1/categories`,
    method: "POST",
  },
  updateCategoryById: {
    url: `${backendDomain}/api/v1/categories/:id`,
    method: "PATCH",
  },

  deleteCategory: {
    url: `${backendDomain}/api/v1/categories/:id`,
    method: "DELETE",
  },
  addProduct: {
    url: `${backendDomain}/api/v1/products`,
    method: "POST",
  },

  getAllProducts: {
    url: `${backendDomain}/api/v1/products`,
    method: "GET",
  },

  getProductsByCategory: {
    url: `${backendDomain}/api/v1/products/category/:id`,
    method: "GET",
  },

  getProductsBySlug: {
    url: `${backendDomain}/api/v1/products/slug/:slug`,
    method: "GET",
  },

  updateProductById: {
    url: `${backendDomain}/api/v1/products/:id`,
    method: "PATCH",
  },

  getProductById: {
    url: `${backendDomain}/api/v1/products/:id`,
    method: "GET",
  },
  deleteProduct: {
    url: `${backendDomain}/api/v1/products/:id`,
    method: "DELETE",
  },

  uploadImage: {
    url: `${backendDomain}/api/v1/products/uploadImage`,
    method: "POST",
  },

  getAllUser: {
    url: `${backendDomain}/api/v1/users`,
    method: "GET",
  },

  updateUser: {
    url: `${backendDomain}/api/v1/user/updateUser/`,
    method: "PATCH",
  },

  addToCart: {
    url: `${backendDomain}/api/v1/carts/`,
    method: "POST",
  },

  getCart: {
    url: `${backendDomain}/api/v1/carts/`,
    method: "GET",
  },
  updateCart: {
    url: `${backendDomain}/api/v1/carts/update`,
    method: "POST",
  },
  removeFromCart: {
    url: `${backendDomain}/api/v1/carts/remove`,
    method: "DELETE",
  },
  clearCart: {
    url: `${backendDomain}/api/v1/carts/clear`,
    method: "DELETE",
  },

  createOrder: {
    url: `${backendDomain}/api/v1/orders`,
    method: "POST",
  },
  createOrderGuest: {
    url: `${backendDomain}/api/v1/orders/guest`,
    method: "POST",
  },
  getOrdersByUser: {
    url: `${backendDomain}/api/v1/orders/my_orders`,
    method: "GET",
  },

  getAllOrders: {
    url: `${backendDomain}/api/v1/orders/`,
    method: "GET",
  },
  getOrderById: {
    url: `${backendDomain}/api/v1/orders/:id`,
    method: "GET",
  },

  deleteOrderById: {
    url: `${backendDomain}/api/v1/orders/:id`,
    method: "DELETE",
  },
  cancelOrder: {
    url: `${backendDomain}/api/v1/orders/status/:id`,
    method: "PATCH",
  },

  getAllCoupon: {
    url: `${backendDomain}/api/v1/discounts/`,
    method: "GET",
  },
  getDiscountByName: {
    url: `${backendDomain}/api/v1/discounts/name`,
    method: "POST",
  },

  addNewCoupon: {
    url: `${backendDomain}/api/v1/discounts/`,
    method: "POST",
  },

  editCoupon: {
    url: `${backendDomain}/api/v1/discounts/:id`,
    method: "GET",
  },

  updateCoupon: {
    url: `${backendDomain}/api/v1/discounts/:id`,
    method: "PATCH",
  },
  removeCouponById: {
    url: `${backendDomain}/api/v1/discounts/:id`,
    method: "DELETE",
  },

  addNewComment: {
    url: `${backendDomain}/api/v1/reviews/`,
    method: "POST",
  },
  getAllReview: {
    url: `${backendDomain}/api/v1/reviews/`,
    method: "GET",
  },

  updateComment: {
    url: `${backendDomain}/api/v1/reviews/:id`,
    method: "PATCH",
  },

  deleteReview:{
    url: `${backendDomain}/api/v1/reviews/:id`,
    method: "DELETE",
  },

  getCommentOfProduct: {
    url: `${backendDomain}/api/v1/reviews/:idProduct`,
    method: "GET",
  },

  getAllWarranty: {
    url: `${backendDomain}/api/v1/warranty/`,
    method: "GET",
  },

  getWarrantyById:{
    url: `${backendDomain}/api/v1/warranty/:id`,
    method: "GET",
  },
  addNewWarranty: {
    url: `${backendDomain}/api/v1/warranty/`,
    method: "POST",
  },
  updateWarranty: {
    url: `${backendDomain}/api/v1/warranty/`,
    method: "PATCH",
  },
  deleteWarranty: {
    url: `${backendDomain}/api/v1/warranty/`,
    method: "DELETE",
  },
  getWarrantyDate:{
    url: `${backendDomain}/api/v1/warranty/warranty-dates/:code`,
    method: "GET",
  },



  createBanner:{
    url: `${backendDomain}/api/v1/banner`,
    method: "POST",
  },

  uploadBanner:{
    url: `${backendDomain}/api/v1/banner/uploadImageBanner`,
    method: "POST",
  },

  getBanner:{
    url: `${backendDomain}/api/v1/banner`,
    method: "GET",
  },
  getBannerByCode:{
    url: `${backendDomain}/api/v1/banner/getByCodes/:code`,
    method: "GET",
  },

  deleteBanner:{
    url: `${backendDomain}/api/v1/banner/:id`,
    method: "DELETE",
  },

  

  createFeedback:{
    url: `${backendDomain}/api/v1/feedback`,
    method: "POST",
  },

  getAllFeedBack:{
    url: `${backendDomain}/api/v1/feedback`,
    method: "GET",
  },
  deleteFeedBack:{
    url: `${backendDomain}/api/v1/feedback/:id`,
    method: "DELETE",
  },
};

export { backendDomain, SummaryApi };
