import React from "react";
import "./scss/styles.scss";

function App() {
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
