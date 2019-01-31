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
    alert("You hit a 1!")
    console.log("You hit a 1");
    botPlays();
    botGame.findBotTotal();
    $('.totalValueTwo').text(botGame.totalValue);
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
    this.dieValue=0;
    this.turnValue=0;
    this.totalValue=0;
  }
}
PiggyGame.prototype.findBotTotal = function () {
  this.totalValue += this.turnValue;
  if (this.totalValue >= 50) {
    alert('You Lose!!');
    this.dieValue=0;
    this.turnValue=0;
    this.totalValue=0;
  }
}

PiggyGame.prototype.holdButton = function(){
  this.turnValue = 0;
}

 function botPlays(){
   botGame.botDieRoll();
   if (botGame.dieValue === 1){
     botGame.holdButton();
     console.log(botGame.dieValue)
   } else{
     botGame.botDieRoll;
     console.log(botGame);
   }
 }
$(document).ready(function(){
  $(".diceImg").click(function(){
    uiGame.dieRoll();
    // $('.').text(uiGame.roll);
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
    // $(".totalValue").text(totalValue);
// function PigDice() {
//   this.contacts = [],
//   this.currentId = 0,
//   this.contactAddresses = []
// }
//
// // AddressBook.prototype.addContact = function (contact) {
// //   contact.id = this.assignId();
// //   this.contacts.push(contact);
// // }
//
// // AddressBook.prototype.addEmail = function (contactAddress) {
// //   contactAddress.id = this.assignId();
// //   this.contactAddresses.push(contactAddress);
// // }
// //
// // AddressBook.prototype.assignId = function () {
// //   this.currentId += 1;
// //   return this.currentId;
// // }
// function attachContactListeners() {
//   $("ul#contacts").on("click", "li", function () {
//     showContact(this.id);
//   });
//   // $("#buttons").on("click", ".deleteButton", function () {
//   //   addressBook.deleteContact(this.id);
//   //   $("#show-contact").hide();
//   //   displayContactDetails(addressBook);
//   // });
// };
//
//
//
//
//
//
//
//
// $(document).ready(function () {
//   attachContactListeners();
//   $("form#new-contact").submit(function (event) {
//     event.preventDefault();
