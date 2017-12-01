import React from 'react';
import PropTypes from 'prop-types';
import './confirm-modal.css';

class ConfirmModal extends React.Component {
    render() {
        // Render nothing if the "show" prop is false
        if(!this.props.show) {
            return null;
        }

        return (
            <div className="confirm-backdrop">
                <div className="confirm-modal">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

ConfirmModal.propTypes = {
    show: PropTypes.bool,
    children: PropTypes.node
};

export default ConfirmModal;