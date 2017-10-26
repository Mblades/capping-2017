import React, { Component } from 'react';
import classnames from 'classnames';
import basicProfilePic from '../images/basicProfilePic.png';
import './style.css';

class PersonalProfileSummary extends Component {
    //all of this information will need to passed in from the database
    // need to add all of the other fields of information we want
    render() {
        const { name, phone, position, location } = this.props;
        const { className, ...props } = this.props;
        return (
            <div className={classnames('ProfileBox', className)} {...props}>
                <div>
                    <img src={ basicProfilePic } className="Personal-Profile-picture" alt="proPic" />
                </div>
                <div className="Personal-Information-Summary">
                    Name: {name} <br/>
                    Phone: {phone} <br/>
                    Position: {position} <br/>
                    Location: {location} <br/>
                </div>
            </div>
        );
    }
}

export default PersonalProfileSummary;