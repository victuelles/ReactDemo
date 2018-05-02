import React, { Component } from 'react';
import './main-page.css';
import AppPresentation from './app-presentation';

class App extends Component {

  state= {}

  componentDidMount() {
    this.fetchHouses();
  }

  fetchHouses=()=>{
    fetch('/houses.json')
    .then(rsp => rsp.json())
    .then(allHouses =>{
      this.allHouses=allHouses;
      this.determineFeatureHouse();
      this.determineUniqueCountries();
    })
  }

  determineFeatureHouse = () =>{
    if(this.allHouses) {
      const randomIndex = Math.floor(Math.random()*this.allHouses.length);
      const featuredHouse= this.allHouses[randomIndex];
      this.setState({featuredHouse});
    }
  }

  determineUniqueCountries = () => {
    // if allHouese not loaded yet, return empty array
    // else maps allHouses array with house objects into
    // a string array with countries
        //retrieve each country(map), get unique values (Set), 
    // convert to array (from)
    const countries = this.allHouses 
    ? Array.from(new Set(this.allHouses.map(h=> h.country)))
    : [];
    //add null on first position of array to make it blank
    countries.unshift(null);
    //console.log(countries);
    //0:null
    //1:"Switzerland"
    //2:"The Netherlands"
    //length:3
    this.setState({countries}); //!important to and {} on setState
   }

  filterHouses =(country) =>{
    //reset active house to null
    this.setState({activeHouse:null});
    //create new houses filter by country name
    const filteredHouses = this.allHouses.filter((h) => h.country === country);
    //put new array and country on state
    this.setState({filteredHouses});
    this.setState({country});
  }

  setActiveHouse =(house)=>{
    this.setState({activeHouse:house});

  }

  render() {
    return(<AppPresentation country={this.state.country}
          filterHouses={this.filterHouses}
          featuredHouse={this.state.featuredHouse}
          countries={this.state.countries}
          filteredHouses={this.state.filteredHouses}
          activeHouse={this.state.activeHouse}
          setActiveHouse={this.setActiveHouse}      
    />)
  }
}

export default App;
