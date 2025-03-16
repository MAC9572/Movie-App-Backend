import { Screen } from "../models/screenModel.js"


// Create a new screen
export const addScreen = async (req, res) => {
    try {
        const { name, location, city, screenType, price, seats, theatre_admin } = req.body;

        // Validate required fields
        if (!name || !location || !city || !seats ||  !screenType) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const adminId = req.user.id
        const screen = new Screen({ name, location, city, seats, screenType,price, theatre_admin:adminId });
        const savedScreen = await screen.save();

        res.status(201).json({ data: savedScreen, message: "Screen created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};



export const getScreenById = async (req, res) => {
    try {
        const{screenId} =req.params
        console.log(screenId)
        const screens = await Screen.findById(screenId)
        res.status(200).json({ data: screens });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const getScreens = async (req, res) => {
    try {
        // Optionally, you can filter screens by theatre_admin if needed
        const adminId = req.user.id; // Assuming the user is authenticated and their ID is available

        // Fetch screens from the database
        const screens = await Screen.find({ theatre_admin: adminId });

        // Check if any screens were found
        if (screens.length === 0) {
            return res.status(404).json({ message: "No screens found for this admin." });
        }

        // Respond with the list of screens
        res.status(200).json({ data: screens, message: "Screens retrieved successfully." });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const getAllScreens = async (req, res) => {
    try {
        const screens = await Screen.find()
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