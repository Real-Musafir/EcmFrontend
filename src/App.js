import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Headers from "./components/Headers";
import "./App.css";
import Logout from "./auth/Logout";
import Cart from "./carts/Cart";
import CartItem from "./carts/CartItem";
import Login from "./auth/Login";

function App() {
  return (
    <Router>
      <Headers />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/carts" component={Cart} />
        <Route exact path="/carts/cartitem" component={CartItem} />
      </Switch>
    </Router>
  );
}

export default App;
