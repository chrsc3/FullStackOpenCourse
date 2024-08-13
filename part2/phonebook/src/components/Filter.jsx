function Filter({ filterName, handleFIlterNameChange }) {
  return (
    <div>
      filtrar por nombre:{" "}
      <input value={filterName} onChange={handleFIlterNameChange} />
    </div>
  );
}

export default Filter;
