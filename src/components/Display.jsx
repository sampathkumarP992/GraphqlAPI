import React, { Component } from "react";
import SearchResult from './SearchResult';

class DisplayContent extends Component {
     constructor(props) {
      super(props);
      this.state = { searchTerm: this.getInit(this.props.search) };
    }
    getInit(data){
        return data;
    }

    handleChange = (value) => {
        if(value!==this.state.searchTerm){
            this.setState({ searchTerm: value });
        }

    };

    render() { 
        return (
            <div>
                <h4 className="display-4">Topic: <span className="badge badge-success">{this.state.searchTerm}</span></h4>
                <SearchResult key={this.props.search} value={this.props.search} onChange={this.handleChange} ></SearchResult>
            </div>
        );
    }
}

export default DisplayContent;
