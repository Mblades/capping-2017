// src/components/Home/home.js
import React, { Component } from 'react';
import logo from '../../shared/images/logo.svg';
import './requestApp.css';
import CompanyHeader from "../../shared/header/header";
import AppBox from "../../shared/app-box/app-box";
import ConfirmModal from "../../shared/confirm-modal/confirm-modal";
import BackButton from "../../shared/back-button/back-button";

class RequestApp extends Component {
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
            eid: this.props.location.state.employee.eid
        };
        var request = new Request('http://10.10.7.153:3000/api/get_possible_applications', {
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

    makeRequest = function(app) {
        let today = new Date();
        let mid = 1;
        if(this.props.location.state.manager.eid){
            mid = this.props.location.state.manager.eid;
        }
        console.log(mid);
        let application_data1 = {
            eid: this.props.location.state.employee.eid,
            mid: mid,
            aid: app.aid,
            date: today
        };
        var request = new Request('http://10.10.7.153:3000/api/request_app', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(application_data1)
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
        this.toggleModal();
    };

    toggleModal = function() {
        this.setState({
            requestMade: !this.state.requestMade
        })
    };

    renderAppBoxes = function() {
        let that = this;
        let appList = this.state.apps.map(function (value) {
            return (
                <div className="App-Box-Spacing">
                    <AppBox
                        app={value}
                        request={true}
                        requested={(value) => that.makeRequest(value)}
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
                <ConfirmModal
                    show={this.state.requestMade}
                >
                    <div className="confirm-text">
                        You have successfully requested access!
                    </div>
                    <div className="done-button" onClick={() => {
                        this.toggleModal()
                    }}>
                        Done
                    </div>
                </ConfirmModal>
                <div className="possible-apps-container">
                    <div className="request-apps-title">
                        Request New Applications
                    </div>
                    {
                        this.renderAppBoxes()
                    }
                </div>
                <BackButton
                    myProfile={this.props.location.state.myProfile}
                    employeelist={this.props.location.state.employees}
                    employee={this.props.location.state.employee}
                    backTo="profile"
                />
            </div>
        );
    }
}

export default RequestApp;