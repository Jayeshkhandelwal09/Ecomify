const express = require("express");
const passport = require("passport");
require("dotenv").config();0
const router = express.Router();
const generateToken = require("../utils/generateToken")
  


// Redirect to Google for authentication
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback route
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login/failed",
     session: false 
    }),
  (req, res) => {
    try {
      const user = req.user;
      const token = generateToken(user._id)
  
      return res.redirect(
        `https://reelifymoviedb.netlify.app/auth/success?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`
      );
    } catch (error) {
      console.error("Callback error:", error);
      return res.redirect('http://localhost:3000/auth/error');
    }
    
  }
);

module.exports = router;
