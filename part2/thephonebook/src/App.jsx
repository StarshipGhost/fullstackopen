import { useState } from "react";
import { useEffect } from "react";
import personsService from "./services/persons";
import "./index.css";

const initialPersons = [];
const Notification = ({ message, isSuccess }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className={isSuccess ? "notification success" : "notification error"}>
      {message}
    </div>
  );
};

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
      <form onSubmit={addPersonFunction} className="person-form">
        <div className="person-form">
          <label for="name">name:</label>
          <input id="name" value={nameValue} onChange={onNameChange} />
        </div>
        <div className="person-form">
          <label for="number">number:</label>
          <input id="number" value={numberValue} onChange={onNumberChange} />
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
    <div className="person-item">
      <span className="person-name">{name}</span>
      <span className="person-number">{number}</span>
      <button className="person-button" onClick={deletePersonFunction}>delete</button>
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
  const [notification, setNotification] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);

  const addPerson = (event) => {
    event.preventDefault();
    if (newName.length === 0) {
      alert(`You've entered an invalid name or number`);
    } else if (persons.map(({ name }) => name).includes(newName)) {
      if (persons.map(({ number }) => number).includes(newNumber)) {
        alert(`${newName} is already added to phonebook`);
      } else {
        if (
          confirm(
            `${newName} is already added to phonebook, replace the old number with a new one?`
          )
        ) {
          const person = persons.find(({ name }) => name === newName);
          const updatedPerson = { ...person, number: newNumber };
          personsService
            .updatePerson(updatedPerson.id, updatedPerson)
            .then(() => {
              setPersons(
                persons.map((person) =>
                  person.id === updatedPerson.id ? updatedPerson : person
                )
              );
            })
            .then(() => {
              setIsSuccess(true);
              setNotification(`Added ${newName}`);
              setTimeout(() => setNotification(null), 5000);
            })
            .catch(() => {
              setIsSuccess(false);
              setNotification(
                `Information of ${newName} has already been removed from server`
              );
              setTimeout(() => setNotification(null), 5000);
            });
          setNewName("");
          setNewNumber("");
        }
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      personsService
        .createPerson(newPerson)
        .then((person) => {
          setPersons(persons.concat(person));
          setIsSuccess(true);
          setNotification(`Added ${newName}`);
        })
        .finally(() => {
          setTimeout(() => setNotification(null), 5000);
        });
      setNewName("");
      setNewNumber("");
    }
  };

  const deletePerson = (idPerson) => {
    personsService
      .deletePerson(idPerson)
      .then(
        setPersons((persons) => persons.filter(({ id }) => id !== idPerson))
      );
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
      <Notification message={notification} isSuccess={isSuccess} />
      <Filter value={query} onChange={handleFilterChange}></Filter>
      <PersonForm
        addPersonFunction={addPerson}
        nameValue={newName}
        onNameChange={handleNameChange}
        numberValue={newNumber}
        onNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <div className="persons">
      {filteredPersons.map(({ name, number, id }) => (
        <Person
          key={id}
          name={name}
          number={number}
          deletePersonFunction={() => deletePerson(id)}
        />
      ))}
      </div>
    </div>
  );
};

export default App;
