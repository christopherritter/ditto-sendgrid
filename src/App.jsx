import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Reset from "./components/Reset.jsx";
import Dashboard from "./components/Dashboard.jsx";

function App() {
  return (
    <div className="App">
      <Router>
      <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/reset" component={Reset} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
