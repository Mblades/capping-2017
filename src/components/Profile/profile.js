import React, { Component } from 'react';
import CompanyHeader from "../../shared/header/header";
import ProfileModal from "../../shared/profile-modal/profile-modal";
import logo from '../../shared/images/logo.svg';
import './profile.css';
import BackButton from "../../shared/back-button/back-button";

class Profile extends Component {
    constructor(props) {
        super(props);
        //only here as a back-up place holder will be updated to be a fall back soon
        this.state = {
            image: '../Images/basicProfilePic.png',
            manager: {firstname: 'N/A', lastname: ''},
            applications: {},
            employees: []
        }

    };

    componentDidMount() {
        //  This fires before the page renders to gather all profiles,
        let that = this;
        let manager_data = {
            eid: this.props.location.state.employee.eid
        };
        var request = new Request('http://10.10.7.153:3000/api/manager-find', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(manager_data)
        });
        fetch(request)
            .then(function(response) {
                response.json()
                    .then(function(data) {
                        if(data.rows.length >= 1){
                            that.setState({manager: data.rows[0]});
                        }
                    })
            })
            .catch(function(err) {
                console.log(err);
            })

        let application_data = {
            eid: this.props.location.state.employee.eid
        };
        var request1 = new Request('http://10.10.7.153:3000/api/get_employee_applications', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(application_data)
        });
        fetch(request1)
            .then(function(response) {
                response.json()
                    .then(function(data) {
                        that.setState({applications: data.rows});
                    })
            })
            .catch(function(err) {
                console.log(err);
            })

        let managed_data = {
            mid: this.props.location.state.employee.mid
        };
        var request2 = new Request('http://10.10.7.153:3000/api/manager_employees', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(managed_data)
        });
        fetch(request2)
            .then(function(response) {
                response.json()
                    .then(function(data) {
                        that.setState({employees: data.rows});
                    })
            })
            .catch(function(err) {
                console.log(err);
            })
    }

    render() {
        let employees = this.state.employees;
        let employee = this.props.location.state.employee;
        let myProfile = this.props.location.state.myProfile;
        let tabs = 3;
        if(employee.mid) {
            tabs = 4;
        }
        return (
            <div className="ProfilePage">
                <CompanyHeader
                    logo={logo}
                    myProfile={myProfile}
                />
                <div className="profile-place">
                    <ProfileModal
                        employees={employees}
                        employee={employee}
                        myProfile={myProfile}
                        tabCount={tabs}
                        manager={this.state.manager}
                        apps={this.state.applications}
                    />
                </div>
                <BackButton
                myProfile={myProfile}
                employeeList={employees}
                backTo="home"
                />
            </div>
        );
    }
}
export default Profile;