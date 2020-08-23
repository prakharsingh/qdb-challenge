import { INVALID_RESPONSE } from './error-definitions';

const isValidResponse = (res: Response) =>
  res.status >= 200 && res.status < 300;

export default (res: Response): Response => {
  if (isValidResponse(res)) return res;
  throw INVALID_RESPONSE;
};
