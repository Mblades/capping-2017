import React, { Component } from 'react';
import classnames from 'classnames';
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
        event.preventDefault();
        let action_data = {
            eid: this.refs.eid.value
        };
        //DELETE Pointer Local
        var request = new Request('http://localhost:3000/api/delete-employee', {
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

    submit = (values) => {
        // print the form values to the console
        //needs to be a pop up confirm not a separate page
        history.push({
            pathname: '/HR/Action/Confirm',
            state: {
                id: this.props.location.state.id,
                loggedIn: true,
                action: this.props.location.state.action,
                selectedEmployee: values.Employee_ID,
            }
        })
    };

    toggleModal = () => {
        console.log('test');
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const { className, ...props } = this.props;

        return (
            <div className={classnames('HRAction', className)} {...props}>
            <div className="App">
                <CompanyHeader
                    logo={logo}
                />
                <Modal show={this.state.isOpen} onClose={() => this.toggleModal()}>
                    <h1>Are you sure you want to {this.props.location.state.action} this employee?</h1>
                    ><button onClick={this.doAction.bind(this)}>Confirm</button>
                </Modal>
                <form ref="action_form" className="HRAction-Form">
                    <div>
                        <div className="Action_Text">
                            Please Enter the Employee's ID or name that you would like to {this.props.location.state.action}.
                        </div>
                        <div className="Employee_ID_Box">
                            Enter Employee ID:
                            <input className="input" ref="eid" name="Employee_ID" component="input" value="" type="text" required placeholder="Employee ID"/>
                        </div>
                        <button className="HR_Action_Button" type="button"> Cancel</button>
                        <button className="HR_Action_Button" type="button" onClick={this.toggleModal}>Submit</button>
                    </div>
                </form>
            </div>
            </div>
        );
    }
}

export default HRAction;