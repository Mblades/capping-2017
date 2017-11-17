import React, { Component } from 'react';
import { browserHistory as history } from 'react-router';
import './HRAction.css';
import CompanyHeader from "../../shared/header/header";
import Modal from "../../shared/modal/modal";
import logo from '../../shared/images/logo.svg';

class HRAction extends Component {
    constructor(props) {
        super(props)
        this.state = { isModalOpen: false }
    }
    doAction(event) {
        //let that = this;
        this.toggleModal();
        event.preventDefault();
        let action_data = {
            eid: this.refs.eid.value
        };
        //DELETE Pointer Local
        var request = new Request('http://10.10.7.153:3000/api/delete-employee', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(action_data)
        });
        fetch(request)
            .then(function(response) {
                response.json()
                    .then(function(data) {
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
            .catch(function(err) {
                console.log(err);
            })
    }

    submit = () => {
        // when you submit an employee it will the gather the employee information you plan to delete
        //Need to look up employee with an API to get name and to see if they exist. Then do front end error checking
        if(this.refs.eid.value !== "") {
            this.toggleModal();
        }else {
            console.log('Missing ID');
        }
    };

    cancel = () => {
        console.log(this.props.location.state.myProfile, 'hi');
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
        console.log(this.props.location.state, 'HR actions');
        let myProfile = this.props.location.state.myProfile;
        return (
            <div className="App">
                <CompanyHeader
                    logo={logo}
                    myProfile={myProfile}
                />

                {this.state.isModalOpen && (
                        <Modal show={this.state.isModalOpen} onClose={() => this.toggleModal()}>
                            <h1>Are you sure you want to {this.props.location.state.action} </h1>
                            <div style={{whiteSspace: 'nowrap'}}>
                                <div className="action-employee-info"><span>{this.refs.eid.value}</span>?</div>
                            </div>
                            <button className="confirm-delete-button" onClick={this.doAction.bind(this)}>Confirm</button>
                            <button className="cancel-delete-button" onClick={this.toggleModal}>Close</button>
                        </Modal>
                    )
                }
                <div className="HR-Action-Container">
                <form ref="action_form" className="HRAction-Form">
                    <div>
                        <div className="Action_Text">
                            Please Enter the Employee's ID or name that you would like to {this.props.location.state.action}.
                        </div>
                        <div className="Employee_ID_Box">
                            Enter Employee ID:
                            <input className="input" ref="eid" name="Employee_ID" component="input" type="text" placeholder="Employee ID" required/>
                        </div>
                        <button className="HR_Action_Button" type="button" onClick={this.cancel.bind(this)}> Cancel</button>
                        <button className="HR_Action_Button" type="button" onClick={this.submit.bind(this)}>Submit</button>
                    </div>
                </form>
            </div>
            </div>
        );
    }
}

export default HRAction;