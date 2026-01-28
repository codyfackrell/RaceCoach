import express from "express";
import oauthControllers from "../controllers/oauth.controllers.js";

const { getAuthUri, getAuthToken, getPersonalData, personalDrivingData } =
  oauthControllers;

const router = express.Router();

// OAuth2 Routes
router.get("/auth", getAuthUri);
router.get("/auth/callback", getAuthToken);

router.get("/api/me", getPersonalData);
router.get("/api/driving-data", personalDrivingData);

export default router;
