// access all pertinent elements
let input = document.querySelector("input");
let addBtn = document.querySelector(".add-btn");
let removeBtn = document.querySelector(".remove-btn");
let ul = document.querySelector(".todo-container > ul");

// add listener on one of the buttons
addBtn.addEventListener("click", e => {
	// prevent form from submission
	e.preventDefault();

	let allToDos = document.querySelectorAll("li");
	let sanitizedInput = input.value.toLowerCase().trim();

	let exists = false;

	allToDos.forEach(i => {
		if (i.textContent.toLowerCase() === sanitizedInput) {
			exists = true;
		}
	});

	if (exists) {
		console.log("Already exists");
	} else {
		// verify if we get value from input field when button clicked
		console.log(input.value);
		// create a new li element
		let li = document.createElement("li");
		// assign input value to that of the li
		li.textContent = input.value;
		// once element with correct value is created
		// add it to the ul on the screen
		ul.appendChild(li);
		// mini Challenge - how can we clear the input at the end?
		input.value = "";
	}
});

removeBtn.addEventListener("click", e => {
	e.preventDefault();
	// grab input value
	// grab all li instances
	// check if any li text matches that from input
	// remove that li from the DOM
	let allToDos = document.querySelectorAll("li");
	let sanitizedInput = input.value.toLowerCase().trim();

	if (allToDos.length) {
		console.log("code ran");
		allToDos.forEach(i => {
			if (i.textContent.toLowerCase() === sanitizedInput) {
				// remove that li from the DOM
				i.remove();
			}
		});
	}
});

/* 
    ? Challenge
    * pull up your todo list project
    * grab the typicode API link: https://jsonplaceholder.typicode.com/todos
    * fetch and retrieve the data
    * create an element for title data
    * fill in the content of your li.textContent to hold the title
    * ensure all of them appear within your todo list
    * this will likely require looping over the data
    
    ! Extra - string interpolate title and completed. If completed, add a checkmark
*/

let endpoint = "https://jsonplaceholder.typicode.com/todos";
async function getData(url) {
	try {
		let res = await fetch(url);
		let d = await res.json();
		return d
	} catch (err) {
		console.log(err);
	}
}

function render(data) {
	if (data && data instanceof Array) {
		data.forEach(i => {
			let li = document.createElement("li");
			li.textContent = i.title;
			ul.appendChild(li);
		});
	}
}

async function start() {
	let data = await getData(endpoint)
	render(data)
}

start()