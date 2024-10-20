import { ServerResponse } from 'http';
import { deleteUser } from '../../services/userService';
import { response } from '../../utils/response';
import { isValidUUID } from '../../utils/isValidUUID';

interface Props {
  res: ServerResponse;
  id: string | null;
}

export const DELETE = ({ res, id }: Props) => {
  if (!id) return response(res, 404, { message: 'ID not found' });
  if (!isValidUUID(id)) return response(res, 400, { message: 'Invalid UUID' });

  const isDeleted = deleteUser(id);

  if (!isDeleted) return response(res, 404, { message: 'User not found' });

  response(res, 200, { message: 'User successfully deleted' });
};
