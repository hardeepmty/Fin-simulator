const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  try {
    console.log("Incoming request body:", req.body);

    const { name, email, password, number } = req.body;

    const existingUser = await User.findOne({ email });
    console.log("Existing user check:", existingUser);

    if (existingUser) {
      console.log("User already exists with email:", email);
      return res.status(400).json({ message: "User already exists. Please sign in." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("Hashed password:", hashedPassword);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      number,
    });

    console.log("New user object created:", newUser);

    await newUser.save();
    console.log("New user saved to database:", newUser);

    res.status(201).json({
      message: "Sign-up successful.",
      user: newUser,
    });

  } catch (error) {
    console.error("Error during sign-up process:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
