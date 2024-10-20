import { IncomingMessage, ServerResponse } from 'http';
import { userController } from '../controllers/userController';

interface Props {
  req: IncomingMessage;
  res: ServerResponse;
}

export const routeHandler = ({ req, res }: Props) => {
  const urlParts = req.url?.split('/');
  if (urlParts && urlParts[1] === 'users') {
    userController({ req, res });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
};
