const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
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

/*
username: sowmiksec
password: TIkkuznJPmVphR77
*/

const uri =
  "mongodb+srv://sowmiksec:TIkkuznJPmVphR77@cluster0.xgh8h2c.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    const userCollection = client.db("simpleNode").collection("users");
    const user = { name: "Habib Ahsan", email: "sec.sowmik@gmail.com" };
    // const result = await userCollection.insertOne(user);
    // console.log(result);
    app.post("/users", async (req, res) => {
      const user = req.body;
      // users.push(user);
      const result = await userCollection.insertOne(user);
      console.log(result);
      user.id = result.insertedId;
      res.send(user);
    });
  } finally {
  }
}
run().catch((err) => console.log(err));

app.get("/users", (req, res) => {
  if (req.query.name) {
    const search = req.query.name;
    const filtered = users.filter(
      (usr) => usr.name.toLowerCase().indexOf(search) >= 0
    );
    res.send(filtered);
  } else {
    res.send(users);
  }
});
// app.post("/users", (req, res) => {
//   console.log("Post API called");
//   const user = req.body;
//   user.id = users.length + 1;
//   users.push(user);
//   res.send(user);
//   console.log(req.body);
// });

app.listen(port, () => {
  console.log(`Simple node server running on port ${port}`);
});
