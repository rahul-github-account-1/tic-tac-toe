let turn = "X";
let gameOver = false;
let lastTurn = "";
let startMusic = new Audio("music.mp3");
let turnMusic = new Audio("ting.mp3")
let gameOverMusic = new Audio("gameover.wav");


//Change Turn 
let changeTurn = () => {
    return turn === "X" ? "0" : "X";
}

//Checking Winn Condiotion
function checkWin() {
    let win = [
        [0, 1, 2, 5, 0, 0],
        [3, 4, 5, 15, 0, 0],
        [6, 7, 8, 25, 0, 0],
        [0, 3, 6, 5, 0, 90],
        [1, 4, 7, 15, 0, 90],
        [2, 5, 8, 25, 0, 90],
        [0, 4, 8, 0, 0, 45, "left", "center"],
        [2, 4, 6, 0, 0, 45, "right", "center"]
    ];
    let boxText = document.getElementsByClassName("boxTxt");
    win.forEach((e) => {
        //condition for winning
        if ((boxText[e[0]].innerText === boxText[e[1]].innerText) && (boxText[e[1]].innerText === boxText[e[2]].innerText) && boxText[e[0]].innerText !== "") {
            document.querySelector(".infoTxt").innerText = boxText[e[0]].innerText + " won";
            gameOver = true;
           
            let line = document.querySelector(".line");   // for line
            if (e[5] == 0) {
                line.style.width = "30vw";
                line.style.height = "0.5vh";
                line.style.transform = `translate(0vw,${e[3]}vw)`;
            }
            else if (e[5] == 90) {
                line.style.width = "30vw";
                line.style.height = "0.5vh";
                line.style.transformOrigin = "left center"
                line.style.transform = `  translate(${e[3]}vw,0vw) rotate(90deg)`;
            }
            else if (e[5] == 45) {
                line.style.width = "42.42vw";
                line.style.height = "0.5vh";

                line.style.transformOrigin = e[6] + " " + e[7];
                if (e[6] === "left") {

                    line.style.transform = `  translate(${e[3]}vw,0vw) rotate(45deg)`;
                }
                else {
                 line.style.transform = `translateX(-12.42vw)  rotate(-45deg)`;
                }
            }
            document.getElementById("imgID").style.width = "50vw";   // for image
            let musicOver = document.getElementById("Over");
            musicOver.currentTime = 0;     //Music time is set to starting
            musicOver.play();
            //  let cont=document.getElementsByClassName("container")[0];  // for visibility of container
            // cont.style.visibility="hidden";
        }
    })

}


//clicking event on boxes
let boxes = document.getElementsByClassName("box");
for (let i = 0; i < boxes.length; i++) {
    let boxText = boxes[i].querySelector(".boxTxt")
    boxes[i].addEventListener("click", () => {
        if (boxText.innerText === '' && gameOver === false) {   // This condition is for all the empty boxes clicking event when game is not yet over  
            boxText.innerText = turn;
            turnMusic.play();

            checkWin();
            turn = changeTurn();

            if (gameOver != true) {
                document.getElementsByClassName("infoTxt")[0].innerText = "Turn for " + turn;

            }

        }


    })
}
//Reset

let reset = document.getElementById("reset");
reset.addEventListener("click", () => {
    let musicOver = document.getElementById("Over");
    musicOver.pause();   //Pause gameOver Music
    let boxText = document.querySelectorAll(".boxTxt");
    Array.from(boxText).forEach((e) => {
        e.innerText = "";
    })

    gameOver = false;
    document.getElementById("imgID").style.width = "0px";
    turn = "X"
    document.getElementsByClassName("infoTxt")[0].innerText = "Turn for " + turn;
    // let cont = document.getElementsByClassName("container")[0];
    // cont.style.visibility = "visible";
    let line = document.querySelector(".line");
    line.style.width="0vw";
    line.style.height="0vh";


})