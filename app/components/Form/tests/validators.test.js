import { required, email } from '../validators';

describe('validators', () => {
  describe('required', () => {
    it('should fail if no value', () => {
      expect(required(null)).toBeFalsy();
    });
    it('should fail if empty value', () => {
      expect(required('')).toBeFalsy();
    });
    it('should pass if any value', () => {
      expect(required('a')).toBeTruthy();
    });
  });
  describe('email', () => {
    const valuestToFail = [null, '', 'a', '@b', 'a@', 'a@.es'];
    for (const testValue of valuestToFail) { // eslint-disable-line
      it(`should fail for value [${testValue}]`, () => {
        expect(email(testValue)).toBeFalsy();
      });
    }
    const valuestToPass = ['a@b.com', 'a@b.es'];
    for (const testValue of valuestToPass) { // eslint-disable-line
      it(`should pass for value [${testValue}]`, () => {
        expect(email(testValue)).toBeTruthy();
      });
    }
  });
});
