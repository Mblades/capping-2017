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
                        name="Matthew Blades"
                        phone="123-456-7890"
                        position="CEO"
                        location="United States"
                    />
                    <div className="Profile-Edit-Button" onClick={() => {
                        history.push({
                            pathname: '/profile',
                            state: {
                                id: this.props.id,
                                loggedIn: true
                            }
                        })}}>
                        Edit My Profile
                    </div>
                        { this.props.id === 2 &&
                        <div className="HR-Options-Button" onClick={() => {
                            history.push({
                                pathname: '/HR',
                                state: {
                                    id: this.props.id,
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
