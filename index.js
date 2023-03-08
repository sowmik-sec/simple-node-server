const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Simple node server runnign");
});

const users = [
  { id: 1, name: "Ahsan", email: "ahsan@gmail.com" },
  { id: 2, name: "Habib", email: "habib@gmail.com" },
  { id: 3, name: "Sowmik", email: "sowmik@gmail.com" },
];

app.get("/users", (req, res) => {
  res.send(users);
});
app.post("/users", (req, res) => {
  console.log("Post API called");
  const user = req.body;
  user.id = users.length + 1;
  users.push(user);
  res.send(user);
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`Simple node server running on port ${port}`);
});
