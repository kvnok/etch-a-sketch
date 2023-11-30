let isMouseDown = false;

function changeColor(element) {
	element.classList.add("active");
}

function getCSSVariableValue(variableName) {
	const root = document.documentElement;
	return getComputedStyle(root).getPropertyValue(variableName).trim();
}

function setCSSVariableValue(variableName, value) {
	const root = document.documentElement;
	root.style.setProperty(variableName, value);
}

function createFlexItemsPrompt() {
	var n = prompt("how big should the canvas be:");
	if (n !== null && !isNaN(n) && Number.isInteger(Number(n)) && Number(n) >= 1 && Number(n) <= 100) {
		createFlexItems(Number(n));
	} else {
		alert("Invalid input. Please enter a valid number.");
	}
}

function createFlexItems(n) {
	var flexContainer = document.getElementById("flex-container");
	setCSSVariableValue('--myVar', n);
	var flexBasis = `calc(100% / ${getCSSVariableValue('--myVar')})`;
	
	flexContainer.innerHTML = "";

	for (var i = 0; i < n*n; i++) {
		var flexItem = document.createElement("div");
		flexItem.className = "flex-item";

		// Use the dynamic flex basis
		flexItem.style.flex = `0 0 ${flexBasis}`;

		flexItem.onmousedown = function (event) {
			event.preventDefault(); // Prevent default drag behavior
			isMouseDown = true;
		};
		
		flexItem.onmousemove = function () {
			if (isMouseDown) {
				changeColor(this);
			}
		};
	
		flexItem.onmouseup = function () {
			isMouseDown = false;
		};

		flexContainer.appendChild(flexItem);
	}
}

function resetColors() {
	var flexItems = document.querySelectorAll(".flex-item");
	flexItems.forEach(function (item) {
		item.classList.remove("active");
	});
}
