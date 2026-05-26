import { describe, it, expect } from 'vitest';
import { HERO, SER_RITSAR, LUCHNIK, MAGA, who_i_am } from './hero';
import { BOY, runRound, generateHeroes } from './game';
describe("Базовый класс HERO", () => {
    it("takeDamage уменьшает здоровье, не ниже 0", () => {
        const h = new SER_RITSAR(100, 10, "Тест");
        h.take_uron(30);
        expect(h.get_hp()).toBe(70);
        h.take_uron(100);
        expect(h.get_hp()).toBe(0);
        expect(h.sdoh()).toBe(false);
    });
});
describe("SER_RITSAR", () => {
    it("Удар возмездия наносит 130% от силы", () => {
        const knight = new SER_RITSAR(100, 20, "Артур");
        const target = new SER_RITSAR(100, 10, "Цель");
        knight.skill(target);
        expect(target.get_hp()).toBe(74);
    });
});
describe("Лучник LUCHNIK", () => {
    it("Огненные стрелы применяются один раз и не наносят урона", () => {
        const archer = new LUCHNIK(100, 10, "Леголас");
        const target = new SER_RITSAR(100, 10, "Цель");
        archer.skill(target);
        expect(target.get_hp()).toBe(100);
        target.gorit();
        expect(target.get_hp()).toBe(98);
        archer.skill(target);
        expect(target.get_hp()).toBe(88);
    });
});
describe("Бой BOY", () => {
    it("123 побеждает 321", () => {
        const strong = new SER_RITSAR(100, 50, "123");
        const weak = new SER_RITSAR(30, 1, "321");
        const winner = BOY(strong, weak);
        expect(winner).toBe(strong);
        expect(weak.sdoh()).toBe(false);
        expect(strong.sdoh()).toBe(true);
    });
});
describe("Раунд runRound", () => {
    it("при нечётном числе игроков один проходит без боя", () => {
        const players = [
            new SER_RITSAR(100, 10, "ert"),
            new SER_RITSAR(100, 10, "xcv"),
            new SER_RITSAR(100, 10, "tgb")
        ];
        const winners = runRound(players);
        expect(winners.length).toBe(2);
        winners.forEach(w => expect(w.sdoh()).toBe(true));
    });
});