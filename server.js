import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import stripeRoutes from "./routes/stripe.js";
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/stripe", stripeRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("AccentShift Backend Running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
