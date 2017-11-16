import React, { Component } from 'react';
import { browserHistory as history } from 'react-router';
import classnames from 'classnames';
import CompanyHeader from "../../shared/header/header";
import logo from '../../shared/images/logo.svg';
import './HROptions.css';

class HROptions extends Component {
    render() {
        console.log(this.props.location.state, 'HR options');
        let myProfile = this.props.location.state.myProfile;
        const { className, ...props } = this.props;
        return (
            <div className={classnames('HROptions', className)} {...props}>
            <div className="App">
                <CompanyHeader
                    logo={logo}
                    myProfile={myProfile}
                />
                <div className="Option-Box-Container" >
                    <div className="HR-Option-Box" onClick={() => {
                        history.push({
                            pathname: '/add',
                            state: {
                                loggedIn: true,
                                action: 'add',
                                myProfile: myProfile
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
                                action: 'Remove',
                                myProfile: myProfile
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
                                action: 'Suspend',
                                myProfile: myProfile
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
                                    action: 'Reinstate',
                                    myProfile: myProfile
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
