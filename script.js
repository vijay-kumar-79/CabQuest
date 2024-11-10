// Initialize an empty array to hold all data
let allData = [];

// When the window loads, call the Onload function with allData
window.onload = () => Onload(allData);

// Function to hide or show the menu
function hideMenu() {
    document.getElementById("menu-links").classList.toggle("hide");
}

// Add an event listener to the first SVG element to toggle the menu
document.getElementsByTagName("svg")[0].addEventListener("click", () => {
    hideMenu();
})

// Function to toggle the visibility of the post form
function toggleHidePost() {
    document.getElementById("add-trip").classList.toggle("hide");
    if (document.getElementById("filter").classList[1] != 'hide') document.getElementById("filter").classList.toggle("hide");
}

// Function to toggle the visibility of the filter form
function toggleFilter() {
    document.getElementById("filter").classList.toggle("hide");
    if (document.getElementById("add-trip").classList[1] != 'hide') document.getElementById("add-trip").classList.toggle("hide");
}

// Function to reset the filter and show all posts
function HandleUnfilter() {
    let container = document.getElementById("container");
    container.removeChild(document.getElementsByClassName("cards-container")[0]);
    let cardContainer = document.createElement("div");
    cardContainer.classList.add("cards-container");
    container.appendChild(cardContainer);
    Onload(allData);
    document.getElementsByClassName("unfilter")[0].classList.toggle("hide");
    document.getElementsByClassName("unfilter")[1].classList.toggle("hide");
}

// Function to handle menu display (currently not used)
function HandleMenu() {
    document.getElementsByTagName(ul)[1].style.display = "flex";
    alert("hello");
}

// Initialize a counter for new posts
let num = 15;

// Function to handle the submission of a new post
function HandlePost() {
    toggleHidePost();
    let temp = { ...allData[0] };
    temp.id = num++;
    temp.name = document.getElementsByName("name")[0].value;
    temp.destination = document.getElementsByName("destination")[0].value;
    temp.date = document.getElementsByName("date")[0].value;
    temp.time = document.getElementsByName("time")[0].value;
    temp.hostel = document.getElementsByName("hostel")[0].value;
    temp.mobileNumber = document.getElementsByName("mobile")[0].value;
    if(!checkProperties(temp)){
        alert("Fill All Inputs");
        return;
    }
    createCard(temp);
    allData.push(temp);
    console.log(allData);
}

// Function to check if all properties of an object are filled
function checkProperties(obj) {
    for (var key in obj) {
        if(key === "id") continue;
        if (obj[key] == '') {
            console.log(obj[key]);
            return false;
        }
    }
    return true;
}

// Function to handle the filter form submission
function HandleFilter() {
    toggleFilter();
    if (document.getElementsByClassName("unfilter")[0].classList.length != 1) document.getElementsByClassName("unfilter")[0].classList.remove("hide");
    if (document.getElementsByClassName("unfilter")[1].classList.length != 1) document.getElementsByClassName("unfilter")[1].classList.remove("hide");
    let temp = { ...allData[0] };
    temp.name = document.getElementsByName("name")[1].value;
    temp.destination = document.getElementsByName("destination")[1].value;
    temp.date = document.getElementsByName("date")[1].value;
    temp.time = document.getElementsByName("time")[1].value;
    temp.hostel = document.getElementsByName("hostel")[1].value;
    temp.mobileNumber = document.getElementsByName("mobile")[1].value;
    let filtering = allData.filter((raju) => check(temp, raju));
    console.log(filtering);
    let container = document.getElementById("container");
    container.removeChild(document.getElementsByClassName("cards-container")[0]);
    let cardContainer = document.createElement("div");
    cardContainer.classList.add("cards-container");
    container.appendChild(cardContainer);
    Onload(filtering);
}

// Function to check if an object matches the filter criteria
function check(temp, raju) {
    let keys = ["name", "destination", "date", "time", "hostel", "mobileNumber"];
    for (let key of keys) {
        if (temp[key] !== '' && temp[key] !== raju[key]) {
            return false;
        }
    }
    return true;
}

// Function to create a card element and append it to the cards container
function createCard(data) {
    let cardsContainer = document.getElementsByClassName("cards-container")[0];
    let card = document.createElement("div");
    card.classList.add("card");
    let temp = document.createElement("p");
    temp.textContent = `${data.name}`;
    card.appendChild(temp);
    temp = document.createElement("p");
    temp.textContent = `${data.destination}`;
    card.appendChild(temp);
    temp = document.createElement("p");
    temp.textContent = `${data.date}`;
    card.appendChild(temp);
    temp = document.createElement("p");
    temp.textContent = `${data.time}`;
    card.appendChild(temp);
    temp = document.createElement("p");
    temp.textContent = `${data.hostel}`;
    card.appendChild(temp);
    temp = document.createElement("p");
    temp.textContent = `${data.mobileNumber}`;
    card.appendChild(temp);
    cardsContainer.appendChild(card);
    return;
}

// API endpoint to fetch data
let api = `https://krish-2512.github.io/cc-api/cc-api.json`;

// Function to load data from the API or use existing data
async function Onload(array = allData) {
    if (array.length === 0) {
        await fetch(api)
            .then(response => response.json())
            .then(data => {
                array = data.data;
                allData = array;
            })
            .catch(error => console.error('Error:', error));
    }
    for (data of array) {
        createCard(data);
    }
}