import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";
import { Admin } from "../models/adminModel.js";

const NODE_ENV =process.env.NODE_ENV;

export const adminSignup = async (req, res, next) => {
    try {
        const { name, emailId, password, contactNumber, } = req.body;

        if (!name || !emailId || !password || !contactNumber) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const isadminExist = await Admin.findOne({ emailId });
        if (isadminExist) {
            return res.status(404).json({ message: "Admin already exists" });
        }

        const hashPassword = bcrypt.hashSync(password, 10);

         // Generate Google-style profile icon with the first letter of the name
         const firstLetter = name[0]?.toUpperCase() || "U"; // Default to "U" if name is empty
         const profileImg = `https://ui-avatars.com/api/?name=${firstLetter}&background=random`;
 

        const adminData = new Admin({
            name,
            emailId,
            password: hashPassword,
            contactNumber,
            profileImg
        });
        await adminData.save();

        const token = generateToken(adminData._id);
        //res.cookie("token", token);
        res.cookie("token", token, {
            sameSite: NODE_ENV === "production" ? "None" : "Lax",
            secure: NODE_ENV === "production",
            httpOnly: NODE_ENV === "production",
        });
      


        // Return the response without the password field
        const { password: _, ...adminWithoutPassword } = adminData.toObject();
        return res.status(200).json({ data: adminWithoutPassword, message: "admin Created Successfully" });

    } catch (error) {
        return res.status(error.status || 500).json({
            message: error.message || "Internal Server Error",
        });
    }
};

export const adminLogin = async (req, res, next) => {
    try {
        const { emailId, password } = req.body;

        if (!emailId || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const adminExist = await Admin.findOne({ emailId });

        if (!adminExist) {
            return res.status(404).json({ message: "admin does not exist" });
        }

        const passwordMatch = bcrypt.compareSync(password, adminExist.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "admin not authenticated" });
        }

        const token = generateToken(adminExist._id, "theatre_admin");
        // res.cookie("token", token);
        res.cookie("token", token, {
            sameSite: NODE_ENV === "production" ? "None" : "Lax",
            secure: NODE_ENV === "production",
            httpOnly: NODE_ENV === "production",
        });

        // Return the response without the password field
        const { password: _, ...adminWithoutPassword } = adminExist.toObject();
        return res.status(200).json({
            data: adminWithoutPassword,
            message: "admin login successful.",
        });

    } catch (error) {
        console.error("Error during admin login:", error);
        return res.status(error.status || 500).json({
            message: error.message || "Internal Server Error",
        });
    }
};

export const adminProfile = async (req, res, next) => {
    try {
        const adminId = req.user.id;
        const adminData = await Admin.findById(adminId).select("-password");
        return res.json({ data: adminData, message: "admin profile fetched" });
    } catch (error) {
        return res.status(error.status || 400 || 500).json({message:error.message || "Invalid Input" || "Internal Server Error"})

    }
};

export const adminProfileUpdate = async (req, res, next) => {
    try {
        const adminId = req.user.id;
        const updatedData = req.body;
        const updatedAdmin = await Admin.findByIdAndUpdate(adminId, {$set: updatedData}).select("-password");
        if(!updatedAdmin){
            return res.status(404).json({ message: "user not found" });
        }
        return res.json({ data: updatedAdmin, message: "user profile updated successfully" });
    } catch (error) {
        return res.status(error.status || 500).json({message:error.message || "Internal Server Error"})
    }
};

export const adminLogout = async (req, res, next) => {
    try {
        res.clearCookie("token", {
            maxAge: -1,
            sameSite: NODE_ENV === "production" ? "None" : "Lax",
            secure: NODE_ENV === "production",
            httpOnly: NODE_ENV === "production",
        });

        return res.json({ message: "admin logout success" });
    } catch (error) {
        return res.status(error.status || 400 || 500).json({message:error.message || "Invalid Input" || "Internal Server Error"})

    }
};
export const checkAdmin = async (req, res, next) => {
    try {
        res.json({ success: true, message: "admin authorised" });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || "Internal server error");
    }
};