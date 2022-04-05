
let themeBtn = document.getElementById("theme-btn");
let themeBtnText = document.getElementById("theme-label");
let elements = document.querySelectorAll(".element");
let text_1 = document.querySelectorAll(".text1");
let text_2 = document.querySelectorAll(".text2");
let text_3 = document.querySelectorAll(".text3");
let theme_icon = document.getElementById("theme_icon");
localStorage.setItem("theme_status","bright");


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