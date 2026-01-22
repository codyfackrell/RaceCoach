import express from "express";
import oauthControllers from "../controllers/oauth.controllers.js";

const { getAuthUri, getAuthToken } = oauthControllers;

const router = express.Router();

// OAuth2 Routes
router.get("/auth", getAuthUri);
router.get("/auth/callback", getAuthToken);

export default router;
