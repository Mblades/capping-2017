import React, { Component } from 'react';
import Dropdown from 'react-dropdown'
import './search-container.css';
import ProfileBox from "../profile-box/profile-box";
import {orderBy} from 'lodash';
import AutoSearch from "../auto-search/auto-search";

// import searchBtn from '../Images/searchBtn.jpg';
class SearchContainer extends Component {
    constructor() {
        super();
        this.state = {
            newEmployees: [],
            filterOn: false,
            orderEmp: 'firstname',
            AorDfilter: 'asc',
            orderLabel: 'First Name',
            AorDlabel: 'Ascending'
        }
    }

    componentDidMount() {
        //  This fires before the page renders to gather all profiles
        this.setState({newEmployees: this.props.employees});
    }

    renderProfileBoxes = function() {
        let myProfile = this.props.myProfile;
        let curList = [];
        let employees = this.props.employees;
        if(this.state.filterOn) {
            curList = this.state.newEmployees;
        } else {
            curList = this.props.employees;
        }
        curList = orderBy(curList, [this.state.orderEmp], [this.state.AorDfilter]);
        let emp = curList.map(function (value) {
            if(value.eid !== myProfile.eid){
                return (
                    <div className="Profile-Box-Spacing">
                        <ProfileBox
                            employees={employees}
                            employee={value}
                            myProfile={myProfile}
                        />
                    </div>
                )
            }
        })
        return(emp);
    };
//Will be used to run the searches from the search bar
    doSearch = (values) => {
        // print the form values to the console
        console.log(values)
    };
//used to apply a sort on filter
    applyFilter = (values) => {
        // print the form values to the console
        console.log(values);
        this.setState({orderEmp: values.value});
        this.setState({orderLabel: values.label});
    };
//used to determine ascending or descending
    applyFilter2 = (values) => {
        // print the form values to the console
        console.log(values);
        this.setState({AorDfilter: values.value});
        this.setState({AorDlabel: values.label});
    };

    applyFilter3 = (values) => {
        // print the form values to the console
        console.log(values);
    };

    alphaChange = (values) => {
        let newEmployees = [];
        let letter = values;
        this.props.employees.map(function (value) {
            if(letter === value.firstname.substring(0,1)){
                newEmployees.push(value);
            }
        });
        this.setState({newEmployees: newEmployees});
        this.setState({filterOn: true});
    };

    render() {
        let employees = this.props.employees;
        const filterOptions = [
            { value: 'location', label: 'Location' },
            { value: 'lastname', label: 'Last Name' },
            { value: 'firstname', label: 'First Name'}
        ];
        const ascDESC = [
            { value: 'asc', label: 'Ascending'},
            { value: 'desc', label: 'Descending'}
        ];
        return (
            <div className="Search-Window-Container">
                <div>
                    <div className="search-area">
                        <div>
                            <AutoSearch
                                list={employees}
                                placeholder="Employee Name"
                                choice={this.filter3}
                            />
                            <Dropdown options={filterOptions} onChange={this.applyFilter} placeholder={this.state.orderLabel} />
                            <Dropdown options={ascDESC} onChange={this.applyFilter2} placeholder={this.state.AorDlabel}/>

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
                    <div className="profile-boxes-container">
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