require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const employees = [
  {
    fullName: "John Smith",
    idNumber: "8001015009087",
    accountNumber: "100001",
    username: "employee1",
    password: "Employee@123",
    role: "employee",
  },
{
  fullName: "Jane Doe",
  idNumber: "8501015009087",
  accountNumber: "100002",
  username: "employee2",
  password: "Employee@123",
  role: "employee",
}, 
 

  {
  fullName: "James Brown",
  idNumber: "7501015009087",
  accountNumber: "100003",
  username: "employee3",
  password: "Employee@123nn",
  role: "employee",
} ,
];

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");

  for (const emp of employees) {
    const exists = await User.findOne({ username: emp.username });
    if (!exists) {
      const salt = await bcrypt.genSalt(10);
      emp.password = await bcrypt.hash(emp.password, salt);
      await User.create(emp);
      console.log(`Created employee: ${emp.username}`);
    } else {
      console.log(`Already exists: ${emp.username}`);
    }
  }

  mongoose.disconnect();
};

seed();