const Total = ({ result }) => {
    const sum = result.reduce(
        (accumulator, currentValue) => accumulator + currentValue, 0
    )
    return (
      <p>
        total of {sum} exercises
      </p>
    )
}
  
const Part = ({ part }) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    )
}
  
const Content = ({ course }) => {
    const result = course.parts.map(part => part.exercises)
    return (
      <div>
        {course.parts.map(part =>
          <Part key={part.id} part={part} />
          )}
        <Total result={result} />
      </div>
    )
}
  
const Header = ({ course }) => {
    return (
      <h2>
        {course.name}
      </h2>
    )
}
  
const Course = ({ course }) => {
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
      </div>
    )
}

export default Course