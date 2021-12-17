/**
 * All routes of the SPA
 * "path": "id of page in DOM"
 */
const routes = {
    "#/": "welcome",
    "#/onboard1": "onboard1",
    "#/onboard2": "onboard2",
    "#/onboard3": "onboard3",
    "#/login": "login",
    "#/explore": "explore",
    "#/aarhus": "aarhus",
    "#/allLocations": "allLocations",
    "#/placesToEat": "placesToEat",
    "#/attractions": "attractions",
    "#/events": "events",
    "#/activities": "activities",
    "#/myTrips": "myTrips",
    "#/favourites": "favourites",
    "#/detailedView": "detailedView",
    "#/profile": "profile",
};

/**
 * Initialising the router, calling attachNavLinkEvents() and navigateTo()
 */
function initRouter() {
    attachNavLinkEvents();

    let defaultPath = "#/";
    if (routes[location.hash]) {
        defaultPath = location.hash;
    }
    navigateTo(defaultPath);
}

initRouter();

/**
 * Attaching event to nav links and preventing default anchor link event
 */
function attachNavLinkEvents() {
    const navLinks = document.querySelectorAll(".nav-link");
    for (const link of navLinks) {
        link.addEventListener("click", function (event) {
            const path = link.getAttribute("href");
            navigateTo(path);
            event.preventDefault();
        });
    }
}

/**
 * Navigating SPA to specific page by given pathnameß
 */
function navigateTo(pathname) {
    hideAllPages();
    const basePath = location.pathname.replace("index.html", "");
    window.history.pushState({}, pathname, basePath + pathname);
    document.querySelector(`#${routes[pathname]}`).style.display = "block";
    setActiveTab(pathname);
}

/**
 * Changing display to none for all pages
 */
function hideAllPages() {
    const pages = document.querySelectorAll(".page");
    for (const page of pages) {
        page.style.display = "none";
    }
}

/**
 * sets active tab bar/ menu item
 */
function setActiveTab(pathname) {
    const navLinks = document.querySelectorAll("nav a");
    for (const link of navLinks) {
        if (pathname === link.getAttribute("href")) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    }
}

//Hiding the menu for onboarding
let cUrl = window.location.href;

if (
    cUrl.indexOf("explore") != -1 ||
    cUrl.indexOf("aarhus") != -1 ||
    cUrl.indexOf("allLocations") != -1 ||
    cUrl.indexOf("placesToEat") != -1 ||
    cUrl.indexOf("attractions") != -1 ||
    cUrl.indexOf("events") != -1 ||
    cUrl.indexOf("activities") != -1 ||
    cUrl.indexOf("myTrips") != -1 ||
    cUrl.indexOf("favourites") != -1 ||
    cUrl.indexOf("detailedView") != -1
) {
    menu.style.display = "flex";
} else {
    menu.style.display = "none";
}

window.showMenu = function () {
    let navBar = document.querySelector(".tabbar");
    if ((navBar.style.display = "none")) {
        navBar.style.display = "flex";
    }
};