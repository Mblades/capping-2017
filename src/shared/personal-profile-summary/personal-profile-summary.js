import React, { Component } from 'react';
import classnames from 'classnames';
import basicProfilePic from '../images/basicProfilePic.png';
import './personal-profile-summary.css';

class PersonalProfileSummary extends Component {
    //all of this information will need to passed in from the database
    // need to add all of the other fields of information we want
    render() {
        const { className, ...props } = this.props;
        return (
            <div className={classnames('ProfileBox', className)} {...props}>
                <div>
                    <img src={ basicProfilePic } className="Personal-Profile-picture" alt="proPic" />
                </div>
                <div className="Personal-Information-Summary">
                    Name: {this.props.user.name} <br/>
                    Phone: {this.props.user.phonenumber} <br/>
                    Department: {this.props.user.organization} <br/>
                    Location: {this.props.user.location} <br/>
                </div>
            </div>
        );
    }
}

export default PersonalProfileSummary;