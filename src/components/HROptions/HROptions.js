import React, { Component } from 'react';
import { browserHistory as history } from 'react-router';
import classnames from 'classnames';
import CompanyHeader from "../../shared/header/header";
import logo from '../../shared/images/logo.svg';
import './HROptions.css';

class HROptions extends Component {
    render() {
        console.log(this.props.location.state, 'HROPTIONS');
        const { className, ...props } = this.props;
        return (
            <div className={classnames('HROptions', className)} {...props}>
            <div className="App">
                <CompanyHeader
                    logo={logo}
                />
                <div className="Option-Box-Container" >
                    <div className="HR-Option-Box" onClick={() => {
                        history.push({
                            pathname: '/add',
                            state: {
                                loggedIn: true,
                                action: 'add'
                            }
                        })}}>
                        <div className="Option-Text">
                            Add Employee
                        </div>
                    </div>
                </div>
                <div className="Option-Box-Container">
                    <div className="HR-Option-Box" onClick={() => {
                        history.push({
                            pathname: '/action',
                            state: {
                                loggedIn: true,
                                action: 'Remove'
                            }
                        })}}>
                        <div className="Option-Text">
                            Remove Employee
                        </div>
                    </div>
                </div>
                <div className="Option-Box-Container">
                    <div className="HR-Option-Box" onClick={() => {
                        history.push({
                            pathname: '/action',
                            state: {
                                loggedIn: true,
                                action: 'Suspend'
                            }
                        })}}>
                        <div className="Option-Text">
                            Suspend Employee
                        </div>
                    </div>
                </div>
                <div className="Option-Box-Container">
                    <div className="HR-Option-Box">
                        <div className="Option-Text" onClick={() => {
                            history.push({
                                pathname: '/action',
                                state: {
                                    loggedIn: true,
                                    action: 'Reinstate'
                                }
                            })}}>
                            Reinstate
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default HROptions;
