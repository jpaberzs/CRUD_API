import { ServerResponse } from 'http';
import { deleteUser } from '../../services/userService';

interface Props {
  res: ServerResponse;
  id: string | null;
}

export const DELETE = ({ res, id }: Props) => {
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
