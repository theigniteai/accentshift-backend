import express from "express";
const router = express.Router();

router.post("/login", (req, res) => {
    res.json({ token: "demo-token" });
});

router.post("/register", (req, res) => {
    res.json({ message: "User registered" });
});

export default router;