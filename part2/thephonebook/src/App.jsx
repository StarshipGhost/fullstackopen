import { useState } from "react";

const initialPersons = [{ name: "Arto Hellas", number: "040-1234567" }];

const App = () => {
  const [persons, setPersons] = useState(initialPersons);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

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

  const nameChange = (event) => {
    setNewName(event.target.value);
  };

  const numberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={nameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={numberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(({ name, number }) => (
        <div key={name}>
          {name} {number}
        </div>
      ))}
    </div>
  );
};

export default App;
