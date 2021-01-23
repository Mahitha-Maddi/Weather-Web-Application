import React from 'react';
//import ReactDOM from 'react-dom'
//import logo from './logo.svg';
import './App.css';
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom'
import Days from './days'
import Form from './form'
//import Notfound from './notfound'


const API_KEY = "1047b4a8bd298fee185e1158ad30ecd1";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tiles: [],
      //dailyData :[],
      
      error : undefined
    }
  }


  _groupByDays = data => {
    return (data.reduce((list, item) => {
      const forecastDate = item.dt_txt.substr(0, 10);
      list[forecastDate] = list[forecastDate] || [];
      list[forecastDate].push(item);

      return list;
    }, {}));
  };


  getWeather = async (e) => {

    e.preventDefault();
    const city = e.target.elements.city.value;

    const API_CALL = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=imperial`);

    //const API_CALL = await fetch(`http://pro.openweathermap.org/data/2.5/forecast/hourly?q=${city}&appid=${API_KEY}`);
    const data = await API_CALL.json();
    //const allDays= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    console.log(data);
    // const tiles = Object.values(this._groupByDays(data.list));
    // const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"));

    if (data.list && data.list.length) {
    const tiles1 = Object.values(this._groupByDays(data.list));
    this.setState({
      tiles: tiles1,
      // dailyData :dailyData,
      error : ""
    });
  }
  else{
    this.setState({
      error : "Please enter city"
    });
  }
  }
  render() {

    console.log(this.state.foo)
    return (
      <div>
        <h1>WELCOME TO 5 DAY WEATHER FORECAST</h1>
        <Form getWeather={this.getWeather} />
        <Days
          tiles={this.state.tiles}
        error={this.state.error}
        />

      </div>
    )
  }
}
export default App
