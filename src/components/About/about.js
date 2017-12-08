// src/components/About/index.js
import React, { Component } from 'react';
import classnames from 'classnames';

import './about.css';

export default class About extends Component {
    // This page is only here for testing will e removed soon
    render() {
        const { className, ...props } = this.props;
        return (
            <div className={classnames('About', className)} {...props}>
                <h1>
                    About
                </h1>
            </div>
        );
    }
}