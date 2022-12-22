
import connectDB from "../../../database/connection";
import User from "../../../models/schema";

export default async function handler(req, res) {
  connectDB();

  // Check if the request is a POST request
  if (req.method === "POST") {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Missing name, email or password" });
    }

    try {
      // Check for existing user
      const exist = await User.findOne({ email });
      if (exist) {
        return res.status(400).json({ success: false, message: "User already exists" });
      } else {
        // Create new user
        await User.create(req.body, (err, user) => {
          if (err) {
            console.log({ user_creation_error: err });
            return res.status(500).json({ success: false, message: "Internal server error" });
          }
          if (user) {
            res.status(201).json({ success: true, message: "User created" });
          }
        });
      };
    } catch (err) {
      console.log({ try_catch_error: err });
      res.status(500).json({ success: false, message: "Internal server error" });
    }

  } else {
    res.status(500).json({ success: false, message: "HTTP method not allowed" });
  }
}