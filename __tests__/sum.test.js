const sum = require('./sum');

describe('test-suit-sum', () => {
  test('A adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });

  test('B adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(2);
  });

  test('C adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });

})