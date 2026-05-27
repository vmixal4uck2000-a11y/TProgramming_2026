import {HERO, who_i_am} from './hero';
let NAMES: string[] = [
    "Артур", "Эльдар", "Гена", "Виталя", "Лёша", "Лёня",
    "Максим", "Торинбек", "Ара", "Герасим", "Фродо (Федя)", "Боря"
];

function randomRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItem(arr: any[]): any {
    return arr[Math.floor(Math.random() * arr.length)];
}
function generateRandomHero(): HERO {
    let name = randomItem(NAMES);
    let hp = randomRange(50, 150);
    let str = randomRange(5, 20);
    let type = randomItem(["Рыцарь", "Лучник", "Маг"]);
    return who_i_am(type, name, hp, str);
}
export function generateHeroes(count: number): HERO[] {
    if (count % 2 !== 0) {
        throw new Error("Количество героев должно быть чётным");
    }
    let heroes: HERO[] = [];
    for (let i = 0; i < count; i++) {
        heroes.push(generateRandomHero());
    }
    return heroes;
}
export function BOY(hero1: HERO, hero2: HERO) {
    console.log(`\nНАЧАЛСЯ БОЙ: ${hero1.get_name()} (${hero1.get_klass()}) vs ${hero2.get_name()} (${hero2.get_klass()})`);
    
    let current = hero1;
    let opponent = hero2;

    if (Math.random() < 0.5) {
        current = hero2;
        opponent = hero1;
        console.log(`${current.get_name()} начинает.`);
    }

    while (hero1.sdoh() && hero2.sdoh()) {
        current.hod(opponent, 0.3);
        if (!opponent.sdoh()) {
            console.log(`${opponent.get_name()} отправляется в лучший мир`);
            break;
        }
        let temp = current;
        current = opponent;
        opponent = temp;
    }

    let winner = hero1.sdoh() ? hero1 : hero2;
    console.log(`Победил: ${winner.get_name()} (${winner.get_klass()})\n`);
    return winner;
}

export function runRound(players: HERO[]): HERO[] {
    let winners: HERO[] = [];
    let shuffled = players.slice();
    
    for (let i = shuffled.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
    }

    let i = 0;
    while (i + 1 < shuffled.length) {
        let winner = BOY(shuffled[i], shuffled[i + 1]);
        winners.push(winner);
        i += 2;
    }
    if (i < shuffled.length) {
        console.log(`   ${shuffled[i].get_name()} проходит в следующий раунд не сражаясь`);
        winners.push(shuffled[i]);
    }
    return winners;
}

class Game {
    private heroes: HERO[];

    constructor(heroes: HERO[]) { this.heroes = heroes; }

    start(): void {
        console.log("=== НАЧАЛО ТУРНИРА ===");
        let round = 1;
        let currentPlayers = this.heroes.slice();

        while (currentPlayers.length > 1) {
            console.log(`\n===== РАУНД ${round} =====`);
            currentPlayers = runRound(currentPlayers);
            round++;
        }

        let champ = currentPlayers[0];
        console.log(`\nПОБЕДИЛ: ${champ.get_name()} (${champ.get_klass()})`);
    }
}


// Начало игры
let heroes = generateHeroes(6);
console.log("\n--- СОЗДАННЫЕ ГЕРОИ ---");
for (let i = 0; i < heroes.length; i++) {
    let h = heroes[i];
    console.log(`${h.get_name()} (${h.get_klass()}) | здоровье: ${h.get_hp()} | сила: ${h.get_str()}`);
}
let game = new Game(heroes);
game.start();