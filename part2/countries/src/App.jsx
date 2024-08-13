import { useEffect, useState } from "react";
import axios from "axios";

const ListaPaises = ({ paises, handleClickShow }) => {
  if (paises.length >= 10) {
    return <p>Ingrese más datos</p>;
  }

  return (
    <ul>
      {paises.map((pais) => (
        <li key={pais.id} style={{ padding: "5px" }}>
          {pais.name.common}
          {"  "}
          <img
            src={pais.flags.png}
            alt={pais.name.common}
            style={{ width: "20px", height: "15px" }}
          />
          {"  "}
          <button onClick={() => handleClickShow(pais.name.common)}>
            Mostrar
          </button>
        </li>
      ))}
    </ul>
  );
};
const Pais = ({ pais, clima }) => {
  const lan = pais ? Object.values(pais.languages) : [];

  const Datos = (pais) => (
    <div>
      <h1> {pais?.name.common} </h1>
      <p>capital: {pais?.capital.toString()} </p>
      <p>area: {pais?.area} </p>
      <h3> lenguajes </h3>
      {lan?.map((l) => (
        <p key={l}>{l} </p>
      ))}
      <img style={{ width: "200px", height: "150px" }} src={pais?.flags.png} />
      <h3> Clima en {pais.name.common} </h3>
      <p>temperatura: {clima.main.temp} °C</p>
      <img
        src={`https://openweathermap.org/img/wn/${clima.weather[0].icon}@4x.png`}
        alt=""
      />
      <p>viento: {clima.wind.speed} m/s</p>
    </div>
  );
  return <div>{pais && Datos(pais)}</div>;
};

const App = () => {
  const [value, setValue] = useState("");
  const [filterName, setFilterName] = useState(null);
  const [pais, setPais] = useState(null);
  const [paises, setPaises] = useState([]);
  const [paisesFiltrados, setPaisesFiltrados] = useState([]);
  const [clima, setClima] = useState([]);

  const handleChange = (event) => {
    setValue(event.target.value);
    const value = event.target.value;
    const filteredNames =
      value === ""
        ? paises
        : paises.filter((pais) =>
            pais.name.common.toLowerCase().includes(value.toLowerCase())
          );
    setPaisesFiltrados(filteredNames);
  };

  const handleClickShow = (name) => {
    setFilterName(name);
  };

  const onSearch = (event) => {
    event.preventDefault();
    setFilterName(value);
  };
  useEffect(() => {
    if (filterName) {
      axios
        .get(
          `https://studies.cs.helsinki.fi/restcountries/api/name/${filterName}`
        )
        .then((response) => {
          setPais(response.data);
        });
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${filterName}&appid=${
            import.meta.env.VITE_SOME_KEY
          }&units=metric`
        )
        .then((response) => {
          setClima(response.data);
        });
      console.log(clima);
    }
  }, [filterName]);
  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setPaises(response.data);
      });
  }, []);
  return (
    <div>
      <form onSubmit={onSearch}>
        Buscar Paises: <input value={value} onChange={handleChange} />
        <button type="submit">Buscar</button>
      </form>
      <ListaPaises paises={paisesFiltrados} handleClickShow={handleClickShow} />
      <Pais pais={pais} clima={clima} />
    </div>
  );
};

export default App;
