import { useState } from "react";

const Button = ({handleClick, title}) => (<button onClick = {handleClick}>{title}</button>)

const StatisticsLine = ({title, count}) => (
  <tr>
    <td>{title} {count}</td>
  </tr>
)

const Statistics = (props) => {

  const {good, bad, neutral} = props;

  const total = good + bad + neutral;
  const average = (good - bad) / total;
  const positive = (good / total) * 100;

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
          <StatisticsLine title = "good" count = {good}/>
          <StatisticsLine title = "neutral" count = {neutral}/>
          <StatisticsLine title = "bad" count = {bad}/>
          <StatisticsLine title = "all" count = {total}/>
          <StatisticsLine title = "average" count = {average}/>
          <StatisticsLine title = "positive" count = {`${positive}%`}/>
        </tbody>
      </table>
    </>
  )
}

const App = () => {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (value, hook) => {
    hook(value + 1);
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
      />
    </div>
  );
}

export default App;
