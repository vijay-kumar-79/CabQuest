let allData = [];
window.onload = ()=>Onload(allData);

function toggleHidePost() {
	document.getElementById("add-trip").classList.toggle("hide");
	if (document.getElementById("filter").classList[1] != 'hide') document.getElementById("filter").classList.toggle("hide");
}

function toggleFilter() {
	document.getElementById("filter").classList.toggle("hide");
	if (document.getElementById("add-trip").classList[1] != 'hide') document.getElementById("add-trip").classList.toggle("hide");
}

function HandleUnfilter() {
	let container = document.getElementById("container")
	container.removeChild(document.getElementsByClassName("cards-container")[0]);
	let cardContainer = document.createElement("div");
	cardContainer.classList.add("cards-container");
	container.appendChild(cardContainer);
	Onload(allData);
	document.getElementById("unfilter").classList.toggle("hide");
}

let num = 15;

function HandlePost() {
	// e.preventDefault();
	toggleHidePost();
	let temp = { ...allData[0] };
	temp.id = num++;
	temp.name = document.getElementsByName("name")[0].value;
	temp.destination = document.getElementsByName("destination")[0].value;
	temp.date = document.getElementsByName("date")[0].value;
	temp.time = document.getElementsByName("time")[0].value;
	temp.hostel = document.getElementsByName("hostel")[0].value;
	temp.mobileNumber = document.getElementsByName("mobile")[0].value;
	createCard(temp);
	allData.push(temp);
	console.log(allData);
}

function HandleFilter() {
	// e.preventDefault();
	toggleFilter();
	if (document.getElementById("unfilter").classList[1] != 'hide') document.getElementById("unfilter").classList.remove("hide");
	let temp = { ...allData[0] };
	// console.log(allData);
	// temp.id = num++;
	temp.name = document.getElementsByName("name")[1].value;
	temp.destination = document.getElementsByName("destination")[1].value;
	temp.date = document.getElementsByName("date")[1].value;
	temp.time = document.getElementsByName("time")[1].value;
	temp.hostel = document.getElementsByName("hostel")[1].value;
	temp.mobileNumber = document.getElementsByName("mobile")[1].value;
	// console.log(allData)
	let filtering = allData.filter((raju) => check(temp, raju));
	// console.log(filtering)
	let container = document.getElementById("container")
	container.removeChild(document.getElementsByClassName("cards-container")[0]);
	let cardContainer = document.createElement("div");
	cardContainer.classList.add("cards-container");
	container.appendChild(cardContainer);
	Onload(filtering);
}

function check(temp, raju) {
	// console.log("entered check");
	// console.log(temp)
	let keys = ["name", "destination", "date", "time", "hostel", "mobileNumber"];
	for (let key of keys) {
		if (temp[key] !== '' && temp[key] !== raju[key]) {
			// console.log("wrong");
			return false;
		}
	}
	return true;
}

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
	// console.log("hello");
	cardsContainer.appendChild(card);
	return;
}

let api = `https://krish-2512.github.io/cc-api/cc-api.json`;


async function Onload(array = allData) {
	// console.log(allData);
	if (array.length === 0){
	await
		fetch(api)
			.then(response => response.json())
			.then(data => {
				
					array = data.data
					allData = array;
				// console.log(data.data);
			})
			.catch(error => console.error('Error:', error));
	// console.log(allData);
	}
	for (data of array) {
		// console.log(data);
		createCard(data);
	}
}