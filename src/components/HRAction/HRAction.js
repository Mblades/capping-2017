import React, { Component } from 'react';
import { browserHistory as history } from 'react-router';
import './HRAction.css';
import CompanyHeader from "../../shared/header/header";
import Modal from "../../shared/modal/modal";
import logo from '../../shared/images/logo.svg';
import AutoSearch from "../../shared/auto-search/auto-search";
import ProfileModal from "../../shared/profile-modal/profile-modal";
import ConfirmModal from "../../shared/confirm-modal/confirm-modal";
import BackButton from "../../shared/back-button/back-button";

/* @class HRAction */
// @classdesc React component for HR actions performed on an employee
class HRAction extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalOpen: false,
            actionEmployee: {},
            actionComplete: false,
            suspendedEmp: [],
            reinstateOpen: false
        }
    }

    /* @function componentDidMount */
    // @return {void} employee data on which to perform HR actions is loaded from database
    componentDidMount() {
        //  This fires before the page renders to gather all profiles
        if(this.props.location.state.action === 'Reinstate') {
            let that = this;
            let emp = [];
            fetch('http://10.10.7.153:3000/api/get_all_suspended')
                .then(function (response) {
                    response.json()
                        .then(function (data) {
                            emp = data.rows;
                            that.setState({
                                suspendedEmp: emp
                            });
                        })
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    }

    /* @function doAction */
    // @param {event} clicking one of the HR options
    // @return {void} assignment of approprite values to HRAction state
    doAction(event) {
        let that = this;
        this.toggleModal();
        event.preventDefault();
        if(this.props.location.state.action === 'Remove') {
            let action_data = {
                eid: this.state.actionEmployee.eid
            };
            var request = new Request('http://10.10.7.153:3000/api/delete-employee', {
                method: 'POST',
                headers: new Headers({'Content-Type': 'application/json'}),
                body: JSON.stringify(action_data)
            });
            fetch(request)
                .then(function (response) {
                    response.json()
                        .then(function (data) {
                            that.toggleConfirm();
                        })
                })
                .catch(function (err) {
                    console.log(err);
                })
        } else if(this.props.location.state.action === 'Suspend') {
            let that = this;
            let action_data = {
                eid: this.state.actionEmployee.eid
            };
            var request1 = new Request('http://10.10.7.153:3000/api/suspend_employee', {
                method: 'POST',
                headers: new Headers({'Content-Type': 'application/json'}),
                body: JSON.stringify(action_data)
            });
            fetch(request1)
                .then(function (response) {
                    response.json()
                        .then(function (data) {
                            that.toggleConfirm();
                        })
                })
                .catch(function (err) {
                    console.log(err);
                })
        } else if(this.props.location.state.action === 'Reinstate') {
            this.setState({
                reinstateOpen: true
            });
        }
    }

    /* @function submit */
    // @param {employee} employee data to perform HR actions on
    // @return {void} assignment of appropriate values to HRAction state
    submit = (employee) => {
        // when you submit an employee it will the gather the employee information you plan to delete
        // Need to look up employee with an API to get name and to see if they exist. Then do front end error checking
        let curEmployee = employee;
        this.setState({actionEmployee: curEmployee});
        this.toggleModal();
    };

    /* @function cancel */
    // @param {employee} employee data to perform HR actions on
    // @return {void} assignment of appropriate values to HRAction state
    cancel = () => {
        history.push({
            pathname: '/home',
            state: {
                myProfile: this.props.location.state.myProfile
            }
        })
    }

    /* @function toggleModal */
    // @return {void} requests confirmation of selected employee action
    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    /* @function toggleConfirm */
    // @return {void} displays confirmation of performed action
    toggleConfirm = () => {
        this.setState({
            actionComplete: !this.state.actionComplete
        });
    }

    /* @function actionDone */
    // @return {void} prompts HR employee choose new action
    actionDone = () => {
        history.push({
            pathname: '/options',
            state: {
                loggedIn: true,
                myProfile: this.props.location.state.myProfile,
                employeeList: this.props.location.state.employeeList
            }
        })
    }

    /* @function confirmReinstate */
    // @return {void} prompts HR employee to input eid, access level, and temporary password for reinstatement
    confirmReinstate = () => {
        let that = this;
        let action_data = {
            eid: this.state.actionEmployee.eid,
            accessLevel: this.refs.accessLevel.value,
            tempPass: this.refs.tempPass.value

        };
        var request = new Request('http://10.10.7.153:3000/api/reinstate_employee', {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify(action_data)
        });
        fetch(request)
            .then(function (response) {
                response.json()
                    .then(function (data) {
                        that.toggleConfirm();
                    })
            })
            .catch(function (err) {
                console.log(err);
            })
        this.setState({
            reinstateOpen: false
        })
    }

    /* @function render */
    // @return {void} handles selected HR actions and
    render() {
        let myProfile = this.props.location.state.myProfile;
        return (
            <div className="App">
                <CompanyHeader
                    logo={logo}
                    myProfile={myProfile}
                />
                {this.state.isModalOpen && (
                        <Modal show={this.state.isModalOpen} onClose={() => this.toggleModal()}>
                            <div className="HR-modal-title">Are you sure you want to {this.props.location.state.action} </div>
                            <div className="HR-profile-container">
                                <ProfileModal
                                    employee={this.state.actionEmployee}
                                    myProfile={myProfile}
                                    tabCount={2}
                                    manager='n/a'
                                    HRaction={true}
                                />
                            </div>
                            <div className="HR-action-buttons">
                                <button className="confirm-delete-button" onClick={this.doAction.bind(this)}>Confirm</button>
                                <button className="cancel-delete-button" onClick={this.toggleModal}>Close</button>
                            </div>
                        </Modal>
                    )
                }
                <Modal show={this.state.reinstateOpen} onClose={() => this.toggleModal()}>
                    <div>
                        <div className="reinstate-text">
                            Please enter a Access Level and a Temporary Password for the reinstated employee.
                        </div>
                        <div className="reinstate-container">
                            <form>
                                <div className="information-line">Access Level: <div className="profile-info"><input className="input-edit" ref="accessLevel" name="Employee_dob" type="text" placeholder='access level'/></div></div>
                                <div className="information-line">Temporary Password: <div className="profile-info"><input className="input-edit" ref="tempPass" name="Employee_address" type="text" placeholder='password'/></div></div>
                                <div className="confirm-delete-button" onClick={this.confirmReinstate.bind(this)}>
                                    Edit
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal>
                <ConfirmModal
                    show={this.state.actionComplete}
                >
                    <div>
                        <div className="confirm-text">
                            You have successfully {this.props.location.state.action}ed <div className="Action_Text_Word"> {this.state.actionEmployee.firstname} {this.state.actionEmployee.lastname} </div>
                        </div>
                        <div className="confirm-action-button" onClick={this.actionDone.bind(this)}>
                            Done
                        </div>
                    </div>
                </ConfirmModal>
                <div className="HR-Action-Container animation-container">
                    <div>
                        <div className="Action_Text">
                            Please Enter the Employee's ID or name that you would like to <div className="Action_Text_Word"> {this.props.location.state.action}</div>.
                        </div>
                        <div className="Employee_ID_Box">
                            { this.props.location.state.action === 'Reinstate' && (
                                <AutoSearch
                                    list={this.state.suspendedEmp}
                                    searchBy="id"
                                    placeholder="Employee ID"
                                    choice={this.submit}
                                />
                            )}
                            { this.props.location.state.action !== 'Reinstate' && (
                                <AutoSearch
                                    list={this.props.location.state.employeeList}
                                    placeholder="Employee Name or ID"
                                    choice={this.submit}
                                />
                            )}

                        </div>
                    </div>
            </div>
                <BackButton
                    myProfile={myProfile}
                    employeeList={this.props.location.state.employeeList}
                    backTo="options"
                />
            </div>
        );
    }
}

export default HRAction;