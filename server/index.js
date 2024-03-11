const express = require('express');
const app = express();

const userRoutes = require('./routes/User');
const profileRoutes = require('./routes/Profile');
const paymentRoutes = require('./routes/Payments');
const courseRoutes = require('./routes/Course');

const database = require('./config/database');
const cookieParser = require('cookie-parser');
const { cloudinaryConnect } = require('./config/cloudinary');

const cors = require('cors');
const fileUplaod = require('express-fileupload');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 4000;

//databaseConnect
database.connect();

//middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.REACT_URL,
    credentials:true,
  })

)

app.use(
  fileUplaod({
    useTempFiles: true ,
    tempFileDir : '/tmp/'
  })
)

//cloudinary connect
cloudinaryConnect();

//routes
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/course', courseRoutes);
app.use('/api/v1/payment', paymentRoutes);


app.get('/', (req, res) => {
  return res.json({
    success: true,
    message: "Your server is running"
  });
});


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})
