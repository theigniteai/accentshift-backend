import express from "express";
const router = express.Router();

router.post("/webhook", (req, res) => {
    res.json({ message: "Stripe Webhook hit" });
});

export default router;