import e from "express";
import { adminAuth } from "../middlewares/adminAuth.js";
import { addSchedule, getSchedule, getScheduleAll,updateSchedule } from "../controllers/scheduleController.js";

const router = e.Router();

router.post("/add-schedule", adminAuth, addSchedule);
router.get("/get-schedule", getSchedule);
router.get("/get-scheduleAll", getScheduleAll);
router.put("/update-schedule/:scheduleId", updateSchedule)

export {router as scheduleRouter}