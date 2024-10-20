import { ServerResponse } from 'http';
import { getUserById, getUsers } from '../../services/userService';

interface Props {
  res: ServerResponse;
  id: string | null;
}

export const GET = async ({ res, id }: Props) => {
  if (id) {
    const user = getUserById(id);
    if (user) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    }
  } else {
    const allUsers = getUsers();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(allUsers));
  }
};
