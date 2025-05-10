const bcrypt = require("bcrypt");
const dbConnect = require("../config/dbConnection");
const User = require("../models/User");

async function seedSuperAdmin() {
  await dbConnect();

  const existingSuperAdmin = await User.findOne({ role: "super-admin" });
  if (existingSuperAdmin) {
    console.log("Super admin already exists.");
    process.exit();
  }

  const hashedPassword = await bcrypt.hash("123456", 10);

  const superAdmin = new User({
    furstName: "Super",
    lastName: "Admin",
    email: "superadmin@admin.com",
    nationalId: "12345612378914",
    phone: "01061568814",
    password: hashedPassword,
    role: "super-admin",
  });

  await superAdmin.save();
  console.log("Super admin seeded successfully!");
  process.exit();
}

seedSuperAdmin();
