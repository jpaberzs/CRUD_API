import { ServerResponse } from 'http';

export const response = (res: ServerResponse, status: number, msg: unknown) => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(msg));
};
