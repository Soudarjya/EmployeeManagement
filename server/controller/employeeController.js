const Employee = require('../models/employee');
const {createCalendarEvent} = require('../utils/notificationService');
const {sendNotification} = require('../utils/notificationService');
// Get All Employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Create Employee
const createEmployee = async (req, res) => {
  try {
   
    const { name, email, position, department, dateOfJoining, status } = req.body;
 {if(req.headers.role=='Manager'){if(req.headers.mydepartment !== req.body.department) {
      return res.status(403).json({ message: 'You can only add employees to your department' });
    }}}
    const employee = new Employee({
      name,
      email,
      position,
      department,
      dateOfJoining,
      status,
    });

    await employee.save();
    createCalendarEvent(employee)
    // Send notification
    sendNotification(`New employee added: ${name}`);
    res.status(201).json({ message: 'Employee created successfully.', employee });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Get Employee by ID
const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found.' });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Update Employee
const updateEmployee = async (req, res) => {
  try {
    // console.log(req.body);
    // console.log(req.headers.role);
    
    // Check if the department in the header matches the department in the request body
    {if(req.headers.role=='Manager'){if(req.headers.mydepartment !== req.body.department) {
      return res.status(403).json({ message: 'This employee is not in your department' });
    }}}

    const { _id } = req.body;
    // console.log(_id);
    
    const updates = req.body;
    // console.log(updates);
    
    // Update the employee by ID
    const employee = await Employee.findByIdAndUpdate(_id, updates, { new: true });

    // Check if the employee was found
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found.' });
    }

    // Log audit change
    employee.auditLog.push({
      change: `Updated fields: ${Object.keys(updates).join(', ')}`,
      timestamp: new Date(),
    });
    await employee.save();

    // Send notification
    // sendNotification(`Employee updated: ${employee.name}`);

    // Respond with the updated employee data
    res.status(200).json(employee);
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};


// Delete Employee
const deleteEmployee = async (req, res) => {
  try {
    {if(req.headers.role=='Manager'){if(req.headers.mydepartment !== req.headers.department) {
      return res.status(403).json({ message: 'This employee is not in your department' });
    }}}
    // console.log(req.body._id);
    
    const { id } = req.params;
    // console.log(id);
    
    const employee = await Employee.findByIdAndDelete(id);
    // console.log(employee);
    
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found.' });
    }
    res.status(200).json({ message: 'Employee deleted successfully.' });
    // Send notification
    createCalendarEvent(employee);
    sendNotification(`Employee deleted: ${employee.name}`);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = {
  getAllEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
