/*jslint browser: true */
/* eslint-env browser */
/* global window */
"use strict";

var fieldContext = null;
var fieldCanvas = null;

var scoreCanvas = null;
var scoreContext = null;

var xspeed = 0;
var yspeed = 0;

var playerGoals = 0;
var computerGoals = 0;


var player = {
    x: 0,
    y: 0,
    r: 30
};

var puk = {
    x: 0,
    y: 0,
    r: 15,
    speed: 0
};

var goal1 = {
    x: 0,
    y1: 160,
    y2: 320

};

var goal2 = {
    x: 0,
    y1: 160,
    y2: 320
};



document.addEventListener("DOMContentLoaded", function () {
    update();
});
window.addEventListener('mousemove', function (e) {
    setCoords(e);

});

function init() {
    fieldCanvas = document.getElementById('field');
    fieldContext = fieldCanvas.getContext("2d");


    fieldCanvas.width = 640;
    fieldCanvas.height = 480;

    puk.x = fieldCanvas.width / 2;
    puk.y = fieldCanvas.height / 2;

    goal2.x = fieldCanvas.width;



    scoreCanvas = document.getElementById('score');
    scoreContext = scoreCanvas.getContext("2d");

    scoreCanvas.width = fieldCanvas.width;

}

function reset() {
    puk.x = fieldCanvas.width / 2;
    puk.y = fieldCanvas.height / 2;
    puk.speed = 0;
    xspeed = 0;
    yspeed = 0;

}

function update() {

    requestAnimationFrame(update);
    fieldContext.clearRect(0, 0, fieldCanvas.width, fieldCanvas.height);
    scoreContext.clearRect(0, 0, scoreCanvas.width, scoreCanvas.height);
    drawMatchfield();

    drawPuk();
    drawPlayer();
    if (goalOneCollision()) {
        reset();
        computerGoals++;

    }
    if (goalTwoCollision()) {
        reset();
        playerGoals++;

    }

    if (pukCanvasColliding()) {
        puk.speed = 0;
    }


    if (PlayerPukColliding()) {
        puk.speed = 10;

        var dx = puk.x - player.x;
        var dy = puk.y - player.y;
        dx /= 30;
        dy /= 30;
        xspeed = dx * puk.speed;
        yspeed = dy * puk.speed;
    }
    movePuk();
}

function goalOneCollision() {
    return puk.x < goal1.x && puk.y > goal1.y1 && puk.y < goal1.y2
}

function goalTwoCollision() {
    return puk.x > goal2.x && puk.y > goal1.y1 && puk.y < goal1.y2
}




function PlayerPukColliding() {
    var dx = puk.x - player.x;
    var dy = puk.y - player.y;
    var radiusSum = player.r + puk.r;

    return dx * dx + dy * dy <= radiusSum * radiusSum;
}


function pukCanvasColliding() {
    return 640 <= puk.x;

}

function movePuk() {

    puk.x += xspeed;
    puk.y += yspeed;

    xspeed *= 0.99;
    yspeed *= 0.99;



}

function drawPlayer() {
    fieldContext.save();
    fieldContext.beginPath();
    fieldContext.arc(player.x, player.y, player.r, 0, 2 * Math.PI);
    fieldContext.fillStyle = "#FF0000";
    fieldContext.stroke();
    fieldContext.fill();
}

function drawPuk() {
    fieldContext.save();
    fieldContext.beginPath();
    fieldContext.arc(puk.x, puk.y, puk.r, 0, 2 * Math.PI);
    fieldContext.fillStyle = "#000000";
    fieldContext.fill();
}



function drawMatchfield() {



    fieldContext.beginPath();
    fieldContext.moveTo(fieldCanvas.width / 2, 0);
    fieldContext.lineTo(fieldCanvas.width / 2, fieldCanvas.height);
    fieldContext.strokeStyle = "#FF0000";
    fieldContext.stroke();

    fieldContext.beginPath();
    fieldContext.arc(fieldCanvas.width / 2, fieldCanvas.height / 2, 10, 0, 2 * Math.PI);
    fieldContext.fillStyle = '#FF0000';
    fieldContext.fill();

    fieldContext.beginPath();
    fieldContext.arc(0, fieldCanvas.height / 2, 80, 1.5 * Math.PI, 0.5 * Math.PI);
    fieldContext.strokeStyle = "#0000FF";
    fieldContext.stroke();

    fieldContext.beginPath();
    fieldContext.arc(fieldCanvas.width, fieldCanvas.height / 2, 80, 0.5 * Math.PI, 1.5 * Math.PI);
    fieldContext.stroke();

    fieldContext.beginPath();
    fieldContext.arc(fieldCanvas.width / 2, fieldCanvas.height / 2, 80, 0, 2 * Math.PI);
    fieldContext.stroke();



    scoreContext.font = '60pt Timew New Roman';
    scoreContext.strokeStyle = 'white';
    scoreContext.strokeText(playerGoals, fieldCanvas.width / 2 - 90, 100);
    scoreContext.strokeText(":", fieldCanvas.width / 2 - 10, 100);
    scoreContext.strokeText(computerGoals, fieldCanvas.width / 2 + 40, 100);

}


function setCoords(event) {

    var rect = fieldCanvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    //left and right
    if (y < player.r && x + player.r > fieldCanvas.width / 2) {
        player.x = fieldCanvas.width / 2 - player.r;
        player.y = player.r;
    } else if (x < player.r) {
        player.x = player.r;
    } else if (x + player.r > fieldCanvas.width / 2) {
        player.x = fieldCanvas.width / 2 - player.r;
    } else player.x = x;

    //top and down
    if (x < player.r && y + player.r > fieldCanvas.height) {
        player.x = player.r;
        player.y = fieldCanvas.height - player.r;
    } else if (y < player.r) {
        player.y = player.r;
    } else if (y + player.r > fieldCanvas.height) {
        player.y = fieldCanvas.height - player.r;
    } else player.y = y;





}
