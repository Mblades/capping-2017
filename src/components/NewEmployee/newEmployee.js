import React, { Component } from 'react';
import CompanyHeader from "../../shared/header/header";
import logo from '../../shared/images/logo.svg';
import basicProfilePic from '../../shared/images/basicProfilePic.png';
import './newEmployee.css';

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
        }

    };

    addEmployee(event) {
        //let that = this;
        event.preventDefault();
        console.log(this.refs);
        var d = new Date(this.refs.dob.value | '1996-10-08');
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
            dob: '2/14/1922',
            roleId: 'AAAsdcA',
            description: 'CEO of the companies global branch',
            accessLevel: 1
        };
        //change to 10.10.7.153
        var request = new Request('http://localhost:3000/api/add-employee', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(employee_data)
        });
        fetch(request)
            .then(function(response) {
                response.json()
                    .then(function(data) {
                        console.log(data, 'err');
                    })
            })
            .catch(function(err) {
                console.log(err);
            })
    }
    render() {
        return (
            <div className="AddEmployeePage">
                <CompanyHeader
                    logo={logo}
                    myProfile={this.props.location.state.myProfile}
                />
                <form ref="action_form" className="HRAction-Form">
                <div className="personal-information-container-new">
                    <img src={ basicProfilePic } className="Image" alt="proPic" />
                    <div className="Profile-Personal-Information">
                        <div className="Profile-Headers">Personal Information</div>
                        <div className="information-line">First Name: <input className="input" ref="Fname" name="Employee_Fname" component="input" type="text" required placeholder="First Name"/> </div >
                        <div className="information-line">Last Name: <input className="input" ref="Lname" name="Employee_Lname" component="input" type="text" required placeholder="Last Name"/> </div >
                        <div className="information-line">Date of Birth: <input className="input" ref="dob" name="Employee_dob" component="input" type="text" required placeholder="Date Of Birth"/> </div>
                        <div className="information-line">Address: <input className="input" ref="address" name="Employee_address" component="input" type="text" required placeholder="Address"/></div>
                        <div className="information-line">Phone: <input className="input" ref="phone" name="Employee_phone" component="input" type="text" required placeholder="phone number"/></div>
                        <div className="information-line">Email: <input className="input" ref="email" name="Employee_email" component="input" type="text" required placeholder="Email"/></div>
                    </div>
                </div>
                <div className="personal-information-container-new">
                    <div className="Profile-Professional-Information">
                        <div className="Profile-Headers">Professional Information</div>
                        <div className="information-line">Position: <input className="input" ref="position" name="Employee_position" component="input" type="text" required placeholder="Position"/></div>
                        <div className="information-line">Location: <input className="input" ref="location" name="Employee_dob" component="input" type="text" required placeholder="Location"/></div>
                        <div className="information-line">City: <input className="input" ref="city" name="Employee_city" component="input" type="text" required placeholder="City"/></div>
                        <div className="information-line">Department: <input className="input" ref="department" name="Employee_department" component="input" type="text" required placeholder="Department"/></div>
                        <div className="information-line">Manager: <input className="input" ref="manager" name="Employee_manager" component="input" type="text" required placeholder="Manager"/></div>
                        <div className="information-line">Access Level: <input className="input" ref="accessLevel" name="Employee_accessLevel" component="input" type="text" required placeholder="Access Level"/></div>
                    </div>
                </div>
                    {/*need to add function to call */}
                    <button className="add-employee-button" onClick={this.addEmployee.bind(this)} type="submit">Add Employee</button>
                </form>
            </div>
        );
    }
}
export default NewEmployee;