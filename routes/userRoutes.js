const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");

// ===================== REGISTER =====================
router.post("/register", async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO users (name, email, password)
            VALUES (?, ?, ?)
        `;

        db.query(sql, [name, email, hashedPassword], (err, result) => {

            if (err) {

                console.log(err);

                // Duplicate Email
                if (err.code === "ER_DUP_ENTRY") {

                    return res.status(400).json({
                        message: "Email already exists!"
                    });

                }

                return res.status(500).json({
                    message: "Registration Failed"
                });

            }

            res.status(200).json({
                message: "User Registered Successfully!"
            });

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});

// ===================== LOGIN =====================
router.post("/login", (req, res) => {

    const { email, password } = req.body;

    const sql = `SELECT * FROM users WHERE email = ?`;

    db.query(sql, [email], async (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                message: "Login Failed"
            });

        }

        if (result.length === 0) {

            return res.status(401).json({
                message: "Invalid Email or Password"
            });

        }

        const isMatch = await bcrypt.compare(password, result[0].password);

        if (!isMatch) {

            return res.status(401).json({
                message: "Invalid Email or Password"
            });

        }

        const token = jwt.sign(
            {
                id: result[0].id,
                email: result[0].email,
                role: result[0].role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.status(200).json({

            message: "Login Successful!",

            token: token,

            user: {
                id: result[0].id,
                name: result[0].name,
                email: result[0].email,
                role: result[0].role
            }

        });

    });

});

// ===================== PROFILE =====================
router.get("/profile", verifyToken, (req, res) => {

    res.status(200).json({

        message: "Protected Profile Access Granted!",

        user: req.user

    });

});

module.exports = router;