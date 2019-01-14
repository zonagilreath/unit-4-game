var audioPunch = document.createElement("audio");
audioPunch.setAttribute("src", "assets/Punch.mp3");

class Hero {
    constructor(name, health, base_attack) {
        this.name = name;
        this.health = health;
        this.base_attack = base_attack;
        this.attack_power = base_attack;
        this.isDead = false;
        
        let image_url = "assets/images/" + this.name + ".jpg";
        let card = $("<div>");
        card.addClass("card");
        card.addClass("col-3");
        card.append("<p class='name'>" + this.name + "</p");
        card.append("<img class='card-image' src='" + image_url + "'>");
        card.append("<p class='hp'>" + this.health + "</p>");
        card.appendTo("#lobby");

        this.card = card;

    }

    power_up(){
        this.attack_power += this.base_attack;
    }

    attack(opponent){
        opponent.health -= this.attack_power;
        if (opponent.health < 0){
            opponent.health = 0;
        }      
    }

    checkDead(){
        if(this.health <= 0){
            this.isDead = true;
        }
        return this.isDead;
    }

    
}


const game = {

    

    needPlayer : true,
    needDefender: true,

    initGame : function(){

        game.characters = [
            new Hero("Goku", 100, 10),
            new Hero("Vegeta", 120, 12),
            new Hero("Trunks", 120, 12),
            new Hero("Android-18", 120, 100)
        ]

        game.needPlayer = true;
        game.needDefender = true;
        game.addListeners();

        $("#message").empty();

        $("#attack-button").on("click", function(){
            if (!game.needPlayer & !game.needDefender){
                game.round();
                // audioPunch.play();
            }
        });
    },

    addListeners : function(){
        for (let i in game.characters){
            character = game.characters[i];
            character.card.on("click", function(){
                if (game.needPlayer){
                    game.addPlayer(game.characters[i]);
                    game.moveEnemies();
                }else if (game.needDefender){
                    game.addDefender(game.characters[i]);
                }
            });
        }
    },

    addPlayer : function(character){
        character.card.remove();
        $("#player-area").append(character.card);
        character.card.addClass("player");
        character.card.removeClass("col-3");
        character.card.addClass("col-10");
        game.addListeners();
        game.player = character;
        game.needPlayer = false;
    },

    moveEnemies : function(){
        for (let character of game.characters){
            if (game.player != character){
                character.card.addClass("enemy");
                character.card.remove();
                $("#enemy-area").append(character.card);
                game.addListeners();
            }
        }
    },

    addDefender : function(character){
        if (character != game.player){
            character.card.remove();
            $("#defender-area").append(character.card);
            character.card.addClass("defender");
            character.card.removeClass("col-3");
            character.card.addClass("col-10");
            game.defender = character;
            game.needDefender = false;
            game.addListeners();
        }
    },

    round : function(){
        game.player.attack(game.defender);
        game.player.power_up();
        game.defender.attack(game.player);
        game.player.card.find(".hp").text(game.player.health);
        game.defender.card.find(".hp").text(game.defender.health);
        game.checkBattleEnd();
    },

    checkBattleEnd : function() {
        if (game.defender.checkDead()){
            game.winBattle();
        }
        if (game.player.checkDead()) {
            game.loseGame();
        }
    },

    winBattle : function(){
        game.defender.card.remove();
        game.defender = null;
        game.needDefender = true;
        if (!($("#enemy-area").has("div"))){
            game.winGame();
        }
    },

    createButton : function(){
        let button = $("<button>");
        button.text("New Game");
        button.addClass("btn btn-dark btn-lg");
        button.attr('id', 'reset-button');
        button.on("click", function(){
            game.resetGame();
            game.initGame();
        })
        return button;
    },

    loseGame : function(){
        $("#attack-button").off("click");
        $("#message").append("<h2>You Lose!</h2>")
        $("#message").append(game.createButton());
    },

    winGame : function(){
        $("#attack-button").off("click");
        $("#message").append("<h2>You Win!</h2>")
        $("#message").append(game.createButton());
    },

    resetGame : function(){
        for (let character of game.characters){
            character.card.remove();
        }
        game.player = null;
        $("#reset-button").remove();
    }

}


// goku = new Hero("Goku", 100, 10);
// vegeta = new Hero("Vegeta", 120, 12);
game.initGame();