import React from 'react'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import DetailedInfo from './detailedInfo'

//const   DetailedInfo=({match}) => <div> {match.params.id}</div>

class Days extends React.Component {
    constructor(props) {
        super(props);
        //console.log(this.props);
        this.state = {
            data: []
        }
        console.log(this.state.data)
    }
    _getDayInfo = data => {
        const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        return daysOfWeek[new Date(data[0].dt_txt).getDay()];
    };


    _getInfo = (data) => {
        const min = [];
        const max = [];
        data.map(item => {
            max.push(item.main.temp_max);
            min.push(item.main.temp_min);
        });

        const minMax = {
            min: Math.round(Math.min(...min)),
            max: Math.round(Math.max(...max)),
        };
        return (
            <td>{`${minMax.min}/ ${minMax.max}`}</td>
        );
    }


    hello = () => {
        const {tiles} = this.props;
        //const forecastTiles=this.props.tiles;
        this.setState({
            data: tiles
        });

    };
    render() {
        // const forecastTiles = this.props.tiles.length > 5 ? this.props.tiles.slice(0, 5) : this.props.tiles;
        const forecastTiles = this.props.tiles;
        // console.log(forecastTiles);
        
        if (forecastTiles && forecastTiles.length) {
        return (
            <Router>
                <div>
                    <h1>5 Day weather forecast</h1>
                    <table border='1'>
                        <thead>
                            <tr>
                                <th>DAY</th>
                                <th>DESCRIPTION</th>
                                <th>Min_Temp/Max_Temp</th>
                                <th>ICON</th>
                            </tr></thead>
                        <tbody>{forecastTiles.map((item, i) => (<tr key={i}>
                            <td><Link to={{ pathname: `/days/${this._getDayInfo(item)}` }} onClick={() => { this.hello(); }}>{this._getDayInfo(item)}</Link></td>
                            <td>{item[0].weather[0].description}</td>
                            {this._getInfo(item)}
                    <td><img src={`https://openweathermap.org/img/w/${item[0].weather[0].icon}.png`} alt=""></img></td>
                        </tr>))
                        }
                        </tbody>
                    </table>

                    <Route path="/days/:id" render={(props) => <DetailedInfo data={this.state.data} id={props.match.params.id} />} />
                </div>
            </Router>
        );
                    }
                    return  <h2>{this.props.error}</h2>;
    }


}

export default Days