import { ServerResponse } from 'http';
import { getUserById, getUsers } from '../../services/userService';
import { isValidUUID } from '../../utils/isValidUUID';
import { response } from '../../utils/response';

interface Props {
  res: ServerResponse;
  id: string | null;
}

export const GET = async ({ res, id }: Props) => {
  if (!id) {
    const allUsers = getUsers();
    response(res, 200, allUsers);
    return;
  }

  if (!isValidUUID(id)) return response(res, 400, 'Invalid UUID');

  const user = getUserById(id);

  if (!user) return response(res, 404, 'User not found');

  response(res, 200, user);
};
