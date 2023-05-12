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
      <table>
        <tbody>          
          <tr>
            <td><StatisticsLine title = "good" count = {good}/></td>
          </tr>
          <tr>
            <td><StatisticsLine title = "neutral" count = {neutral}/></td>
          </tr>
          <tr>
            <td><StatisticsLine title = "bad" count = {bad}/></td>
          </tr>
          <tr>
            <td><StatisticsLine title = "all" count = {total}/></td>
          </tr>
          <tr>
            <td><StatisticsLine title = "average" count = {average}/></td>
          </tr>
          <tr>
            <td><StatisticsLine title = "positive" count = {`${positive}%`}/></td>
          </tr>
        </tbody>
      </table>
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
