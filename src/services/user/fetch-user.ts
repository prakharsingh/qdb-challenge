import validateResponse from '../validate-response';
import errorHandler from '../handle-error';
import { DEFAULT_OPTIONS } from '../config';

const API_URL = `${process.env.REACT_APP_BASE_URL}/users/1`;

const fetchApi = (options: object) =>
  fetch(API_URL, { method: 'GET', ...DEFAULT_OPTIONS, ...options })
    .then(validateResponse)
    .catch(errorHandler);

export default (options: object) =>
  fetchApi(options).then((response: Response) => response.json());
