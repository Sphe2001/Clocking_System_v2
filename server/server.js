const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./src/helpers/dbConfig");
const authRoutes = require("./src/routes/auth/authRoutes");
const clockin = require("./src/routes/student/clock_in");
const earlyLeave = require("./src/routes/student/studentRequest/earlyLeave");
const clockout = require("./src/routes/student/clock_out");
const getHoursWorked = require("./src/routes/student/getHourWorked");
const fecthUsers = require("./src/routes/admin/fetchUsers/fetch");
const fetchAttendance = require("./src/routes/admin/fetchAttendance/fetch");
const weekRecords = require("./src/routes/admin/weekReports/weekRecords");
const adminRoutes = require("./src/routes/admin/adminRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");


const supervisorClockInRoute = require("./src/routes/supervisor/clock_in");
const supervisorClockOutRoute = require("./src/routes/supervisor/clock_out");


const app = express();

dotenv.config();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);

app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", clockin);
app.use("/api", clockout);
app.use("/api", getHoursWorked);
app.use("/api", earlyLeave);

app.use("/api", fecthUsers);
app.use("/api", fetchAttendance);
app.use("/api", weekRecords);
app.use("/api", adminRoutes);

app.use("/api", supervisorClockInRoute);
app.use("/api", supervisorClockOutRoute);
app.use("/api", checkRequestStatus);
app.use("/api", approveRequest);
app.use("/api", requestReview);





// Test database connection
sequelize
  .sync()
  .then(() => console.log("✅ Database synced successfully!"))
  .catch((err) => console.error("❌ Error syncing database!", err));

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
