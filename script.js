'use strict';
var print = console.log.bind(console);


const modalButtons = document.querySelectorAll(".show-modal");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModal = document.querySelector(".close-modal");
const check = document.querySelector(".check");
const form = document.getElementById("form");
let highscore = 0;
let randomNum = Math.floor((Math.random() * 20) +1);
let score = 20;

window.addEventListener('load', () => {
    document.querySelector(".pop-up").classList.remove("hide-pop-up");

    setTimeout(() => {
        document.querySelector(".pop-up").classList.add("hide-pop-up"); 
    }, 2500);
});


function displayMessage(newmessage) {
    document.querySelector(".message").textContent = newmessage;
}
function displayTitle(title) {
    document.querySelector(".heading").textContent = title;
}
document.querySelector(".guess").focus();
form.addEventListener('submit', gameLogic);


function gameLogic(event) {
    event.preventDefault();
    const guess = document.querySelector(".guess").value;
    document.querySelector(".guess").value = '';
    document.querySelector(".guess").focus();

    if (!guess) {
        displayMessage("⛔ Enter A Number Between 1 and 20!");
    } else if (guess != randomNum) {
        displayMessage(guess > randomNum ? "📈 Too High!" : "📉 Too Low!");
        displayTitle(guess > randomNum ? "📈 Too High!"  : "📉 Too Low!");
        print(randomNum);
        gameOver();
        redBorder();   
    } else if (guess == randomNum) {
        document.querySelector(".guess").disabled = true;
        check.style.pointerEvents = 'none'
        displayTitle("🎉 Correct Number!");
        displayMessage("🎉 Correct Number!")
        document.body.classList.add("game-win-bg");
        document.querySelector(".num").textContent = randomNum;
        if (score > highscore) {
            highscore = score;
            document.querySelector(".highscore").textContent = score;
        }
    } 
}

document.querySelector(".again").addEventListener('click', resetGame);
document.addEventListener('keydown', function (event) {
    let pressedKey = event.key;
    if (pressedKey == "Escape") {
        resetGame();
    }
    // console.log(pressedKey);
});

function resetGame() {
    score = 20;
    check.style.pointerEvents = 'auto'
    document.querySelector(".guess").value = ''
    randomNum = Math.floor((Math.random() * 20) +1);
    document.querySelector(".score").textContent = score;
    document.body.classList.add("dark-bg");
    document.body.classList.remove("game-win-bg");
    document.body.classList.remove("game-over-bg");
    displayMessage("Start guessing...");
    displayTitle("☺ Guess My Number!");
    document.querySelector(".num").textContent = "?";
    document.querySelector(".guess").disabled = false;
    document.querySelector(".guess").focus();
}

function gameOver() {
    if (score > 1) {
        score--;
        document.querySelector(".score").textContent = score;
    } else {
        displayMessage("💥Game Over!");
        score = 0
        document.querySelector(".score").textContent = 0;
        document.body.classList.remove("game-win-bg");
        document.querySelector(".num").textContent = "?";
        document.body.classList.add("game-over-bg");
        check.style.pointerEvents = 'none';
        document.querySelector(".guess").disabled = true;
    }
}

function redBorder() {

    document.querySelector(".guess").style.border = "4px solid red";

    let removeRedBorder = () => {
        document.querySelector(".guess").style.border = "4px solid #eee";
    }
       
    setTimeout(removeRedBorder, 1000);
}



modalButtons.forEach(button => {
    button.addEventListener('click', () => {
        modal.classList.remove("hidden");
        overlay.classList.remove("hidden");

        
    });
});

closeModal.addEventListener('click', removeModal);
overlay.addEventListener('click', removeModal);

function removeModal() {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
}
