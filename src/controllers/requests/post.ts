import { IncomingMessage, ServerResponse } from 'http';
import { createUser } from '../../services/userService';
import { parseBody } from '../../utils/parseBody';
import { User } from '../../models/user';

interface Props {
  req: IncomingMessage;
  res: ServerResponse;
}

export const POST = async ({ req, res }: Props) => {
  const body: User = await parseBody(req);
  const newUser = createUser(body.name, body.age, body.hobbies);

  res.writeHead(201, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(newUser));

  return;
};
