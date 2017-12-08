// src/components/Home/home.js
import React, { Component } from 'react';
import logo from './logo.svg';
import './home.css';
import CompanyHeader from "../../shared/header/header";
import SearchContainer from "../../shared/search-container/search-container";
import PersonalProfileContainer from "../../shared/personal-profile-container/personal-profile-container";

class Home extends Component {
    constructor() {
        super();
        this.state = {
            employees: [],
        }
    }

//  AJAX call to grab non-suspended employees from employee table
  componentDidMount() {
        //  This fires before the page renders to gather all profiles
      let that = this;
      let emp = [];
      setTimeout(function() {
          fetch('http://10.10.7.153:3000/api/get_all_not_suspended')
              .then(function(response) {
                  response.json()
                      .then(function(data) {
                          emp = data.rows;
                          that.setState({
                              employees: emp,
                              loading: false
                          });
                      })
              })
              .catch(function(err) {
                  console.log(err);
              });
      }, 1000);
    }

    render() {
        return (
            <div className="home-container">
                <CompanyHeader
                    logo={logo}
                    myProfile={this.props.location.state.myProfile}
                />
                <PersonalProfileContainer
                    myProfile={this.props.location.state.myProfile}
                    employeeList={this.state.employees}
                />
                <div className="searchContainer-container">
                <SearchContainer
                    employees={ this.state.employees }
                    myProfile={this.props.location.state.myProfile}
                />
                </div>
            </div>
        );
    }
}

export default Home;