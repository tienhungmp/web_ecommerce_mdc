const express = require('express');
const router = express.Router();
const { authenticateUser, authorizePermissions } = require('../middleware/authentication');
const {
  createWarranty,
  getAllWarranties,
  getWarrantyById,
  updateWarranty,
  deleteWarranty,
  getWarrantyDates
} = require('../controllers/warrantyController');

router
  .route('/')
  .post(authenticateUser, authorizePermissions('admin'), createWarranty)
  .get(authenticateUser, getAllWarranties);
  
router
  .route("/warranty-dates/:codeWarranty")
  .get(getWarrantyDates);


router
  .route('/:id')
  .get(getWarrantyById)
  .patch(authenticateUser, authorizePermissions('admin'), updateWarranty)
  .delete(authenticateUser, authorizePermissions('admin'), deleteWarranty);

module.exports = router;
