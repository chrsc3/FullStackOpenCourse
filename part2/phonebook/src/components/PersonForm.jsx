function PersonForm({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) {
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          nombre: <input value={newName} onChange={handleNameChange} />
          <br></br>
          numero: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
}

export default PersonForm;
