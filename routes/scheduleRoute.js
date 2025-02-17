import e from "express";
import { adminAuth } from "../middlewares/adminAuth.js";
import { addSchedule, getSchedule } from "../controllers/scheduleController.js";

const router = e.Router();

router.post("/add-schedule/", adminAuth, addSchedule);
router.get("/get-schedule", getSchedule);
router.get("/get-scheduleAll/:screenId", getSchedule);


export {router as scheduleRouter}