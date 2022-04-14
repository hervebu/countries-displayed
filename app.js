
let themeBtn = document.getElementById("theme-btn");
let countryElements = document.getElementById("elements-grid");
let filterDropdownOptions = document.querySelector(".region-dropdown");
let filteredRegion = document.getElementById("region-name");
let searchField = document.getElementById("search-field");
filterDropdownOptions.style.display = "none";
localStorage.setItem("theme_status","bright");
let https = "https://restcountries.com/v3.1/";

let assignToDetailsPage = (country_name) => {
    localStorage.removeItem("selectedCountryName");
    localStorage.setItem("selectedCountryName",country_name);
    window.location.assign('../countries-displayed/details.html');
}; 

window.onload = fetch(`${https}all`,
    {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "content-type": "application/json"
        }
    }).then(res => res.json())
    .then(resObject => {

        let count = 0;
        while ( count < resObject.length ) {
            let gridElement = appendHtmlGridElements(resObject[count]); 
            let statusAfterAppending = countryElements.appendChild(gridElement);
            if (count == resObject.length - 1) {
                checkAppendingStatus(statusAfterAppending);
            }
            
           count ++;     
        };

    })
    .catch(err => {
        console.log(err);
    });

    let changeTheme = () => {
        let themeBtnText = document.getElementById("theme-label");
        let elements = document.querySelectorAll(".element");
        let text_1 = document.querySelectorAll(".text1");
        let text_2 = document.querySelectorAll(".text2");
        let text_3 = document.querySelectorAll(".text3");
        let theme_icon = document.getElementById("theme_icon");
        let i = 0, j;
        let theme_status = localStorage.getItem("theme_status");
        if (theme_status === "dark"){
            theme_icon.classList.remove("fa-sun");
            theme_icon.classList.add("fa-moon");
            themeBtnText.textContent = "Dark Mode";
            while (i < elements.length) {
                elements[i].style.backgroundColor = "hsl(0, 0%, 100%)";
                elements[i].style.boxShadow = "-1px .5px 4px 1px rgba(184, 184, 184, 0.295)";
        
                i++;
            }
            document.getElementsByTagName("body")[0].style.backgroundColor = "hsl(0, 0%, 98%)";
            for (j = 0; j < text_1.length; j++) {
                text_1[j].style.color = "hsl(200, 15%, 8%)";
            } 
            for (j = 0; j < text_2.length; j++) {
                text_2[j].style.color = "hsl(200, 15%, 8%)";
            } 
            for (j = 0; j < text_3.length; j++) {
                text_3[j].style.color = "hsl(200, 15%, 8%)";
            }
            localStorage.removeItem("theme_status");
            localStorage.setItem("theme_status","bright");
        }else if (theme_status === "bright") {
            themeBtnText.textContent = "Bright Mode";
            theme_icon.classList.remove("fa-moon");
            theme_icon.classList.add("fa-sun");
    
            while (i < elements.length) {
                elements[i].style.backgroundColor = "hsl(209, 23%, 22%)";
                elements[i].style.boxShadow = "-1px .5px 4px 1px rgba(0, 0, 0, 0.295) "
        
                i++;
            }
            document.getElementsByTagName("body")[0].style.backgroundColor = "hsl(207, 26%, 17%)";
            for (j = 0; j < text_1.length; j++) {
                text_1[j].style.color = "hsl(0, 0%, 100%)";
            } 
            for (j = 0; j < text_2.length; j++) {
                text_2[j].style.color = "hsl(0, 0%, 100%)";
            } 
            for (j = 0; j < text_3.length; j++) {
                text_3[j].style.color = "hsl(0, 0%, 70%)";
            }
            searchField.style.color = "hsl(0, 0%, 100%)";
            localStorage.removeItem("theme_status");
            localStorage.setItem("theme_status","dark");
        }
    } 


    let checkAppendingStatus = (status) => {
       if(typeof(status) != "undefined"){
            themeBtn.setAttribute("onclick", "changeTheme()");
        };  
    };   

    let appendHtmlGridElements = (singleCountryObject) => {
        let gridItem = document.createElement("div");
        let imgInGridItem = document.createElement("img");
        let detailsInGridItem = document.createElement("div");
        let h2ForCountryName = document.createElement("h2");    
        let ulInGridItem = document.createElement("ul");

        gridItem.classList.add("element");
        gridItem.classList.add("element-grid-item");
        gridItem.setAttribute("onclick", `assignToDetailsPage('${singleCountryObject.name.common}')`);

        imgInGridItem.classList.add("country-img");
        imgInGridItem.src = singleCountryObject.flags.png;
        
        h2ForCountryName.classList.add("text1");
        h2ForCountryName.classList.add("ele-country-name");
        h2ForCountryName.textContent = singleCountryObject.name.official;
        
        ulInGridItem.classList.add("country-info");
        ulInGridItem.classList.add("element-details");

        let propertiesArray = ['Population', 'Region', 'Capital'];
        let valuesArray = 
            [singleCountryObject.population,
             singleCountryObject.region, 
             singleCountryObject.capital];
        let appendLiToUl = () => {
            let i = 0;
            while(i<3) {

                let liInGridItem = document.createElement("li");
                let spanForliValue = document.createElement("span");


                liInGridItem.classList.add("text2");
                liInGridItem.classList.add("details-li");
                spanForliValue.classList.add("text3");
                liInGridItem.textContent = propertiesArray[i]+": ";
                representVal = valuesArray[i];
                spanForliValue.textContent = valuesArray[i];
                ulInGridItem.appendChild(liInGridItem);
                liInGridItem.appendChild(spanForliValue);

                i++;
            };

        }

        gridItem.appendChild(imgInGridItem);
        gridItem.appendChild(detailsInGridItem);
        detailsInGridItem.appendChild(h2ForCountryName);
        appendLiToUl();
        detailsInGridItem.appendChild(ulInGridItem);
        themeBtn.setAttribute("onclick", "changeTheme()");
        return gridItem;
    };

    let ActivateFilterDropdown = () => {
        if (filterDropdownOptions.style.display === "none") {
            filterDropdownOptions.style.display = "block";
        }else {
            filterDropdownOptions.style.display = "none";
        }
    };
   
    let filterByRegion = (regionName) => {
        filteredRegion.textContent = regionName;
        filterDropdownOptions.style.display = "none";
        fetch(
            `${https}region/${regionName}`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "content-type": "application/json"
                }
            })
            .then(res => res.json())
            .then(resArray => {
                countryElements.innerHTML = "";
                let count = 0;
                while ( count < resArray.length ) {
                    let gridElement = appendHtmlGridElements(resArray[count]); 
                    let statusAfterAppending = countryElements.appendChild(gridElement);
                    if (count == resArray.length - 1) {
                        checkAppendingStatus(statusAfterAppending);
                    }
                    
                   count ++;     
                };
            })
    };


    let searchByCountryName = (inputValue) => {

        fetch(
            `${https}name/${inputValue}`,
            {
                method:'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        ).then(res => res.json())
        .then(countryInfoArray => {
            countryElements.innerHTML = "";
            let count = 0;
                while ( count < countryInfoArray.length ) {
                    let gridElement = appendHtmlGridElements(countryInfoArray[count]); 
                    let statusAfterAppending = countryElements.appendChild(gridElement);
                    if (count == resArray.length - 1) {
                        checkAppendingStatus(statusAfterAppending);
                    }
                    
                   count ++;     
                };
        })
        .catch(err => console.log(err))
    };

    searchField.addEventListener("keyup", (e) => {
        
        if (e.key == "Enter") {
            searchByCountryName(searchField.value);
            e.preventDefault();
        }
    })
