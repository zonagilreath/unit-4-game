class Hero {
    constructor(name, health, base_attack) {
        this.name = name;
        this.health = health;
        this.base_attack = base_attack;
        this.attack_power = base_attack;
        this.isPlayer = false;
        this.isDefending = false;
        this.isDead = false;
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

// game {

// }


goku = new Hero("Goku", 100, 10);
vegeta = new Hero("Vegeta", 120, 12);

const a = [new Hero("Goku", 100, 10), new Hero("Vegeta", 120, 12)];

console.log(a);
