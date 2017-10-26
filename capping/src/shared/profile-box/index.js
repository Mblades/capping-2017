import React, { Component } from 'react';
import classnames from 'classnames';
import { browserHistory as history } from 'react-router';
import basicProfilePic from '../images/basicProfilePic.png';
import './style.css';

class ProfileBox extends Component {
    //  Name, Phone, Position, and Location all get passed from the search container and are then populated
    //  into each of the profile boxes
    render() {
        const { name, phone, position, location } = this.props;
        const { className, ...props } = this.props;
        return (
            <div className={classnames('ProfileBox', className)} {...props}>
            <button className="Profile-Box-Container" onClick={() => {
                //  Moves the user to the profile page and passes the information of the
                //  selected user to populate the profile
                history.push({
                    pathname: '/profile',
                    state: {
                        id: this.props.id,
                        loggedIn: true
                    }
                })}}>

                <div>
                    <img src={ basicProfilePic } className="Profile-picture" alt="proPic" />
                </div>
                <div className="Profile-summary-content">
                    <div className="Profile-summary-line">
                        Name: { name }
                    </div>
                    <div className="Profile-summary-line">
                        Phone: { phone }
                    </div>
                    <div className="Profile-summary-line">
                        Position: { position.substring(0,16) }
                    </div>
                    <div className="Profile-summary-line">
                        Location: { location }
                    </div>
                </div>
            </button>
            </div>
        );
    }
}

export default ProfileBox;