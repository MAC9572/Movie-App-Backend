import e from "express";
import { adminAuth } from "../middlewares/adminAuth.js";
import { addSchedule, getSchedule, getScheduleAll } from "../controllers/scheduleController.js";

const router = e.Router();

router.post("/add-schedule", adminAuth, addSchedule);
router.get("/get-schedule/:screenId", getSchedule);
router.get("/get-scheduleAll", getScheduleAll);


export {router as scheduleRouter}