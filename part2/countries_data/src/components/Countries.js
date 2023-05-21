const Countries = ({countries, handleShowCountry}) => {
    return (
        <ul>
            {
                countries.map((country) =>  <li key = {country.altSpellings[0]}>
                                                {country.name.common}
                                                <button onClick = {() => {handleShowCountry(country.name.common)}}>show</button>
                                            </li>
                             )
            }
        </ul>
    )
}

export default Countries;