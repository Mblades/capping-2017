import React, { Component } from 'react';
import { browserHistory as history } from 'react-router';
import './personal-profile-container.css';
import PersonalProfileSummary from "../personal-profile-summary/personal-profile-summary";
import NewPass from "../new-password/new-password";


class PersonalProfileContainer extends Component {
    constructor(props) {
        super(props);
        //only here as a back-up place holder will be updated to be a fall back soon
        this.state = {
            passChange: false
        }

    };

    togglePass = function() {
        this.setState({
            passChange: !this.state.passChange
        });
    };

    render() {
        return (
            <div className="Personal-Profile-Window-Container">
                { this.state.passChange && (
                    <NewPass
                        eid={ this.props.myProfile.eid }
                        onClose={() => this.togglePass()}
                    />
                )}
                <div>
                    <PersonalProfileSummary
                        myProfile={this.props.myProfile}
                    />
                    <div className="profile-button-container">
                        <div className="profile-special-button" onClick={() => {this.togglePass()}}>
                            Change Password
                        </div>
                    <div className="profile-special-button" onClick={() => {
                        history.push({
                            pathname: '/profile',
                            state: {
                                myProfile: this.props.myProfile,
                                employee: this.props.myProfile,
                                loggedIn: true
                            }
                        })}}>
                        My Profile
                    </div>
                    { this.props.myProfile.accesslevel <= 2 &&
                    <div className="profile-special-button" onClick={() => {
                        history.push({
                            pathname: '/options',
                            state: {
                                employeeList: this.props.employeeList,
                                myProfile: this.props.myProfile,
                                loggedIn: true
                            }
                        })}}>
                        HR Options
                    </div>
                    }
                    { this.props.myProfile.mid &&
                    <div className="profile-special-button" onClick={() => {
                        history.push({
                            pathname: '/manage',
                            state: {
                                employeeList: this.props.employeeList,
                                myProfile: this.props.myProfile,
                                loggedIn: true
                            }
                        })}}>
                        Manage Requests
                    </div>
                    }
                    </div>
                </div>
            </div>
        )
    }
}

export default PersonalProfileContainer;
