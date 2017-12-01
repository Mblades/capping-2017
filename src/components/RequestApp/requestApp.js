// src/components/Home/home.js
import React, { Component } from 'react';
import logo from '../../shared/images/logo.svg';
import './requestApp.css';
import CompanyHeader from "../../shared/header/header";
import SearchContainer from "../../shared/search-container/search-container";
import PersonalProfileContainer from "../../shared/personal-profile-container/personal-profile-container";
import AppBox from "../../shared/app-box/app-box";
import ConfirmModal from "../../shared/confirm-modal/confirm-modal";

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
        let emp = [];
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

    makeRequest = function() {
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
                        requested={() => that.makeRequest()}
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
            </div>
        );
    }
}

export default RequestApp;