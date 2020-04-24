import React, { useState, useEffect } from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import axios from "axios";

import "./scss/styles.scss";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

function createObj(old) {
  return old.map(oldItem => {
    let returnObj = {}
    if (oldItem.countryRegion === 'US') {
      returnObj.label = oldItem.provinceState
    } else {
      returnObj.label = oldItem.countryRegion
    }

    returnObj.value = oldItem.deaths;
    return returnObj
  })
}

function App() {
  const [ deaths, setDeaths ] = useState({})

  const fetchDeathStats = async () => {
    const COVIDdeaths = await axios.get('https://covid19.mathdro.id/api/deaths')
    const first8Deaths = await COVIDdeaths.data.slice(0, 8)
    setDeaths(createObj(first8Deaths))
  }

  useEffect(() => {
    fetchDeathStats();
  }, [])

  if (deaths) {
    console.log(deaths);
  }

  const chartConfigs = {
    type: "column2d", // The chart type
    width: "800", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        //Set the chart caption
        caption: "Region With Most Daily COVID-19 Deaths",
        //Set the chart subcaption
        //Set the x-axis name
        xAxisName: "Country/US State",
        //Set the y-axis name
        yAxisName: "Deaths",
        numberSuffix: "K",
        //Set the theme for your chart
        theme: "fusion"
      },
      // Chart Data
      data: deaths
    }
  };


  return (
    <div className="App">
      <header className="c-header">
        <div className="l-container">
          <h1 className="el-h1 c-header__title">Chart Viewer</h1>
          <h2 className="el-h4 c-header__sub-title">Choose a chart</h2>
        </div>
      </header>
      <nav className="c-nav">
        <div className="l-container">
          <ul>
            <li>
              <button>Show First Graph</button>
            </li>
            <li>
              <button>Show Second Graph</button>
            </li>
          </ul>
        </div>
      </nav>
      <div className="c-charts">
        <div className="l-container">
          <div className="c-charts__item">
            <ReactFC {...chartConfigs} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
