import React, { Component } from 'react';
import Movies from "./components/movies";
import './App.css';
import { Route,Redirect, Switch } from 'react-router-dom';
import Customers from './components/customers';
import NotFound from './components/notFound';
import Rentals from './components/rentals';
import NavBar from './components/navbar';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
class App extends Component {
  render() { 
    return (
      <React.Fragment>
        <ToastContainer/>
      <NavBar/>
      <main className="container">
        <Switch>
          <Route path="/movies/:id" component={MovieForm}/>
      <Route path="/movies" component={Movies}/>
      <Route path="/customers" component={Customers}/>
      <Route path="/rentals" component={Rentals}/>
      <Route path="/not-found" component={NotFound}/>
      <Route path="/login" component={LoginForm}/>
      <Redirect from ="/" exact to ="/movies" />
      <Redirect to="/notFound"/>
      </Switch>
      </main>
      </React.Fragment>
      );
  }
}
 
export default App;


