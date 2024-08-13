function PersonList({ personShow, hadleDeletePerson }) {
  return (
    <div>
      <ul>
        {personShow.map((person) => (
          <li className="note" key={person.name}>
            {" "}
            {person.name} {person.number}{" "}
            <button onClick={() => hadleDeletePerson(person.id, person.name)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PersonList;
