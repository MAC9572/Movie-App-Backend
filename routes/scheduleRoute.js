import e from "express";
import { adminAuth } from "../middlewares/adminAuth.js";
import { addSchedule, getSchedule, getScheduleAll,updateSchedule,getScheduleByAdmin,getScheduleById } from "../controllers/scheduleController.js";

const router = e.Router();

router.post("/add-schedule", adminAuth, addSchedule);
router.get("/get-schedule", getSchedule);
router.get("/get-scheduleAll", getScheduleAll);
router.put("/update-schedule/:scheduleId", adminAuth, updateSchedule)
router.get("/get-scheduleByAdmin", adminAuth, getScheduleByAdmin);
router.get("/get-scheduleById/:screenId", getScheduleById);
export {router as scheduleRouter}