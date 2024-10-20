import { ServerResponse } from 'http';
import { deleteUser } from '../../services/userService';

export const DELETE = (res: ServerResponse, id: string | null) => {
  if (id) {
    const isDeleted = deleteUser(id);
    if (isDeleted) {
      res.writeHead(204);
      res.end();
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    }
  }
};
