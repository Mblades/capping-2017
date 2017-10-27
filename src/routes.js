// src/routes.js
import React from 'react';
import { Router, Route } from 'react-router';

import Home from './components/Home/home';
import About from './components/About/about';
import NotFound from './components/NotFound/notFound';
import Profile from "./components/Profile/profile";
//  Describes the path required  to reach each of the application pages

//  Still need to add a validation function to check if the user is logged in
//  if the user is not logged in, need to kick them back to login screen
const Routes = (props) => (
    <Router {...props}>
        <Route path="/" component={Home} />
        <Route path="/profile" component={Profile}/>
        <Route path="/about" component={About} />
        <Route path="*" component={NotFound} />
    </Router>
);

export default Routes;