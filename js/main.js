const _categoryUrl = "./json/categories.json"; // link to categories.json
const _dataUrl = "./json/data.json"; // link to data.json

// CREATING DEFAULT LINK VARIABLES
// AND HEADERS
let _selectedCategoryId; // global variable used to select the clicked category in selectCategory() function
let _selectedPlaceId; // global variable used to select the clicked place in selectPlace() function
let _categories = []; // empty categories array which is assigned all the data after feetching the json file
let _places = []; // empty places array which is assigned all the data after fetching data json
let _filteredPlaces = [];
let _favPosts = [];

// Function declaration for getting the data from data.json(places) and assign it to the _places array
// MADE  BY  ALL
async function loadPlaces() {
  const url = _dataUrl; // get the link to json file
  const response = await fetch(url); // wait for the response
  const data = await response.json(); // wait for data
  _places = data; // assign the data to the _places array
}

loadPlaces();

function getImageUrl(place) {
  console.log(place);
  let url = "../media/aarhus.png";
  if (place.Files.length) {
    url = place.Files[0].Uri;
  }
  return url;
}



// Function to append the places to the DOM
function appendAttractions(_places) {
  const placesCards = document.querySelector(".attractions_cards_container");

  let html = "";
  for (const place of _places) {
    if (place.MainCategory.Id === 3) {
      html += /*html*/ `
      <a onclick="selectPlace(${place.Id})">
      <div class="places_card_container">
      <div class="img_withicon">
        <div class="request-image">
            <img src="${getImageUrl(place)}">
        </div>
        <img class="category_icon_small_attractions" src="../icons/museum.png">
        </div>
        <div class="place_card">
          <div class="heart-heading">
          <h3 class="place_name" onclick="selectPlace(${place.Id})">${
        place.Name
      }</h3>
          ${generateFavPostsButton(place.Id)}
          </div>
          <div class="request-text" onclick="selectPlace(${place.Id})">
            <img class="label_icon" src="../icons/location.png">
            <address class="address">${place.Address.AddressLine1}<br>${
        place.Address.PostalCode
      } ${place.Address.City}</address>
          </div>
         <div class="subcategory_container">
          <img class="label_icon" src="../icons/label.png">
          <p class="card_category_name">${place.Category.Name}</p>
          </div>
        </div>
        </div>
      </a>
    `;
    }
    placesCards.innerHTML = html;
  }
}

function appendEvents(_places) {
  const placesCards = document.querySelector(".events_cards_container");

  let html = "";
  for (const place of _places) {
    if (place.MainCategory.Id === 58) {
      html += /*html*/ `
      <a onclick="selectPlace(${place.Id})">
      <div class="places_card_container">
      <div class="img_withicon">
        <div class="request-image">
            <img src="${getImageUrl(place)}">
        </div>
        <img class="category_icon_small_events" src="../icons/calendar.png">
        </div>
        <div class="place_card">
        <div class="heart-heading">
        <h3 class="place_name" onclick="selectPlace(${place.Id})">${
        place.Name
      }</h3>
         ${generateFavPostsButton(place.Id)}
          </div>
          <div class="request-text" onclick="selectPlace(${place.Id})">
            <img class="label_icon" src="../icons/location.png">
            <address class="address">${place.Address.AddressLine1}<br>${
        place.Address.PostalCode
      } ${place.Address.City}</address>
          </div>
         <div class="subcategory_container">
          <img class="label_icon" src="../icons/label.png">
          <p class="card_category_name">${place.Category.Name}</p>
          </div>
        </div>
        </div>
      </a>
    `;
    }
    placesCards.innerHTML = html;
  }
}

function appendActivities(_places) {
  const placesCards = document.querySelector(".activities_cards_container");

  let html = "";
  for (const place of _places) {
    if (place.MainCategory.Id === 36) {
      html += /*html*/ `
      <a onclick="selectPlace(${place.Id})">
      <div class="places_card_container">
      <div class="img_withicon">
        <div class="request-image">
            <img src="${getImageUrl(place)}">
        </div>
        <img class="category_icon_small_activities" src="../icons/running.png">
        </div>
        <div class="place_card">
        <div class="heart-heading">
        <h3 class="place_name" onclick="selectPlace(${place.Id})">${
        place.Name
      }</h3>
         ${generateFavPostsButton(place.Id)}
          </div>
          <div class="request-text" onclick="selectPlace(${place.Id})">
            <img class="label_icon" src="../icons/location.png">
            <address class="address">${place.Address.AddressLine1}<br>${
        place.Address.PostalCode
      } ${place.Address.City}</address>
          </div>
         <div class="subcategory_container">
          <img class="label_icon" src="../icons/label.png">
          <p class="card_category_name">${place.Category.Name}</p>
          </div>
        </div>
        </div>
      </a>
    `;
    }
    placesCards.innerHTML = html;
  }
}

