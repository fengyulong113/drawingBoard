import React from 'react'
import Home from './components/home/home'
import Filters from './components/filters/filters'
import Draw from './components/draw/draw'
import './asset/css/base.css'
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom"

function App() {
  return (
    <Router>
      <div>
        <div className="router">
          <div className="routerlink">
          <Link to='/'>Home</Link>

          </div>
          <div className="routerlink">

          <Link to='/filters'>filters</Link>
          </div>
          <div className="routerlink">
          <Link to='/draw'>draw</Link>

          </div>
        </div>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/filters' component={Filters} />
          <Route path='/draw' component={Draw} />
        </Switch>
      </div>
    </Router>

  );
}

export default App;