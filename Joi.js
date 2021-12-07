const Joi = require("joi");
const express = require("express");
const app = express();
app.use(express.json());

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

app.get("/users", (req, res) => {
  if (req.length === 0) {
    return res.status(204);
  }
  res.send(users);
});

app.post("/api/add/user", (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
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

app.put("/api/users/:id", (req, res) => {
  //Look uo the user
  //If not existing, return 404
  const user = users.find((e) => e.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).send("Nessun utente trovato");
  }

  // Validate
  //If invalid, return 400
  const { error } = validateUser(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //Update users
  user.name = req.body.name;
  //Return update users
  res.send(user);
});

app.delete("/api/delete/:id", (req, res) => {
  //Look uo the user
  //If not existing, return 404
  const user = users.find((e) => e.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).send("Nessun utente trovato");
  }

  //Delete
  const index = users.indexOf(user);
  users.splice(index, 1);

  //return users
  res.send(user);
});

function validateUser(user) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(user, schema);
}