function filterByPlacesToEat() {
  const results = _places.filter(
    (place) => place.MainCategory.Name == "Places to eat"
  );
  appendPlacesToEat(results);
}

function filterByAttractions() {
  const results = _places.filter(
    (place) => place.MainCategory.Name == "Attractions"
  );
  appendAttractions(results);
}

function filterByEvents() {
  const results = _places.filter(
    (place) => place.MainCategory.Name == "Events"
  );
  appendEvents(results);
}

function filterByActivities() {
  const results = _places.filter(
    (place) => place.MainCategory.Name == "Activities"
  );
  appendActivities(results);
}

function selectPlace(id) {
  const place = _places.find((place) => place.Id == id);
  document.querySelector("#detailedViewContainer").innerHTML = /*html*/ `
        <img src="${getImageUrl(place)}">
        <article class="article_page">
            <h1 class="showplace_name">${place.Name}</h1>
            <div class="subcategory_container">
          <img class="label_icon" src="../icons/label.png">
          <p class="card_category_name">${place.Category.Name}</p>
          </div>
          <p class="detaliedview_description">${
            place.Descriptions[0]["Text"]
          }</p>
          <hr>
          <div class="address_contact_container">
          <h4 class="address_contact_titel">Address</h4>
           <div class="request-text2">
            <img class="label_icon" src="../icons/location.png">
            <address class="address">${place.Address.AddressLine1}<br>${
    place.Address.PostalCode
  } ${place.Address.City}</address>
            </div>
            </div>
             <div class="address_contact_container">
            <h4 class="address_contact_titel">Contact</h4>
            <div class="request-text2">
             <img class="label_icon" src="../icons/email.png">
            <p class="contactinfo">${place.ContactInformation.Email}</p><br>
             <img class="label_icon" src="../icons/phone.png">
            <p class="contactinfo">${place.ContactInformation.Phone}</p>
          </div>
          </div>
          <h4 class="hashtag">#CityBreak</h4>
        </article>
    `;
  navigateTo("#/detailedView");
}

// Function to append the places to the DOM
function appendFavourites() {
  const placesCards = document.querySelector(".fav_eat_container"); // selecting from the HTML the container which will hold the freelancers cards

  let html = "";
  for (const place of _favPosts) {
    html += /*html*/ `
        <a onclick="selectPlace(${place.Id})">
      <div class="places_card_container">
      <div class="img_withicon">
        <div class="request-image">
            <img src="${getImageUrl(place)}">
        </div>
        <img class="category_icon_small_activities" src="../icons/running.png">
        </div>
        <div class="place_card">
        <div class="heart-heading">
        <h3 class="place_name" onclick="selectPlace(${place.Id})">${
      place.Name
    }</h3>
         ${generateFavPostsButton(place.Id)}
          </div>
          <div class="request-text" onclick="selectPlace(${place.Id})">
            <img class="label_icon" src="../icons/location.png">
            <address class="address">${place.Address.AddressLine1}<br>${
      place.Address.PostalCode
    } ${place.Address.City}</address>
          </div>
         <div class="subcategory_container">
          <img class="label_icon" src="../icons/label.png">
          <p class="card_category_name">${place.Category.Name}</p>
          </div>
        </div>
        </div>
      </a>
    `;
  }
  placesCards.innerHTML = html;
}

/**
 * Generating the fav button
 */
