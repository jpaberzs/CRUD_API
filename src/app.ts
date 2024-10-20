import { createServer } from 'http';
import { routeHandler } from './routes/userRoutes';

export const app = createServer((req, res) => {
  routeHandler(req, res);
});
