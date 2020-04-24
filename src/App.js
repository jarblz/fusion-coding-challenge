import React, { useState, useEffect } from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import axios from "axios";

import "./scss/styles.scss";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

function createDeathObj(old) {
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

function createRecoveryObj(old) {
  return old.map(oldItem => {
    let returnObj = {}
    if (oldItem.countryRegion === 'US') {
      returnObj.label = oldItem.provinceState
    } else {
      returnObj.label = oldItem.countryRegion
    }

    returnObj.value = oldItem.recovered;
    return returnObj
  })
}

function App() {
  const [ deaths, setDeaths ] = useState({})
  const [ recovery, setRecovery ] = useState({})
  const [ selected, setSelected ] = useState('deaths')

  const fetchDeathStats = async () => {
    const covidStats = await axios.get('https://covid19.mathdro.id/api/deaths')
    const first8Stats = await covidStats.data.slice(0, 8)
    setDeaths(createDeathObj(first8Stats))
    setRecovery(createRecoveryObj(first8Stats))
  }

  useEffect(() => {
    fetchDeathStats();
  }, [])

  const deathCharts = {
    type: "column2d", // The chart type
    width: "100%", // Width of the chart
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
        //Set the theme for your chart
        theme: "fusion"
      },
      // Chart Data
      data: deaths
    }
  };

  const recoveryCharts = {
    type: "column2d", // The chart type
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        //Set the chart caption
        caption: "Recovery By Region With Most Daily COVID-19 Deaths",
        //Set the chart subcaption
        //Set the x-axis name
        xAxisName: "Country/US State",
        //Set the y-axis name
        yAxisName: "Recovery",
        //Set the theme for your chart
        theme: "fusion"
      },
      // Chart Data
      data: recovery
    }
  };

  return (
    <div className="App">
      <header className="c-header">
        <div className="l-container">
          <h1 className="el-h1 c-header__title">COVID Stats</h1>
          <h2 className="el-h4 c-header__sub-title">Top 8 Regions by Death</h2>
        </div>
      </header>
      <nav className="c-nav">
        <div className="l-container">
          <ul>
            <li>
              <button className={`c-nav__button${selected === 'deaths' ? ' c-nav__button--selected' : ''}`} onClick={() => { setSelected('deaths')}}>Deaths</button>
            </li>
            <li>
              <button className={`c-nav__button${selected === 'recovery' ? ' c-nav__button--selected' : ''}`} onClick={() => { setSelected('recovery')}}>Recovery</button>
            </li>
          </ul>
        </div>
      </nav>
      <div className="c-charts">
        <div className="l-container">
          {selected === 'deaths' &&
            <div className="c-charts__item">
              <ReactFC {...deathCharts} />
            </div>
          }
          {selected === 'recovery' &&
            <div className="c-charts__item">
              <ReactFC {...recoveryCharts} />
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
