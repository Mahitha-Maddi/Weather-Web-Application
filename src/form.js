import React from 'react';
//import logo from './logo.svg';
import './App.css';


class Form extends React.Component {
    render() {
        return (

            <form onSubmit={this.props.getWeather} >
                <input type='text' id='text' name="city" placeholder="Enter city"></input>
                <button type='submit'>
                    Search</button>
            </form>
        )
    }
}
export default Form