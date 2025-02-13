// Importing Modules
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDb = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const googleAuthRouter = require("./routes/googleAuthRoutes");
const productRoutes = require("./routes/ProductRoutes");
const cartRoutes = require("./routes/CartRoutes");
const orderRoutes = require("./routes/OrderRoutes"); 
const passport = require("./config/passport"); 
const session = require("express-session");

// Initializing express instance
const app = express();

// Importing Middlewares
app.use(
    session({
      secret: process.env.JWT_SECRET,
      resave: false,
      saveUninitialized: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.json());

// Importing Routes
app.use("/api/auth", authRoutes);
app.use("/api/auth", googleAuthRouter);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes); 

// Connecting DB
connectDb();

// Route for Backend Display page
app.get("/", (req, res) => {
    res.send(`<h1>This is the Home page, Your backend is running smoothly..Just chill</h1>`);
});

// Listening to the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
