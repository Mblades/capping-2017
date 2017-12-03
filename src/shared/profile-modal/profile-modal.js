import React, { Component } from 'react';
import './profile-modal.css';
import { browserHistory as history } from 'react-router';
import AppBox from '../../shared/app-box/app-box';
import basicProfilePic from '../../shared/images/basicProfilePic.png';
import SearchContainer from '../../shared/search-container/search-container'


class ProfileModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: 1,
            editMode: false,
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

    toggleEdit () {
        this.setState({
            editMode: true
        })
    }

    render() {
        console.log(this.props, 'hi');
        let employee = this.props.employee;
        let dob = new Date (employee.birthday);
        return (
            <div className="Profile-modal-container">
                <div className="profile-tabs">
                    { this.props.tabCount ===1 &&
                        (
                            <div className="profile-tab1"  onClick={() => {
                                this.setState({currentTab: 1, editMode: false});
                            }}>
                                Personal Information
                            </div>
                        )
                    }
                    { this.props.tabCount ===2 &&
                    (
                        <div>
                            <div className="profile-tab2" onClick={() => {
                                this.setState({currentTab: 1, editMode: false});
                            }}>
                                Personal Information
                            </div>
                            <div className="tabBreak"></div>
                            <div className="profile-tab2" onClick={() => {
                                this.setState({currentTab: 2, editMode: false});
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
                                this.setState({currentTab: 1, editMode: false});
                            }}>
                                Personal Information
                            </div>
                            <div className="tabBreak"></div>
                            <div className="profile-tab3" onClick={() => {
                                this.setState({currentTab: 2, editMode: false});
                            }}>
                                Professional Information
                            </div>
                            <div className="tabBreak"></div>
                            <div className="profile-tab3" onClick={() => {
                                this.setState({currentTab: 3, editMode: false});
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
                                this.setState({currentTab: 1, editMode: false});
                            }}>
                                Personal Information
                            </div>
                            <div className="tabBreak"></div>
                            <div className="profile-tab4" onClick={() => {
                                this.setState({currentTab: 2, editMode: false});
                            }}>
                                Professional Information
                            </div>
                            <div className="tabBreak"></div>
                            <div className="profile-tab4" onClick={() => {
                                this.setState({currentTab: 3, editMode: false});
                            }}>
                                Applications
                            </div>
                            <div className="tabBreak"></div>
                            <div className="profile-tab4" onClick={() => {
                                this.setState({currentTab: 4, editMode: false});
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
                            this.state.currentTab === 1 && !this.state.editMode && (
                                <div>
                                    <div className="employee-name-container">
                                        <div className="employee-name">{employee.firstname} {employee.lastname}</div>
                                    </div>
                                    {
                                        employee.eid === this.props.myProfile.eid && (
                                            <div className="Edit-Button" onClick={this.toggleEdit.bind(this)}>
                                                Edit
                                            </div>
                                        )
                                    }
                                    <div className="profile-image-container">
                                        <img src={ basicProfilePic } className="profile-image" alt="proPic" />
                                    </div>
                                    <div className="Profile-Personal-Information">
                                        <div className="personal-information-container">
                                            <div className="information-content">
                                                <div className="information-line">Company ID: <div className="profile-info">{employee.eid}</div></div>
                                                <div className="information-line">Date of Birth: <div className="profile-info">{dob.toLocaleDateString()}</div></div>
                                                <div className="information-line">Address: <div className="profile-info">{employee.address}</div></div>
                                                <div className="information-line">Phone: <div className="profile-info">{employee.phonenumber}</div></div>
                                                <div className="information-line">Email: <div className="profile-info">{employee.email}</div></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        {
                            this.state.currentTab === 1 && this.state.editMode && (
                                <div>
                                    <form>
                                    <div className="employee-name-container">
                                    </div>
                                        <div className="profile-image-container">
                                            <img src={ basicProfilePic } className="profile-image" alt="proPic" />
                                        </div>
                                        <div className="Profile-Personal-Information">
                                            <div className="personal-information-container">
                                                <div className="information-content">
                                                    <div className="information-line">
                                                        First Name: <input className="input-edit" ref="Fname" name="Employee_Fname" type="text" required placeholder={employee.firstname}/><br/>
                                                        Last Name: <input className="input-edit" ref="Lname" name="Employee_Lname" type="text" required placeholder={employee.lastname}/>
                                                    </div>
                                                    <div className="information-line">Date of Birth: <div className="profile-info"><input className="input-edit" ref="dob" name="Employee_dob" type="text" placeholder={dob.toLocaleDateString()}/></div></div>
                                                    <div className="information-line">Address: <div className="profile-info"><input className="input-edit" ref="address" name="Employee_address" type="text" placeholder={employee.address}/></div></div>
                                                    <div className="information-line">Phone: <div className="profile-info"><input className="input-edit" ref="phone" name="Employee_phone" type="text" placeholder={employee.phonenumber}/></div></div>
                                                    <div className="information-line">Email: <div className="profile-info"><input className="input-edit" ref="email" name="Employee_email" type="text" placeholder={employee.email}/></div></div>
                                                    <div style={{paddingTop: "5px"}}>
                                                        <div className="done-edit-button">
                                                            Done
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            )
                        }

                        {
                            this.state.currentTab === 2 && !this.state.editMode && (
                                <div>
                                    <div className="Profile-Personal-Information">
                                        <div className="employee-name-container">
                                            <div className="employee-name">{employee.firstname} {employee.lastname}</div>
                                        </div>
                                        {
                                            this.props.myProfile.accesslevel <= 2 && !this.props.HRaction &&(
                                                <div className="Edit-Button" onClick={this.toggleEdit.bind(this)}>
                                                    Edit
                                                </div>
                                            )
                                        }
                                        <div className="profestional-information-container">
                                            <div className="information-content">
                                                <div className="information-line">Position: <div className="profile-info">{employee.jobtitle}</div></div>
                                                <div className="information-line">Location: <div className="profile-info">{employee.city}, Need to change location to string</div></div>
                                                <div className="information-line">Department: <div className="profile-info">{employee.organization}</div></div>
                                                <div className="information-line">Manager: <div className="profile-info">{this.props.manager.firstname} {this.props.manager.lastname}</div></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        {
                            this.state.currentTab === 2 && this.state.editMode && (
                                <div>
                                    <div className="Profile-Personal-Information">
                                        <div className="employee-name-container">
                                            <div className="employee-name">{employee.firstname} {employee.lastname}</div>
                                        </div>
                                        <div className="profestional-information-container">
                                            <div className="information-content">
                                                <div className="information-line">Position: <div className="profile-info"><input className="input-edit" ref="position" name="Employee_dob" type="text" placeholder={employee.jobtitle}/></div></div>
                                                <div className="information-line">Location: <div className="profile-info"><input className="input-edit" ref="location" name="Employee_dob" type="text" placeholder={employee.city}/></div></div>
                                                <div className="information-line">Department: <div className="profile-info"><input className="input-edit" ref="department" name="Employee_dob" type="text" placeholder={employee.organization}/></div></div>
                                                <div className="information-line">Manager: <div className="profile-info">{this.props.manager.firstname} {this.props.manager.lastname}</div></div>
                                                <div style={{paddingTop: "5px"}}>
                                                    <div className="done-edit-button">
                                                        Done
                                                    </div>
                                                </div>
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
                                    {this.props.myProfile.eid === this.props.employee.eid && (
                                        <div className="request-button-container">
                                            <div className="request-button" onClick={() => {
                                                history.push({
                                                    pathname: '/request',
                                                    state: {
                                                        employees: this.props.employees,
                                                        loggedIn: true,
                                                        employee: this.props.employee,
                                                        myProfile: this.props.myProfile,
                                                        manager: this.props.manager
                                                    }
                                                })}}>
                                                Request Access
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        }
                        {
                            this.state.currentTab === 4 && (
                                <div className="profile-search-container">
                                    <SearchContainer
                                        employees={ this.props.employees }
                                        myProfile={this.props.myProfile}
                                    />
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