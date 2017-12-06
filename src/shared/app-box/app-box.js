import React, { Component } from 'react';
import './app-box.css';

class AppBox extends Component {
    //  Name, Phone, Position, and Location all get passed from the search container and are then populated
    //  into each of the profile boxes
    render() {
        console.log(this.props);
        const { app } = this.props;
        return (
            <div>
                <div className="app-link">
                    <div className="app-summary-line">
                        <div className="app-name">
                            { app.appname }
                        </div>
                        { this.props.request && (
                                <div className="request-access-button" onClick={() => {
                                    this.props.requested(app)
                                }}>
                                    Request
                                </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default AppBox;