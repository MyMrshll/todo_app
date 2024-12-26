const express = require("express");
const app = express();
const cors = require("cors");
const {getData, addData, deleteData, updateData} = require("./controllers");
const log = require("./log");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(log)
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("API TODO APP TASK");
});

app.get("/task", getData );

app.post("/task", addData);

app.delete("/task/:id", deleteData);

app.put("/task/:id", updateData);


app.listen(3020, () => {
  console.log("Server is running on http://localhost:3020");
});
