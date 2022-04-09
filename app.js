
let themeBtn = document.getElementById("theme-btn");
let themeBtnText = document.getElementById("theme-label");
let elements = document.querySelectorAll(".element");
let text_1 = document.querySelectorAll(".text1");
let text_2 = document.querySelectorAll(".text2");
let text_3 = document.querySelectorAll(".text3");
let theme_icon = document.getElementById("theme_icon");
localStorage.setItem("theme_status","bright");
let countryElements = document.getElementById("elements-grid");



let val, countryObj;
let https = "https://restcountries.com/v3.1/all";



let assignToDetailsPage = (country_name) => {
    localStorage.removeItem("selectedCountryName");
    localStorage.setItem("selectedCountryName",country_name);
    window.location.assign('../countries-displayed/details.html');
}; 

window.onload = fetch(https,
    {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "content-type": "application/json"
        }
    }).then(res => res.json())
    .then(resObject => {
        
        val = resObject.length-1;
        let count = 0;
        while ( count < resObject.length ) {
            let gridElement = appendHtmlGridElements(resObject[count]); 
            countryElements.appendChild(gridElement);
            themeBtn.setAttribute("onclick", "changeTheme()");
           count ++;     
        };
        themeBtn.setAttribute("onclick", "changeTheme()");
        countryObj = resObject[count];
        
        console.log(resObject[3].currencies);
    })
    .catch(err => {
        console.log(err);
    });

    let changeTheme = () => {
        let i = 0, j;
        let theme_status = localStorage.getItem("theme_status");
        if (theme_status === "dark"){
            theme_icon.classList.remove("fa-sun");
            theme_icon.classList.add("fa-moon");
            themeBtnText.textContent = "Dark Mode";
            while (i < elements.length) {
                elements[i].style.backgroundColor = "hsl(0, 0%, 100%)";
                elements[i].style.boxShadow = "-1px .5px 4px 1px rgba(184, 184, 184, 0.295)"
        
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
            localStorage.removeItem("theme_status");
            localStorage.setItem("theme_status","dark");
        }
    }    

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
        h2ForCountryName.textContent = singleCountryObject.name.common;
        
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

        return gridItem;
    };

   