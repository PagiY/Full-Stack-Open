import { useState, useEffect } from "react";
import countriesService from './services/countries';

import Countries from './components/Countries';
import Country from './components/Country';

const App = () => {
	
	const [countries, setCountries] = useState([]);
	const [filter, setFilter] = useState('');
	const [results, setResults] = useState([]);

	//initialize the list of countries
	useEffect(() => {
		countriesService
			.getAll()
			.then((data) => setCountries(data));
	}, []);

	//search filter
	useEffect(() => {

		if(filter === ''){
			setResults([]);
		}
		else{
			setResults(countries.filter((country) => country.name.common.toLowerCase().includes(filter.toLowerCase())));
		}
		
	}, [filter])

	const handleFilter = (e) => {
		setFilter(e.target.value);
	}

	const showCountry = (country) => {
		countriesService
			.getOne(country)
			.then((data) => {
				setResults(data);
			})
	}

	return (
			<div className="App">
				<div>
					{
						countries.length === 0 ? <p>Loading countries...</p> : <>Find countries: <input value = {filter} onChange = {handleFilter}/></>
					}	
				</div>
				<div>
					{
						results.length > 10 ? 
						<p>Too many matches, specify the filter.</p> 
						:
						results.length === 1 ? 
						<Country country = {results[0]}/>
						: 
						<Countries countries = {results} handleShowCountry = {showCountry}/>
					}
				</div>
			</div>
	);
}

export default App;
