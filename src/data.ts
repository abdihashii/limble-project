import { TComment, TUser } from './types';

export const comments: TComment[] = [
  {
    id: '1',
    sender: {
      id: 4, // Gabbey's ID
    },
    message: 'Hello, World!',
    createdAt: '2024-04-20T09:00:00Z',
  },
  {
    id: '2',
    sender: {
      id: 3, // Bryan's ID
    },
    message: 'Hi, Gabbey!',
    createdAt: '2024-04-20T09:02:00Z',
  },
  {
    id: '3',
    sender: {
      id: 4, // Gabbey's ID
    },
    message: 'Brian, how are you?',
    createdAt: '2024-04-20T09:03:00Z',
  },
  {
    id: '4',
    sender: {
      id: 3, // Bryan's ID
    },
    message: 'Actually, my name is spelled Bryan. :D',
    createdAt: '2024-04-20T09:03:00Z',
  },
];

export const users: TUser[] = [
  { id: 1, name: 'Kevin' },
  { id: 2, name: 'Jeff' },
  { id: 3, name: 'Bryan' },
  { id: 4, name: 'Gabbey' },
  { id: 5, name: 'Haji' },
];
