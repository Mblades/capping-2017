import React, { Component } from 'react';
import './back-button.css';
import { browserHistory as history } from 'react-router';


class BackButton extends Component {
    //Simple button used to go back to the last main screen
    render() {
        return (
            <div className="back-button-container"onClick={() => {
                history.push({
                    pathname: this.props.backTo,
                    state: {
                        myProfile: this.props.myProfile,
                        employeeList: this.props.employeeList,
                        employee: this.props.employee
                    }
                })}}>
                <div className="back-button">
                    Go Back
                </div>
            </div>
        );
    }
}

export default BackButton;