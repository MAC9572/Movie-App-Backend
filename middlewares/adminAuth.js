import jwt from "jsonwebtoken";

export const adminAuth = (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ message: "admin not authorised", success: false });
        }

        const tokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        if (!tokenVerified) {
            return res.status(401).json({ message: "admin not authorised", success: false });
        }
           
        if(tokenVerified.role != 'theatre_admin' && tokenVerified.role !='admin'){
            return res.status(401).json({ message: "user not authorised", success: false });
        }

        req.user = tokenVerified;

        next();
    } catch (error) {
        return res.status(401).json({ message: error.message || "admin authorisation failed", success: false });
    }
};