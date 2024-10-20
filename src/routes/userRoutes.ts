import { IncomingMessage, ServerResponse } from 'http';
import { userController } from '../controllers/userController';
import { response } from '../utils/response';

interface Props {
  req: IncomingMessage;
  res: ServerResponse;
}

export const routeHandler = ({ req, res }: Props) => {
  const urlParts = req.url?.split('/');

  if (urlParts) {
    switch (urlParts[1]) {
      case 'users':
        userController({ req, res });
        break;
      default:
        response(res, 404, { message: 'Route not found' });
    }
  }
};
