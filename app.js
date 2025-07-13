let gameSeq = [];
let userSeq = [];
let Allbtns = ["btn-1","btn-2","btn-3","btn-4"];
let Highest_Score = 0;

let started = false;
let level = 0;
let score = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started == false){
        console.log("Game is Started");
        started = true;
    }
    Levelup();
});

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    },250);
}

function Levelup() {
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor((Math.random()*4));
    let randbtnNum = Allbtns[randIdx];
    let randBtn = document.querySelector(`.${randbtnNum}`);
    gameSeq.push(randbtnNum);
    btnFlash(randBtn);
}

function checkAns(idx){
    if(gameSeq[idx] === userSeq[idx]){
        if(userSeq.length == gameSeq.length){
            score += 10;
            setTimeout(Levelup,1000);
            userSeq = [];
        }
    }else {
        let body = document.querySelector("body");
        body.classList.add("red");
        setTimeout(function(){
            body.classList.remove("red");
        },200);
        if(score >= Highest_Score){
            Highest_Score = score;
        }
        h2.innerHTML = `Game over!! Your Score Is <b>${score}</b>.<br> Press Any Key To Start.<br> Your Highest Score Is <b>${Highest_Score}</b>.`;
        reset();
    }
}

function Btn_Clicked(){
    let btn = this;
    btnFlash(btn);

    let Btn_Num = btn.getAttribute("id");
    userSeq.push(Btn_Num);

    checkAns(userSeq.length - 1);
}

let btns = document.querySelectorAll(".btn");
for (btn of btns){
    btn.addEventListener("click",Btn_Clicked);
}

function reset(){
    started = false;
    level = 0;
    score = 0;
    gameSeq = [];
    userSeq = [];
}