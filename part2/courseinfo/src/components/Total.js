const Total = ({parts}) => {

    const total = parts.reduce((sum, part) => {
        return sum + part.exercises;
    }, 0);

    return(
      <>
        <b>Total number of exercises: {total}</b>
      </>
    )
  }

  export default Total;