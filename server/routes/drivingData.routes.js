import express from "express";
import drivingDataControllers from "../controllers/drivingData.controllers.js";

const { getPersonalData, personalDrivingData } = drivingDataControllers;

const router = express.Router();

// Garage61 Driving Data - Personal Data
router.get("/api/me", getPersonalData);
router.get("/api/driving-data", personalDrivingData);

export default router;
