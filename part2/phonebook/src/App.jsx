import { useState, useEffect } from "react";

// components
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  // initial states
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  // effect hook to fetch data from server on initial render
  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  // add/update person to state/server
  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      updatePerson(existingPerson);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  // delete person from state/erver
  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService.deleteObject(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  // update number for person from state + servr
  const updatePerson = (person) => {
    if (
      window.confirm(
        `${newName} is already added to phonebook, replace the older number with a new one?`
      )
    ) {
      const updatedPerson = { ...person, number: newNumber };
      personService.update(person.id, updatedPerson).then((returnedPerson) => {
        setPersons(
          persons.map((p) => (p.id !== person.id ? p : returnedPerson))
        );
        setNewName("");
        setNewNumber("");
      });
    }
  };

  // filter name function
  const filterPersons = (keyword) => {
    return persons.filter((person) =>
      person.name.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  // update form values by updating state
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={filterPersons(newFilter)} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
