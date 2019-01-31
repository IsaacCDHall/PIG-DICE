function PiggyGame(){
  this.dieValue=0;
  this.turnValue=0;
  this.totalValue=0
}
var uiGame = new PiggyGame();
var botGame = new PiggyGame();





PiggyGame.prototype.addToTurnValue = function(){
  if (this.dieValue === 1){
    this.turnValue = 0;
    // alert("You hit a 1!")
    console.log("You hit a 1");
    botPlays();
    botGame.findBotTotal();
    $('.totalValueTwo').text(botGame.totalValue);
    const pigSound = new Audio("./audio/Pigpissed.WAV");
    pigSound.play()
  } else {
    this.turnValue += this.dieValue;
    console.log("You landed on " + this.dieValue);
  }
}
PiggyGame.prototype.botAddToTurnValue = function(){
  if (this.dieValue === 1){
    this.turnValue = 0;
    console.log("Bot hit a 1");
    botGame.findBotTotal();
  } else {
    this.turnValue += this.dieValue;
    console.log("Bot landed on " + this.dieValue);
  }
}
PiggyGame.prototype.dieRoll = function (){
  var dieValue = Math.floor((Math.random()*6)+1);
  this.dieValue = dieValue;
  this.addToTurnValue();
}
PiggyGame.prototype.botDieRoll = function (){
  var dieValue = Math.floor((Math.random()*6)+1);
  this.dieValue = dieValue;
  this.botAddToTurnValue();
}

PiggyGame.prototype.findTotal = function () {
  this.totalValue += this.turnValue;
  if (this.totalValue >= 50) {
    alert('You won!');
    uiGame.dieValue=0;
    uiGame.turnValue=0;
    uiGame.totalValue=0;
    botGame.dieValue=0;
    botGame.turnValue=0;
    botGame.totalValue=0;
  }
}
PiggyGame.prototype.findBotTotal = function () {
  this.totalValue += this.turnValue;
  if (this.totalValue >= 50) {
    alert('You Lose!!');
    uiGame.dieValue=0;
    uiGame.turnValue=0;
    uiGame.totalValue=0;
    botGame.dieValue=0;
    botGame.turnValue=0;
    botGame.totalValue=0;
  }
}

PiggyGame.prototype.holdButton = function(){
  this.turnValue=0;
  botGame.turnValue=0;
}

 function botPlays(){
   botGame.botDieRoll();
   if (botGame.dieValue === 1){
     botGame.holdButton();
     const botSound = new Audio("./audio/botSound.WAV");
     botSound.play()
     console.log(botGame.dieValue)
   } else{
     botGame.botDieRoll;
     console.log(botGame);

   }
 }
$(document).ready(function(){
  $(".diceImg").click(function(){
    const rollSound = new Audio("./audio/ONEDICE.WAV");
    rollSound.play()
    uiGame.dieRoll();

    $('img.die').addClass("animated flip");

    setTimeout(function(){
    $('img.die').removeClass("animated flip")
  }, 750);
    $('.currentValue').text(uiGame.turnValue);
    $('.totalValue').text(uiGame.totalValue);
  });
  $('button').click(function(){
    uiGame.findTotal();
    uiGame.holdButton();
    botPlays();
    botGame.findBotTotal();
    $('.totalValue').text(uiGame.totalValue);
    $('.currentValue').text(uiGame.turnValue);
    $('.totalValueTwo').text(botGame.totalValue);
  });
});
