import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";

export const userSignup = async (req, res, next) => {
    try {
        const { name, emailId, password, contactNumber, location } = req.body;

        if (!name || !emailId || !password || !contactNumber || !location) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const isUserExist = await User.findOne({ emailId });
        if (isUserExist) {
            return res.status(404).json({ message: "User already exists" });
        }

        const hashPassword = bcrypt.hashSync(password, 10);

         // Generate Google-style profile icon with the first letter of the name
         const firstLetter = name[0]?.toUpperCase() || "U"; // Default to "U" if name is empty
         const profileImg = `https://ui-avatars.com/api/?name=${firstLetter}&background=random`;
 

        const userData = new User({
            name,
            emailId,
            password: hashPassword,
            contactNumber,
            location,
            profileImg,
        });
        await userData.save();

        const token = generateToken(userData._id);
        res.cookie("token", token);

        // Return the response without the password field
        const { password: _, ...userWithoutPassword } = userData.toObject();
        return res.status(200).json({ data: userWithoutPassword, message: "User Created Successfully" });

    } catch (error) {
        return res.status(error.status || 500).json({
            message: error.message || "Internal Server Error",
        });
    }
};

export const userLogin = async (req, res, next) => {
    try {
        const { emailId, password } = req.body;

        if (!emailId || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExist = await User.findOne({ emailId });

        if (!userExist) {
            return res.status(404).json({ message: "User does not exist" });
        }

        const passwordMatch = bcrypt.compareSync(password, userExist.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const token = generateToken(userExist._id);
        res.cookie("token", token);

        // Return the response without the password field
        const { password: _, ...userWithoutPassword } = userExist.toObject();
        return res.status(200).json({
            data: userWithoutPassword,
            message: "User login successful.",
        });

    } catch (error) {
        console.error("Error during user login:", error);
        return res.status(error.status || 500).json({
            message: error.message || "Internal Server Error",
        });
    }
};

export const userProfile = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const userData = await User.findById(userId).select("-password");
        return res.json({ data: userData, message: "user profile fetched" });
    } catch (error) {
        return res.status(error.status || 400 || 500).json({message:error.message || "Invalid Input" || "Internal Server Error"})

    }
};

export const userLogout = async (req, res, next) => {
    try {
        res.clearCookie("token");

        return res.json({ message: "user logout success" });
    } catch (error) {
        return res.status(error.status || 400 || 500).json({message:error.message || "Invalid Input" || "Internal Server Error"})

    }
};