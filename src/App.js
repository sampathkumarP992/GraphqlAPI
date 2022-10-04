import React from "react";
import './App.css';
import SearchBar from './components/Searchbar';
import DisplayContent from "./components/Display";


class App extends React.Component {

  state = { searchTerm: 'React', click: 0 };
  
  handleSearchChange = key => {
    this.setState({ searchTerm: key });
  }

  handleChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  render(){
    return (
      
      <div>
        <SearchBar initSearch={this.state.searchTerm} onSearchChange={this.handleSearchChange}></SearchBar>
        <div className="jumbotron">
          <DisplayContent search={this.state.searchTerm}></DisplayContent>
        </div>
     
      </div>
    );
  }
}

export default App;
