import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import classnames from 'classnames';
import { browserHistory as history } from 'react-router';
import './HRAction.css';
import CompanyHeader from "../../shared/header/header";
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

    submit = (values) => {
        // print the form values to the console
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

    render() {
        const { className, ...props } = this.props;

        return (
            <div className={classnames('HRAction', className)} {...props}>
            <div className="App">
                <CompanyHeader
                    logo={logo}
                />
                <HRActionForm
                    onSubmit={this.submit}
                    SelectedAction={this.props.location.state.action}
                />
            </div>
            </div>
        );
    }
}

export default HRAction;