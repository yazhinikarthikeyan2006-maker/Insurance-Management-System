const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res.status(401).json({
            message: "Access Denied! No Token Provided."
        });
    }

    // Remove "Bearer "
    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Invalid Token"
        });
    }

    try {

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        req.user = verified;

        next();

    } catch (err) {

        return res.status(401).json({
            message: "Invalid Token"
        });

    }

};

module.exports = verifyToken;