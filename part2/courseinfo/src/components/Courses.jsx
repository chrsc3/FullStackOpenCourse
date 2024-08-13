const Header = ({ name }) => {
  return (
    <div>
      <h1>Course Name: {name}</h1>
    </div>
  );
};
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  );
};
const Part = ({ part }) => {
  return (
    <div>
      <p>
        {part.name} ; Exercises: {part.exercises}{" "}
      </p>
    </div>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((suma, part) => {
    const exercises = part.exercises;
    console.log(exercises);
    return suma + exercises;
  }, 0);
  return (
    <div>
      <p>Total of Exercises: {total}</p>
    </div>
  );
};

const Courses = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Courses;
