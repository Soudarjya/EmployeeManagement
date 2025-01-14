const express = require("express");
const upload = require("../middleware/multer");
const Employee = require("../models/employee"); // Replace with your Employee model
const router = express.Router();

// Upload profile picture endpoint
router.post(
  "/upload-profile-picture",
  upload.single("profilePicture"),
  async (req, res) => {
    try {
      console.log(req.body);
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const { userId } = req.body; // Extract Employee ID from the request body
      const profilePictureUrl = req.file.path; // Cloudinary URL of the uploaded file

      // Update Employee's profile picture in the database
      const updatedEmployee = await Employee.findByIdAndUpdate(
        userId,
        { profilePicture: profilePictureUrl },
        { new: true }
      );

      if (!updatedEmployee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      res.status(200).json({
        message: "Profile picture uploaded successfully",
        Employee: updatedEmployee,
      });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({
          message: "Failed to upload profile picture",
          error: err.message,
        });
    }
  }
);
module.exports = router;
