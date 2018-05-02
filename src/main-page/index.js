import React, { Component } from 'react';
//import logo from './logo.svg';
import './main-page.css';
import Header from './header';
import FeatureHouse from './featured-house';
import HouseFilter from './house-filter';
import SearchResults from '../search-results';
import HouseDetail from '../house';


class App extends Component {

 /* constructor(props){
    super(props);
    this.state={};
  }
  or simply by property initializer
  */
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
    const filterHouses = this.allHouses.filter((h) => h.country === country);
    //put new array and country on state
    this.setState({filterHouses});
    this.setState({country});
  }

  setActiveHouse =(house)=>{
    this.setState({activeHouse:house});

  }

  render() {
    let activeComponent =null;
    if(this.state.country)
      activeComponent= <SearchResults country={this.state.country}
                    filteredHouses={this.state.filterHouses}
                    setActiveHouse={this.setActiveHouse} />;
    if(this.state.activeHouse)
      activeComponent=<HouseDetail house={this.state.activeHouse}/>;
    if(!activeComponent) 
      activeComponent=  <FeatureHouse house={this.state.featuredHouse} />;

    return (
      <div className="container">
        <Header subtitle="Providing house all over the world!" />
        <HouseFilter countries={this.state.countries} filterHouses={this.filterHouses}/>
        {activeComponent}
      </div>
    );
  }
}

export default App;
