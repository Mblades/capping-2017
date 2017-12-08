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
        var check_Fname = /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?)?$/;
        var check_Lname = /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?)?$/;
        var check_phone = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
        var check_address = /^([0-9]{1,5})\s((([A-Za-z]+)+)\s)*((([A-Za-z]+)+)\w)$/;
        var check_position = /^(((([A-Za-z]+)+)\s)*((([A-Za-z]+)+)\w))$/;
        var check_city = /^(((([A-Za-z]+)+)\s)*((([A-Za-z]+)+)\w))$/;
        var check_department = /^(((([A-Za-z]+)+)\s)*((([A-Za-z]+)+)\w))$/;
        var check_email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var check_location = /^(((([A-Za-z]+)+)\s)*((([A-Za-z]+)+)\w))$/;
        var check_roleID = /^[A-Za-z]{1}[0-9]{4}$/;
        var check_dob = /^(0[1-9]|1[012])([- /.])(0[1-9]|[12][0-9]|3[01])\2(19|20)\d\d$/; // MM-DD-YYYY
        var check_description = /^(((((([A-Za-z]+)+)\s)*((([A-Za-z]+)+)\w))\.)\s)*((((([A-Za-z]+)+)\s)*((([A-Za-z]+)+)\w))\.)$/;
        var check_accessLevel = /^[1-6]{1,1}$/; // (1-6)
        let correctInfo = true;
        let missingInfo = [];
        let refs = this.refs;
        if(this.refs.Fname.value === '' || !check_Fname.test(refs.Fname.value)) {
            correctInfo = false;
            missingInfo.push('Please enter a valid first name.');
        }
        if(this.refs.Lname.value === '' || !check_Lname.test(refs.Lname.value)) {
            correctInfo = false;
            missingInfo.push('Please enter a valid last name.');
        }
        if(this.refs.phone.value === '' || !check_phone.test(refs.phone.value)) {
            correctInfo = false;
            missingInfo.push('Please enter a valid phone number.');
        }
        if(this.refs.address.value === '' || !check_address.test(refs.address.value)) {
            correctInfo = false;
            missingInfo.push('Please enter a valid address.');
        }
        if(this.refs.position.value === '' || !check_position.test(refs.position.value)) {
            correctInfo = false;
            missingInfo.push('Please enter a valid position.');
        }
        if(this.refs.city.value === '' || !check_city.test(refs.city.value)) {
            correctInfo = false;
            missingInfo.push('Please enter a valid city.');
        }
        if(this.refs.department.value === '' || !check_department.test(refs.department.value)) {
            correctInfo = false;
            missingInfo.push('Please enter a valid department.');
        }
        if(this.refs.email.value === '' || !check_email.test(refs.email.value)) {
            correctInfo = false;
            missingInfo.push('Please enter a valid email address.');
        }
        if(this.refs.location.value === '' || !check_location.test(refs.location.value)) {
            correctInfo = false;
            missingInfo.push('Please enter a valid location.');
        }
        if(this.refs.roleID.value === '' || !check_roleID.test(refs.roleID.value)) {
            correctInfo = false;
            missingInfo.push('Please enter a valid role ID.');
            console.log();
        }
        if(this.refs.dob.value === '' || !check_dob.test(refs.dob.value)) {
            correctInfo = false;
            missingInfo.push('Please enter a valid role date of birth.');
        }
        if(this.refs.description.value === '' || !check_description.test(refs.description.value)) {
            correctInfo = false;
            missingInfo.push('Please enter a valid description.');
        }
        if(this.refs.accessLevel.value === '' || !check_accessLevel.test(refs.accessLevel.value)) {
            correctInfo = false;
            missingInfo.push('Please enter a valid access level.');
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
            eid: '15',
            mid: '15',
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