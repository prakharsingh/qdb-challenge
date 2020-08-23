import validateResponse from './validate-response';
import { INVALID_RESPONSE } from './error-definitions';

describe('validaeResponse', () => {
  it('SHOULD return response when status 200', () => {
    const FAKE_RESPONSE: Response = { status: 200 } as Response;
    expect(validateResponse(FAKE_RESPONSE)).toEqual(FAKE_RESPONSE);
  });

  it('SHOULD throw INVALID_RESPONSE by default', () => {
    expect(() => validateResponse({ status: 500 } as Response)).toThrowError(
      INVALID_RESPONSE
    );
  });
});
