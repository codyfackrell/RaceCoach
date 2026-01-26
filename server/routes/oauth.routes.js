import express from "express";
import oauthControllers from "../controllers/oauth.controllers.js";

const { getAuthUri, getAuthToken } = oauthControllers;

const router = express.Router();

// OAuth2 Routes
router.get("/auth", getAuthUri);
router.get("/auth/callback", getAuthToken);

// Add to your routes - oauth.routes.js
router.get("/api/me", async (req, res) => {
  try {
    const response = await fetch("https://garage61.net/api/v1/me", {
      headers: {
        Authorization:
          "Bearer OGRHYTA5OTUTMJVMZC0ZMTG0LTK1ODITZMI4NWVMYJLHOGQ3",
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get driving data
router.get("/api/driving-data", async (req, res) => {
  try {
    const response = await fetch("https://garage61.net/api/v1/driving_data", {
      headers: {
        Authorization:
          "Bearer OGRHYTA5OTUTMJVMZC0ZMTG0LTK1ODITZMI4NWVMYJLHOGQ3",
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
