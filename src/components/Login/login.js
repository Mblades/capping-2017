import React, { Component } from 'react';
import { browserHistory as history } from 'react-router';
import classnames from 'classnames';
import CompanyHeader from "../../shared/header/header";
import logo from '../../shared/images/logo.svg';
import './login.css';
import NewPass from "../../shared/new-password/new-password";

/* @class Login */
// @classdesc React component for logging into the directory
class Login extends Component {
    constructor() {
        super();
        this.state = {
            employees: [],
            loginError: false,
            newPass: false,
            myProfile: []
        }
    }

    addTest(event) {
         let that = this;
        // Validation for login fields
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
                                // checks for 90 days
                                let passDate = new Date(data.rows[0].passwordsetdate);
                                passDate.setDate(passDate.getDate() + 90);
                                let now = new Date();
                                if(passDate > now){
                                    history.push({
                                    pathname: '/home',
                                    state: {
                                        myProfile: data.rows[0],
                                        loggedIn: true
                                    }
                                })
                                } else {
                                    that.setState({
                                        newPass: true,
                                        myProfile: data.rows[0]
                                    })
                                }
                            } else {
                                that.setState({
                                    loginError: true
                                })
                            }
                        })
                })
                .catch(function(err) {
                    console.log(err);
                })
        } else {
            this.setState({
                loginError: true
            })
        }
     }

     nowLogin () {
         history.push({
             pathname: '/home',
             state: {
                 myProfile: this.state.myProfile,
                 loggedIn: true
             }
         })
     }


    render() {
        const { className, ...props } = this.props;
        return (
            <div className={classnames('Home', className)} {...props}>
            <div className="App">
                <CompanyHeader
                    logo={logo}
                />
                { this.state.newPass && (
                    <NewPass
                        eid={ this.state.myProfile.eid }
                        onClose={() => this.newLogin()}
                    />
                )}

                <form ref="login_form" className="Login-Form">
                    { this.state.loginError && (
                        <div className="login-error">
                            Incorrect Username or Password
                        </div>
                    )}
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