import React, { Component } from 'react';
import { browserHistory as history } from 'react-router';
import CompanyHeader from "../../shared/header/header";
import logo from '../../shared/images/logo.svg';
import basicProfilePic from '../../shared/images/basicProfilePic.png';
import './profile.css';

class Profile extends Component {
    constructor(props) {
        super(props);
        //only here as a back-up place holder will be updated to be a fall back soon
        this.state = {
            person: {
                name: 'John Doe',
                dob: '05-01-1900',
                address: '42 Wallaby Way',
                cid: 'D34DB33F',
                phone: '8675309',
                email: 'nunya(at)acme(dot)com',
                position: 'ACME Employee',
                location: 'USA',
                department: 'Quality Control',
                manager: 'Boss Man',
                loctime: 'EST',
                doh: 'September 2017'
            },
            image: '../Images/basicProfilePic.png',
        }

    };

    render() {
        console.log(this.props.location.state.employee);
        let employee = this.props.location.state.employee;
        return (
            <div className="ProfilePage">
                <CompanyHeader
                    logo={logo}
                />
                <div className="personal-information-container">
                    <img src={ basicProfilePic } className="Image" alt="proPic" />
                    <div className="Profile-Personal-Information">
                        <div className="Profile-Headers">Personal Information</div>
                        <div className="Edit-Button">Edit</div>
                        <div className="information-line">Name: <div className="profile-info">{employee.name}</div></div >
                        <div className="information-line">Date of Birth: <div className="profile-info">NOT IN DB</div></div>
                        <div className="information-line">Address: <div className="profile-info">NOT IN DB</div></div>
                        <div className="information-line">Company ID: <div className="profile-info">{employee.eid}</div></div>
                        <div className="information-line">Phone: <div className="profile-info">{employee.phonenumber}</div></div>
                        <div className="information-line">Email: <div className="profile-info">{employee.email}</div></div>
                    </div>
                </div>
                <div className="personal-information-container">
                    <div className="Profile-Professional-Information">
                        <div className="Profile-Headers">Professional Information</div>
                        <div className="Edit-Button">Edit</div>
                        <div className="information-line">Position: <div className="profile-info">{employee.jobtitle}</div></div>
                        <div className="information-line">Location: <div className="profile-info">{employee.location}</div></div>
                        <div className="information-line">Department: <div className="profile-info">{employee.organization}</div></div>
                        <div className="information-line">Manager: <div className="profile-info">NEED AN API</div></div>
                        <div className="information-line">Local Time: <div className="profile-info">NEED TO DERIVE</div></div>
                    </div>
                </div>
                { /* Application Table need to be updated with information and than this need to be changed */ }
                <div className="personal-information-container">
                    <div className="Profile-Headers">Applications</div>
                    <img src={ basicProfilePic } className="App-Images" alt="proPic" />
                    <img src={ basicProfilePic } className="App-Images" alt="proPic" />
                    <div className="Request-Access" onClick={() => {
                        history.push({
                            pathname: '/AccessRequest',
                            state: {
                                id: this.props.id,
                                loggedIn: true
                            }
                        })}}>Request Access</div>
                </div>
            </div>
        );
    }
}
export default Profile;