import React, { Component } from 'react';
import './request-box.css';

class RequestBox extends Component {
    //  Name, Phone, Position, and Location all get passed from the search container and are then populated
    //  into each of the profile boxes
    render() {
        const { app } = this.props;
        return (
            <div>
                <div className="app-link">
                    <div className="app-summary-line">
                        <div className="app-name">
                            { app.appname }
                        </div>
                        <div className="deny-access-button" onClick={() => {
                            this.props.deny(app)
                        }}>
                            Deny
                        </div>
                        <div className="approve-access-button" onClick={() => {
                            this.props.approve(app)
                        }}>
                            Approve
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RequestBox;