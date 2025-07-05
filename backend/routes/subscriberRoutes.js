import express from "express";
import { Subscriber } from "../models/Subscriber.js";

const router = express.Router();

router.post("/subscribe", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const alreadyExists = await Subscriber.findOne({ email });
    if (alreadyExists) {
      return res.status(400).json({ message: "Already subscribed" });
    }

    const subscriber = await Subscriber.create({ email });
    res.status(201).json({ message: "Subscribed successfully", subscriber });
  } catch (error) {
    res.status(500).json({ message: "Error subscribing", error: error.message });
  }
});

export default router;
