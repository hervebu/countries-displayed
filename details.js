let details_img = document.querySelector(".details-img");
let countryName = document.getElementById("det-country-name");
let nativeName = document.getElementById("details-native-name");
let population = document.getElementById("details-pop");
let region = document.getElementById("details-region");
let subregion = document.getElementById("details-subregion");
let countryCapital = document.getElementById("details-capital");
let domain = document.getElementById("details-domain");
let currency = document.getElementById("details-currency");
let languages = document.getElementById("details-lan");
let tokenName = localStorage.getItem('selectedCountryName');
let backBtn = document.querySelector(".back-btn");

 fetch(
        'https://restcountries.com/v3.1/name/'+`${tokenName}`,
        {
            'method': 'GET',
            'headers': {
                'Accept': 'application/json',
                'content-type': 'application/json'
            }
        }
        ).then(res => res.json())
        .then (resObj => {
            details_img.setAttribute("src",resObj[0].flags.png)
            countryName.innerHTML = resObj[0].name.common;
            // nativeName.innerHTML = resObj[0].name.nativeName;
            population.innerHTML = resObj[0].population;
            region.innerHTML = resObj[0].region;
            subregion.innerHTML = resObj[0].subregion;
            countryCapital.innerHTML = resObj[0].capital;
            // domain.innerHTML = resObj[0].domain;
            currency.innerHTML = "";
            languages.innerHTML = "";
            console.log(resObj[0]);
        }).catch(err => {
            console.log(err);
        });

        backBtn.addEventListener("click", () => {
            window.location.assign('../countries-displayed/index.html');
        })

