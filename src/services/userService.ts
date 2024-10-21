import { User } from '../models/user';
import { v4 as uuidv4 } from 'uuid';
import { seed } from './seed';

const users: User[] = seed;

export const createUser = (
  username: string,
  age: number,
  hobbies: string[]
): User => {
  const newUser: User = { id: uuidv4(), username, age, hobbies };
  users.push(newUser);
  return newUser;
};

export const getUsers = (): User[] => users;

export const getUserById = (id: string): User | undefined =>
  users.find((u) => u.id === id);

export const updateUser = (
  id: string,
  username: string,
  age: number,
  hobbies: string[]
): User | undefined => {
  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex !== -1) {
    users[userIndex] = { id, username, age, hobbies };
    return users[userIndex];
  }
  return undefined;
};

export const deleteUser = (id: string): boolean => {
  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    return true;
  }
  return false;
};
