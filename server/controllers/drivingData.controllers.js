import dotenv from "dotenv";

dotenv.config();

// PERSONAL ACCESS TOKEN
const getPersonalData = async (req, res) => {
  try {
    const response = await fetch("https://garage61.net/api/v1/me", {
      headers: {
        Authorization: `Bearer ${process.env.GARAGE61_BEARER_TOKEN}`,
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
};

// Get driving data
const personalDrivingData = async (req, res) => {
  try {
    const response = await fetch("https://garage61.net/api/v1/driving_data", {
      headers: {
        Authorization: `Bearer ${process.env.GARAGE61_BEARER_TOKEN}`,
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
};

export default {
  getPersonalData,
  personalDrivingData,
};
