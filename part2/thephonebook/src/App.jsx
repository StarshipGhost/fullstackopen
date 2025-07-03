import { useState } from "react";
import { useEffect } from "react";
import personsService from "./services/persons";

const initialPersons = [];

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

const Person = ({ name, number, deletePersonFunction }) => {
  return (
    <div>
      {name} {number}
      <button onClick={deletePersonFunction}>delete</button>
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState(initialPersons);
  useEffect(() => {
    personsService.getAllPerson().then((persons) => {
      setPersons(initialPersons.concat(persons));
    });
  }, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [query, setQuery] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    if (newName.length === 0) {
      alert(`You've entered an invalid name or number`);
    } else if (persons.map(({ name }) => name).includes(newName)) {
      if (persons.map(({ number }) => number).includes(newNumber)) {
        alert(`${newName} is already added to phonebook`);
      } else {
        if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          const person = persons.find(({ name }) => name === newName);
          const updatedPerson = { ...person, number: newNumber };
          personsService
            .updatePerson(updatedPerson.id, updatedPerson)
            .then(
              setPersons(
                persons.map((person) =>
                  person.id === updatedPerson.id ? updatedPerson : person
                )
              )
            );
        }
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(newPerson));
      personsService.createPerson(newPerson).then((person) => {
        setPersons(persons.concat(person));
      });
      setNewName("");
      setNewNumber("");
    }
  };

  const deletePerson = (persons, idPerson) => {
    personsService
      .deletePerson(idPerson)
      .then(setPersons(persons.filter(({ id }) => id !== idPerson)));
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
      <h2>Numbers</h2>
      {filteredPersons.map(({ name, number, id }) => (
        <Person
          key={id}
          name={name}
          number={number}
          deletePersonFunction={() => deletePerson(filteredPersons, id)}
        />
      ))}
    </div>
  );
};

export default App;
