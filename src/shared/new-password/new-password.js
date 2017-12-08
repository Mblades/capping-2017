import React from 'react';
import './new-pass.css';

class NewPass extends React.Component {
    constructor(props) {
        super(props);
        //only here as a back-up place holder will be updated to be a fall back soon
        this.state = {
            success: false
        }

    };

    changePassword = function() {
        let today = new Date();
        if(this.props.newEmp){
            let pass_data = {
                ssid: Math.floor(Math.random() * 1000000000),
                eid: this.props.eid,
                pass: this.refs.newPass.value,
                oldPass: this.refs.newPass.value,
                date: today
            };
            let that = this;
            var request = new Request('http://10.10.7.153:3000/api/add_ssid', {
                method: 'POST',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify(pass_data)
            });
            fetch(request)
                .then(function(response) {
                    response.json()
                        .then(function(data) {
                            console.log(data, 'test');
                            that.props.onClose();
                        })
                })
                .catch(function(err) {
                    console.log(err);
                })
        } else {
            let pass_data = {
                eid: this.props.eid,
                pass: this.refs.newPass.value,
                date: today
            };
            let that = this;
            var request = new Request('http://10.10.7.153:3000/api/edit_password', {
                method: 'POST',
                headers: new Headers({'Content-Type': 'application/json'}),
                body: JSON.stringify(pass_data)
            });
            fetch(request)
                .then(function (response) {
                    response.json()
                        .then(function (data) {
                            that.props.onClose();
                        })
                })
                .catch(function (err) {
                    console.log(err);
                })
        }
    }

    render() {
        return (
            <div className="confirm-new-emp">
                <div className="new-emp-modal">
                    <form>
                        <div className="new-pass">
                            <div className="password-text">
                                Enter in the New Password for employee #{this.props.eid}:
                            </div>
                            <div className="pass-input"><input className="new-password" ref="newPass" name="Employee_Passowrd" type="password" required placeholder='Password'/></div>
                            <div className="password-text">
                                Confirm Password:
                            </div>
                            <div className="pass-input"><input className="new-password" ref="newPass2" name="Employee_Passowrd" type="password" required placeholder='Password'/></div>
                        </div>
                        <div className="confirm-password-button"  onClick={this.changePassword.bind(this)}>
                            Change Password
                        </div>
                        { !this.props.newEmp & (
                            <div className="close-password-button"  onClick={this.props.onClose}>
                                Cancel
                            </div>
                        )}

                    </form>
                </div>
            </div>
        );
    }
}

export default NewPass;