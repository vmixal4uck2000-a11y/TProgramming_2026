function calculate(a: number, b: number, x: number): number {
    const verh: number = Math.abs(a - b * x);
    const niz: number = Math.pow(Math.log10(x), 2);
    return Math.sqrt(verh / niz);
}

function taskA(a: number, b: number, xStart: number, xEnd: number, deltax: number): void {
    console.log("\nзадание А")
    console.log(calculate(a, b, xStart));
    console.log(calculate(a, b, xStart + deltax));
    console.log(calculate(a, b, xStart + deltax * 2));
    console.log(calculate(a, b, xStart + deltax * 3));
    console.log(calculate(a, b, xStart + deltax * 4));
    console.log(calculate(a, b, xEnd));
}

function taskB(a: number, b: number, x1: number, x2: number, x3: number, x4: number, x5: number): void {
    console.log("\nзадание B")
    console.log(calculate(a, b, x1));
    console.log(calculate(a, b, x2));
    console.log(calculate(a, b, x3));
    console.log(calculate(a, b, x4));
    console.log(calculate(a, b, x5));
}



taskA(7.2, 4.2, 1.81, 5.31, 0.7);
taskB(7.2, 4.2, 2.4, 2.8, 3.9, 4.7, 3.16);
