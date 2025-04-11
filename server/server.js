const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./src/helpers/dbConfig");
const authRoutes = require("./src/middleware/authRoutes");
const studentRoutes = require("./src/routes/student/studentRoutes");
const supervisorRoutes = require("./src/routes/supervisor/supervisorRoutes")
const adminRoutes = require("./src/routes/admin/adminRoutes");
const auth = require("./src/middleware/authAdmin");
const cors = require("cors");
const cookieParser = require("cookie-parser");


const app = express();

dotenv.config();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/supervisor", supervisorRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/", auth);


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
