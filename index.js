const express = require("express");
var cors = require("cors");
const app = express();

const mongoDB= require("./db");
const dotenv = require("dotenv");
dotenv.config(); 

const allowedOrigins = [
  "https://food-app-navy-nine.vercel.app", // deployed frontend
  "http://localhost:3000" // for local testing
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(express.json());

mongoDB();
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
app.use('/api/', require("./routes/CreateUser"));
app.use('/api/', require("./routes/DisplayData"));
app.use('/api/', require("./routes/OrderData"));
// ----------------production -----------------
if (process.env.NODE_ENV === 'production') 
 {
    //*Set static folder up in production
    app.use(express.static('frontend/build'));

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build','index.html')));
  }
// // ------------------production---------------

const PORT = process.env.PORT || 8000; 
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
