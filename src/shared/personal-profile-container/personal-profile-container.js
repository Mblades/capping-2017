import React, { Component } from 'react';
import { browserHistory as history } from 'react-router';
import './personal-profile-container.css';
import PersonalProfileSummary from "../personal-profile-summary/personal-profile-summary";


class PersonalProfileContainer extends Component {
    render() {
        return (
            <div className="Personal-Profile-Window-Container">
                <div>
                    <PersonalProfileSummary
                        myProfile={this.props.myProfile}
                    />
                    <div className="Profile-Edit-Button" onClick={() => {
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
                    <div className="HR-Options-Button" onClick={() => {
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
                </div>
            </div>
        )
    }
}

export default PersonalProfileContainer;
