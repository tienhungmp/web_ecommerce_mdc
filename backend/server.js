require("dotenv").config()
require("express-async-errors")

const express = require("express")
const cors = require('cors');
const app = express()
const path = require('path');
app.use('/public', express.static(path.join(__dirname, 'public')));

const corsOptions = {
  origin: (origin, callback) => {
    callback(null, true);
  },
  methods: 'GET,POST,PUT,DELETE,PATCH',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));

// Rest of the packages
const morgan = require("morgan") //HTTP request logger middleware
const cookieParser = require("cookie-parser")
const fileUpload = require("express-fileupload")
// Require Database
const connectDB = require("./db/connect")
// Require Routers
const authRouter = require("./routes/authRoutes")
const userRouter = require("./routes/userRoutes")
const categoryRouter = require("./routes/categotyRoutes")
const productRouter = require("./routes/productRoutes")
const cartRouter = require("./routes/cartRoutes")
const reviewRouter = require("./routes/reviewRoutes")
const orderRouter = require("./routes/orderRoutes")
const discountRouter = require("./routes/discountRoutes")
const warrantyRouter = require("./routes/warrantyRoutes")
const feedbackRouter = require("./routes/feedbackRoutes")
const bannerRouter = require("./routes/bannerRoutes")
// Require Middleware
const notFoundMiddleware = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")

// Invoke Extra packages
app.use(morgan("tiny"))
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))
app.use(express.static("./public"))
app.use(fileUpload())

// Home get
app.get("/", (req, res) => {
  res.send("<h1> E-Commerce API</h1>")
})

// Testing route
app.get("/api/v1/", (req, res) => {
  // console.log(req.cookies)
  // console.log(req.signedCookies)
  res.send("E-commerce API")
})

// Invoke Routers
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/categories", categoryRouter)
app.use("/api/v1/products", productRouter)
app.use("/api/v1/carts", cartRouter)
app.use("/api/v1/reviews", reviewRouter)
app.use("/api/v1/orders", orderRouter) 
app.use("/api/v1/discounts", discountRouter) 
app.use("/api/v1/warranty", warrantyRouter)
app.use("/api/v1/feedback", feedbackRouter)
app.use("/api/v1/banner", bannerRouter)
// Invoke Middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5002
const start = async () => {
  try {
    // Connect database
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () =>
      console.log(`🚀 Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
