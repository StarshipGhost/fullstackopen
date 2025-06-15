import { useState } from "react";

const initialPersons = [
  { name: "Arto Hellas", number: "040-123456", id: 1 },
  { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
  { name: "Dan Abramov", number: "12-43-234345", id: 3 },
  { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
];

const Filter = ({ value, onChange }) => {
  return (
    <div>
      filter shown with <input value={value} onChange={onChange} />
    </div>
  );
};

const PersonForm = ({
  addPersonFunction,
  nameValue,
  onNameChange,
  numberValue,
  onNumberChange,
}) => {
  return (
    <div>
      <h2>add a new</h2>
      <form onSubmit={addPersonFunction}>
        <div>
          name: <input value={nameValue} onChange={onNameChange} />
        </div>
        <div>
          number: <input value={numberValue} onChange={onNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

const Persons = ({ persons }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {persons.map(({ name, number }) => (
        <div key={name}>
          {name} {number}
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState(initialPersons);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [query, setQuery] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    if (newName.length === 0) {
      alert(`You entered an invalid name or number`);
    } else if (persons.map(({ name }) => name).includes(newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredPersons = persons.filter(({ name }) =>
    name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter value={query} onChange={handleFilterChange}></Filter>
      <PersonForm
        addPersonFunction={addPerson}
        nameValue={newName}
        onNameChange={handleNameChange}
        numberValue={newNumber}
        onNumberChange={handleNumberChange}
      />
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
