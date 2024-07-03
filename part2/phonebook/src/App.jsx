import { useState, useEffect } from "react";
import "./index.css";

// components
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personService from "./services/persons";

const App = () => {
  // initial states
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState("");

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
      personService
        .create(personObject)
        .then((returnedPerson) => {
          // update persons state after sending object to backend/db
          setPersons(persons.concat(returnedPerson));
          setNotificationMessage(`Added ${newName}`);
          setNotificationType("message");
        })
        .catch((error) => {
          setNotificationMessage(error.response.data.error);
          setNotificationType("error");
        });
      setNewName("");
      setNewNumber("");
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  // delete person from state/erver
  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService.deleteObject(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
        setNotificationMessage(`Deleted ${name}`);
        setNotificationType("message");
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      });
    }
  };

  // update number for person from state/server
  const updatePerson = (person) => {
    if (
      window.confirm(
        `${newName} is already added to phonebook, replace the older number with a new one?`
      )
    ) {
      const updatedPerson = { ...person, number: newNumber };
      personService
        .update(person.id, updatedPerson)
        .then((returnedPerson) => {
          setPersons(
            persons.map((p) => (p.id !== person.id ? p : returnedPerson))
          );
        })
        .catch(() => {
          setNotificationMessage(
            `Information of ${person.name} has already been removed from server`
          );
          setNotificationType("error");
          setPersons(persons.filter((p) => p.id !== person.id));
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        });
      setNewName("");
      setNewNumber("");
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
      <Notification message={notificationMessage} type={notificationType} />
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
