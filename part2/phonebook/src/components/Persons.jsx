const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.map((person) => (
        <Person
          key={person.name}
          person={person}
          deletePerson={() => deletePerson(person.id, person.name)}
        />
      ))}
    </div>
  );
};

const Person = ({ person, deletePerson }) => (
  <div>
    {person.name} {person.number}
    <button onClick={deletePerson}>delete</button>
  </div>
);

export default Persons;
