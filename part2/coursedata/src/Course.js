const Header = (props) => {
    return(
        <>
        <h1>{props.course.name}</h1>
        </>
    )
}
  
const Content = (props) => {
    return(
        <>
        {
            props.parts.map(part => <Part key = {part.id} 
                                    part = {part.name} 
                                    exercises = {part.exercises}
                                    />
                            )
        }
        </>
    )
}
  
const Total = (props) => {
    const total = props.parts.reduce((sum, part) => {
        return sum + part.exercises;
    }, 0);

    return(
        <b>
        Number of exercises {total}
        </b>
    )
}
  
const Part = (props) => {
    return(
        <>
        <p>{props.part} {props.exercises}</p>
        </>
    )
}
  
const Course = (props) => {

    return(
        <>
        <Header course = {props.course}/>
        <Content parts = {props.course.parts} />
        <Total  parts = {props.course.parts}/>
        </>
    )
}

export default Course;