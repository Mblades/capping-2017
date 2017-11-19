import React, { Component } from 'react';
import './profile-modal.css';
import AppBox from '../../shared/app-box/app-box';
import basicProfilePic from '../../shared/images/basicProfilePic.png';


class ProfileModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: 1,
            image: '../Images/basicProfilePic.png'
        }

    };

    renderAppBoxes = function() {
        let appList = this.props.apps.map(function (value) {
            return (
                <div className="App-Box-Spacing">
                    <AppBox
                        app={value}
                    />
                </div>
            )
        })
        return(appList);
    };

    render() {
        console.log(this.props);
        let employee = this.props.employee;
        let dob = new Date (employee.birthday);
        return (
            <div className="Profile-modal-container">
                <div className="profile-tabs">
                    { this.props.tabCount ===1 &&
                        (
                            <div className="profile-tab1"  onClick={() => {
                                this.setState({currentTab: 1});
                            }}>
                                Personal Information
                            </div>
                        )
                    }
                    { this.props.tabCount ===2 &&
                    (
                        <div>
                            <div className="profile-tab2" onClick={() => {
                                this.setState({currentTab: 1});
                            }}>
                                Personal Information
                            </div>
                            <div className="tabBreak"></div>
                            <div className="profile-tab2" onClick={() => {
                                this.setState({currentTab: 2});
                            }}>
                                Professional Information
                            </div>
                        </div>
                    )
                    }
                    { this.props.tabCount ===3 &&
                    (
                        <div>
                            <div className="profile-tab3" onClick={() => {
                                this.setState({currentTab: 1});
                            }}>
                                Personal Information
                            </div>
                            <div className="tabBreak"></div>
                            <div className="profile-tab3" onClick={() => {
                                this.setState({currentTab: 2});
                            }}>
                                Professional Information
                            </div>
                            <div className="tabBreak"></div>
                            <div className="profile-tab3" onClick={() => {
                                this.setState({currentTab: 3});
                            }}>
                                Applications
                            </div>
                        </div>
                    )
                    }
                    { this.props.tabCount ===4 &&
                    (
                        <div>
                            <div className="profile-tab4" onClick={() => {
                                this.setState({currentTab: 1});
                            }}>
                                Personal Information
                            </div>
                            <div className="tabBreak"></div>
                            <div className="profile-tab4" onClick={() => {
                                this.setState({currentTab: 2});
                            }}>
                                Professional Information
                            </div>
                            <div className="tabBreak"></div>
                            <div className="profile-tab4" onClick={() => {
                                this.setState({currentTab: 3});
                            }}>
                                Applications
                            </div>
                            <div className="tabBreak"></div>
                            <div className="profile-tab4" onClick={() => {
                                this.setState({currentTab: 4});
                            }}>
                                Employees
                            </div>
                        </div>
                    )
                    }
                </div>
                <div className="content">
                    <div className="profile-content">
                        {
                            this.state.currentTab === 1 && (
                                <div>
                                    <img src={ basicProfilePic } className="profile-image" alt="proPic" />
                                    <div className="Profile-Personal-Information">
                                        <div className="employee-name-container">
                                            <div className="employee-name">{employee.firstname} {employee.lastname}</div>
                                        </div>
                                        <div className="personal-information-container">
                                            <div className="information-content">
                                                <div className="information-line">Date of Birth: <div className="profile-info">{dob.toLocaleDateString()}</div></div>
                                                <div className="information-line">Address: <div className="profile-info">{employee.address}</div></div>
                                                <div className="information-line">Company ID: <div className="profile-info">{employee.eid}</div></div>
                                                <div className="information-line">Phone: <div className="profile-info">{employee.phonenumber}</div></div>
                                                <div className="information-line">Email: <div className="profile-info">{employee.email}</div></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        {
                            this.state.currentTab === 2 && (
                                <div>
                                    <div className="Profile-Personal-Information">
                                        <div className="employee-name-container">
                                            <div className="employee-name">{employee.firstname} {employee.lastname}</div>
                                        </div>
                                        <div className="profestional-information-container">
                                            <div className="information-content">
                                                <div className="information-line">Position: <div className="profile-info">{employee.jobtitle}</div></div>
                                                <div className="information-line">Location: <div className="profile-info">{employee.city}, Need to change location to string</div></div>
                                                <div className="information-line">Department: <div className="profile-info">{employee.organization}</div></div>
                                                <div className="information-line">Manager: <div className="profile-info">{this.props.manager.firstname} {this.props.manager.lastname}</div></div>
                                                <div className="information-line">Local Time: <div className="profile-info">NEED TO DISCUSS</div></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        {
                            this.state.currentTab === 3 && (
                                <div>
                                    {console.log(this.props.apps)}
                                    <div className="employee-app-list-label">
                                        Your Applications
                                    </div>
                                    <div className="employee-app-list">
                                        {
                                            this.renderAppBoxes()
                                        }
                                    </div>
                                    <div className="request-button-container">
                                        <div className="request-button">
                                            Request Access
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        {
                            this.state.currentTab === 4 && (
                                <div>
                                    test 4
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}
export default ProfileModal;