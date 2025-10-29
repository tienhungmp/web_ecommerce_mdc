const express = require('express');
const router = express.Router();
const { 
  createBanner, 
  getAllBanners, 
  getBannerById, 
  updateBanner, 
  deleteBanner, 
  getBannersByCodes,
  uploadImageBanner
} = require('../controllers/bannerController');

router
  .route('/')
  .post(createBanner)
  .get(getAllBanners);

router
  .route('/:id')
  .get(getBannerById)
  .put(updateBanner)
  .delete(deleteBanner);

router
  .route('/getByCodes/:code')
  .get(getBannersByCodes);

router
  .route('/uploadImageBanner')
  .post(uploadImageBanner);

module.exports = router;
