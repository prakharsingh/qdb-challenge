import handleError from './handle-error';
import { NETWORK_ERROR } from './error-definitions';

describe('handleError', () => {
  it('SHOULD throw Network Error by default', () => {
    expect(() => handleError()).toThrowError(NETWORK_ERROR);
  });

  it('SHOULD throw Error if passed in argument', () => {
    const message = 'fake error';
    const error = new Error(message);
    expect(() => handleError(error)).toThrowError(message);
  });
});
