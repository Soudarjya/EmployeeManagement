const dotenv = require("dotenv");
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const connectDB = require("./config/db");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const Employee = require("./models/employee");
const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const userRoutes=require('./routes/user')
const app = express();
dotenv.config();
app.use(cors());
connectDB();
app.use(express.json());
app.get("/api/dashboard", async (req, res) => {
  try {
    // console.log(req.headers.role);

    const totalEmployees = await Employee.countDocuments();
    const activeEmployees = await Employee.countDocuments({ status: "Active" });
    const currentMonth = new Date().getMonth();
    const newThisMonth = await Employee.countDocuments({
      dateOfJoining: {
        $gte: new Date(new Date().setDate(1)).toISOString(),
        $lt: new Date(
          new Date().getFullYear(),
          currentMonth + 1,
          1
        ).toISOString(),
      },
    });
    // const left = await Employee.countDocuments({
    //   leftDate: { $exists: true },
    // });
    res.status(200).json({ totalEmployees, activeEmployees, newThisMonth });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// app.get('/api/profile-picture/:filename', (req, res) => { const { filename } = req.params; const url = cloudinary.url(`profile_pictures/${filename}`); res.status(200).json({ url });});

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use('/api/user',userRoutes)
// app.use('/api/profile',profileRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
