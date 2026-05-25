import { describe, it, expect } from 'vitest';
import { taskA, taskB, calculate } from './lr4';
describe('taskA', () => {
  // Проверка длины массива
  it('возвращает массив правильной длины', () => {
    const a = 7.2, b = 4.2, xStart = 1.81, xEnd = 5.31, deltax = 0.7;
    const result = taskA(a, b, xStart, xEnd, deltax);
    const dlina = Math.floor((xEnd - xStart) / deltax) + 1;
    expect(result).toHaveLength(dlina);
  });
  // Сравнение с прямым вызовом calculate для каждого x
  it('значения совпадают с поэлементным расчётом через calculate', () => {
    const a = 7.2, b = 4.2, xStart = 1.81, xEnd = 5.31, deltax = 0.7;
    const result = taskA(a, b, xStart, xEnd, deltax);
    const expected = [];
    for (let x = xStart; x <= xEnd + deltax / 2; x += deltax) {
      expected.push(calculate(a, b, x));
    }
    for (let i = 0; i < result.length; i++) {
      expect(result[i]).toBeCloseTo(expected[i], 5);
    }
  });
  // Пример с другими параметрами
  it('a=2.5, b=4.6, сетка x: 1.15,1.53,1.91,2.29,2.67,3.05 (шаг 0.38)', () => {
    const a = 2.5, b = 4.6, xStart = 1.15, xEnd = 3.05, deltax = 0.38;
    const result = taskA(a, b, xStart, xEnd, deltax);
    const expected = [];
    for (let x = xStart; x <= xEnd + deltax ; x += deltax) {
      expected.push(calculate(a, b, x));
    }
    for (let i = 0; i < result.length; i++) {
      expect(result[i]).toBeCloseTo(expected[i], 5);
    }
  });
});
describe('taskB', () => {
  // Проверка на заранее заданном массиве x
  it('значения для a=7.2, b=4.2 и x = [2.4,2.8,3.9,4.7,3.16]', () => {
    const a = 7.2, b = 4.2;
    const xValues = [2.4, 2.8, 3.9, 4.7, 3.16];
    const result = taskB(a, b, xValues);
    const expected = xValues.map(x => calculate(a, b, x));
    for (let i = 0; i < result.length; i++) {
      expect(result[i]).toBeCloseTo(expected[i], 5);
    }
  });
  // Пример с другими параметрами
  it('a=1.5, b=2.6, x = [1.28,1.45,1.71,1.93,2.25]', () => {
    const a = 2.5, b = 4.6;
    const xValues = [1.20, 1.36, 1.57, 1.93, 2.25];
    const result = taskB(a, b, xValues);
    const expected = xValues.map(x => calculate(a, b, x));
    for (let i = 0; i < result.length; i++) {
      expect(result[i]).toBeCloseTo(expected[i], 5);
    }
  });
});