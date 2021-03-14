require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const users = require("./routes/users");
const auth = require("./routes/auth");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/users", users);
app.use("/api/auth", auth);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Couldn't connected to MongoDB", error));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("App is listening on prot", port));
