import React, { Component } from 'react';
//import { Field, reduxForm } from 'redux-form'
import { browserHistory as history } from 'react-router';
import classnames from 'classnames';
import CompanyHeader from "../../shared/header/header";
import logo from '../../shared/images/logo.svg';
import './login.css';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            employees: []
        }
    }

    addTest(event) {
         //let that = this;
        //Validation for login fields
        if(this.refs.username.value !== "" && this.refs.password.value !== "") {
            event.preventDefault();
            let login_data = {
                username: this.refs.username.value,
                password: this.refs.password.value
            };
            var request = new Request('http://10.10.7.153:3000/api/pass-check', {
                method: 'POST',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify(login_data)
            });
            fetch(request)
                .then(function(response) {
                    response.json()
                        .then(function(data) {
                            if(data.rows.length === 1) {
                                history.push({
                                    pathname: '/home',
                                    state: {
                                        myProfile: data.rows[0],
                                        loggedIn: true
                                    }
                                })
                            }
                        })
                })
                .catch(function(err) {
                    console.log(err);
                })
        } else {
            console.log('Missing Username and Password');
        }
     }
/*
    submit = (values) => {
        let User_id = 1;
        // print the form values to the console
        console.log(values, 'Login Values');
        if(values.Username === 'HR' && values.Password === 'HR'){
            User_id = 2;
        }
        history.push({
            pathname: '/home',
            state: {
                id: User_id,
                loggedIn: true
            }
        })
    }; */
    render() {
        const { className, ...props } = this.props;
        return (
            <div className={classnames('Home', className)} {...props}>
            <div className="App">
                <CompanyHeader
                    logo={logo}
                />
                <form ref="login_form" className="Login-Form">
                    <div className="Login-Form-Line">
                        <input className="input" ref="username" name="Username" component="input" type="text" required placeholder="Username"/>
                    </div>
                    <div className="Login-Form-Line">
                        <input className="input"  ref="password" name="Password" component="input" type="password" required placeholder="Password" />
                    </div>
                    <button onClick={this.addTest.bind(this)} type="submit">Submit</button>
                </form>
            </div>
            </div>
        );
    }
}

export default Login ;