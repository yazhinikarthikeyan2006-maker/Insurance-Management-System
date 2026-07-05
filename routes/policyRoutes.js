
const express = require("express");
const router = express.Router();
const db = require("../config/db");
const verifyToken = require("../middleware/auth");

// ===================== CREATE POLICY =====================
router.post("/", verifyToken, (req, res) => {

    const {
        policy_name,
        policy_type,
        premium,
        coverage_amount,
        duration_years
    } = req.body;

    const sql = `
        INSERT INTO policies
        (policy_name, policy_type, premium, coverage_amount, duration_years)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            policy_name,
            policy_type,
            premium,
            coverage_amount,
            duration_years
        ],
        (err, result) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    message: "Policy Creation Failed"
                });
            }

            res.status(201).json({
                message: "Policy Created Successfully!"
            });

        }
    );

});

// ===================== GET ALL POLICIES =====================
router.get("/", verifyToken, (req, res) => {

    const sql = "SELECT * FROM policies";

    db.query(sql, (err, result) => {

        if (err) {
            console.log(err);

            return res.status(500).json({
                message: "Failed to Fetch Policies"
            });
        }

        res.status(200).json(result);

    });

});

// ===================== GET POLICY BY ID =====================
router.get("/:id", verifyToken, (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT * FROM policies
        WHERE id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            console.log(err);

            return res.status(500).json({
                message: "Failed to Fetch Policy"
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "Policy Not Found"
            });
        }

        res.status(200).json(result[0]);

    });

});

// ===================== UPDATE POLICY =====================
router.put("/:id", verifyToken, (req, res) => {

    const { id } = req.params;

    const {
        policy_name,
        policy_type,
        premium,
        coverage_amount,
        duration_years
    } = req.body;

    const sql = `
        UPDATE policies
        SET
            policy_name = ?,
            policy_type = ?,
            premium = ?,
            coverage_amount = ?,
            duration_years = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            policy_name,
            policy_type,
            premium,
            coverage_amount,
            duration_years,
            id
        ],
        (err, result) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    message: "Policy Update Failed"
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Policy Not Found"
                });
            }

            res.status(200).json({
                message: "Policy Updated Successfully!"
            });

        }
    );

});

// ===================== DELETE POLICY =====================
router.delete("/:id", verifyToken, (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM policies
        WHERE id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            console.log(err);

            return res.status(500).json({
                message: "Policy Delete Failed"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Policy Not Found"
            });
        }

        res.status(200).json({
            message: "Policy Deleted Successfully!"
        });

    });

});

module.exports = router;
