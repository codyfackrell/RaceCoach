import express from "express";

const router = express.Router();

// OAuth2 Routes
router.get("/auth");
router.get("/auth/callback");

export default router;
