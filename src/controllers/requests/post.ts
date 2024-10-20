import { IncomingMessage, ServerResponse } from 'http';
import { createUser } from '../../services/userService';
import { parseBody } from '../../utils/parseBody';
import { User } from '../../models/user';

export const POST = async (req: IncomingMessage, res: ServerResponse) => {
  const body: User = await parseBody(req);
  const newUser = createUser(body.name, body.age, body.hobbies);

  res.writeHead(201, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(newUser));

  return;
};
