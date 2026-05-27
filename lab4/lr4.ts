export function calculate(a: number, b: number, x: number): number {
    const verh: number = Math.abs(a - b * x);
    const niz: number = Math.pow(Math.log10(x), 2);
    return Math.sqrt(verh / niz);
}
export function taskA(a: number, b: number, xStart: number, xEnd: number, deltax: number): number[] {
    console.log("\nзадание А")
    let resA: number[] = [];
    for ( let i = xStart; i <= xEnd + deltax; i += deltax) {
        resA.push(calculate(a, b, i));
    }
    return resA;
}
export function taskB(a: number, b: number, x: number[]): number[] {
    console.log("\nзадание B")
    let resB: number[] = [];
    for ( let i = 0; i < x.length; i++) {
        resB.push(calculate(a, b, x[i]));
    }
    return resB;
}
let testB: number[] = [2.4, 2.8, 3.9, 4.7, 3.16];
console.log(taskA(7.2, 4.2, 1.81, 5.31, 0.7));
console.log(taskB(7.2, 4.2, testB));
