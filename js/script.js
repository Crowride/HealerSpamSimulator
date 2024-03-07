//Code is a mess cus im a dog at js, shoutout chatgpt and google
document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("gameCanvas");
    const context = canvas.getContext("2d");
    const healerMenu = document.getElementById("healerMenu");
    const misclickImage = document.getElementById("misclickImage");
    const backgroundImage = new Image();
    backgroundImage.src = "./assets/w7spam.png";
    const inventoryImage = new Image();
    const foodImage = new Image();
    let currentStreak = 0;
    let highestStreak = 0;
    let previousStreak = 0;
    const counterDisplay = document.getElementById("counterDisplay");
    let resetTickInterval;

    backgroundImage.onload = function () {
        context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    };

    inventoryImage.onload = function () {
        context.drawImage(inventoryImage, 658, 263, 235, 320);
    };

    foodImage.onload = function () {
        context.drawImage(foodImage, 672, 525, 50, 45);
    };

    setTimeout(function () {
        inventoryImage.src = "./assets/inventory.png";
    }, 300);

    setTimeout(function () {
        foodImage.src = "./assets/defaultstate.png";
    }, 500);
//Food streak update
    function updateCounter() {
        counterDisplay.textContent = "Current streak: " + currentStreak;
            if (currentStreak === 0 && previousStreak > highestStreak) {
                highestStreak = previousStreak;
                hiscoreDisplay.textContent = "Highest streak: " + highestStreak;
            }
    }
//Left clicking food on a healer
    function leftClickHealer() {
        clearInterval(resetTickInterval);

        resetTickInterval = setInterval(function () {
            previousStreak = currentStreak;
            currentStreak = 0;
            updateCounter();
        }, 650);

        const redClick = document.createElement("img");
        redClick.src = "./assets/red_click.gif";
        redClick.style.position = "absolute";
        redClick.draggable = false;

        redClick.style.left = event.clientX - 8 + "px";
        redClick.style.top = event.clientY - 8 + "px";

        document.body.appendChild(redClick);

        setTimeout(function () {
            document.body.removeChild(redClick);
        }, 250);

        currentStreak++;
        updateCounter();
    }
//Top option in healer right click menu
    function wrongHealerOption() {
        const yellowClick = document.createElement("img");
        yellowClick.src = "./assets/yellow_click.gif";
        yellowClick.style.position = "absolute";
        yellowClick.draggable = false;

        yellowClick.style.left = event.clientX - 8 + "px";
        yellowClick.style.top = event.clientY - 8 + "px";

        document.body.appendChild(yellowClick);

        setTimeout(function () {
            document.body.removeChild(yellowClick);
        }, 250);
    }
//Middle option in healer right click menu
    function correctHealerOption() {
        clearInterval(resetTickInterval);

        resetTickInterval = setInterval(function () {
            previousStreak = currentStreak;
            currentStreak = 0;
            updateCounter();
        }, 650);

        const redClick = document.createElement("img");
        redClick.src = "./assets/red_click.gif";
        redClick.style.position = "absolute";
        redClick.draggable = false;

        redClick.style.left = event.clientX - 8 + "px";
        redClick.style.top = event.clientY - 8 + "px";

        document.body.appendChild(redClick);

        setTimeout(function () {
            document.body.removeChild(redClick);
        }, 250);

        currentStreak++;
        updateCounter();
    }
//Bottom option in healer right click menu
    function cancelMenuOption() {
        const yellowClick = document.createElement("img");
        yellowClick.src = "./assets/yellow_click.gif";
        yellowClick.style.position = "absolute";
        yellowClick.draggable = false;

        yellowClick.style.left = event.clientX - 8 + "px";
        yellowClick.style.top = event.clientY - 8 + "px";

        document.body.appendChild(yellowClick);

        setTimeout(function () {
            document.body.removeChild(yellowClick);
        }, 250);
    }
