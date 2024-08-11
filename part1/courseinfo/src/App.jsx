const Header = (props) => {
  return (
    <div>
      <h1>Course Name: {props.name}</h1>
    </div>
  );
};
const Content = (props) => {
  console.log(props.parts);
  return (
    <div>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </div>
  );
};
const Part = (props) => {
  console.log(props.part);
  return (
    <div>
      <p>
        {props.part.name} ; Exercises: {props.part.exercises}{" "}
      </p>
    </div>
  );
};
const Total = (props) => {
  return (
    <div>
      <p>Number of exercises: {props.total}</p>
    </div>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  const total = (a, b, c) => {
    return a + b + c;
  };

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total
        total={total(
          course.parts[0].exercises,
          course.parts[1].exercises,
          course.parts[2].exercises
        )}
      />
    </div>
  );
};

export default App;
