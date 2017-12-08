import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import { browserHistory as history } from 'react-router';
import './search-container.css';
import ProfileBox from "../profile-box/profile-box";
import {orderBy} from 'lodash';
import AutoSearch from "../auto-search/auto-search";
import Loader from "../loader/loader";

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
//Creates all of the small profile boxes
    renderProfileBoxes = function() {
        let myProfile = this.props.myProfile;
        let curList = [];
        let employees = this.props.employees;
        //sets the current list of employees based on any filters that are set
        if(this.state.filterOn) {
            curList = this.state.newEmployees;
        } else {
            curList = this.props.employees;
        }
        curList = orderBy(curList, [this.state.orderEmp], [this.state.AorDfilter]);
        if(curList.length > 0) {
            let emp = curList.map(function (value) {
                if (value.eid !== myProfile.eid) {
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
            return (emp);
        } else if(this.state.filterOn || this.props.managerProfile) {
            return(
                <div>No Employees Found</div>
            )
        } else {
            return(
                <div>
                    <Loader/>
                </div>
            )
        }
    };
//used to apply a sort on filter
    applyFilter = (values) => {
        this.setState({orderEmp: values.value});
        this.setState({orderLabel: values.label});
    };
//used to determine ascending or descending
    applyFilter2 = (values) => {
        this.setState({AorDfilter: values.value});
        this.setState({AorDlabel: values.label});
    };
//searches from the search bar to go to that profile
    searchEmployee = (values) => {
        history.push({
            pathname: '/profile',
            state: {
                employees: this.props.employees,
                loggedIn: true,
                employee: values,
                myProfile: this.props.myProfile
            }
        });
    };
//Filter for changing the A-Z filter feature
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
//Clears all filters and returns employee list to its original state
    clearFilter = () => {
        this.setState({
            filterOn: false
        })
    }

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
                            <div className="search-area-search-bar">
                            <AutoSearch
                                list={employees}
                                placeholder="Employee Name or ID"
                                choice={this.searchEmployee}
                            />
                            </div>
                            <div className="search-area-dropdowns">
                            <Dropdown options={filterOptions} onChange={this.applyFilter} placeholder={this.state.orderLabel} />
                            <Dropdown options={ascDESC} onChange={this.applyFilter2} placeholder={this.state.AorDlabel}/>
                            <div className="clear-filter-button" onClick={() => {this.clearFilter()}}>Clear Filter</div>
                            </div>
                        </div>
                        <div className="AZ-container">
                            <div className="AZsort" onClick={() => { this.alphaChange('A')}}>A</div>
                            <div className="AZsort" onClick={() => { this.alphaChange('B')}}>B</div>
                            <div className="AZsort" onClick={() => { this.alphaChange('C')}}>C</div>
                            <div className="AZsort" onClick={() => { this.alphaChange('D')}}>D</div>
                            <div className="AZsort" onClick={() => { this.alphaChange('E')}}>E</div>
                            <div className="AZsort" onClick={() => { this.alphaChange('F')}}>F</div>
                            <div className="AZsort" onClick={() => { this.alphaChange('G')}}>G</div>
                            <div className="AZsort" onClick={() => { this.alphaChange('H')}}>H</div>
                            <div className="AZsort" onClick={() => { this.alphaChange('I')}}>I</div>
                            <div className="AZsort" onClick={() => { this.alphaChange('J')}}>J</div>
                            <div className="AZsort" onClick={() => { this.alphaChange('K')}}>K</div>
                            <div className="AZsort" onClick={() => { this.alphaChange('L')}}>L</div>
                            <div className="AZsort" onClick={() => { this.alphaChange('M')}}>M</div>
                            <div className="AZsort" onClick={() => { this.alphaChange('N')}}>N</div>
                            <div className="AZsort" onClick={() => { this.alphaChange('O')}}>O</div>
                            <div className="AZsort" onClick={() => { this.alphaChange('P')}}>P</div>
                            <div className="AZsort" onClick={() => { this.alphaChange('Q')}}>Q</div>
                            <div className="AZsort" onClick={() => { this.alphaChange('R')}}>R</div>
                            <div className="AZsort" onClick={() => { this.alphaChange('S')}}>S</div>
                            <div className="AZsort" onClick={() => { this.alphaChange('T')}}>T</div>
                            <div className="AZsort" onClick={() => { this.alphaChange('U')}}>U</div>
                            <div className="AZsort" onClick={() => { this.alphaChange('V')}}>V</div>
                            <div className="AZsort" onClick={() => { this.alphaChange('W')}}>W</div>
                            <div className="AZsort" onClick={() => { this.alphaChange('X')}}>X</div>
                            <div className="AZsort" onClick={() => { this.alphaChange('Y')}}>Y</div>
                            <div className="AZsort" onClick={() => { this.alphaChange('Z')}}>Z</div>
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