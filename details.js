let assign = () => {
    let countryDetails = localStorage.getItem('selectedCountryInfo');
    details_img.setAttribute('src', countryDetails.flags.png);
    countryName[0].innerHTML = countryDetails.name.common;
    nativeName.innerHTML = countryDetails.name.nativeName.spa.common;
    population.innerHTML = countryDetails.population;
    region.innerHTML = countryDetails.region;
    subregion.innerHTML = countryDetails.subregion;
    countryCapital.innerHTML = countryDetails.capital;
    domain.innerHTML = countryDetails.domain;
    currency.innerHTML = "";
    languages.innerHTML = "";
};

windows.onload = assign();