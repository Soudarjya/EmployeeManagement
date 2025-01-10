const express = require('express');
const {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
} = require('../controller/employeeController');
const { authenticate, authorizeRoles,partialAuthorize } = require('../middleware/authMiddleware');
const router = express.Router();

// router.use(authenticate);

router.get('/', authorizeRoles('Admin', 'Manager','RegularUser'), getAllEmployees);
router.post('/', authorizeRoles('Admin','Manager'), createEmployee);
router.get('/:id', authorizeRoles('Admin','Manager','RegularUser'), getEmployeeById);
router.put('/:id', authorizeRoles('Admin','Manager'),updateEmployee);
router.delete('/:id', authorizeRoles('Admin','Manager'), deleteEmployee);

module.exports = router;
