import React, { Component } from 'react';
import './back-button.css';
import { browserHistory as history } from 'react-router';


class BackButton extends Component {
    render() {
        console.log(this.props);
        return (
            <div className="back-button-container"onClick={() => {
                history.push({
                    pathname: this.props.backTo,
                    state: {
                        myProfile: this.props.myProfile,
                        employeeList: this.props.employeeList
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