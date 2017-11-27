import React, { Component } from 'react';
import './app-box.css';

class AppBox extends Component {
    //  Name, Phone, Position, and Location all get passed from the search container and are then populated
    //  into each of the profile boxes
    render() {
        const { app } = this.props;
        console.log(this.props.app, "tete");
        return (
            <div>
                <div className="app-link">
                    <div className="app-summary-line">
                        { app.appname }
                    </div>
                </div>
            </div>
        );
    }
}

export default AppBox;