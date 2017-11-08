import React, { Component } from 'react';
import classnames from 'classnames';
import { browserHistory as history } from 'react-router';
import './personal-profile-container.css';
import PersonalProfileSummary from "../personal-profile-summary/personal-profile-summary";


class PersonalProfileContainer extends Component {
    render() {
        const { className, ...props } = this.props;
        return (
            <div className={classnames('PersonalProfileContainer', className)} {...props}>
            <div className="Personal-Profile-Window-Container">
                <div>
                    <PersonalProfileSummary
                        user={this.props.user}
                    />
                    <div className="Profile-Edit-Button" onClick={() => {
                        history.push({
                            pathname: '/profile',
                            state: {
                                employee: this.props.user,
                                loggedIn: true
                            }
                        })}}>
                        Edit My Profile
                    </div>
                    { this.props.user.accesslevel <= 2 &&
                    <div className="HR-Options-Button" onClick={() => {
                        history.push({
                            pathname: '/options',
                            state: {
                                user: this.props.user,
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
