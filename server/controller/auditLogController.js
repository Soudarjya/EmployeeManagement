const AuditLog=require('../models/auditLog');

// Get All Logs
const getAllLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find().populate('user', 'name email');
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = { getAllLogs };
