import { customAlphabet } from 'nanoid';

const ALPHABET = '23456789abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';
const DEFAULT_LENGTH = 7;

export const generateShortCode = (length: number = DEFAULT_LENGTH): string => {
  const nanoid = customAlphabet(ALPHABET, length);

  return nanoid();
};
