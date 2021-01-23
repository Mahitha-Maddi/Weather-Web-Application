import React from "react";

//import ReactDOM from 'react-dom';

class DetailedInfo extends React.Component {
    constructor(props) {
        super(props);
        // console.log(this.props.data);

    }
    getHour = (time) => time ? new Date(time).getHours() : new Date().getHours();
    getDate = (date) => date ? new Date(date).getDate() : new Date().getDate();
    /*
      displayMoreInfo = (item) => {
        return (
          <span>
             
           </span>
         
        );
      };*/

    //hrdata=[];
    displayMoreInfo = (item) => {
        return (
            <tr> 
            <td>{`${this.getHour(item.dt_txt)}:00`}</td>
            <td>{`${Math.round(item.main.temp)}°C`}</td>
            </tr>
        )
      };
    
    createTable = (hrdata) => {
        /*var table = []
       // var m;
             for(let m=0;m<k;m++){s
    
                 const p=hrdata.length ? (Object.values(hrdata[m]["0"]))["0"] : null
                 console.log(p)
                
                 
                //table.push(<p key={m}>{`${this.getHour(hrdata["0"][m]["0"] * 1000)}:00`}</p>)
        }
    
        return table*/
        //console.log("createTable:", Object.values(hrdata))
        //        const table = hrdata && hrdata.length && Object.values(hrdata).map(f => f.map(d) => d.dt)
        //const foo = hrdata[0].map(f => f.dt)
        //const bar = foo.map(val => (<p>{`${this.getHour(val * 1000)}:00`}</p>))
        if(hrdata.length===1){
        const foo = hrdata[0].map(val => (

                (this.getHour(val.dt_txt) > this.getHour() && this.getDate(val.dt_txt) === this.getDate()) ? (
                  this.displayMoreInfo(val)
                 ) : this.getHour(val.dt_txt) >= 0 && this.getHour(val.dt_txt) <= 23 ? (
                    this.displayMoreInfo(val)
                 ) : null
              ))
       
        return (<tbody>{foo}</tbody>)
                 }
        else{
            const foo = hrdata[0].map(val => (
              (this.getHour(val.dt_txt) > this.getHour() && this.getDate(val.dt_txt) === this.getDate()) ? (
                this.displayMoreInfo(val)
               ) : this.getHour(val.dt_txt) >= 0 && this.getHour(val.dt_txt) <= 23 ? (
                  this.displayMoreInfo(val)
               ) : null
              ))
              const bar = hrdata[1].map(val => (
                (this.getHour(val.dt_txt) > this.getHour() && this.getDate(val.dt_txt) === this.getDate()) ? (
                  this.displayMoreInfo(val)
                 ) : this.getHour(val.dt_txt) >= 0 && this.getHour(val.dt_txt) <= 23 ? (
                    this.displayMoreInfo(val)
                 ) : null
              ))
        return (<tbody>{foo}{bar}</tbody>)
        }


    }


    render() {
        const i = this.props.id;
        const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        const data = this.props.data;
        const d = Object.values(this.props.data.filter(reading => daysOfWeek[new Date(reading[0].dt_txt).getDay()].includes(`${i}`)));


        // {console.log(_.size(d) )};
        // const d=this.state.tiles;

        if (d && d.length) {
            return (
                <div>
                    <hr></hr>
                    <table border='2'>
                        <thead><tr><th>Time</th><th>Temparature</th></tr></thead>
                        {console.log(d)}
                        {this.createTable(d)}
                    </table>

                </div>
            );
        }
        return null;
    }

}


export default DetailedInfo;
