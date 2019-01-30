// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
    this.currentId = 0,
    this.contactAddresses = []
}

AddressBook.prototype.addContact = function (contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.addEmail = function (contactAddress) {
  contactAddress.id = this.assignId();
  this.contactAddresses.push(contactAddress);
}

AddressBook.prototype.assignId = function () {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function (id) {
  for (var i = 0; i < this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}


AddressBook.prototype.findcontactAddress = function (id) {
  for (var i = 0; i < this.contactAddresses.length; i++) {
    if (this.contactAddresses[i]) {
      if (this.contactAddresses[i].id == id) {
        return this.contactAddresses[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function (id) {
  for (var i = 0; i < this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

AddressBook.prototype.deletecontactAddress = function (id) {
  for (var i = 0; i < this.contactAddresses.length; i++) {
    if (this.contactAddresses[i]) {
      if (this.contactAddresses[i].id == id) {
        delete this.contactAddresses[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, email, address) {
  this.firstName = firstName,
    this.lastName = lastName,
    this.phoneNumber = phoneNumber,
    this.email = email,
    this.address = address
}

function contactAddresses(workEmail, personalEmail, otherEmail) {
  this.personalEmail = personalEmail,
    this.workEmail = workEmail,
    this.otherEmail = otherEmail
  // this.workAddress = workAddress,
  // this.homeAddress = homeAddress,
  // this.otherAddress = otherAddress
}

// Contact.prototype.workEmail = function() {
//   return this.workEmail+ " " + this.personalEmail;
// }


Contact.prototype.fullName = function () {
  return this.firstName + " " + this.lastName;
}

// User Interface Logic ---------
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function (contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";

  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".address").html(contact.address);
  $(".email").html(contact.email);
  $(".personal-email").html(contact.emails.personalEmail);
  $(".work-email").html(contact.emails.workEmail);

  if (contact.emails.otherEmail === ""){
    $(".other-email").remove();
  } else {
    $(".other-email span").html(contact.emails.otherEmail);
  }

  if (contact.emails.personalEmail === ""){
     $(".personal-email").remove();
    } else {
      $(".personal-email span").html(contact.emails.personalEmail);
  }

  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function () {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function () {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

$(document).ready(function () {
  attachContactListeners();
  $("form#new-contact").submit(function (event) {
    event.preventDefault();

    var inputFields = [ "new-first-name",
                        "new-last-name",
                        "new-phone-number",
                        "new-address",
                        "new-email",
                        "new-work-email",
                        "new-personal-email",
                        "new-other-email",]
    var incomingVars = {}

    inputFields.forEach(function(inputField){
      var fieldValue = $("input#" + inputField).val();
      $("input#" + inputField).val();
      incomingVars[inputField] = fieldValue;
    });

    var newContact = new Contact(incomingVars["new-first-name"],
                                 incomingVars["new-last-name"],
                                 incomingVars["new-phone-number"],
                                 incomingVars["new-email"],
                                 incomingVars["new-address"]);
    var newContactAdresses = new contactAddresses(incomingVars["new-work-email"],
                                                  incomingVars["new-personal-email"],
                                                  incomingVars["new-other-email"])
    newContact.emails = newContactAdresses
    addressBook.addContact(newContact);
    addressBook.addEmail(newContactAdresses);
    displayContactDetails(addressBook);
  });
});
