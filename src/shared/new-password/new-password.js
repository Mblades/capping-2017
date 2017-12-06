import React from 'react';
import PropTypes from 'prop-types';
import './new-pass.css';

class NewPass extends React.Component {
    render() {
        return (
            <div className="confirm-new-emp">
                <div className="new-emp-modal">
                    <form>
                        <div className="new-pass">
                            <div className="password-text">
                                Enter in the Employee Temp Password:
                            </div>
                            <div className="new-information-line"><div className="new-profile-info"><input className="new-password" ref="newPass" name="Employee_Passowrd" type="text" required placeholder='Password'/></div></div>
                            <div className="password-text">
                                Confirm Password:
                            </div>
                            <div className="new-information-line"><div className="new-profile-info"><input className="new-password" ref="newPass" name="Employee_Passowrd" type="text" required placeholder='Password'/></div></div>
                        </div>

                    </form>
                </div>
            </div>
        );
    }
}

export default NewPass;