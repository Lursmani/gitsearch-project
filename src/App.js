import './App.css';
import Search from "./components/search"
import Header from "./components/header.js"
import Footer from "./components/footer.js"
import {Container} from "react-bootstrap"

import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="nav-offset"></div>
        <div className="main-container">
        <Switch>
          <Route  path="/users" component={Search} /> 
        </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
 