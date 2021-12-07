const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs");
const users = [
  {
    name: "mahesh",
    password: "password1",
    profession: "teacher",
    id: 1,
  },

  {
    name: "suresh",
    password: "password2",
    profession: "librarian",
    id: 2,
  },

  {
    name: "ramesh",
    password: "password3",
    profession: "clerk",
    id: 3,
  },
];
app.get("/", (req, res) => {
  fs.readFile(__dirname + "/" + "users.json", "utf8", (err, data) => {
    if (err) console.log(err);
    res.send(JSON.parse(data));
    res.end();
  });
});

app.get("/ciaone", (req, res) => {
  res.send("CIAONEEEE");
  res.end();
});

app.get("/api/courses/:anno/:mese/:giorno", (req, res) => {
  res.send(req.params);
});

app.get("/api/users", (req, res) => {
  res.send(users);
});

app.get("/api/user/:id", (req, res) => {
  const user = users.find((e) => e.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).send("Nessun utente trovato");
  }
  res.send(user);
});

app.post("/api/add/user", (req, res) => {
  if (!req.body.name || req.body.name.length < 3) {
    return res.status(400).send("Inserire almeno 3 caratteri");
  }

  const userss = {
    id: users.length + 1,
    name: req.body.name,
  };
  users.push(userss);
  res.send(users);
});

//LISTEN TO THE PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
