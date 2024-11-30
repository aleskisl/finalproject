const userNameElement = document.getElementById('user-switch');
//total scores elements
const totalcomputerscoreElement = $("#totalcomputerscore");
const totalplayerscoreElement = $("#totalplayerscore");
//image holders for dice
const imgplayerdice1 = $('#playerdice1');
const imgplayerdice2 = $('#playerdice2');
const imgcomputerdice1 = $('#computerdice1');
const imgcomputerdice2 = $('#computerdice2');
//button elements
const rollbuttonelement = $("#rollbutton");
const resetbuttonelement = $("#resetbutton"); 
const declarebuttonelement = $("#declarewinner");
//current score elements
const computercurrentscoreelement = $("#computerscore");
const playercurrentscoreelement = $("#playerscore");
//path for NO DICE img
const nodiceimg = "images/diceno.png";
//divelements
const computerdivelement = $("#computer");
const playerdivelement = $("#player");

userNameElement.textContent = "Alexis Langan Final Project";
var round = 1;
var computertotal = 0;
var playertotal = 0;

//dice object for each of the dice on screen
function Dice(imgholder) {

    this.value = 0;
    this.imageholder = imgholder;

    //update the value of the dice and the image showing the dice
    this.updatedice = function () {
        this.value = Math.floor(Math.random() * 6 + 1);

        //get image path
        let imagepath = "images/dice" + this.value + ".png";
        let imagealt = "dice rolled:" + this.value;
        //set image path and alt
        imgholder.attr('src', imagepath);
        imgholder.attr('alt', imagealt);
    }
    this.getvalue = function () {
        return this.value;
    }
    this.reset =function() {
        this.value = 0;
        this.imgholder.attr('src', nodiceimg);
    }
}
//display total player score
function displayplayerscoretotal(score) {
    
    totalplayerscoreElement.text(":" + score);
}
//display total computer score
function displaycomputerscore(score) {
    totalcomputerscoreElement.text(":" + score);
}

//takes who, 2 dice values, gets the value of the round, updates
function getroundscore(who, dice1, dice2) {
    let roundscore;
    if (dice1 === 1 || dice2 === 1) {
        roundscore = 0;
    } else if (dice1 === dice2) {
        roundscore = dice1 * dice2;
    } else {
        roundscore = dice1 + dice2;
    }
    if (who === 'player') {
        playertotal += roundscore;
        playercurrentscoreelement.text(roundscore);
        displayplayerscoretotal(playertotal);
    } else if (who === 'computer') {
        computertotal += roundscore;
        computercurrentscoreelement.text(roundscore);
        displaycomputerscore(computertotal);
    } else {
        console.log('who else can get this score?');
    }
    return roundscore;
}


//rolls 4 die, shows them on the page, adds proper points
function playround() {
    //create dice objects
    let pdice1 = new Dice(imgplayerdice1);
    let pdice2 = new Dice(imgplayerdice2);
    let cdice1 = new Dice(imgcomputerdice1);
    let cdice2 = new Dice(imgcomputerdice2);
    //roll dice objects,update image
    pdice1.updatedice();
    pdice2.updatedice();
    cdice1.updatedice();
    cdice2.updatedice();
    //update round score
    let playerroundscore = getroundscore('player', pdice1.getvalue(), pdice2.getvalue());
    let computerroundscore = getroundscore('computer', cdice1.getvalue(), cdice2.getvalue());

    
}

//add event listener for when the rollbutton is clicked
rollbuttonelement.on('click', function () {
        //for 3 rounds
        //display current rolls, set the dice pictures and add computer and player totals
    if (round === 1) {
        playround();
        round++;
        resetbuttonelement.css("display", "inline");

    }else if (round == 2) {
        playround();
        round++;
    } else if (round === 3) {
        playround();
        rollbuttonelement.css("display", "none");
        declarebuttonelement.css("display", "inline");
       
    } else {
        console.log("error. round has gotten too high. ")
    }
    
})
resetbuttonelement.on('click', function () {
    //reset round and totals
    round = 1;
    computertotal = 0;
    playertotal = 0;
    //display score totals
    displayplayerscoretotal(playertotal);
    displaycomputerscore(computertotal);
    //reset display scores
    computercurrentscoreelement.text("0");
    playercurrentscoreelement.text("0");

    resetbuttonelement.css("display", "none");
    rollbuttonelement.css("display", "inline");

    imgplayerdice1.attr('src', nodiceimg);
    imgplayerdice2.attr('src', nodiceimg);
    imgcomputerdice1.attr('src', nodiceimg);
    imgcomputerdice2.attr('src', nodiceimg);

    declarebuttonelement.css("display", "none");

    computerdivelement.removeClass();
    playerdivelement.removeClass();
    //set the h3 
    computerdivelement.parent().prev().children().first().text("Let's play the dice game!");
})

declarebuttonelement.on('click', function () {
    if (computertotal > playertotal) { // computer wins
        computerdivelement.addClass("winner");
        playerdivelement.addClass("loser");
    } else if (computertotal == playertotal) { //neither wins
        computerdivelement.parent().prev().children().first().text("Tied. No Winner");
        computerdivelement.addClass("tie");
        playerdivelement.addClass("tie");
    } else { // player wins
        playerdivelement.addClass("winner");
        computerdivelement.addClass("loser");
    }
    declarebuttonelement.css("display", "none");
})

