let details_img = document.querySelector(".details-img");
let countryName = document.getElementById("det-country-name");
let nativeName = document.getElementById("details-native-name");
let population = document.getElementById("details-pop");
let region = document.getElementById("details-region");
let subregion = document.getElementById("details-subregion");
let countryCapital = document.getElementById("details-capital");
let domain = document.getElementById("details-domain");
let currency = document.getElementById("details-currency");
let languages = document.getElementById("details-lang");
let tokenName = localStorage.getItem('selectedCountryName');
let backBtn = document.querySelector(".back-btn");
let documentTitle = document.getElementsByTagName("title")[0]
let btnsGroup = document.querySelector(".btns-group"); 

let referToDetailsPage = (country_name) => {
    localStorage.removeItem("selectedCountryName");
    localStorage.setItem("selectedCountryName",country_name);
    window.location.assign('../countries-displayed/details.html');
};
 fetch(
        `https://restcountries.com/v3.1/name/${tokenName}`,
        {
            'method': 'GET',
            'headers': {
                'Accept': 'application/json',
                'content-type': 'application/json'
            }
        }
        ).then(res => res.json())
        .then (resObj => {
            documentTitle.innerText = `${resObj[0].name.common}'s more info`
            details_img.setAttribute("src",resObj[0].flags.png)
            countryName.innerHTML = resObj[0].name.official;
            nativeName.innerHTML = resObj[0].demonyms.eng.m;
            population.innerHTML = resObj[0].population;
            region.innerHTML = resObj[0].region;
            subregion.innerHTML = resObj[0].subregion;
            countryCapital.innerHTML = resObj[0].capital;
            domain.innerHTML = resObj[0].tld;
            currency.innerHTML = resObj[0].currencies[(Object.keys(resObj[0].currencies)[0])]["name"];

            let arrayOfKeysInLanguages = Object.values(resObj[0].languages);
            languages.innerHTML = arrayOfKeysInLanguages.toString();
            i = 0;
            while (i < resObj[0].borders.length) {
                fetch(
                    `https://restcountries.com/v3.1/alpha/${resObj[0].borders[i]}`,
                    {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            "content-type": 'application/json',
                        }
                    } 
                    ).then (res => res.json())
                    .then(countryData => {
                        btnsGroup.innerHTML += 
                        `<button class="element borders-btns text3" 
                        onclick="referToDetailsPage('${countryData[0].name.common}')">
                        ${countryData[0].name.common}</button>`;
                    })
                    .catch(err => {
                        console.log(err);
                    })
                
                i++;                
            }

            console.log(resObj[0]);
        }).catch(err => {
            console.log(err);
        });

        backBtn.addEventListener("click", () => {
            window.location.assign('../countries-displayed/index.html');
        })

