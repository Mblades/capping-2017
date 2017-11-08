import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import classnames from 'classnames';
import { browserHistory as history } from 'react-router';
import './HRAction.css';
import CompanyHeader from "../../shared/header/header";
import Modal from "../../shared/modal/modal";
import logo from '../../shared/images/logo.svg';

let HRActionForm = props => {
    const { handleSubmit } = props;
    //This form can be turned into an autosugest element that can search for user id.
    return (
        <form onSubmit={ handleSubmit } className="HRAction_Form">
            <div>
                <div className="Action_Text">
                    Please Enter the Employee's ID or name that you would like to {props.SelectedAction}.
                </div>
                <div className="Employee_ID_Box">
                    Enter Employee ID:
                    <Field className="input" name="Employee_ID" component="input" type="text" required placeholder="Employee ID"/>
                </div>
                <button className="HR_Action_Button" type="button"> Cancel</button>
                <button className="HR_Action_Button" type="submit">Submit</button>
            </div>
        </form>
    )
};

HRActionForm = reduxForm({
    // a unique name for the form
    form: 'HRActionF'
})(HRActionForm);

class HRAction extends Component {
    constructor(props) {
        super(props)
        this.state = { isModalOpen: false }
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
                    <h1>Modal title</h1>
                    <p>hello</p>
                    <p><button onClick={() => this.toggleModal()}>Close</button></p>
                </Modal>
                <HRActionForm
                    onSubmit={() => this.toggleModal()}
                    SelectedAction={this.props.location.state.action}
                />
            </div>
            </div>
        );
    }
}

export default HRAction;