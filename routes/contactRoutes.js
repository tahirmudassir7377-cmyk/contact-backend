const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// POST - save a new contact message
router.post("/", async (req, res) => {
  try {
    const { name, email, websiteLink, message } = req.body;

    if (!name || !email || !websiteLink || !message) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }

    const newContact = new Contact({
      name,
      email,
      websiteLink,
      message,
    });

    await newContact.save();

    res.status(201).json({
      message: "Contact saved successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET - fetch all saved contact messages
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ _id: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;