import './App.css';
import Search from "./components/search"
import Repos from "./components/repos"
import Header from "./components/header.js"
import Footer from "./components/footer.js"
import Redirect from "./redirect"

import {BrowserRouter as Router, Switch, Route,} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="nav-offset">
      
        </div>
        <div className="main-container">
        <Switch>
          <Route path="/" exact component={Redirect} />
          <Route  path="/users" component={Search} exact /> 
          <Route path="/users/:id/repos" component={Repos} exact />
        </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
 