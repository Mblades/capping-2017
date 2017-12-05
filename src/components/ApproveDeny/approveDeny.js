import React, { Component } from 'react';
import logo from '../../shared/images/logo.svg';
import './approveDeny.css';
import CompanyHeader from "../../shared/header/header";
import BackButton from "../../shared/back-button/back-button";


class ApproveDeny extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: {
                eid: this.props.location.state.employee.eid,
                firstname: this.props.location.state.employee.firstname,
                lastname: this.props.location.state.employee.lastname
            },
            requestedApps: {}
        }
    }
    // the makeRequest function appears to need conditions when it is 
    // called by the renderAppBoxes function in order for the latter to work
    // with approveDeny
    approveRequest = function(employees) {
        // placeholder; need to query db (with a new/separate API function?):
        // SELECT applications.aid
        // FROM RequestAccess
        // WHERE employees.eid = requestaccess.eid
        // AND applications.aid = requestaccess.aid;
        let apps = [];
        var request = new Request('http://10.10.7.153:3000/api/handle_application_request', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(application_data)
        });
        fetch(request)
            .then(function(response) {
                response.json()
                    .then(function(data) {
                        that.setState({
                            apps: data.rows
                        })
                        console.log(data.rows);
                    })
            })
            .catch(function(err) {
                console.log(err);
            });
    }

    // the makeRequest function appears to need conditions when it is 
    // called by the renderAppBoxes function in order for the latter to work
    // with this approveDeny component
    denyRequest = function(employees) {
        // placeholder; need to query db (with a new/separate API function?):
        // SELECT applications.aid
        // FROM RequestAccess
        // WHERE employees.eid = requestaccess.eid
        // AND applications.aid = requestaccess.aid;
        let apps = [];
        var request = new Request('http://10.10.7.153:3000/api/handle_application_request', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(application_data)
        });
        fetch(request)
            .then(function(response) {
                response.json()
                    .then(function(data) {
                        that.setState({
                            apps: data.rows
                        })
                        console.log(data.rows);
                    })
            })
            .catch(function(err) {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="ApproveDeny-container">
                <CompanyHeader
                    logo={logo}
                />
                // table structure/data will go here
                /* basic approve/deny column structure:
                   <div className="approve-application-button" onClick={() => {
                            this.approveRequest();}}>
                   </div>
                   <div className="deny-application-button" onClick={() => {
                            this.approveRequest();}}>
                   </div>
                */
                <BackButton
                    myProfile={myProfile}
                    employeeList={employeeList}
                    backTo="home"
                />
            </div>
        );
    }
}

export default ApproveDeny;