import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.resolve(process.cwd(), '.env.credentials'),
  override: true
});

export const ENV = {
  username: process.env.USERNAME!,
  password: process.env.PASSWORD!,
  baseURL: process.env.BASE_URL!
};
