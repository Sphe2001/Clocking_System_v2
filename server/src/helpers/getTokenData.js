const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

/**
 * Extracts and decodes the user ID from the JWT token.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {string|null} The decoded user ID or null if an error occurred.
 */
const getTokenData = (req, res) => {
    try {
        
        const token = req.cookies?.token || req.headers?.authorization?.split(' ')[1] || '';

        if (!token) {
            throw new Error("No token provided");
        }

        
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        if (!decodedToken) {
            throw new Error("Token is invalid");
        }

        return decodedToken;
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return null;  
    }
};

module.exports = getTokenData;
