
let themeBtn = document.getElementById("theme-btn");
let themeBtnText = document.getElementById("theme-label");
let elements = document.querySelectorAll(".element");
let text_1 = document.querySelectorAll(".text1");
let text_2 = document.querySelectorAll(".text2");
let text_3 = document.querySelectorAll(".text3");
let theme_icon = document.getElementById("theme_icon");
localStorage.setItem("theme_status","bright");
let countryElements = document.getElementById("elements-grid");
let details_img = document.getElementsByClassName(".details-img")[0];
let countryName = document.getElementsByClassName(".det-country-name");
let nativeName = document.getElementById("details-native-name");
let population = document.getElementById("details-pop");
let region = document.getElementById("details-region");
let subregion = document.getElementById("details-subregion");
let countryCapital = document.getElementById("details-capital");
let domain = document.getElementById("details-domain");
let currency = document.getElementById("details-currency");
let languages = document.getElementById("details-lan");
let val, countryObj;
let https = "https://restcountries.com/v3.1/all";



let assignToDetailsPage = (responseObj) => {
    localStorage.removeItem("selectedCountryInfo");
    localStorage.setItem("selectedCountryInfo",responseObj);
    window.location.assign('../details.html');
}; 

fetch(https,
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
            countryElements.innerHTML += `
            <div class='element element-grid-item' >`
            +`<img class='country-img' src='${resObject[count].flags.png}' alt=''>`
            +`<div><h2 class='text1 ele-country-name'>${resObject[count].name.common}</h2>`
                +`<ul class='country-info element-details'>`
                    +`<li class='text2 details-li'>Population: <span class='text3'> ${resObject[count].population}</span> </li>`
                    +`<li class='text2 details-li'>Region: <span class='text3'> ${resObject[count].subregion}</span> </li>`
                    +`<li class='text2 details-li'>Capital: <span class='text3'> ${resObject[count].capital}</span> </li>`
                +`</ul></div></div>`;
                
                
           count ++;     
        };
        countryObj = resObject[count];
        
        console.log(resObject[3].currencies);
    })
    .then(() => {
        themeBtn.setAttribute("onclick", "changeTheme()");
        // while (val >= 0) {
        //     document.getElementsByClassName(".element-grid-item")[val].addEventListener("click", assignToDetailsPage(countryObj));
        //     val --;
        // }
    })
    .catch(err => {
        console.log(err);
    });
    // Have to change from adding whole html elements from js to adding values using js

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
         
        
        console.log(localStorage.getItem("theme_status")); 
    }    


   