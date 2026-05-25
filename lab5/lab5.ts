export class Dish {
    name: string;
    price: number;
    weight: number;

    constructor(name: string, price: number, weight: number) {
        this.name = name;
        this.price = price;
        this.weight = weight; 
}
    static cont(name: string, price: number, weight: number): Dish{
        return new Dish(name, price, weight);
    } 
    getInfo(): string{
        return `Блюдо ${this.name} имеет вес ${this.weight} и стоит ${this.price}`;
    }
    stat(other: Dish): string {
        if (this.price < other.price) {
            return `Блюдо ${this.name} дешевле блюда ${other.name} на ${other.price - this.price}`;
        }
        else if (this.price > other.price) {
            return `Блюдо ${other.name} дешевле блюда ${this.name} на ${this.price - other.price}`;
        }
        else {
            return `Цены блюд равны`;
        }
    }
    nehvat(porciya: number): number{
        let a: number;
        if(porciya > 1) {
            a = this.price * porciya * (1 - porciya / 100);
            console.log (`${porciya} порций блюда ${this.name} будут стоить ${a}`);
            return  a;
        }
        else {
            a = this.price;
            console.log (`${porciya} порций блюда ${this.name} будут стоить ${a}`);
            return a;
        }
    }

}
let Dish1 = Dish.cont("Стейк", 1500, 400);
let Dish2 = Dish.cont("Шаверма", 500, 250);
let Dish3 = Dish.cont("Шашлык", 1400, 800);

Dish1.nehvat(2);
Dish1.nehvat(1);
Dish1.nehvat(3);
console.log ("")

console.log (Dish1.getInfo());
console.log (Dish2.getInfo());
console.log (Dish3.getInfo());
console.log ("")

console.log (Dish1.stat(Dish2));
console.log (Dish2.stat(Dish3));
console.log ("")