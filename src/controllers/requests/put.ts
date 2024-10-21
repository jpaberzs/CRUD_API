import { IncomingMessage, ServerResponse } from 'http';
import { getUserById, updateUser } from '../../services/userService';
import { parseBody } from '../../utils/parseBody';
import { isValidUUID } from '../../utils/isValidUUID';
import { response } from '../../utils/response';

interface Props {
  req: IncomingMessage;
  res: ServerResponse;
  id: string | null;
}

export const PUT = async ({ req, res, id }: Props) => {
  if (!id) return response(res, 404, { message: 'ID not found' });
  if (!isValidUUID(id)) return response(res, 400, { message: 'Invalid UUID' });

  const oldUser = getUserById(id);

  if (!oldUser) return response(res, 404, { message: 'User not found' });

  const { username, age, hobbies } = await parseBody(req, res);
  const updatedUser = updateUser(
    id,
    username || oldUser.username,
    age || oldUser.age,
    hobbies || oldUser.hobbies
  );

  if (!updatedUser) return response(res, 404, { message: 'User not found' });

  response(res, 200, updatedUser);
};
