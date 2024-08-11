import { useEffect, useState } from "react";

const Stadistics = ({ good, neutral, bad, all, average, positives }) => (
  <div>
    <h1>Stadistics</h1>
    <p>good {good} </p>
    <p>neutral {neutral} </p>
    <p>bad {bad} </p>
    <p>all {all} </p>
    <p>average {average} </p>
    <p>positives {positives} % </p>
  </div>
);

const Button = ({ text, hadleClick }) => (
  <button onClick={() => hadleClick()}> {text} </button>
);
const StadisticsLine = ({ text, value }) => (
  <p>
    {" "}
    {text} {value}{" "}
  </p>
);
const StadisticTable = ({ good, neutral, bad, all, average, positives }) => (
  <table>
    <tr>
      <td> good </td>
      <td> {good} </td>
    </tr>
    <tr>
      <td> neutral </td>
      <td> {neutral} </td>
    </tr>
    <tr>
      <td> bad </td>
      <td> {bad} </td>
    </tr>
    <tr>
      <td> all </td>
      <td> {all} </td>
    </tr>
    <tr>
      <td> average </td>
      <td> {average} </td>
    </tr>
    <tr>
      <td> positives </td>
      <td> {positives} % </td>
    </tr>
  </table>
);

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positives, setPositives] = useState(0);
  const hanldeClickGood = () => {
    setGood(good + 1);
  };
  const hanldeClickNeutral = () => {
    setNeutral(neutral + 1);
  };
  const hanldeClickBad = () => {
    setBad(bad + 1);
  };
  const hadleStadistics = () => {
    setAll(good + neutral + bad);
    setAverage((good - bad) / (good + neutral + bad));
    setPositives((good / (good + neutral + bad)) * 100);
  };
  useEffect(() => {
    hadleStadistics();
  }, [good, neutral, bad]);

  return (
    <div>
      <h1>Give Feedback</h1>
      <div>
        <Button text={"good"} hadleClick={hanldeClickGood}></Button>
        <Button text={"neutral"} hadleClick={hanldeClickNeutral}></Button>
        <Button text={"bad"} hadleClick={hanldeClickBad}></Button>
      </div>

      {good || bad || neutral ? (
        <StadisticTable
          good={good}
          bad={bad}
          neutral={neutral}
          all={all}
          average={average}
          positives={positives}
        />
      ) : (
        <p>No Feedback given</p>
      )}
    </div>
  );
};

export default App;
