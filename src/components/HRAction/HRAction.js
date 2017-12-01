import React, { Component } from 'react';
import { browserHistory as history } from 'react-router';
import './HRAction.css';
import CompanyHeader from "../../shared/header/header";
import Modal from "../../shared/modal/modal";
import logo from '../../shared/images/logo.svg';
import AutoSearch from "../../shared/auto-search/auto-search";
import ProfileModal from "../../shared/profile-modal/profile-modal";
import ConfirmModal from "../../shared/confirm-modal/confirm-modal";

class HRAction extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalOpen: false,
            actionEmployee: {},
            actionComplete: false,
            suspendedEmp: []
        }
    }

    componentDidMount() {
        //  This fires before the page renders to gather all profiles,
        //  I may move this so that we have a loader while the employee
        //  list loads
        if(this.props.location.state.action === 'Reinstate') {
            console.log('sadsad');
            let that = this;
            let emp = [];
            //setTimeout(function() {
            fetch('http://10.10.7.153:3000/api/get_all_suspended')
                .then(function (response) {
                    response.json()
                        .then(function (data) {
                            emp = data.rows;
                            console.log(emp);
                            that.setState({
                                suspendedEmp: emp
                            });
                        })
                })
                .catch(function (err) {
                    console.log(err);
                });
            //}, 1000);
        }
    }

    doAction(event) {
        //let that = this;
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
                            console.log("deleted", data)
                            /*history.push({
                                pathname: '/home',
                                state: {
                                    user: data.rows[0],
                                    loggedIn: true
                                }
                            })*/
                        })
                })
                .catch(function (err) {
                    console.log(err);
                })
        } else if(this.props.location.state.action === 'Suspend') {
            let action_data = {
                eid: this.state.actionEmployee.eid
            };
            var request = new Request('http://10.10.7.153:3000/api/suspend_employee', {
                method: 'POST',
                headers: new Headers({'Content-Type': 'application/json'}),
                body: JSON.stringify(action_data)
            });
            fetch(request)
                .then(function (response) {
                    response.json()
                        .then(function (data) {
                            console.log("suspended", data)
                            /*history.push({
                                pathname: '/home',
                                state: {
                                    user: data.rows[0],
                                    loggedIn: true
                                }
                            })*/
                        })
                })
                .catch(function (err) {
                    console.log(err);
                })
        } else if(this.props.location.state.action === 'Reinstate') {
            let action_data = {
                eid: this.state.actionEmployee.eid
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
                            console.log("reinstate", data)
                            /*history.push({
                                pathname: '/home',
                                state: {
                                    user: data.rows[0],
                                    loggedIn: true
                                }
                            })*/
                        })
                })
                .catch(function (err) {
                    console.log(err);
                })
        }
    }

    submit = (employee) => {
        // when you submit an employee it will the gather the employee information you plan to delete
        //Need to look up employee with an API to get name and to see if they exist. Then do front end error checking
        let curEmployee = employee;
        this.setState({actionEmployee: curEmployee});
        this.toggleModal();
    };

    cancel = () => {
        history.push({
            pathname: '/home',
            state: {
                myProfile: this.props.location.state.myProfile
            }
        })
    }

    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render() {
        console.log(this.state, 'sdf');
        console.log(this.props.location.state);
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
                <ConfirmModal
                    show={this.state.actionComplete}
                >
                    <div className="confirm-text">
                        You have successfully **Done THIS**
                    </div>
                </ConfirmModal>
                <div className="HR-Action-Container">
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
                                    searchBy="id"
                                    placeholder="Employee ID"
                                    choice={this.submit}
                                />
                            )}

                        </div>
                    </div>
            </div>
            </div>
        );
    }
}

export default HRAction;