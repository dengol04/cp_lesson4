import { MiniMaple } from "../src/miniMaple.js";

test('4*x^3, x', () => {
    let res = MiniMaple.diff("4*x^3", "x");
    expect(res).toBe("12*x^2");
});

test('4*x^3, y', () => {
    let res = MiniMaple.diff("4*x^3", "y");
    expect(res).toBe("0");
});

test('4*x^3-x^2, x', () => {
    let res = MiniMaple.diff("4*x^3-x^2", "x");
    expect(res).toBe("12*x^2-2*x");
});

test('5*x, x', () => {
    let res = MiniMaple.diff("5*x", "x");
    expect(res).toBe("5");
});

test('x^2, x', () => {
    let res = MiniMaple.diff("x^2", "x");
    expect(res).toBe("2*x");
});

test('-3*x^4, x', () => {
    let res = MiniMaple.diff("-3*x^4", "x");
    expect(res).toBe("-12*x^3");
});

test('2*x^3+5*x^2-7*x, x', () => {
    let res = MiniMaple.diff("2*x^3+5*x^2-7*x", "x");
    expect(res).toBe("6*x^2+10*x-7");
});

test('2*x^3+3*y^2, x', () => {
    let res = MiniMaple.diff("2*x^3+3*y^2", "x");
    expect(res).toBe("6*x^2");
});

test('2*x^3+3*y^2, y', () => {
    let res = MiniMaple.diff("2*x^3+3*y^2", "y");
    expect(res).toBe("6*y");
});

test('5*y^3, x', () => {
    let res = MiniMaple.diff("5*y^3", "x");
    expect(res).toBe("0");
});

test('3*alpha^2, alpha', () => {
    let res = MiniMaple.diff("3*alpha^2", "alpha");
    expect(res).toBe("6*alpha");
});

test('x^-2, x', () => {
    let res = MiniMaple.diff("x^-2", "x");
    expect(res).toBe("-2*x^-3");
});

test('4*x^3+5*y^2, x', () => {
    let res = MiniMaple.diff("4*x^3+5*y^2", "x");
    expect(res).toBe("12*x^2");
});

test('5*y^3+2*y, x', () => {
    let res = MiniMaple.diff("5*y^3+2*y", "x");
    expect(res).toBe("0");
});

test('-4*x^3-2*x^2, x', () => {
    let res = MiniMaple.diff("-4*x^3-2*x^2", "x");
    expect(res).toBe("-12*x^2-4*x");
});