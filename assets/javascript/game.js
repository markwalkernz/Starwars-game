// Coding boot camp week 4 homework. Star Wars RPG game.

// initialise variables
var imagePath = "assets/images/";
var arrayCharacters = ["luke", "leia", "boba", "vader"];

var playerSelected = false;
var defenderSelected = false;

var playerHealth = 0;
var defenderHealth = 0;

var attackNumber = 1;

// character details
var luke = {id: "luke", name: "Luke Skywalker", healthPoints: 100, attackPower: 8, counterAttackPower: 5, image:"luke.jpg", headshot:"lukeHead.jpg"};
var leia = {id: "leia", name: "Princess Leia", healthPoints: 120, attackPower: 6, counterAttackPower: 10, image:"leia.jpg", headshot:"leiaHead.jpg"};
var boba = {id: "boba", name: "Boba Fett", healthPoints: 150, attackPower: 10, counterAttackPower: 15, image:"boba.jpg", headshot:"bobaHead.jpg"};
var vader = {id: "vader", name: "Darth Vader", healthPoints: 180, attackPower: 12, counterAttackPower: 25, image:"vader.jpg", headshot:"vaderHead.jpg"};

// TODO: calculate number of opponents rather than a fixed number. Will need to put characters in an array?
var numberOpponents = 3;

// attack button is initially hidden
	$ ("#attackButton").hide();


// declare functions
function createCharacter(item, targetArea) {

	// This function creates a div for a character, with an image and statistics.

	// variables
	var characterSource = imagePath + item.headshot;			// this is the path of the image for the character
	var characterID = "#" + item.id
	var healthID = item.id + "Health";							// the unique id for the character with "Health" on the end becomes the id for health points 

	// create div for the character
	var characterContainer	= $("<div>");
		characterContainer.attr("class", "gameCharacter");		// All character divs have a class of "gameCharacter".
		characterContainer.attr("id", item.id);					// the id for the div is the id retrieved from the character object
		characterContainer.attr("healthPoints", item.healthPoints);
		characterContainer.attr("attackPower", item.attackPower);
		characterContainer.attr("counterAttackPower", item.counterAttackPower);

	// add the character's name to the div as text
	characterContainer.text(item.name);

	// display the character in the correct area of the page
	$ (targetArea).append(characterContainer);

	// add image to character div
	var characterImage = $("<img>");
		characterImage.attr("class", "headshot");				// the image for the character has the class of "headshot"
		characterImage.attr("src", characterSource);
		characterImage.attr("alt", item.name);

	$ (characterContainer).append(characterImage);

	// show healthPoints in a span in the character div 
	var healthPointsSpan = $("<span>");
		healthPointsSpan.attr("id", healthID);

	healthPointsSpan.text(item.healthPoints);

	$ (characterContainer).append("Health Points: ");
	$ (characterContainer).append(healthPointsSpan);

} //end of createCharacter function



// run the following after the document has loaded
$(document).ready(function(){

	// place character images in character area
	createCharacter(luke, character_area);
	createCharacter(leia, character_area);
	createCharacter(boba, character_area);
	createCharacter(vader, character_area);


	// click on a character
	$(".gameCharacter").on("click", function() {

		// if no player character has been selected, choose this character as the player
		if (playerSelected == false) {

			// identify the current id of the character selected, and the span where the character's health is shown
			characterID = "#" + $ (this).attr("id");
			healthID = characterID + "Health";

			// change the id of the character that has been clicked to "player"
			$ (characterID).attr("id", "player");

			// change the id of the span where the character's health is shown to "playerHealth"
			$ (healthID).attr("id", "playerHealth");

			// character's health points becomes the player's starting health
			playerHealth = $ ("#player").attr("healthPoints");

			// move player to player area
			$ ("#player").appendTo("#player_area");

			// record that a player has been selected
			playerSelected = true;

			// change instructions
			$ ("#message_area").text("Choose your first opponent ...");

		}

		else if (defenderSelected == false) {

			// identify the current id of the character selected, and the span where the character's health is shown
			characterID = "#" + $ (this).attr("id");
			healthID = characterID + "Health";

			// change the id of the character that has been clicked to "defender"
			$ (characterID).attr("id", "defender");

			// change the id of the span where the character's health is shown to "defenderHealth"
			$ (healthID).attr("id", "defenderHealth");

			// character's health points becomes the defender's starting health
			defenderHealth = $ ("#defender").attr("healthPoints");

			// move defender to defender area
			$ ("#defender").appendTo("#defender_area");

			// show the attack button
			$ ("#attackButton").show();

			defenderSelected = true;

			// change instructions
			$ ("#message_area").text("Click the attack button...");

		} 

	});	//end of character click


	// click on attack button
	$("#attackButton").on("click", function() {

		// attack button is only active if player and defender have been selected and player and defender health are greater than zero
		if (playerSelected == true && defenderSelected == true && playerHealth > 0 && defenderHealth > 0) {

			// get player's attack power and multiply it by the number of attacks that have been made
			var playerAttackPower = $ ("#player").attr("attackPower");
			var attackDamage = playerAttackPower * attackNumber;

			// reduce defender's health
			defenderHealth -= attackDamage;	

			// get defender's counter attack power
			var counterAttackDamage = $ ("#defender").attr("counterAttackPower");

			// reduce player's health
			playerHealth -= counterAttackDamage;

			// show attack results on screen
			$ ("#attack_messages").text("You attacked for " + attackDamage + " damage.");			
			$ ("#attack_messages").append("Defender counter attacked for " + counterAttackDamage + " damage.");

			// show player and defender remaining health on screen
			$ ("#playerHealth").text(playerHealth);
			$ ("#defenderHealth").text(defenderHealth);

			// if defender health reaches zero...
			if (defenderHealth <= 0) {

				// reduce number of opponents by one
				numberOpponents -= 1;

				// delete defender div and set defenderSelected to false
				$ ("#defender").remove();
				defenderSelected = false;

				// hide the attack button
				$ ("#attackButton").hide();

				// change instructions
				$ ("#message_area").text("You are victorious! Choose a new opponent...");
			}

			// if all opponents have been defeated...
			if (numberOpponents === 0) {

				// hide the attack button
				$ ("#attackButton").hide();

				// change instructions
				$ ("#message_area").text("You have defeated all of your opponents! Click 'Restart' to try again...");
			}

			// if player health reaches zero...
			if (playerHealth <= 0) {
				
				// hide the attack button
				$ ("#attackButton").hide();

				// change instructions
				$ ("#message_area").text("You have been defeated. Click 'Restart' to try again...");
			}

			attackNumber += 1; // increments the strength of the player's attack
		}

	}); // end of attack button click

	// click on restart button
	$("#restartButton").on("click", function() {

		location.reload();
	});

}); // end of document.ready