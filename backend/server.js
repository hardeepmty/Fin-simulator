require("dotenv").config();

const express = require("express");
const app = express();
const connect = require("./database/connect");
const cors = require("cors");
const mongoose = require("mongoose"); 

const routes = require("./routes/route");

const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors());

connect();

app.use("/api", routes);

app.get("/api/health", async (req, res) => {
  try {
    const dbState = mongoose.connection.readyState; 
    if (dbState === 1) { 
      res.status(200).json({ status: "healthy", dbConnection: "connected" });
    } else {
      res.status(500).json({ status: "unhealthy", dbConnection: "not connected" });
    }
  } catch (error) {
    res.status(500).json({ status: "unhealthy", dbConnection: "error", error: error.message });
  }
});


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
