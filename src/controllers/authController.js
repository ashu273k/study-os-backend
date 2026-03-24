import * as authService from "../services/authService.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const result = await authService.register({ name, email, password });
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    if (error.message === "EMAIL_EXISTS") {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    console.error("Register error: ", error);
    res.status(500).json({ success: false, message: "Registration failed" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const result = await authService.login({ email, password });
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    if (error.message === "INVALID_CREDENTIALS") {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    console.error("login error:", error);
    res.status(500).json({ success: false, message: "Login failed" });
  }
};
