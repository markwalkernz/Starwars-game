// Coding boot camp week 4 homework. Star Wars RPG game.

// initialise variables
var imagePath = "assets/images/";		//this is the path to the images folder

var playerSelected = false;				//no player character selected
var defenderSelected = false;			//no defender character selected

var playerHealth = 0;					//player's current health points
var defenderHealth = 0;					//defender's current health points

var attackNumber = 1;					//how many attacks the player has made, used to increase player attack strength incrementally

// character details in an array
var characters = [
	{id: "luke", name: "Luke Skywalker", healthPoints: 120, attackPower: 20, counterAttackPower: 12, headshot:"lukeHead.jpg"},
	{id: "leia", name: "Princess Leia", healthPoints: 130, attackPower: 15, counterAttackPower: 10, headshot:"leiaHead.jpg"},
	{id: "boba", name: "Boba Fett", healthPoints: 140, attackPower: 10, counterAttackPower: 15, headshot:"bobaHead.jpg"},
	{id: "vader", name: "Darth Vader", healthPoints: 150, attackPower: 12, counterAttackPower: 20, headshot:"vaderHead.jpg"}
]

// number of opponents is the total number of characters, minus one player character
var numberOpponents = characters.length - 1;

// attack button is initially hidden
$ ("#attackButton").hide();


// declare functions
function createCharacter(item, targetArea) {

	// This function creates a div for a character, with an image and statistics.

	// variables
	var imageSource = imagePath + item.headshot;				// this is the path of the image for the character
	var healthID = item.id + "Health";							// the id for the character with "Health" on the end becomes the id for healthPointsSpan 

	// create div for the character
	var characterContainer	= $("<div>");

		// All character divs have a class of "gameCharacter".
		characterContainer.attr("class", "gameCharacter");	

		// the properties for the div are the properties retrieved from the character object	
		characterContainer.attr("id", item.id);					
		characterContainer.attr("healthPoints", item.healthPoints);
		characterContainer.attr("attackPower", item.attackPower);
		characterContainer.attr("counterAttackPower", item.counterAttackPower);

		// add the character's name to the div as text
		characterContainer.text(item.name);

		// add image to character div
		var characterImage = $("<img>");
			characterImage.attr("class", "headshot");			// the image for the character has the class of "headshot"
			characterImage.attr("src", imageSource);			// imageSource is the image path that is calculated at the beginning of this function
			characterImage.attr("alt", item.name);

		$ (characterContainer).append(characterImage);


		// add a span to the character div to show health points 
		var healthPointsSpan = $("<span>");
			healthPointsSpan.attr("id", healthID);

		healthPointsSpan.text(item.healthPoints);

		$ (characterContainer).append("Health Points: ");
		$ (characterContainer).append(healthPointsSpan);

	// display the character div in the specified area of the page
	$ (targetArea).append(characterContainer);

} //end of createCharacter function


function gameOver(message) {

	// this function prevents the user from clicking anything but the restart button

	// hide the attack button
	$ ("#attackButton").hide();

	// set playerSelected and defenderSelected to true to prevent characters being clicked
	playerSelected = true;
	defenderSelected = true;

	// change player instructions based on the message passed to this function as an argument
	$ ("#message_area").html(message);	

} //end of gameOver function



// run the following after the document has loaded
$(document).ready(function(){

	// place character images in character area
	for (var i = 0; i < characters.length; i++) {
		createCharacter(characters[i], character_area);
	}

	// click on a character
	$(".gameCharacter").on("click", function() {

		// if no player character has been selected, choose this character as the player
		if (playerSelected == false) {

			// identify the current id of the character selected, and the span where the character's health is shown
			characterID = "#" + $ (this).attr("id");
			healthID = characterID + "Health";

			// change the class of the character that has been clicked to "player" and the id to "player"
			$ (characterID).attr("class", "player");
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
			$ ("#message_area").html("<p>Choose your first opponent ...</p>");

		}

		else if (defenderSelected == false) {

			// identify the current id of the character selected, and the span where the character's health is shown
			characterID = "#" + $ (this).attr("id");
			healthID = characterID + "Health";

			// change the class of the character that has been clicked to "defender" and the id to "defender"
			$ (characterID).attr("class", "defender");
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
			$ ("#message_area").html("<p>Click the attack button...</p>");

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
			$ ("#attack_messages").html("<p>You attacked for " + attackDamage + " damage.</p>");			
			$ ("#attack_messages").append("<p>Defender counter-attacked for " + counterAttackDamage + " damage.</p>");

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
				$ ("#message_area").html("<p>You are victorious!</p><p>Choose a new opponent...</p>");
			}


			// if all opponents have been defeated...
			if (numberOpponents === 0) {

				// call the gameOver function
				gameOver("<p>You have defeated all of your opponents!</p><p>Click 'Restart' to try again...<p>");
			}


			// if player health reaches zero...
			if (playerHealth <= 0) {

				// call the gameOver function
				gameOver("<p>You have been defeated.</p><p>Click 'Restart' to try again...</p>");
			}

			attackNumber += 1; // increments the strength of the player's attack
		}

	}); // end of attack button click


	// click on restart button
	$("#restartButton").on("click", function() {

		location.reload();

	}); // end of restart button click

}); // end of document.ready