import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonList from "./components/PersonList";
import personService from "./services/persons";

const Footer = () => {
  const footerStyle = {
    color: "green",
    fontStyle: "italic",
    fontSize: 16,
  };
  return (
    <div style={footerStyle}>
      <br />
      <em>
        Phonebook app, Department of Computer Science, University of Helsinki
        2024
      </em>
    </div>
  );
};
const Notification = ({ messageStyle, message }) => {
  if (message === null) {
    return null;
  }

  return <div className={messageStyle}>{message}</div>;
};
function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [personShow, setPersonShow] = useState([]);
  const [personMessage, setPersonMessage] = useState("");
  const [messageStyle, setMessageStyle] = useState("");

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };
  const handleFIlterNameChange = (event) => {
    const value = event.target.value;
    setFilterName(value);
    const filteredNames =
      value === ""
        ? persons
        : persons.filter((person) =>
            person.name.toLowerCase().includes(value.toLowerCase())
          );
    setPersonShow(filteredNames);
  };
  const hadleDeletePerson = (id, name) => {
    if (window.confirm(`Eliminar a : ${name} ?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setPersonShow(persons.filter((person) => person.id !== id));
          mostrarMensaje("redmessage", name, "Eliminado de la Agenda");
        })
        .catch((error) => {
          mostrarMensaje("redmessage", name, "No Existe en el Servidor");
        });
    }
  };

  const mostrarMensaje = (messageStyle, name, message) => {
    setPersonMessage(`${name}  ${message}`);
    setMessageStyle(messageStyle);
    setTimeout(() => {
      setPersonMessage(null);
    }, 10000);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    if (persons.some((person) => person.name === newName)) {
      const id = persons.find((person) => person.name === newName).id;
      const confirmationMessage = `${newName} ya esta en la Agenda. Desea Remplazar su numero por ${newNumber}`;
      if (window.confirm(confirmationMessage)) {
        personService
          .update(id, personObject)
          .then(() => {
            personService.getAll().then((initialpersons) => {
              setPersons(initialpersons);
              setPersonShow(initialpersons);
              mostrarMensaje(
                "greenmessage",
                newName,
                "fue actualizado en la agenda"
              );
            });
          })
          .catch((error) => {
            mostrarMensaje("redmessage", newName, "No Existe en el Servidor");
          });
        setNewName("");
        setNewNumber("");
      }
    } else {
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setPersonShow(persons.concat(returnedPerson));
        mostrarMensaje("greenmessage", newName, "añadido a la agenda");
      });
      setNewName("");
      setNewNumber("");
    }
  };
  useEffect(() => {
    personService.getAll().then((initialpersons) => {
      setPersons(initialpersons);
      setPersonShow(initialpersons);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification messageStyle={messageStyle} message={personMessage} />
      <Filter
        filterName={filterName}
        handleFIlterNameChange={handleFIlterNameChange}
      />
      <h2>Añadir Nuevo</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Lista</h2>
      <PersonList
        personShow={personShow}
        hadleDeletePerson={hadleDeletePerson}
      />
      <Footer />
    </div>
  );
}

export default App;
