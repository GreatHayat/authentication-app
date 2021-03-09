require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const users = require("./routes/users");

const app = express();

app.use(express.json());
app.use("/api/users", users);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Couldn't connected to MongoDB", error));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("App is listening on prot", port));
