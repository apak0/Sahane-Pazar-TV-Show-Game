const color1 = document.querySelectorAll(".box")
const img = document.querySelectorAll("img")
const resetBtn = document.getElementById("reset")
const allLine = document.querySelectorAll(".line")
const lines = document.querySelector(".lines")
const startBtn = document.getElementById("start")
const line1 = document.querySelector("#line1")
const line2 = document.getElementById("line2")
const line3 = document.getElementById("line3")
const line4 = document.getElementById("line4")
const line5 = document.getElementById("line5")
const score = document.querySelector(".score")
const scorePoint = document.querySelector("#scorePoint")
const lifeHeart = document.querySelector(".life")
const lastBox = document.querySelector("#lastbox")
const questionMark = document.getElementById("questionMark")
const tryagain = document.getElementById("again")
const body = document.querySelector("body")


/// SAYFA YENİLENDİĞİNDE LOCAL STORAGE'IN HEPSİNİ SİLEN FONKSİYON
document.addEventListener("DOMContentLoaded", clearLocalStorage)
function clearLocalStorage() {

    localStorage.setItem("heart", 2)
    heartFromLocalStorage()
    startBtn.style.opacity = "1"
    startBtn.style.cursor = "pointer"
    resetBtn.style.opacity = "0.4"

    resetBtn.style.pointerEvents = "none"
    tryagain.style.opacity = "0.4"

    tryagain.style.pointerEvents = "none"


    lifeBox()
}

///  KUTULARIN FOR DÖNGÜSÜ 
for (let i = 0; i < color1.length; i++) {

    color1[i].addEventListener('click', function (event) {


        let elementStyle = window.getComputedStyle(color1[i])
        let nextSibling = window.getComputedStyle(color1[i])
        let borderStyle = window.getComputedStyle(color1[i])
        // SAYFADA GÖZÜKEN SKORU LOKAL STORAGE'A EKLEME
        let oldScore = scorePoint.textContent;
        localStorage.setItem("score", oldScore);

        color1[i].style.backgroundImage = "none";


        /// KUTUN RENGİ EĞER MAVİ İSE BURASI ÇALIŞIR
        if (elementStyle.backgroundColor === "rgb(0, 0, 255)") {

            color1[i].parentElement.style.backgroundColor = "rgb(230, 227, 82)";


            let nextSibling = color1[i].parentElement.nextElementSibling
            nextSibling.style.pointerEvents = "all"



            // LOKAL STORAGEDEN ALINAN SKOR DEĞERİNİ SAYFADA GÖZÜKEN SKOR MİKTARINA GÖNDERME
            let newScore = JSON.parse(localStorage.getItem("score")) + 1
            scorePoint.textContent = newScore
            let newScoreNext = localStorage.setItem("score", newScore)




            color1[i].parentElement.style.pointerEvents = "none"
            color1[i].parentElement.style.border = "none"

            let heartFromLocal = localStorage.getItem("heart")

            let borderStyle = color1[i].parentElement.nextElementSibling
            borderStyle.style.border = ' 5px solid rgb(21, 207, 198)';
            borderStyle.style.opacity = "1"

        }
        //// KUTUNUN RENGİ EĞER KIRMIZI İSE BURASI ÇALIŞIR
        else if (elementStyle.backgroundColor === "rgb(255, 0, 0)") {
            localStorage.removeItem("score");

            lifeHeart.lastElementChild.style.opacity = "0"
            let localStorageLastElement = localStorage.getItem("heart")
            if (localStorageLastElement == "1") {
                lifeHeart.firstElementChild.style.opacity = "0"
            }

            color1[i].parentElement.style.backgroundColor = "rgb(189, 75, 75)"

            tryagain.style.opacity = "1"
            tryagain.style.pointerEvents = "all"
            color1[i].parentElement.style.pointerEvents = "none"
            let borderOn = color1[i].parentElement;
            borderOn.style.border = ' 5px solid rgb(255, 0, 0)'


            let changeLocalStorage = JSON.parse(localStorage.getItem("heart"))
            let changeLocalStorage2 = changeLocalStorage - 1
            localStorage.setItem("heart", changeLocalStorage2)
            heartFromLocalStorage()

        }



        event.preventDefault();

    }

    );


};




