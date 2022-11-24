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

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>
        Web development curriculum
      </h1>
      {courses.map(course =>
        <Course key={course.id} course={course} />
        )}
    </div>
  )
}

export default App;