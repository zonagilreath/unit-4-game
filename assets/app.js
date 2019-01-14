class Hero {
    constructor(name, health, base_attack) {
        this.name = name;
        this.health = health;
        this.base_attack = base_attack;
        this.attack_power = base_attack;
        // this.isPlayer = false;
        // this.isDefending = false;
        this.isDead = false;
        this.card = $("#" + this.name);
        this.image = "assets/images/" + this.name + ".jpg";
    }

    power_up(){
        this.attack_power += this.base_attack;
    }

    attack(opponent){
        opponent.health -= this.attack_power;        
    }

    checkDead(){
        if(this.health <= 0){
            this.isDead = true;
        }
        return this.isDead;
    }
}


const game = {

    characters : {
        goku : new Hero("Goku", 100, 10),
        vegeta : new Hero("Vegeta", 120, 12),
        trunks : new Hero("Trunks", 120, 12),
        android18 : new Hero("Android-18", 120, 12)
    },

    needPlayer : true,
    needDefender: true,

    initGame : function(){

        game.needPlayer = true;
        game.needDefender = true;

        for (let character of game.characters){
            character.card.on("click", function(character){
                if (game.needPlayer){
                    game.addPlayer(character);
                    game.moveEnemies();
                }else if (game.needDefender){
                    game.addDefender(character);
                }
            });
        }

        $("#attackButton").on("click", function(){
            if (!game.needPlayer & !game.needDefender){
                game.round();
            }
        });
    },

    addPlayer : function(character){
        character.card.addClass("player");
        // character.card.removeClass("in-lobby");
        $("#lobby").remove(character.card);
        $("#player-area").append(character.card);
        game.player = character;
    },

    moveEnemies : function(){
        for (let character of game.characters){
            if (game.player != character){
                character.card.addClass("enemy");
                $("#lobby").remove(character.card);
                // character.card.removeClass("in-lobby");
                $("#enemy-area").append(character.card);
            }
        }
    },

    addDefender : function(character){
        this.addClass("defender");
        game.defender = character;
        $("#lobby").remove(character.card);
        // character.card.removeClass("in-lobby");
        $("#enemyArea").append(character.card);
    },

    round : function(){
        game.player.attack(defender);
        game.player.power_up();
        game.defender.attack(player);
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
        game.defender = none;
        needDefender = true;
    },

    loseGame : function(){

    },

    winGame : function(){

    },

    resetGame : function(){
        for (let character of game.characters){
            character.card.off("click");
        }

        $("#attackButton").off("click");
    }

}


goku = new Hero("Goku", 100, 10);
vegeta = new Hero("Vegeta", 120, 12);
