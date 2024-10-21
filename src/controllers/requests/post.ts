import { IncomingMessage, ServerResponse } from 'http';
import { createUser } from '../../services/userService';
import { parseBody } from '../../utils/parseBody';
import { User } from '../../models/user';
import { response } from '../../utils/response';

interface Props {
  req: IncomingMessage;
  res: ServerResponse;
}

export const POST = async ({ req, res }: Props) => {
  const body: User = await parseBody(req, res);

  if (!body) return response(res, 400, { message: 'Invalid JSON' });

  if (!body.username || !body.age || !body.hobbies)
    return response(res, 400, { message: 'Does not contains required fields' });

  const newUser = createUser(body.username, body.age, body.hobbies);

  response(res, 200, newUser);
};
