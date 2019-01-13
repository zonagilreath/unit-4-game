let needPlayer = true;
let needDefender = true;

class Hero {
    constructor(name, health, base_attack, image_url) {
        this.name = name;
        this.health = health;
        this.base_attack = base_attack;
        this.attack_power = base_attack;
        this.isPlayer = false;
        this.isDefending = false;
        this.isDead = false;
        this.card = $("#" + this.name);
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


const characters = {
    goku: new Hero("Goku", 100, 10),
    vegeta: new Hero("Vegeta", 120, 12),
    trunks: new Hero("Trunks", 120, 12),
    android18: new Hero("Android-18", 120, 12)
}


const game = {

    initGame : function(){

        for (let character of characters){
            character.card.on("click", function(character){
                if (game.needPlayer){
                    game.addPlayer(character);
                }else if (game.needDefender){
                    game.addDefender(character);
                }
            });
        }
        $("attackButton").on("click", function(){
            if (!game.needPlayer & !game.needDefender){
                game.round();
            }
        });
    },

    addPlayer : function(character){
        character.card.addClass("player");
        character.isPlayer = true;
        game.player = character;
    },

    addDefender : function(character){
        this.addClass("defender");
        character.isDefending = true;
        game.defender = character;
    },

    round : function(player, defender){
        player.attack(defender);
        player.power_up();
        defender.attack(player);
        game.checkBattleEnd();
    },

    checkBattleEnd : function(player, defender) {
        if (defender.checkDead()){
            game.battleWin();
        }
        if (player.checkDead()) {
            game.lose();
        }
    },

    battleWin : function(){
        game.defender.card.remove();
        game.defender = none;
        needDefender = true;
    },

    lose : function(){

    }

}


goku = new Hero("Goku", 100, 10);
vegeta = new Hero("Vegeta", 120, 12);

console.log(a);
