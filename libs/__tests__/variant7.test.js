import {
    toEngineering,
    acosh,
    asinh,
    atanh,
    cosh,
    sinh,
    tanh,
    copysign,
    roundDigits
} from '../variant7';


describe('roundDigits', () => {
    test('returns the same coefficients, exponent, and sign if precision is not provided', () => {
        const input = { coefficients: [1, 2, 3, 4], exponent: 2, sign: '' };
        const result = roundDigits(input);
        expect(result).toEqual(input);
    });

    test('returns the same coefficients, exponent, and sign if precision >= coefficients.length', () => {
        const input = { coefficients: [1, 2, 3], exponent: 2, sign: '' };
        const result = roundDigits(input, 5);
        expect(result).toEqual(input);
    });

    test('rounds coefficients to the specified precision', () => {
        const input = { coefficients: [1, 2, 3, 4, 5], exponent: 2, sign: '' };
        const result = roundDigits(input, 3);
        expect(result).toEqual({
            coefficients: [1, 2, 3],
            exponent: 4,
            sign: '',
        });
    });

    test('adjusts the exponent when coefficients are shortened', () => {
        const input = { coefficients: [9, 9, 9], exponent: 3, sign: '' };
        const result = roundDigits(input, 2);
        expect(result).toEqual({
            coefficients: [1, 0], // Rounded from 999 to 100
            exponent: 4, // Exponent increased by 1
            sign: '',
        });
    });

    test('handles negative numbers by preserving the sign', () => {
        const input = { coefficients: [4, 5, 6, 7], exponent: -1, sign: '-' };
        const result = roundDigits(input, 2);
        expect(result).toEqual({
            coefficients: [4, 6], // Rounded from 4567 to 46
            exponent: 1,
            sign: '-',
        });
    });

    test('returns correct result for a single-digit coefficient', () => {
        const input = { coefficients: [5], exponent: 3, sign: '' };
        const result = roundDigits(input, 1);
        expect(result).toEqual({
            coefficients: [5],
            exponent: 3,
            sign: '',
        });
    });

    test('handles edge case of rounding up to a new magnitude', () => {
        const input = { coefficients: [9, 9, 9], exponent: 0, sign: '' };
        const result = roundDigits(input, 1);
        expect(result).toEqual({
            coefficients: [1],
            exponent: 2,
            sign: '',
        });
    });
});


describe('toEngineering', () => {
    test('handles simple numbers correctly without precision', () => {
        expect(toEngineering(123)).toBe('123e+0');
        expect(toEngineering(123456)).toBe('123.456e+3');
        expect(toEngineering(0.00123)).toBe('1.23e-3');
    });

    test('handles simple numbers with precision', () => {
        expect(toEngineering(123.456, 4)).toBe('12.35e+3');
        expect(toEngineering(0.00123456, 2)).toBe('12e+0');
        expect(toEngineering(1230000, 5)).toBe('1.23e+6');
    });

    test('returns NaN, Infinity, and -Infinity as strings', () => {
        expect(toEngineering(NaN)).toBe('NaN');
        expect(toEngineering(Infinity)).toBe('Infinity');
        expect(toEngineering(-Infinity)).toBe('-Infinity');
    });

    test('handles zero and negative numbers correctly', () => {
        expect(toEngineering(0)).toBe('0e+0');
        expect(toEngineering(-12345)).toBe('-12.345e+3');
    });
});

describe('acosh', () => {
    test('calculates hyperbolic arccos correctly', () => {
        expect(acosh(1)).toBeCloseTo(0);
        expect(acosh(10)).toBeCloseTo(2.9932228);
    });
});

describe('asinh', () => {
    test('calculates hyperbolic arcsine correctly', () => {
        expect(asinh(0)).toBeCloseTo(0);
        expect(asinh(10)).toBeCloseTo(2.99822295);
        expect(asinh(-10)).toBeCloseTo(-2.99822295);
    });
});

describe('atanh', () => {
    test('calculates hyperbolic arctangent correctly', () => {
        expect(atanh(0)).toBeCloseTo(0);
        expect(atanh(0.5)).toBeCloseTo(0.54930614);
        expect(atanh(-0.5)).toBeCloseTo(-0.54930614);
    });
});

describe('cosh', () => {
    test('calculates hyperbolic cosine correctly', () => {
        expect(cosh(0)).toBeCloseTo(1);
        expect(cosh(2)).toBeCloseTo(3.7621957);
        expect(cosh(-2)).toBeCloseTo(3.7621957);
    });
});

describe('sinh', () => {
    test('calculates hyperbolic sine correctly', () => {
        expect(sinh(0)).toBeCloseTo(0);
        expect(sinh(2)).toBeCloseTo(3.6268604);
        expect(sinh(-2)).toBeCloseTo(-3.6268604);
    });
});

describe('tanh', () => {
    test('calculates hyperbolic tangent correctly', () => {
        expect(tanh(0)).toBeCloseTo(0);
        expect(tanh(2)).toBeCloseTo(0.96402758);
        expect(tanh(-2)).toBeCloseTo(-0.96402758);
    });
});

describe('copysign', () => {
    test('returns a number with the magnitude of x and the sign of y', () => {
        expect(copysign(5, -3)).toBe(-5);
        expect(copysign(-5, 3)).toBe(5);
        expect(Object.is(copysign(0, -3), -0)).toBe(true); // Check for -0
        expect(Object.is(copysign(0, 3), 0)).toBe(true);   // Check for +0
    });

});
