import React , { useState } from 'react'
import "./SearchTo.css"
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';

function SearchTo( {placeholder, data}) {
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

    const handleFilter = (event) => {
        const searchTo = event.target.value;
        setWordEntered(searchTo);
        const newFilter = Object.values(data).filter((value) => {
            return value.city.toLowerCase().startsWith(searchTo) || value.country.toLowerCase().startsWith(searchTo)
        });
        if (searchTo === "") {
            setFilteredData([])
        } else {
            setFilteredData(newFilter);
        }
    }

    const fillSearch = (event) => {
        const fillItem = event.target.innerHTML; //not sure if innerHTML is right
        setFilteredData([]);
        setWordEntered(fillItem);
    }

    const clearSearch = () => {
        setFilteredData([]);
        setWordEntered("");
    }
    return (
        <div className="searchto">
            <label for="to" className="label">To</label>
            <div className='searchbar'>
                <input type='text' id='to' className='text' value={wordEntered} placeholder={placeholder} onChange={handleFilter}/>
                <div className='icon'>{wordEntered.length === 0 ? (
                    <SearchIcon />
                ) : (
                <ClearIcon id="clearbtn" onClick={clearSearch} />
                )}</div>
            </div>
            {filteredData.length != 0 && (
                <div className='dataresults' onClick={fillSearch}>
                    {filteredData.slice(0, 15).map((value, key) => {
                        return <div className='dataitem'>{value.city}, {value.country}{value.iata != "" ? ` (${value.iata})` : "" }</div>;
                    })}
                </div>
            )}
        </div>
    )
}
        
export default SearchTo