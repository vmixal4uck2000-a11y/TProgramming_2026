// lab5.test.ts
import { describe, expect, it } from "vitest";
import { Dish } from "./lab5";
describe("Тесты для структуры Dish", () => {
  it("фабричный метод cont создаёт корректный объект", () => {
    const dish = Dish.cont("Пицца", 800, 500);
    expect(dish.name).toBe("Пицца");
    expect(dish.price).toBe(800);
    expect(dish.weight).toBe(500);
  });
  it("метод getInfo возвращает строку с данными блюда", () => {
    const dish = Dish.cont("Салат", 250, 150);
    const info = dish.getInfo();
    expect(info).toContain("Салат");
    expect(info).toContain("вес 150");
    expect(info).toContain("стоит 250");
  });
  it("метод stat корректно сравнивает цены", () => {
    const cheap = Dish.cont("Суп", 100, 300);
    const expensive = Dish.cont("Стейк", 500, 400);
    const equal1 = Dish.cont("Блюдо A", 300, 200);
    const equal2 = Dish.cont("Блюдо B", 300, 250);
    expect(cheap.stat(expensive)).toBe("Блюдо Суп дешевле блюда Стейк на 400");
    // expensive дороже cheap – результат должен быть симметричным
    expect(expensive.stat(cheap)).toBe("Блюдо Суп дешевле блюда Стейк на 400");
    expect(equal1.stat(equal2)).toBe("Цены блюд равны");
  });
  it("метод nehvat рассчитывает стоимость для одной и нескольких порций", () => {
    const dish = Dish.cont("Паста", 200, 350);
    expect(dish.nehvat(1)).toBe(200);
    expect(dish.nehvat(2)).toBe(392);
    expect(dish.nehvat(3)).toBe(582);
  });
});