//// START BUTONUNA BASILDIĞINDA OYUNU BAŞLATAN FONKSİYON
startBtn.addEventListener("click", startGame)

function startGame() {
    heartFromLocalStorage()
    let firstLine = line1

    firstLine.style.border = ' 5px solid rgb(21, 207, 198)'
    firstLine.style.pointerEvents = "all"
    firstLine.style.opacity = '1'
    startBtn.style.opacity = "0.4"

    startBtn.style.pointerEvents = "none"


    tryagain.style.opacity = "0.4"

    tryagain.style.pointerEvents = "none"
    line2.style.border = "none"
    line3.style.border = "none"
    line4.style.border = "none"
    line5.style.border = "none"

}

function afterStartGame() {
    let firstLine = line1
    firstLine.style.border = ' 10px solid rgb(21, 207, 198)'
    firstLine.style.pointerEvents = "all"

}

//// RESET BUTONUNA BASILDIĞINDA SAYFAYI YENİLEYEN FONKSİYON
resetBtn.addEventListener("click", resetGame);

function resetGame() {

    localStorage.removeItem("score");

    location.reload();
    localStorage.setItem("heart", 2)

    startBtn.style.opacity = "1"
    resetBtn.style.opacity = "0.4"
    resetBtn.style.cursor = "none"
    tryagain.style.cursor = "none"

}

tryagain.addEventListener("click", tryAgainGame)

function tryAgainGame() {
    line2.style.opacity = "0.6"
    line3.style.opacity = "0.6"
    line4.style.opacity = "0.6"
    line5.style.opacity = "0.6"

    localStorage.removeItem("score");
    scorePoint.textContent = "0"

    startBtn.style.opacity = "0.4"

    tryagain.style.opacity = "0.4"

    tryagain.style.pointerEvents = "none"


    heartFromLocalStorage()
    line1.style.border = "none"

    let nodes = color1
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].nodeName.toLowerCase() == 'div') {
            let element = window.getComputedStyle(nodes[i])
            nodes[i].style.backgroundImage = "url(/soruisareti3.jpg)"
        }
    }
    startGame()
    tryagainForWasteBorder()
}


/// SON KUTU DOĞRU BULUNUNCA SKORU GÜNCELLEYEN FONKSİYON
lastBox.addEventListener("click", lastHit)

function lastHit() {
    let lastscore = scorePoint.textContent
    lastscore += localStorage.getItem("score")
    line5.style.border = "none"
    scorePoint.textContent = 5
    setTimeout(gifForWinner(), 3000)
    startBtn.style.opacity = "1"
    // gifForWinner()
}
/// OYUN BAŞLADIĞINDA LOCAL STORAGE'DAKİ HEART KEYİNDE BULUNAN VALUE KADAR KALP EKLER.
function lifeBox() {

    let lifeBoxHeart = lifeHeart.childElementCount

    localStorage.setItem("heart", lifeBoxHeart)



}

function heartFromLocalStorage() {

    let heartBox = localStorage.getItem("heart")

    let currentHeartValue = lifeHeart.childElementCount
    let lifeCurrentBoxHeart = lifeHeart
    if (heartBox == 2) {

    }
    else if (heartBox == 1) {
        lifeCurrentBoxHeart.lastElementChild.style.opacity = "0"
        localStorage.setItem("heart", 1)


    }
    else if (heartBox == 0) {
        resetBtn.style.opacity = "1"
        resetBtn.style.pointerEvents = "all"
        tryagain.style.pointerEvents = "none"
        tryagain.style.opacity = "0.4"
    }
}

function gifForWinner() {
    let gifDiv = document.createElement("div")
    gifDiv.style.position = "relative"
    gifDiv.style.height = "100%"
    gifDiv.style.width = "100%"

    let gif = document.createElement("img")
    gif.setAttribute("src", "/giphy.gif")
    gif.style.position = "fixed"
    gif.style.bottom = "10rem"
    gif.style.top = "0"
    gif.style.left = "0"
    gif.style.right = "0"
    gif.style.margin = "auto"

    gifDiv.appendChild(gif)

    let gifElement = document.body.appendChild(gifDiv)
    setTimeout(function () { gifElement.remove() }, 3000)

}
