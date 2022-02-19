import { testFunction } from '../index';

describe('app', () => {
  it('should return true', () => {
    const sut = testFunction();
    expect(sut).toBe(true);
  });
});
