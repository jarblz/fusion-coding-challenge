import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

//data for US Death Rate by month
const state = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],

    datasets: [
        {
            label: 'Total Deaths',
            backgroundColor: 'rgba(75,85,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [1,54,65,45,34,54,2,36,87,56,86,76]
        }]
}





class Fusion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            deaths: [],
            cases: [],
            error: null,
    };


    }

    //ChartButton(props) {
    //return (
    //    <button className="monthly" onClick={props.showBar}>
    //        US Death Rate
    //    </button>
    //);
    //}

    //var Button = React.createClass({
    //    render: function () {
    //        return (
    //            <button
    //                onClick={alert = 'click'}>Monthly US Death Rate</button>
    //        );
    //    }


    //    module.exports = Button;


    /*attempting to fetch api but ran into complications*/

   //componentDidMount() {
   //     fetch('https://api.thevirustracker.com/free-api?countryTimeline=US:')
   //         .then(results => {
   //             return results.json();
   //         }).then(data => {
   //             let deaths = data.results.map((rate => {
   //                 return 
                      
   //             })



    render() {
        return (
            <div>
                <Bar
                    data={state}
                    options={{
                        title: {
                            display: true,
                            text: 'Total US Deaths',
                            fontSize: 20
                        },

                    }}
                />
            </div>
                );
    }

    }
export default Fusion;