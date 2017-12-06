import Autosuggest from 'react-autosuggest';
import React, { Component } from 'react';
import './auto-search.css';

function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value, list, searchBy) {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
        return [];
    }
    const regex = new RegExp('^' + escapedValue + '[0-9]*', 'i');
    return list.filter(employee => (getSuggestionValue(employee)).includes(escapedValue.toLowerCase()) || regex.test(employee.eid) );

}

function getSuggestionValue(suggestion) {
    return `${suggestion.firstname.toLowerCase()} ${suggestion.lastname.toLowerCase()}`;
    // suggestion.eid;
}

function renderSuggestion(suggestion) {
    let suggestionText = `${suggestion.firstname} ${suggestion.lastname}`;
    return (
        <div>
        <div className="suggest-test">{suggestionText}</div>
            <div className="suggestion-eid">{suggestion.eid}</div>
        </div>
    );
}

class AutoSearch extends Component {
    constructor() {
        super();

        this.state = {
            value: '',
            suggestions: [],

        };
    }

    onChange = (event, { newValue, method }) => {
        console.log(newValue, method);
        this.setState({
            value: newValue
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value, this.props.list, this.props.searchBy)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
        this.props.choice(suggestion);
        this.setState({
            value: ''
        })
    };

    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: this.props.placeholder === "" ? [] : this.props.placeholder,
            value,
            onChange: this.onChange,
        };

        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                onSuggestionSelected={this.onSuggestionSelected}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps} />
        );
    }
}

export default AutoSearch;