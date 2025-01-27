import { Screen } from "../models/screenModel.js"


// Create a new screen
export const addScreen = async (req, res) => {
    try {
        const { name, location, city, seats, screenType, movieSchedules, price, cancellationAvailable, theatre_admin } = req.body;

        // Validate required fields
        if (!name || !location || !city || !seats || !screenType || !movieSchedules || !theatre_admin) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Validate `movieSchedules`
        for (const schedule of movieSchedules) {
            if (!schedule.movieId || !schedule.showDate || !schedule.showTime === undefined) {
                return res.status(400).json({ message: "Invalid movie schedule format" });
            }
        }

        const screen = new Screen({ name, location, city, seats, screenType, movieSchedules,price, cancellationAvailable, theatre_admin });
        const savedScreen = await screen.save();

        res.status(201).json({ data: savedScreen, message: "Screen created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const getAllScreens = async (req, res) => {
    try {
        const screens = await Screen.find().populate("movieSchedules.movieId", "-description -cast -crew")
        res.status(200).json({ data: screens });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const updateScreen = async (req, res, next) => {
    const {id} = req.params;
    const updatedData = req.body;
    try {
        const updatedScreen = await Screen.findByIdAndUpdate(id, updatedData,{new : true});
        if(!updatedScreen){
            return res.status(404).json({ message: "Screen not found" });
        }
        return res.json({ data: updatedScreen, message: "Screen updated successfully" });
    } catch (error) {
        return res.status(error.status || 500).json({message:error.message || "Internal Server Error"})
    }
};