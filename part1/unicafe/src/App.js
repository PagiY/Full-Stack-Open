import { useState } from "react";

const Button = ({handleClick, title}) => (<button onClick = {handleClick}>{title}</button>)

const StatisticsLine = ({title, count}) => (
  <>
    <p>{title} {count}</p>
  </>
)

const Statistics = (props) => {

  const {good, bad, neutral, average, positive, total} = props;

  if(total === 0){
    return (
      <>
        <h1>Statistics</h1>
        <p>No feedback Given.</p>
      </>
    )
  }

  return (
    <>
      <h1>Statistics</h1>
      <StatisticsLine title = "good" count = {good}/>
      <StatisticsLine title = "neutral" count = {neutral}/>
      <StatisticsLine title = "bad" count = {bad}/>
      <StatisticsLine title = "all" count = {total}/>
      <StatisticsLine title = "average" count = {average}/>
      <StatisticsLine title = "positive" count = {`${positive}%`}/>
    </>
  )
}

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
      <Statistics 
        good = {good}
        bad = {bad}
        neutral = {neutral}
        total = {total}
        average = {average}
        positive = {positive}
      />
    </div>
  );
}

export default App;
