import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Join from './components/Join/Join'

import './reset.css'
import './main.css'

const App = () => {
    return (
        <Router>
            <Route path="/" exact component={Join} />
        </Router>
    )
}

export default App;
