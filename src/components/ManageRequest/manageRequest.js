// src/components/Home/home.js
import React, { Component } from 'react';
import logo from '../../shared/images/logo.svg';
import './manageRequest.css';
import CompanyHeader from "../../shared/header/header";
import RequestBox from "../../shared/request-box/request-box";
import BackButton from "../../shared/back-button/back-button";

class ManageRequest extends Component {
    constructor() {
        super();
        this.state = {
            apps: [],
            requestMade: false,
            requestedApp: ''
        }
    }
//  This is wear we will make all of the AJAX Calla
    componentDidMount() {
        let that = this;
        let application_data = {
            eid: this.props.location.state.myProfile.eid
        };
        //change to get the requests
        var request = new Request('http://10.10.7.153:3000/api/get_requests', {
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
                        console.log(data.rows,'test');
                    })
            })
            .catch(function(err) {
                console.log(err);
            });
    }
// make and accept and deny request not request
    approveRequest = function(app) {
        let that = this;
        let request_data = {
            rid: app.rid
        };
        var request = new Request('http://10.10.7.153:3000/api/approve_request', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(request_data)
        });
        fetch(request)
            .then(function(response) {
                response.json()
                    .then(function(data) {
                        console.log(data.rows);
                    })
            })
            .catch(function(err) {
                console.log(err);
            });
        console.log('approve');
    };

    denyRequest = function(app) {
        let that = this;
        let request_data = {
            rid: app.rid
        };
        //change to get the requests
        var request = new Request('http://10.10.7.153:3000/api/deny_request', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(request_data)
        });
        fetch(request)
            .then(function(response) {
                response.json()
                    .then(function(data) {
                        console.log(data.rows);
                    })
            })
            .catch(function(err) {
                console.log(err);
            });
        console.log('deny');
    };

    renderAppBoxes = function() {
        let that = this;
        let appList = this.state.apps.map(function (value) {
            return (
                <div className="App-Box-Spacing">
                    <RequestBox
                        app={value}
                        request={true}
                        approve={(value) => that.approveRequest(value)}
                        deny={(value) => that.denyRequest(value)}
                    />
                </div>
            )
        })
        return(appList);
    };

    render() {
        return (
            <div className="requestApp-container">
                <CompanyHeader
                    logo={logo}
                    myProfile={this.props.location.state.myProfile}
                />
                <div className="possible-apps-container">
                    <div className="request-apps-title">
                        Manage Current Requests
                    </div>
                    <div className="requests-container animation-container">
                    {
                        this.renderAppBoxes()
                    }
                    </div>
                </div>
                <BackButton
                    myProfile={this.props.location.state.myProfile}
                    employeelist={this.props.location.state.employees}
                    backTo="home"
                />
            </div>
        );
    }
}

export default ManageRequest;