import React, { Component } from 'react';
import { Fragment } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Movies from './components/movies';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import NavBar from './components/navBar';
import LoginForm from './components/login';
import RegisterForm from './components/register';
import MovieForm from './components/movieForm';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  render() {
    return (
      <Fragment>
        <NavBar />
        <main className="container">
          <Routes>
            <Route path='/register' element={<RegisterForm />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/rentals' element={<Rentals />} />
            <Route path='/customers' element={<Customers />} />
            <Route path='/movies/:id' element={<MovieForm />} />
            <Route path='/movies' element={<Movies />} />
            <Route path='/' element={<Navigate to='/movies' />} />
            <Route path='/' element={<Navigate to='/movies' />} />
            <Route path='/not-found' element={<NotFound />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
      </Fragment>
    );
  }
}

export default App;


