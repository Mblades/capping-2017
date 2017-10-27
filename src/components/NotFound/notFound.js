// src/components/NotFound/index.js
import React, { Component } from 'react';
import classnames from 'classnames';

import './notFound.css';

export default class NotFound extends Component {
    //Simple not found page to be implemented if the user is logged in but tries to access a page
    //that does not exist

    render() {
        const { className, ...props } = this.props;
        return (
            <div className={classnames('NotFound', className)} {...props}>
                <h1>
                    404 <small>Not Found :(</small>
                </h1>
            </div>
        );
    }
}