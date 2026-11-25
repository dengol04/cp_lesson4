import { Term } from "../src/term.js";

test('4*x^3, x', () => {
    const term = new Term(4, "x", 3);
    const res = term.diff("x");
    expect(res.to_string()).toBe("12*x^2");
});


test('4*x^3, y', () => {
    const term = new Term(4, "x", 3);
    const res = term.diff("y");
    expect(res.to_string()).toBe("0");
});

test('5*x, x', () => {
    const term = new Term(5, "x", 1);
    const res = term.diff("x");
    expect(res.to_string()).toBe("5");
});

test('x^2, x', () => {
    const term = new Term(1, "x", 2);
    const res = term.diff("x");
    expect(res.to_string()).toBe("2*x");
});

test('-3*x^4, x', () => {
    const term = new Term(-3, "x", 4);
    const res = term.diff("x");
    expect(res.to_string()).toBe("-12*x^3");
});

test('-x, x', () => {
    const term = new Term(-1, "x", 1);
    const res = term.diff("x");
    expect(res.to_string()).toBe("-1");
});