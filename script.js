document.getElementById('btnSubmit').onclick = function() {
    const countryName = document.getElementById('CountryName').value;
    const countryInfo = document.getElementById('country-info');
    const borderCountry = document.getElementById('bordering-countries');

    countryInfo.innerHTML = '';
    borderCountry.innerHTML = '';

    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then(response => response.json())
    .then(data => {
        const country = data[0];
        countryInfo.innerHTML = `<h1>${country.name.common}</h1>
                                 <p>Capital: ${country.capital ? country.capital[0] : 'No capital'}</p>
                                 <p>Population: ${country.population.toLocaleString()}</p>
                                 <p>Region: ${country.region}</p>
                                 <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" style="width: 150px;">`;

        if (country.borders) {
            borderCountry.innerHTML = '<h2>Neighbouring Countries:</h2>';
            country.borders.forEach(border => {
                fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                .then(response => response.json())
                .then(borderCountryData => {
                    borderCountry.innerHTML += `<p>${borderCountryData[0].name.common}</p>
                                                <img src="${borderCountryData[0].flags.svg}" alt="Flag of ${borderCountryData[0].name.common}" style="width: 100px;">`;
                });
            });
        } else {
            borderCountry.innerHTML += '<p>No bordering countries.</p>';
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        countryInfo.innerHTML = '<p>Error loading country, your spelling could be wrong you idiot</p>';
    });
};