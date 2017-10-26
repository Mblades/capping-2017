import React, { Component } from 'react';
import classnames from 'classnames';
import { browserHistory as history } from 'react-router';
import './style.css';

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
                            id: 1
                        }
                    })}}>
                    <img src={this.props.logo} className="App-logo" alt="logo" />
                    <div className="Logo-text">
                        ACME
                    </div>
                    <div className="Login-Link">
                        Log-Out
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default CompanyHeader;