const express = require("express");
const router = express.Router();
const db = require("../config/db");
const verifyToken = require("../middleware/auth");

// ===================== DASHBOARD STATS =====================

router.get("/stats", verifyToken, (req, res) => {

    const dashboardData = {};

    db.query("SELECT COUNT(*) AS totalUsers FROM users", (err, userResult) => {

        if (err) {
            return res.status(500).json({
                message: "Failed to Fetch Users"
            });
        }

        dashboardData.totalUsers = userResult[0].totalUsers;

        db.query("SELECT COUNT(*) AS totalPolicies FROM policies", (err, policyResult) => {

            if (err) {
                return res.status(500).json({
                    message: "Failed to Fetch Policies"
                });
            }

            dashboardData.totalPolicies = policyResult[0].totalPolicies;

            res.status(200).json(dashboardData);

        });

    });

});

module.exports = router;