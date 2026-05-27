export class HERO {
    private _hp: number;
    private _name: string;
    private _str: number;
    private _klass: string;
    _gorit: boolean = false;
    _stan: boolean = false;

    constructor(hp : number, name: string, str: number, klass: string) {
        this._name = name;
        this._hp = hp;
        this._str = str;
        this._klass = klass;
    }
    get_hp(): number{
        return this._hp;
    }
    get_name(): string{
        return this._name;
    }
    get_str(): number{
        return this._str;
    }
    get_klass(): string{
        return this._klass;
    }
    take_uron(uron: number): void{
        this._hp -= uron;
        if (this._hp < 0) this._hp = 0;
    }
    ataka(vrag: HERO, uron: number): void{
        vrag.take_uron(uron);
    }
    skill(vrag: HERO): void{
        vrag.take_uron(this._str);
    }
    gorit(): void{

        if(this._gorit = true){
            this._hp -= 2;
            console.log(`${this.get_name()} горит и получает 2 урона`);
        }
    }
    sdoh(): boolean {
        return this._hp > 0; 
    }
    hod(vrag: HERO, shans: number): void{
        if(!this.sdoh()) {
            console.log(`${this.get_name()} отправляется в лучший мир`);
            return;
        }
        if(this._gorit){
            this.gorit();
        }
        if(this._stan){
            this._stan = false;
            console.log(`${this.get_name()} пропускает ход`);
            return;
        }
        
        if(Math.random() < shans) {
            this.skill(vrag);
        }
        else{
            this.ataka(vrag, this._str);
            console.log(`${this.get_name()}(${this.get_klass()}) ударил на ${this._str}`);
        }

    }
    
}
export class SER_RITSAR extends HERO {
    constructor(hp: number, str: number, name: string) {
        super(hp, name, str, "Рыцарь");
    }
    skill(vrag: HERO): void {
        this.ataka(vrag, this.get_str() * 1.3);
        console.log(`${this.get_name()}(${this.get_klass()}) использует Удар возмездия`);
    }
}
export class LUCHNIK extends HERO {
    used_fire: boolean = false;
    constructor(hp: number, str: number, name: string) {
        super(hp, name, str, "Лучник");
    }
   
    skill(vrag: HERO): void {
        if(!this.used_fire) {
            this.used_fire = true;
            vrag._gorit = true;
        
            console.log(`${this.get_name()}(${this.get_klass()}) использует Огненную стрелу`);
        }
        else {
            this.ataka(vrag, this.get_str())
        }
    }
}
export class MAGA extends HERO {
    constructor(hp: number, str: number, name: string) {
        super(hp, name, str, "Маг");
    }
    skill(vrag: HERO): void {
        vrag._stan = true;
        console.log(`${this.get_name()}(${this.get_klass()}) использует Заворожение`);
    }
}
export function who_i_am(type: string, name: string, hp: number, strength: number): HERO {
    if (type === "Рыцарь") return new SER_RITSAR(hp, strength, name);
    if (type === "Лучник") return new LUCHNIK(hp, strength, name);
    if (type === "Маг") return new MAGA(hp, strength, name);
    throw new Error("Неизвестный тип героя");
}