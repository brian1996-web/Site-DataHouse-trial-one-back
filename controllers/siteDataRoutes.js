const express = require("express");
const router = express.Router();
const SiteData = require("../models/siteDataModel");

router.post("/siteData", async (req, res) => {
  try {
    console.log("received site data:", req.body);
    const { siteTitle, siteType, rows } = req.body;

    let siteData = await SiteData.findOne({ siteTitle });
    if (siteData)
      return res.status(400).json({ message: "Existing site " });

    //saving anew site to the database
    siteData = new SiteData({
      siteTitle,
      siteType,
      rows,
    });
    await siteData.save();
    return res.status(201).json({ message: "Site data stored successfully" });
  } 
  catch(error) {
    console.error(error);
    return res.status(500).json({message:"server error"});
   
  }
});

router.get("/siteData", async (req, res) => {
  try {
    const siteData = await SiteData.find(); // Fetch all site data
    res.status(200).json(siteData);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
    console.error(error);
  }
});


module.exports = router;
