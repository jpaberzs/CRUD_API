import { IncomingMessage, ServerResponse } from 'http';
import { POST, GET, PUT, DELETE } from './requests';

interface Props {
  req: IncomingMessage;
  res: ServerResponse;
}

export const userController = async ({ req, res }: Props) => {
  const urlParts = req.url?.split('/');
  const method = req.method;
  const id = urlParts ? urlParts[2] : null;

  if (urlParts && urlParts[1] === 'users') {
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
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Method not allowed' }));
        break;
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not found' }));
  }
};
