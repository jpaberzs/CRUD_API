import { IncomingMessage, ServerResponse } from 'http';
import { User } from '../models/user';
import { response as returnResponse } from '../utils/response';

export const parseBody = (
  req: IncomingMessage,
  res?: ServerResponse
): Promise<User> => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      let isJSON = false;
      try {
        try {
          JSON.parse(body);
          isJSON = true;
        } catch (e) {
          isJSON = false;
        }

        if (isJSON) {
          resolve(JSON.parse(body));
        } else {
          if (res) {
            returnResponse(res, 404, { message: 'Invalid JSON' });
          }
        }
      } catch (error) {
        reject(error);
      }
    });

    req.on('error', (err) => {
      reject(err);
    });
  });
};