//Left click logic
    document.addEventListener("mousedown", function (event) {
        if (event.button === 0) {
            const canvasRect = canvas.getBoundingClientRect();
            const foodClickableArea = {
                minX: 675,
                maxX: 720,
                minY: 530,
                maxY: 568
            };
            const healerClickableArea = {
                minX: 490,
                maxX: 615,
                minY: 110,
                maxY: 470
            };
//Checks if left click happens inside healerClickableArea and food is selected      
            if (
                event.clientX >= canvasRect.left + healerClickableArea.minX &&
                event.clientX <= canvasRect.left + healerClickableArea.maxX &&
                event.clientY >= canvasRect.top + healerClickableArea.minY &&
                event.clientY <= canvasRect.top + healerClickableArea.maxY &&
                foodImage.src.endsWith("usestate.png") &&
                healerMenu.style.display == "none"
            ) {
                leftClickHealer();
            }

            if (event.target.tagName.toLowerCase() === 'area') {
                const clickedAreaFunction = event.target.getAttribute('onclick');
                if (clickedAreaFunction === 'correctHealerOption()') {
                    correctHealerOption();
                }
                if (clickedAreaFunction === 'wrongHealerOption()') {
                    wrongHealerOption();
                }
                if (clickedAreaFunction === 'cancelMenuOption()') {
                    cancelMenuOption();
                }
            }
//hides the menus if u click anywhere and sets the foodImage back to defaultstate
            misclickImage.style.display = "none"
            healerMenu.style.display = "none";
            foodImage.src = "./assets/defaultstate.png"
            
            const foodArea = {
                x: 658,
                y: 263,
                width: 235,
                height: 320
            };
//Clears the foodImage and inventoryImage (x,y,width,height)
            context.clearRect(658, 263, 235, 320);
//Redraws foodImage and inventoryImage (x,y,width,height)
            context.drawImage(inventoryImage, 658, 263, 235, 320);

            if (
                event.clientX >= canvasRect.left + foodClickableArea.minX &&
                event.clientX <= canvasRect.left + foodClickableArea.maxX &&
                event.clientY >= canvasRect.top + foodClickableArea.minY &&
                event.clientY <= canvasRect.top + foodClickableArea.maxY
            ) {
                foodImage.src = "./assets/usestate.png";
            }
        }
    });
//Right click logic
    canvas.addEventListener("mousedown", function (event) {
        if (event.button === 2) {
            const canvasRect = canvas.getBoundingClientRect();
            const healerClickableArea = {
                minX: 490,
                maxX: 615,
                minY: 110,
                maxY: 470
            };
//Checks if right click happens inside healerClickableArea and food is selected
//If not, displays cancel menu
            if (
                event.clientX >= canvasRect.left + healerClickableArea.minX &&
                event.clientX <= canvasRect.left + healerClickableArea.maxX &&
                event.clientY >= canvasRect.top + healerClickableArea.minY &&
                event.clientY <= canvasRect.top + healerClickableArea.maxY &&
                foodImage.src.endsWith("usestate.png")
            ) {
                healerMenu.style.left = event.clientX + "px";
                healerMenu.style.top = event.clientY + "px";
                healerMenu.style.display = "block";
            } else {
                misclickImage.style.left = event.clientX + "px";
                misclickImage.style.top = event.clientY + "px";
                misclickImage.style.display = "block";
            }
        }
    });
//Gets rid of the default browser right click menu
    document.addEventListener("contextmenu", function (event) {
        event.preventDefault();
    });
//Menu closing upon hovering too far
    canvas.addEventListener("mousemove", function (event) {
        const healerMenuRect = healerMenu.getBoundingClientRect();
        const misMenuRect = misclickImage.getBoundingClientRect();

        const isMouseNearMisMenu = (
            event.clientX >= misMenuRect.left - 20 &&
            event.clientX <= misMenuRect.right + 20 &&
            event.clientY >= misMenuRect.top - 20 &&
            event.clientY <= misMenuRect.bottom + 20
        );
        const isMouseNearHealerMenu = (
            event.clientX >= healerMenuRect.left - 20 &&
            event.clientX <= healerMenuRect.right + 20 &&
            event.clientY >= healerMenuRect.top - 20 &&
            event.clientY <= healerMenuRect.bottom + 20
        );

        if (!isMouseNearHealerMenu) {
            healerMenu.style.display = "none";
        }
        if (!isMouseNearMisMenu) {
            misclickImage.style.display = "none";
        }
    });
});