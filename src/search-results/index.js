import React from 'react';
import SearchResultsRow from './search-results-row';

const SearchResults = (props) => {
    //expects filteredHouses and map array to SearchResultsRows
    //result of the map, an array of SearchResultsRows components
    // which is rendered in one go in the render method by writing it 
    // as an expression  { } (enclosed with curly brackets)
    const houseRow = props.filteredHouses.map( h => 
        <SearchResultsRow key={h.id.toString()} house={h} 
                        setActiveHouse={props.setActiveHouse} />
    )

    return (
        <div className="mt-2">
            <h4>Results for {props.country}:</h4>
            <table className="table table-hover">
                <tbody>
                    {houseRow}
                </tbody>
            </table>
        </div>
    )
}
 
export default SearchResults;