import { Schedule } from "../models/scheduleModel.js";

export const getSchedule = async (req, res) => {
    try {
        const schedules = await Schedule.find().populate('movieId', "title languages").populate('screenId', "-seats");
        res.status(200).json({ data: schedules, message: "Fetching Schedule Details" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching schedules' });
    }
};

export const getScheduleAll = async (req, res) => {
    try {
        const {screenId} = req.params
        console.log("Received screenId:", screenId);
        // Fetch all schedules and populate movie and screen details
        const schedules = await Screen.findById(screenId)
        console.log("Fetched Schedules:", schedules);
        res.status(200).json({ data: schedules, message: "Fetching Schedule Details" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching schedules' });
    }
};



export const addSchedule = async (req, res) => {
    try {
        const { movieId, screenId, showTime, showDate, seatsAvailable,cancellationAvailable } = req.body;
    
        const movieData = new Schedule({
          movieId,
          screenId,
          showDate,
          showTime,
          seatsAvailable,
          cancellationAvailable
        });
    
        await movieData.save();
        res.status(201).json({ message: 'Movie schedule created successfully', data : movieData });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating movie schedule', error });
      }
};


export const updateSchedule = async (req, res, next) => {
    const{_id} =req.body
    console.log(_id)
    const updatedData = req.body;
    try {
        const updatedSchedule = await Schedule.findByIdAndUpdate(_id, updatedData,{new : true});
        if(!updatedSchedule){
            return res.status(404).json({ message: "Schedule not found" });
        }
        return res.json({ data: updatedSchedule, message: "Schedule updated successfully" });
    } catch (error) {
        return res.status(error.status || 500).json({message:error.message || "Internal Server Error"})
    }
};