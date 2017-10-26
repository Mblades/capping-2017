// src/components/App/index.js
import React, { Component } from 'react';
import classnames from 'classnames';
import logo from './logo.svg';
import './style.css';
import CompanyHeader from "../../shared/header/index";
import SearchContainer from "../../shared/search-container/index";
import PersonalProfileContainer from "../../shared/personal-profile-container/index";

class Home extends Component {
    constructor() {
        super();
        this.state = {
            employees: []
        }
    }
//This is wear we will make all of the AJAX Calls
    componentDidMount() {
        let that = this;
        console.log('Component Has Mounted');
        fetch('http://localhost:3000/api/get-all-employees')
            .then(function(response) {
                response.json()
                    .then(function(data) {
                        let employees = that.state.employees;
                        employees = data.rows;
                        that.setState({
                            employees: employees
                        });
                        console.log(data, 'data');
                    })
            })
            .catch(function(err) {
                console.log(err);
            })
    }

   /* addTest(event) {
        let that = this;
        event.preventDefault();
        let test_data = {
            test_name: this.refs.test_name.value,
            test_name2: this.refs.test_name2.value
        };
        var request = new Request('http://localhost:3000/api/add-employees', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(test_data)
        });
        //xmlhttprequest
        fetch(request)
            .then(function(response) {
                response.json()
                    .then(function(data) {
                        let employees = that.state.employees;
                        console.log(test_data, 'test_data');
                        employees = data.rows;
                        that.setState({
                            employees: employees
                        });
                        console.log(data, 'data');
                    })
            })
            .catch(function(err) {
                console.log(err);
            })
    }
*/
    render() {
        let employees = JSON.stringify(this.state.employees);
        const { className, ...props } = this.props;
        return (
            <div className={classnames('Home', className)} {...props}>
                <form ref="test_form">
                    <pre>{employees}</pre>
                </form>
                <CompanyHeader
                    logo={logo}
                />
                <PersonalProfileContainer/>
                <SearchContainer
                employees={ this.state.employees }
                />
            </div>
        );
    }
}

export default Home;