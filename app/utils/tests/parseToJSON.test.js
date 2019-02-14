/**
 * Parse inmutable object to JSON
 */

import parseToJSON from '../parseToJSON';

describe('parseToJSON', () => {
  const state = {
    one: 'one',
    two: 'two',
  };

  beforeEach(() => {});

  it('should not throw if passed valid inmutable', () => {
    expect(() => parseToJSON(state)).not.toThrow();
    expect(() => parseToJSON(null)).not.toThrow();
  });

  it('should throw if passed invalid inmutable', () => {
    expect(() => parseToJSON(true)).toThrow();
  });
});
