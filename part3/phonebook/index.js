const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

morgan.token("body", (req, res) => {
    return JSON.stringify(req.body);
})

app.use(express.json());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));
app.use(cors());

const persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
  { id: "5", name: "Saad Kalyati", number: "438-229-6003" },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);
  person ? response.json(person) : response.status(404).end();
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const updatedPersons = persons.filter((person) => person.id !== id);
  console.log(updatedPersons);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const person = request.body;
  const idPerson = Math.floor(Math.random() * 100).toString();

  if (person.name.length === 0) {
    return response.status(400).json({
      error: "name must be specified",
    });
  } else if (person.number.length === 0) {
    return response.status(400).json({
      error: "number must be specified",
    });
  } else if (persons.map((person) => person.name).includes(person.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const newPerson = { ...person, id: idPerson };
  const updatedPersons = persons.concat(newPerson);
  console.log(updatedPersons);
  response.status(200).end();
});

app.get("/info", (request, response) => {
  response.send(`<div>
                    <p>Phonebook has info for ${persons.length} people</p>
                    <p>${new Date()}</p>
                </div>`);
});

app.listen(PORT);
