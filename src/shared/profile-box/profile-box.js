import React, { Component } from 'react';
import { browserHistory as history } from 'react-router';
import basicProfilePic from '../images/basicProfilePic.png';
import './profile-box.css';

class ProfileBox extends Component {
    //  Name, Phone, Position, and Location all get passed from the search container and are then populated
    //  into each of the profile boxes
    render() {
        const { employee } = this.props;
        return (
        <div>
            <button className="Profile-Box-Container" onClick={() => {
                //  Moves the user to the profile page and passes the information of the
                //  selected user to populate the profile
                history.push({
                    pathname: '/profile',
                    state: {
                        employees: this.props.employees,
                        loggedIn: true,
                        employee: this.props.employee,
                        myProfile: this.props.myProfile
                    }
                })}}>

                <div>
                    <img src={ basicProfilePic } className="Profile-picture" alt="proPic" />
                </div>
                <div className="Profile-summary-content">
                    <div className="Profile-summary-line">
                        Name: { employee.firstname } { employee.lastname }
                    </div>
                    <div className="Profile-summary-line">
                        Phone: { employee.phonenumber }
                    </div>
                    <div className="Profile-summary-line">
                        Position: { employee.organization.substring(0,16) }
                    </div>
                    <div className="Profile-summary-line">
                        Location: { employee.location }
                    </div>
                </div>
            </button>
            </div>
        );
    }
}

export default ProfileBox;