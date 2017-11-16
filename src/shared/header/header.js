import React, { Component } from 'react';
import classnames from 'classnames';
import { browserHistory as history } from 'react-router';
import './header.css';

 class CompanyHeader extends Component {
    render() {
        const { className, ...props } = this.props;
        return (
            <div className={classnames('CompanyHeader', className)} {...props}>
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
            </div>
        );
    }
}

export default CompanyHeader;