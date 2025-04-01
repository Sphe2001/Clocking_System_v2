const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./src/helpers/dbConfig");
const authRoutes = require("./src/routes/auth/authRoutes");
const clockin = require("./src/routes/student/clock_in");
const earlyLeave = require("./src/routes/student/studentRequest/earlyLeave")
const usersRoutes = require("./src/routes/admin/fetchAllStudentUsers/users");
const supervisorUsersRoutes = require("./src/routes/admin/fetchAllSupervisorUsers/supervisorUsers");
const cors = require("cors");

const app = express();

dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", clockin)
app.use("/api", earlyLeave);
app.use("/api/admin", usersRoutes);
app.use("/api/admin", supervisorUsersRoutes);




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
