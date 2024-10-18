const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwtToken = require("jsonwebtoken");

const app = express();
const port = 2000;

// Middleware
app.use(express.json());

// Corrected CORS configuration
app.use(
  cors({
    origin: ["https://peppy-bublanina-f30247.netlify.app"], // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
    credentials: true, // Enable credentials for cookies
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  })
);

// Handle preflight requests for all routes
app.options('*', cors());

// Mongoose schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  admissionYear: {
    type: Number,
    required: true,
    min: 1000,
  },
  profilePic: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

// JWT authentication middleware
const verifyMyCookie = (req, res, next) => {
  const myCookie = req.query.myCookie; // Fetch token from query parameter or cookie
  if (!myCookie) {
    return res.status(401).json({
      message: "Unauthorized user",
    });
  }
  jwtToken.verify(myCookie, "SECRET_KEY", (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    req.userid = decoded.userId; // Store decoded userId in request
    next();
  });
};

// Signup route
app.post("/signup", async (req, res) => {
  const { password, name, email, phone, branch, admissionYear, profilePic } = req.body;
  
  if (!password || !name || !email || !phone || !branch || !admissionYear) {
    return res.status(400).json({ error: "ALL FIELDS ARE REQUIRED" });
  }

  try {
    const ifAccountAlready = await User.findOne({ email });
    if (ifAccountAlready) {
      return res.status(400).json({ error: "EMAIL ALREADY EXISTS, Please LOGIN" });
    }

    const newUser = new User({
      name,
      email,
      password,
      phone,
      branch,
      admissionYear,
      profilePic,
    });

    await newUser.save();
    return res.status(201).json({ message: "Your Account Created Successfully, Please LOGIN" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login route
app.post("/login", async (req, res) => {
  const { password, email } = req.body;

  if (!password || !email) {
    return res.status(400).json({ error: "ALL FIELDS ARE REQUIRED" });
  }

  try {
    const ifAccountAlready = await User.findOne({ email });
    if (!ifAccountAlready) {
      return res.status(400).json({ error: "Your Account Not Found" });
    }

    if (ifAccountAlready.password !== password) {
      return res.status(400).json({ error: "Incorrect Password" });
    }

    const cookie = jwtToken.sign({ userId: ifAccountAlready._id }, "SECRET_KEY", {
      expiresIn: "2d",
    });

    return res.status(200).json({ message: "Login Successfully", cookie });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Profile details route (protected)
app.get("/profile-details", verifyMyCookie, async (req, res) => {
  const userId = req.userid;
  
  try {
    const myData = await User.findById(userId);
    if (!myData) {
      return res.status(400).json({ error: "Your Account Not Found" });
    }

    return res.status(200).json({
      message: "Profile Details",
      name: myData.name,
      email: myData.email,
      phone: myData.phone,
      branch: myData.branch,
      admissionYear: myData.admissionYear,
      profilePic: myData.profilePic,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update profile route (protected)
app.put("/update-profile", verifyMyCookie, async (req, res) => {
  const { email, name, phone, branch, admissionYear, profilePic } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: "ALL FIELDS ARE REQUIRED" });
  }

  const userId = req.userid;
  
  try {
    const isAccountExist = await User.findById(userId);
    if (!isAccountExist) {
      return res.status(400).json({ error: "Your Account Not Found" });
    }

    isAccountExist.name = name;
    isAccountExist.email = email;
    isAccountExist.phone = phone;
    isAccountExist.branch = branch;
    isAccountExist.admissionYear = admissionYear;
    isAccountExist.profilePic = profilePic;
    
    await isAccountExist.save();
    return res.status(200).json({ message: "Profile Updated Successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Simple API route for testing
app.get("/api", (req, res) => {
  return res.status(200).json({ message: "Hello World" });
});

// Database connection
const databaseConnection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/libraryMangament");
    console.log("Database Connected");
  } catch (error) {
    console.log("Error while connecting database", error);
  }
};

// Start server and connect to database
app.listen(port, () => {
  console.log("Server is running on port " + port);
  databaseConnection();
});
