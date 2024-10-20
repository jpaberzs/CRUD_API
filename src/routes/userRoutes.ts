import { IncomingMessage, ServerResponse } from 'http';
import { userController } from '../controllers/userController';

export const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
  const urlParts = req.url?.split('/');
  if (urlParts && urlParts[1] === 'users') {
    userController({ req, res });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
};
