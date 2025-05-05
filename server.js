import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import checkoutRoutes from "./routes/createCheckout.js"; // or "./routes/checkout.js"
import stripeWebhookRoutes from "./routes/stripe.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/stripe", stripeWebhookRoutes); // for webhook events (e.g., /api/stripe/webhook)
app.use("/api/checkout", checkoutRoutes);    // for user checkout (e.g., /api/checkout/create-checkout-session)

app.get("/", (req, res) => {
  res.send("AccentShift Backend Running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