function generateFavPostsButton(placeId) {
  let btnTemplate = `
        <a onclick="addToFavourites('${placeId}', this)">
      <svg xmlns="http://www.w3.org/2000/svg" width="15.969" height="14.184" viewBox="0 0 15.969 14.184">
      <g id="Icon_feather-heart" data-name="Icon feather-heart" transform="translate(1 1)">
      <path id="Icon_feather-heart-2" data-name="Icon feather-heart" d="M15.215,5.574a3.675,3.675,0,0,0-5.2,0l-.708.708L8.6,5.574a3.676,3.676,0,1,0-5.2,5.2l.708.708,5.2,5.2,5.2-5.2.708-.708a3.675,3.675,0,0,0,0-5.2Z" transform="translate(-2.323 -4.497)" fill="none" stroke="#D42D26" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
      </g>
      </svg>
      </a>
    `;
  if (isFavPosts(placeId)) {
    btnTemplate = `
      <a onclick ="removeFromFavourites('${placeId}', this)">
      <svg xmlns="http://www.w3.org/2000/svg" width="15.969" height="14.184" viewBox="0 0 15.969 14.184">
      <g id="Icon_feather-heart" data-name="Icon feather-heart" transform="translate(1 1)">
      <path id="Icon_feather-heart-2" data-name="Icon feather-heart" d="M15.215,5.574a3.675,3.675,0,0,0-5.2,0l-.708.708L8.6,5.574a3.676,3.676,0,1,0-5.2,5.2l.708.708,5.2,5.2,5.2-5.2.708-.708a3.675,3.675,0,0,0,0-5.2Z" transform="translate(-2.323 -4.497)" fill="#D42D26" stroke="#D42D26" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
      </g>
      </svg>
      </a>`;
  }
  return btnTemplate;
}

/**
 * Adding activities to favorites by given postId
 */
function addToFavourites(placeId, element) {
  let favPost = _places.find((place) => place.Id == placeId);
  _favPosts.push(favPost);
  appendFavourites();
  // update the DOM to display the right icon
  element.querySelector(
    "svg"
  ).innerHTML = `<g id="Icon_feather-heart" data-name="Icon feather-heart" transform="translate(1 1)">
      <path id="Icon_feather-heart-2" data-name="Icon feather-heart" d="M15.215,5.574a3.675,3.675,0,0,0-5.2,0l-.708.708L8.6,5.574a3.676,3.676,0,1,0-5.2,5.2l.708.708,5.2,5.2,5.2-5.2.708-.708a3.675,3.675,0,0,0,0-5.2Z" transform="translate(-2.323 -4.497)" fill="#D42D26" stroke="#D42D26" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
      </g>`;
}

/**
 * Removing activities from favorites by given postId
 */
function removeFromFavourites(placeId, element) {
  _favPosts = _favPosts.filter((place) => place.Id != placeId);
  appendFavourites();
  // update the DOM to display the right icon
  element.querySelector(
    "svg"
  ).innerHTML = `<g id="Icon_feather-heart" data-name="Icon feather-heart" transform="translate(1 1)">
      <path id="Icon_feather-heart-2" data-name="Icon feather-heart" d="M15.215,5.574a3.675,3.675,0,0,0-5.2,0l-.708.708L8.6,5.574a3.676,3.676,0,1,0-5.2,5.2l.708.708,5.2,5.2,5.2-5.2.708-.708a3.675,3.675,0,0,0,0-5.2Z" transform="translate(-2.323 -4.497)" fill="none" stroke="#D42D26" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
      </g>`;
}

/**
 * Checking if the activity already is added to favorite
 */
function isFavPosts(placeId) {
  console.log(placeId);
  return _favPosts.find((place) => place.Id == placeId); // checking if favorite has the activity with matching id or not
}




/*
Displays more image gallery from JSON on scroll
*/
const URL =
  "json/data.json";
document.addEventListener("DOMContentLoaded", () => {

  let options = {
    root: null,
    rootMargins: "0px",
    threshold: 0.5
  };
  const observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(document.querySelector("menu"));
  getData();
});

function handleIntersect(entries) {
  if (entries[0].isIntersecting) {
    getData();
  }
}

/*
Creates DOM elements from data fetched from JSON
*/
function getData() {
  let content = document.getElementById(".eat_cards_container");
  fetch(URL)
    .then(response => response.json())
    .then(data => {

      data.items.forEach(item => {
        let imageContainer = document.createElement("a");
        let img = document.createElement("img");
        img.src = item.img;
        imageContainer.appendChild(img);
        content.appendChild(imageContainer);

        setClass();
      });
    });
}