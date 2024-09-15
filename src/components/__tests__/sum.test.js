import { sum } from "../sum";

test('sum function should calculate sum of two numbers', () => {
 
    const result = sum(4,4);

    // Assertion
    expect(result).toBe(8);
  
})
