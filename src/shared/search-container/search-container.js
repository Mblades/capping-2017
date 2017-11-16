import React, { Component } from 'react';
import Dropdown from 'react-dropdown'
//import {Field, reduxForm} from 'redux-form'
import './search-container.css';
import classnames from 'classnames';
import ProfileBox from "../profile-box/profile-box";

// import searchBtn from '../Images/searchBtn.jpg';


/*
let SearchBoxForm = props => {
    const { handleSubmit } = props;
    return (
        <form onSubmit={ handleSubmit } className="Search-Form">

            <Field className="Search-input" name="SearchParam" component="input" type="text" required />
            <button type="submit" className="search-btn-container"><img src={ searchBtn } className="search-btn" alt="searchBtn" /></button>

        </form>
    )
};

SearchBoxForm = reduxForm({
    // a unique name for the form
    form: 'SearchBox'
})(SearchBoxForm);
*/
class SearchContainer extends Component {

    renderProfileBoxes = function() {
        let myProfile = this.props.myProfile;
        let emp = this.props.employees.map(function (value) {
            return (
                <div className="Profile-Box-Spacing">
                    <ProfileBox
                        employee={value}
                        myProfile={myProfile}
                    />
                </div>
            )
        })
        return(emp);
    };
//Will be used to run the searches from the search bar
    doSearch = (values) => {
        // print the form values to the console
        console.log(values)
    };
//will be used to apply one of the filters
    applyFilter = (values) => {
        // print the form values to the console
        console.log(values)
    };

    alphaChange = (values) => {
        console.log(values);
    };

    render() {
        console.log(this.props, 'search container');
        const options = [
            'one', 'two', 'three'
        ]
        const { className, ...props } = this.props;
        return (
            <div className={classnames('CompanyHeader', className)} {...props}>
            <div className="Search-Window-Container">
                <div>
                    <div className="search-area">
                        <div>
                            <Dropdown options={options} onChange={this.applyFilter} value={"test"} placeholder="Select an option" />
                            <Dropdown options={options} onChange={this.applyFilter} value={"test"} placeholder="Select an option" />
                            <Dropdown options={options} onChange={this.applyFilter} value={"test"} placeholder="Select an option" />
                        </div>
                        <div>
                            <button className="AZsort" onClick={() => { this.alphaChange('A')}}>A</button>
                            <button className="AZsort" onClick={() => { this.alphaChange('B')}}>B</button>
                            <button className="AZsort" onClick={() => { this.alphaChange('C')}}>C</button>
                            <button className="AZsort" onClick={() => { this.alphaChange('D')}}>D</button>
                            <button className="AZsort" onClick={() => { this.alphaChange('E')}}>E</button>
                            <button className="AZsort" onClick={() => { this.alphaChange('F')}}>F</button>
                            <button className="AZsort" onClick={() => { this.alphaChange('G')}}>G</button>
                            <button className="AZsort" onClick={() => { this.alphaChange('H')}}>H</button>
                            <button className="AZsort" onClick={() => { this.alphaChange('I')}}>I</button>
                            <button className="AZsort" onClick={() => { this.alphaChange('J')}}>J</button>
                            <button className="AZsort" onClick={() => { this.alphaChange('K')}}>K</button>
                            <button className="AZsort" onClick={() => { this.alphaChange('L')}}>L</button>
                            <button className="AZsort" onClick={() => { this.alphaChange('M')}}>M</button>
                            <button className="AZsort" onClick={() => { this.alphaChange('N')}}>N</button>
                            <button className="AZsort" onClick={() => { this.alphaChange('O')}}>O</button>
                            <button className="AZsort" onClick={() => { this.alphaChange('P')}}>P</button>
                            <button className="AZsort" onClick={() => { this.alphaChange('Q')}}>Q</button>
                            <button className="AZsort" onClick={() => { this.alphaChange('R')}}>R</button>
                            <button className="AZsort" onClick={() => { this.alphaChange('S')}}>S</button>
                            <button className="AZsort" onClick={() => { this.alphaChange('T')}}>T</button>
                            <button className="AZsort" onClick={() => { this.alphaChange('U')}}>U</button>
                            <button className="AZsort" onClick={() => { this.alphaChange('V')}}>V</button>
                            <button className="AZsort" onClick={() => { this.alphaChange('W')}}>W</button>
                            <button className="AZsort" onClick={() => { this.alphaChange('X')}}>X</button>
                            <button className="AZsort" onClick={() => { this.alphaChange('Y')}}>Y</button>
                            <button className="AZsort" onClick={() => { this.alphaChange('Z')}}>Z</button>
                        </div>
                    </div>

                    {
                        //this is used to create the list of drop down boxes
                        this.renderProfileBoxes()
                    }
                </div>
            </div>
            </div>
        );
    }
}

export default SearchContainer;