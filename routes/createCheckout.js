import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  const { plan } = req.body;

  let priceId;
  if (plan === "basic") priceId = process.env.STRIPE_BASIC_PLAN_ID;
  else if (plan === "pro") priceId = process.env.STRIPE_PRO_PLAN_ID;
  else if (plan === "enterprise") priceId = process.env.STRIPE_ENTERPRISE_PLAN_ID;
  else return res.status(400).json({ error: "Invalid plan selected." });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "subscription",
      success_url: "https://your-frontend.com/success",
      cancel_url: "https://your-frontend.com/cancel",
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err.message);
    res.status(500).json({ error: "Failed to create checkout session." });
  }
});

export default router;
