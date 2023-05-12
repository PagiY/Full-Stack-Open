import { useState } from "react";

const Button = ({handleClick, title}) => (<button onClick = {handleClick}>{title}</button>)

const ShowCounts = ({title, count}) => (
  <>
    <p>{title} {count}</p>
  </>
)

const App = () => {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);
  
  const handleClick = (value, hook) => {
    hook(value + 1);
    const newGood = good;
    const newBad = bad;
    const newTotal = total + 1
    const newAvg = (newGood - newBad) / newTotal;
    const newPositive = newGood / newTotal;
    setTotal(newTotal);
    setAverage(newAvg);
    setPositive(newPositive);
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={()=>{handleClick(good, setGood)}} title = "Good"/>
      <Button handleClick={()=>{handleClick(neutral, setNeutral)}} title = "Neutral"/>
      <Button handleClick={()=>{handleClick(bad, setBad)}} title = "Bad"/>
      <h1>Statistics</h1>
      <ShowCounts title = "good" count = {good}/>
      <ShowCounts title = "neutral" count = {neutral}/>
      <ShowCounts title = "bad" count = {bad}/>
      <ShowCounts title = "all" count = {total}/>
      <ShowCounts title = "average" count = {average}/>
      <ShowCounts title = "positive" count = {`${positive}%`}/>
    </div>
  );
}

export default App;
