import React, { Component } from 'react';
import { browserHistory as history } from 'react-router';
import './header.css';

 class CompanyHeader extends Component {
    render() {
        return (
            <div className="App-header-container">
                <div className="Logo-container" onClick={() => {
                    history.push({
                        pathname: '/home',
                        state: {
                            myProfile: this.props.myProfile
                        }
                    })}}>
                    <img src={this.props.logo} className="App-logo" alt="logo" />
                    <div className="Logo-text">
                        ACME
                    </div>
                </div>
                <div className="Login-Link"  onClick={() => {
                    history.push({
                        pathname: '/',
                        state: {
                        }
                    })}}>
                    Log-Out
                </div>
            </div>
        );
    }
}

export default CompanyHeader;