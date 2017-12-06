import React, { Component } from 'react';
import CompanyHeader from "../../shared/header/header";
import logo from '../../shared/images/logo.svg';
import basicProfilePic from '../../shared/images/basicProfilePic.png';
import './newEmployee.css';
import BackButton from "../../shared/back-button/back-button";

class NewEmployee extends Component {
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
            currentTab: 1,
            missingInfo: []
        }

    };

    addEmployee(event) {
        //let that = this;
        event.preventDefault();
        let correctInfo = true;
        let missingInfo = [];
        if(this.refs.Fname.value === '') {
            correctInfo = false;
            missingInfo.push('First Name');
        }
        if(this.refs.Lname.value === '') {
            correctInfo = false;
            missingInfo.push('Last Name');

        }
        if(this.refs.phone.value === '') {
            correctInfo = false;
            missingInfo.push('Phone');

        }
        if(this.refs.address.value === '') {
            correctInfo = false;
            missingInfo.push('Address');
        }
        if(this.refs.position.value === '') {
            correctInfo = false;
            missingInfo.push('Position');
        }
        if(this.refs.city.value === '') {
            correctInfo = false;
            missingInfo.push('City');
        }
        if(this.refs.department.value === '') {
            correctInfo = false;
            missingInfo.push('Department');
        }
        if(this.refs.email.value === '') {
            correctInfo = false;
            missingInfo.push('Email');
        }
        if(this.refs.location.value === '') {
            correctInfo = false;
            missingInfo.push('Location');
        }
        if(this.refs.roleID.value === '') {
            correctInfo = false;
            missingInfo.push('Role ID');
        }
        if(this.refs.dob.value === '') {
            correctInfo = false;
            missingInfo.push('Date of Birth');
        }
        if(this.refs.description.value === '') {
            correctInfo = false;
            missingInfo.push('Description');
        }

        let employee_data = {
            first: this.refs.Fname.value,
            last: this.refs.Lname.value,
            phone: this.refs.phone.value,
            address: this.refs.address.value,
            title: this.refs.position.value,
            city:  this.refs.city.value,
            organization: this.refs.department.value,
            email: this.refs.email.value,
            location: this.refs.location.value,
            eid: Math.floor(Math.random() * 1000000000),
            mid: null,
            dob: this.refs.dob.value,
            roleId: this.refs.roleID.value,
            description: this.refs.description.value,
            accessLevel: this.refs.accessLevel.value
        };
        //Still missing eid, mid, dob, roleID, description, accessLevel
        console.log(employee_data, 'EMP Data');
        //change to 10.10.7.153
        if(correctInfo) {
            var request = new Request('http://10.10.7.153:3000/api/add-employee', {
                method: 'POST',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify(employee_data)
            });
            fetch(request)
                .then(function(response) {
                    response.json()
                        .then(function(data) {
                            console.log(data);
                        })
                })
                .catch(function(err) {
                    console.log(err);
                })
        } else {
            console.log(missingInfo);
            this.setState({
                missingInfo: missingInfo
            })
        }

    }
    render() {
        console.log(this.props.location, 'hihihiih');
        return (
            <div>
                <CompanyHeader
                    logo={logo}
                    myProfile={this.props.location.state.myProfile}
                />
                <div className="newEmp-container animation-container-modal">
            <div className="Profile-modal-container">
                <div className="profile-tabs">
                    <div>
                        <div className="employee-information-title" onClick={() => {
                            this.setState({currentTab: 1, editMode: false});
                            }}>
                            Employee Information
                        </div>
                    </div>
                 </div>
                <div className="content">
                    <div className="profile-content">
                        {
                            this.state.currentTab === 1 && (
                                <div>
                                    <form>
                                        <div className="employee-name-container">
                                        </div>
                                        <div className="profile-image-container">
                                            <img src={ basicProfilePic } className="profile-image" alt="proPic" />
                                        </div>
                                        <div className="Profile-Personal-Information">
                                            <div className="personal-information-container">
                                                <div className="newEmp-information-content">
                                                    <div className="new-information-line">First Name: <div className="new-profile-info"><input className="new-input-edit" ref="Fname" name="Employee_Fname" type="text" required placeholder='First Name'/></div></div>
                                                    <div className="new-information-line">Last Name: <div className="new-profile-info"><input className="new-input-edit" ref="Lname" name="Employee_Lname" type="text" required placeholder='Last Name'/></div></div>
                                                    <div className="new-information-line">Date of Birth:<div className="new-profile-info"><input className="new-input-edit" ref="dob" name="Employee_dob" type="text" placeholder='MM/DD/YYYY'/></div></div>
                                                    <div className="new-information-line">Address: <div className="new-profile-info"><input className="new-input-edit" ref="address" name="Employee_address" type="text" placeholder='Address'/></div></div>
                                                    <div className="new-information-line">Phone: <div className="new-profile-info"><input className="new-input-edit" ref="phone" name="Employee_phone" type="text" placeholder='Phone'/></div></div>
                                                    <div className="new-information-line">Email: <div className="new-profile-info"><input className="new-input-edit" ref="email" name="Employee_email" type="email" placeholder='Email'/></div></div>
                                                    <div className="new-information-line">Position: <div className="new-profile-info"><input className="new-input-edit" ref="position" name="Employee_dob" type="text" placeholder='Position'/></div></div>
                                                    <div className="new-information-line">Location: <div className="new-profile-info"><input className="new-input-edit" ref="location" name="Employee_dob" type="text" placeholder='Location'/></div></div>
                                                    <div className="new-information-line">City: <div className="new-profile-info"><input className="new-input-edit" ref="city" name="Employee_city" component="input" type="City" required placeholder="City"/></div></div>
                                                    <div className="new-information-line">Department: <div className="new-profile-info"><input className="new-input-edit" ref="department" name="Employee_dob" type="text" placeholder='Department'/></div></div>
                                                    <div className="new-information-line">Manager: <div className="new-profile-info">Make a checkbox</div></div>
                                                    <div className="new-information-line">Access Level: <div className="new-profile-info"><input className="new-input-edit" ref="accessLevel" name="Employee_accessLevel" component="input" type="text" required placeholder="Access Level"/></div></div>
                                                    <div className="new-information-line">Role ID: <div className="new-profile-info"><input className="new-input-edit" ref="roleID" name="Employee_roleID" component="input" type="text" required placeholder="Role ID"/></div></div>
                                                    <div className="new-information-line">Description: <div className="new-profile-info"><input className="new-input-edit" ref="description" name="Employee_description" component="input" type="text" required placeholder="Description"/></div></div>
                                                    <div style={{paddingTop: "5px"}}>
                                                        <div className="done-edit-button" onClick={this.addEmployee.bind(this)}>
                                                            Add Employee
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
                            this.state.currentTab === 2 && (
                                <div>
                                    <div className="Profile-Personal-Information">
                                        <div className="employee-name-container">
                                            <div className="employee-name"></div>
                                        </div>
                                        <div className="profestional-information-container">
                                            <div className="information-content">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            </div>
                <BackButton
                    myProfile={this.props.location.state.myProfile}
                    employeeList={this.props.location.state.employeeList}
                    backTo="options"
                />
            </div>
        );
    }
}
export default NewEmployee;