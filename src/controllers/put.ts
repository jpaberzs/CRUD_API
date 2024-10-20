import { IncomingMessage, ServerResponse } from 'http';
import { parseBody } from '../utils/parseBody';
import { updateUser } from '../services/userService';

export const PUT = async (
  req: IncomingMessage,
  res: ServerResponse,
  id: string | null
) => {
  if (id) {
    const updateBody = await parseBody(req);
    const updatedUser = updateUser(
      id,
      updateBody.name,
      updateBody.age,
      updateBody.hobbies
    );
    if (updatedUser) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(updatedUser));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    }
  }
};
