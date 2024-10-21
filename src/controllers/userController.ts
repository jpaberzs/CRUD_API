import { IncomingMessage, ServerResponse } from 'http';
import { POST, GET, PUT, DELETE } from './requests';
import { response } from '../utils/response';

interface Props {
  req: IncomingMessage;
  res: ServerResponse;
}

export const userController = async ({ req, res }: Props) => {
  const urlParts = req.url?.split('/');
  const method = req.method;

  const id = urlParts ? urlParts[3] : null;

  switch (method) {
    case 'POST':
      POST({ req, res });
      break;
    case 'GET':
      GET({ res, id });
      break;
    case 'PUT':
      PUT({ req, res, id });
      break;
    case 'DELETE':
      DELETE({ res, id });
      break;
    default:
      response(res, 405, { message: 'Method not allowed' });
      break;
  }
};
