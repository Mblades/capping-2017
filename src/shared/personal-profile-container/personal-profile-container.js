import React, { Component } from 'react';
import classnames from 'classnames';
import { browserHistory as history } from 'react-router';
import './personal-profile-container.css';
import PersonalProfileSummary from "../personal-profile-summary/personal-profile-summary";


class PersonalProfileContainer extends Component {
    render() {
        console.log(this.props, 'personal profile container');
        const { className, ...props } = this.props;
        return (
            <div className={classnames('PersonalProfileContainer', className)} {...props}>
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
                        Edit My Profile
                    </div>
                    { this.props.myProfile.accesslevel <= 2 &&
                    <div className="HR-Options-Button" onClick={() => {
                        history.push({
                            pathname: '/options',
                            state: {
                                myProfile: this.props.myProfile,
                                loggedIn: true
                            }
                        })}}>
                        HR Options
                    </div>
                    }
                </div>
            </div>
            </div>
        )
    }
}

export default PersonalProfileContainer;
