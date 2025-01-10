require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const Employee = require("./models/employee");
const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const app = express();
app.use(cors());
connectDB();
app.use(express.json());
app.get("/api/dashboard", async (req, res) => {
  try {
    console.log(req.headers.role);
    
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
    res
      .status(200)
      .json({ totalEmployees, activeEmployees, newThisMonth });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
